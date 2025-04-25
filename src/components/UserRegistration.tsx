
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import WebcamCapture from './WebcamCapture';
import { DetectedFace } from '@/utils/faceDetection';

interface UserRegistrationProps {
  onRegister?: (userData: {
    name: string;
    email: string;
    role: string;
    imageUrl: string;
  }) => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const { toast } = useToast();

  const handleCapture = (image: string) => {
    setCapturedImage(image);
    setIsCapturing(false);
    
    toast({
      title: "Image captured",
      description: detectedFaces.length === 1 
        ? "Face detected successfully" 
        : detectedFaces.length === 0 
          ? "No face detected. Try again." 
          : "Multiple faces detected. Please ensure only one face is visible.",
      variant: detectedFaces.length === 1 ? "default" : "destructive"
    });
  };

  const handleFaceDetected = (faces: DetectedFace[]) => {
    setDetectedFaces(faces);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!capturedImage) {
      toast({
        title: "No image captured",
        description: "Please capture a face image before registering.",
        variant: "destructive",
      });
      return;
    }
    
    if (detectedFaces.length !== 1) {
      toast({
        title: "Face detection issue",
        description: detectedFaces.length === 0 
          ? "No face detected in the image. Please try again." 
          : "Multiple faces detected. Please ensure only one face is visible.",
        variant: "destructive",
      });
      return;
    }
    
    if (onRegister) {
      onRegister({
        name,
        email,
        role,
        imageUrl: capturedImage,
      });
    }
    
    // Reset form
    setName('');
    setEmail('');
    setRole('User');
    setCapturedImage(null);
    setDetectedFaces([]);
    
    toast({
      title: "User registered",
      description: "User has been successfully registered in the system.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register New User</CardTitle>
        <CardDescription>
          Add a new user to the face recognition system
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label>Face Image</Label>
            
            {isCapturing ? (
              <div className="mt-2">
                <WebcamCapture 
                  onCapture={handleCapture} 
                  onFaceDetected={handleFaceDetected}
                  height={320}
                />
              </div>
            ) : (
              <div className="mt-2 flex flex-col space-y-4">
                {capturedImage ? (
                  <div className="relative">
                    <img 
                      src={capturedImage} 
                      alt="Captured face" 
                      className="w-full max-h-[320px] object-contain rounded-md border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCapturedImage(null)}
                    >
                      Clear
                    </Button>
                  </div>
                ) : (
                  <div className="border border-dashed rounded-md p-8 text-center bg-muted/50">
                    <p className="text-muted-foreground mb-2">No image captured</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Capture a clear image of your face for registration
                    </p>
                  </div>
                )}
                
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setIsCapturing(true)}
                >
                  {capturedImage ? "Recapture Image" : "Capture Image"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={!capturedImage || detectedFaces.length !== 1}>
            Register User
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UserRegistration;
