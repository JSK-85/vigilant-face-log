
import React, { useState, useEffect } from 'react';
import { generateMockLogs, mockUsers } from '@/utils/faceDetection';
import DashboardStats from '@/components/DashboardStats';
import WebcamCapture from '@/components/WebcamCapture';
import RecognitionStatus from '@/components/RecognitionStatus';
import LogsTable from '@/components/LogsTable';

const Dashboard = () => {
  const [recognitionStatus, setRecognitionStatus] = useState<'idle' | 'processing' | 'recognized' | 'unrecognized' | 'error'>('idle');
  const [recognizedUser, setRecognizedUser] = useState<any | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    recognizedCount: 0,
    unrecognizedCount: 0,
    averageProcessingTime: 0,
    failureRate: 0,
  });

  // Initialize with mock data
  useEffect(() => {
    const mockLogs = generateMockLogs(20);
    setLogs(mockLogs);
    
    // Calculate mock stats
    const recognized = mockLogs.filter(log => log.eventType === 'Entry').length;
    const unrecognized = mockLogs.filter(log => log.eventType === 'Failed Recognition').length;
    const totalEvents = recognized + unrecognized;
    
    setStats({
      recognizedCount: recognized,
      unrecognizedCount: unrecognized,
      averageProcessingTime: Math.floor(Math.random() * 200) + 100, // 100-300ms
      failureRate: Math.round((unrecognized / Math.max(totalEvents, 1)) * 100),
    });
  }, []);

  const handleFaceDetected = (faces: Array<{ x: number; y: number; width: number; height: number }>) => {
    if (faces.length > 0 && recognitionStatus === 'idle') {
      // Simulate face recognition process
      setRecognitionStatus('processing');
      
      setTimeout(() => {
        // 70% chance of successful recognition for simulation
        const isRecognized = Math.random() > 0.3;
        
        if (isRecognized) {
          // Select a random user from our mock database
          const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
          const newConfidence = 0.7 + Math.random() * 0.3; // 70-100%
          
          setRecognitionStatus('recognized');
          setRecognizedUser(randomUser);
          setConfidence(newConfidence);
          
          // Add to logs
          const newLog = {
            id: `log-${Date.now()}`,
            userId: randomUser.id,
            userName: randomUser.name,
            userImage: randomUser.imageUrl,
            eventType: 'Entry',
            location: 'Main Entrance',
            timestamp: new Date().toISOString(),
            confidence: newConfidence
          };
          
          setLogs(prevLogs => [newLog, ...prevLogs]);
          
          // Update stats
          setStats(prevStats => ({
            ...prevStats,
            recognizedCount: prevStats.recognizedCount + 1,
            averageProcessingTime: Math.floor((prevStats.averageProcessingTime + Math.floor(Math.random() * 100) + 100) / 2),
            failureRate: Math.round((prevStats.unrecognizedCount / (prevStats.recognizedCount + prevStats.unrecognizedCount + 1)) * 100)
          }));
          
          // Reset after 5 seconds
          setTimeout(() => {
            setRecognitionStatus('idle');
            setRecognizedUser(null);
          }, 5000);
        } else {
          setRecognitionStatus('unrecognized');
          
          // Add to logs
          const newLog = {
            id: `log-${Date.now()}`,
            userId: null,
            userName: 'Unknown Person',
            userImage: null,
            eventType: 'Failed Recognition',
            location: 'Main Entrance',
            timestamp: new Date().toISOString(),
            confidence: 0.3 + Math.random() * 0.4 // 30-70%
          };
          
          setLogs(prevLogs => [newLog, ...prevLogs]);
          
          // Update stats
          setStats(prevStats => ({
            ...prevStats,
            unrecognizedCount: prevStats.unrecognizedCount + 1,
            failureRate: Math.round((prevStats.unrecognizedCount + 1) / (prevStats.recognizedCount + prevStats.unrecognizedCount + 1) * 100)
          }));
          
          // Reset after 3 seconds
          setTimeout(() => {
            setRecognitionStatus('idle');
          }, 3000);
        }
      }, 1500); // Simulate processing time
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Face Recognition Dashboard</h1>
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Live Recognition</h2>
          <WebcamCapture
            autoStart={true}
            onFaceDetected={handleFaceDetected}
            height={360}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Recognition Status</h2>
          <RecognitionStatus
            status={recognitionStatus}
            recognizedUser={recognizedUser}
            confidence={confidence}
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
        <LogsTable logs={logs.slice(0, 5)} />
      </div>
    </div>
  );
};

export default Dashboard;
