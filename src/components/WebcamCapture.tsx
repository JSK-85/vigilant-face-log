
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { detectFaces } from '@/utils/faceDetection';
import { useToast } from '@/components/ui/use-toast';

interface WebcamCaptureProps {
  onCapture?: (image: string) => void;
  onFaceDetected?: (faces: Array<{ x: number; y: number; width: number; height: number }>) => void;
  showControls?: boolean;
  autoStart?: boolean;
  width?: number;
  height?: number;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onCapture,
  onFaceDetected,
  showControls = true,
  autoStart = false,
  width = 640,
  height = 480,
}) => {
  const [isActive, setIsActive] = useState(autoStart);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [detectionRunning, setDetectionRunning] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const { toast } = useToast();

  const startCamera = async () => {
    setErrorMessage(null);
    
    try {
      const constraints = {
        video: {
          width: { ideal: width },
          height: { ideal: height },
          facingMode: 'user',
        },
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        setHasPermission(true);
        
        if (showControls) {
          toast({
            title: "Camera started",
            description: "Face detection is now active",
          });
        }
        
        startFaceDetection();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setErrorMessage('Could not access camera. Please check permissions.');
      setHasPermission(false);
      
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access the camera. Please check your permissions.",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsActive(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setDetectionRunning(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
        
        const imageData = canvasRef.current.toDataURL('image/png');
        
        if (onCapture) {
          onCapture(imageData);
        }
        
        return imageData;
      }
    }
    
    return null;
  };

  const startFaceDetection = () => {
    if (detectionRunning) return;
    
    setDetectionRunning(true);
    
    const detectFacesLoop = async () => {
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === 4) {
        const context = canvasRef.current.getContext('2d');
        
        if (context) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          
          context.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          );
          
          try {
            const faces = await detectFaces(canvasRef.current);
            
            // Clear previous drawings
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Redraw the video frame
            context.drawImage(
              videoRef.current,
              0,
              0,
              videoRef.current.videoWidth,
              videoRef.current.videoHeight
            );
            
            // Draw rectangles around detected faces
            faces.forEach(face => {
              context.strokeStyle = '#4a7bff';
              context.lineWidth = 3;
              context.strokeRect(face.x, face.y, face.width, face.height);
            });
            
            if (onFaceDetected) {
              onFaceDetected(faces);
            }
          } catch (error) {
            console.error('Face detection error:', error);
          }
        }
      }
      
      if (detectionRunning) {
        animationFrameRef.current = requestAnimationFrame(detectFacesLoop);
      }
    };
    
    detectFacesLoop();
  };

  useEffect(() => {
    if (autoStart) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="camera-container" style={{ height: `${height}px` }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`${isActive ? 'block' : 'hidden'}`}
            onPlay={() => {
              if (isActive && !detectionRunning) {
                startFaceDetection();
              }
            }}
          />
          <canvas ref={canvasRef} className="absolute top-0 left-0" />
          
          {(!isActive || errorMessage) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
              {errorMessage ? (
                <div className="text-center p-4">
                  <CameraOff size={48} className="mx-auto mb-2 text-red-500" />
                  <p>{errorMessage}</p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <Camera size={48} className="mx-auto mb-2" />
                  <p>Camera is turned off</p>
                </div>
              )}
            </div>
          )}
          
          {showControls && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {!isActive ? (
                <Button 
                  onClick={startCamera} 
                  variant="default" 
                  className="bg-brand-lightBlue hover:bg-brand-lightBlue/90"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={captureImage} 
                    variant="secondary"
                  >
                    Capture
                  </Button>
                  <Button 
                    onClick={stopCamera} 
                    variant="destructive"
                  >
                    Stop Camera
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WebcamCapture;
