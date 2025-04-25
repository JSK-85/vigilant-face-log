
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface RecognitionStatusProps {
  status: 'idle' | 'processing' | 'recognized' | 'unrecognized' | 'error';
  recognizedUser?: {
    name: string;
    role: string;
    imageUrl?: string;
  } | null;
  confidence?: number;
  message?: string;
}

const RecognitionStatus: React.FC<RecognitionStatusProps> = ({
  status,
  recognizedUser,
  confidence = 0,
  message,
}) => {
  return (
    <Card className={`
      overflow-hidden transition-all duration-300
      ${status === 'recognized' ? 'border-green-500' : ''}
      ${status === 'unrecognized' ? 'border-amber-500' : ''}
      ${status === 'error' ? 'border-red-500' : ''}
    `}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          {status === 'idle' && (
            <>
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-500 text-xl">?</span>
              </div>
              <h3 className="font-medium text-lg">Ready for Face Recognition</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Look at the camera to authenticate
              </p>
            </>
          )}

          {status === 'processing' && (
            <>
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-brand-lightBlue animate-spin mb-4" />
              <h3 className="font-medium text-lg">Processing...</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Analyzing facial features
              </p>
            </>
          )}

          {status === 'recognized' && recognizedUser && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="font-medium text-lg">Authentication Successful</h3>
              <div className="mt-4 flex items-center space-x-3">
                {recognizedUser.imageUrl ? (
                  <img
                    src={recognizedUser.imageUrl}
                    alt={recognizedUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-lightBlue flex items-center justify-center">
                    <span className="text-white font-medium">
                      {recognizedUser.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="text-left">
                  <p className="font-medium">{recognizedUser.name}</p>
                  <p className="text-xs text-muted-foreground">{recognizedUser.role}</p>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${Math.round(confidence * 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Confidence: {Math.round(confidence * 100)}%
              </p>
            </>
          )}

          {status === 'unrecognized' && (
            <>
              <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="font-medium text-lg">Face Not Recognized</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {message || "This person is not registered in the system"}
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="font-medium text-lg">Authentication Error</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {message || "An error occurred during face recognition"}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecognitionStatus;
