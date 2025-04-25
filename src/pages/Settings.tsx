
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { toast } = useToast();
  
  // Camera settings
  const [cameraSettings, setCameraSettings] = useState({
    defaultDevice: 'default',
    resolution: '640x480',
    autoStart: true,
    detectionInterval: 500,
  });
  
  // Recognition settings
  const [recognitionSettings, setRecognitionSettings] = useState({
    minConfidence: 0.7,
    matchThreshold: 0.6,
    enableMaskDetection: true,
    enableEmotionRecognition: false,
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    storeFailedAttempts: true,
    notifyOnUnknownFace: true,
    recordVideoClips: false,
    maxRetries: 3,
  });
  
  // Admin settings
  const [adminSettings, setAdminSettings] = useState({
    systemName: 'FaceLog Security System',
    adminEmail: 'admin@example.com',
    logsRetentionDays: 30,
    apiKey: 'sk_test_12345678901234567890',
  });

  const handleSaveCameraSettings = () => {
    toast({
      title: 'Camera settings saved',
      description: 'Your camera configuration has been updated.',
    });
  };

  const handleSaveRecognitionSettings = () => {
    toast({
      title: 'Recognition settings saved',
      description: 'Your face recognition settings have been updated.',
    });
  };

  const handleSaveSecuritySettings = () => {
    toast({
      title: 'Security settings saved',
      description: 'Your security configuration has been updated.',
    });
  };

  const handleSaveAdminSettings = () => {
    toast({
      title: 'Admin settings saved',
      description: 'System settings have been successfully updated.',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">System Settings</h1>
      
      <Tabs defaultValue="camera" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="recognition">Recognition</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="camera">
          <Card>
            <CardHeader>
              <CardTitle>Camera Configuration</CardTitle>
              <CardDescription>
                Configure the camera settings for face detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultDevice">Default Camera</Label>
                <Select 
                  value={cameraSettings.defaultDevice}
                  onValueChange={(value) => setCameraSettings({...cameraSettings, defaultDevice: value})}
                >
                  <SelectTrigger id="defaultDevice">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Camera</SelectItem>
                    <SelectItem value="front">Front Camera</SelectItem>
                    <SelectItem value="back">Back Camera</SelectItem>
                    <SelectItem value="external">External Camera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resolution">Video Resolution</Label>
                <Select 
                  value={cameraSettings.resolution}
                  onValueChange={(value) => setCameraSettings({...cameraSettings, resolution: value})}
                >
                  <SelectTrigger id="resolution">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="320x240">320x240 (Low)</SelectItem>
                    <SelectItem value="640x480">640x480 (Medium)</SelectItem>
                    <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                    <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="detectionInterval">Detection Interval (ms)</Label>
                <Input 
                  id="detectionInterval"
                  type="number"
                  min="100"
                  max="2000"
                  step="100"
                  value={cameraSettings.detectionInterval}
                  onChange={(e) => setCameraSettings({
                    ...cameraSettings, 
                    detectionInterval: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Time between face detection attempts in milliseconds
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="autoStart" 
                  checked={cameraSettings.autoStart}
                  onCheckedChange={(checked) => setCameraSettings({
                    ...cameraSettings, 
                    autoStart: checked
                  })}
                />
                <Label htmlFor="autoStart">Auto-start camera when page loads</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveCameraSettings}>Save Camera Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="recognition">
          <Card>
            <CardHeader>
              <CardTitle>Recognition Settings</CardTitle>
              <CardDescription>
                Configure face detection and recognition parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minConfidence">
                  Minimum Confidence Threshold: {recognitionSettings.minConfidence * 100}%
                </Label>
                <Input 
                  id="minConfidence"
                  type="range"
                  min="0.5"
                  max="0.95"
                  step="0.05"
                  value={recognitionSettings.minConfidence}
                  onChange={(e) => setRecognitionSettings({
                    ...recognitionSettings, 
                    minConfidence: parseFloat(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum confidence level required for a face to be considered detected
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="matchThreshold">
                  Match Threshold: {recognitionSettings.matchThreshold * 100}%
                </Label>
                <Input 
                  id="matchThreshold"
                  type="range"
                  min="0.4"
                  max="0.9"
                  step="0.05"
                  value={recognitionSettings.matchThreshold}
                  onChange={(e) => setRecognitionSettings({
                    ...recognitionSettings, 
                    matchThreshold: parseFloat(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Similarity threshold for matching a face to a registered user
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableMaskDetection" 
                  checked={recognitionSettings.enableMaskDetection}
                  onCheckedChange={(checked) => setRecognitionSettings({
                    ...recognitionSettings, 
                    enableMaskDetection: checked
                  })}
                />
                <Label htmlFor="enableMaskDetection">Enable mask detection</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableEmotionRecognition" 
                  checked={recognitionSettings.enableEmotionRecognition}
                  onCheckedChange={(checked) => setRecognitionSettings({
                    ...recognitionSettings, 
                    enableEmotionRecognition: checked
                  })}
                />
                <Label htmlFor="enableEmotionRecognition">Enable emotion recognition</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveRecognitionSettings}>Save Recognition Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and privacy options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="storeFailedAttempts" 
                  checked={securitySettings.storeFailedAttempts}
                  onCheckedChange={(checked) => setSecuritySettings({
                    ...securitySettings, 
                    storeFailedAttempts: checked
                  })}
                />
                <Label htmlFor="storeFailedAttempts">Store failed recognition attempts</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="notifyOnUnknownFace" 
                  checked={securitySettings.notifyOnUnknownFace}
                  onCheckedChange={(checked) => setSecuritySettings({
                    ...securitySettings, 
                    notifyOnUnknownFace: checked
                  })}
                />
                <Label htmlFor="notifyOnUnknownFace">Notify on unknown face detection</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="recordVideoClips" 
                  checked={securitySettings.recordVideoClips}
                  onCheckedChange={(checked) => setSecuritySettings({
                    ...securitySettings, 
                    recordVideoClips: checked
                  })}
                />
                <Label htmlFor="recordVideoClips">Record video clips of recognition events</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxRetries">Maximum Recognition Attempts</Label>
                <Input 
                  id="maxRetries"
                  type="number"
                  min="1"
                  max="10"
                  value={securitySettings.maxRetries}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings, 
                    maxRetries: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Number of attempts before locking out for a cooling period
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>
                System configuration and administrator options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemName">System Name</Label>
                <Input 
                  id="systemName"
                  value={adminSettings.systemName}
                  onChange={(e) => setAdminSettings({
                    ...adminSettings, 
                    systemName: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input 
                  id="adminEmail"
                  type="email"
                  value={adminSettings.adminEmail}
                  onChange={(e) => setAdminSettings({
                    ...adminSettings, 
                    adminEmail: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logsRetentionDays">Logs Retention (Days)</Label>
                <Input 
                  id="logsRetentionDays"
                  type="number"
                  min="1"
                  max="365"
                  value={adminSettings.logsRetentionDays}
                  onChange={(e) => setAdminSettings({
                    ...adminSettings, 
                    logsRetentionDays: parseInt(e.target.value)
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex">
                  <Input 
                    id="apiKey"
                    type="password"
                    value={adminSettings.apiKey}
                    onChange={(e) => setAdminSettings({
                      ...adminSettings, 
                      apiKey: e.target.value
                    })}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for integrating with external systems
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAdminSettings}>Save Admin Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
