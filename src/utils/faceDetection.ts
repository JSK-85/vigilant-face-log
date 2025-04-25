
// This is a placeholder for the actual face detection implementation
// In a real-world scenario, we would use a library like tensorflow.js or face-api.js

export interface DetectedFace {
  x: number;
  y: number;
  width: number;
  height: number;
  landmarks?: Array<{x: number, y: number}>;
  descriptor?: Float32Array;
}

// Mock face detection function
export const detectFaces = async (canvas: HTMLCanvasElement): Promise<DetectedFace[]> => {
  // In a real implementation, we would analyze the image data and return real face coordinates
  // For demo purposes, we'll randomly simulate face detection
  
  const simulateFaceDetection = (): DetectedFace[] => {
    const faces: DetectedFace[] = [];
    const faceCount = Math.random() > 0.2 ? 1 : Math.random() > 0.7 ? 2 : 0;
    
    for (let i = 0; i < faceCount; i++) {
      const width = canvas.width * (0.2 + Math.random() * 0.1);
      const height = width * 1.3;
      const x = canvas.width * 0.3 + (Math.random() * 0.4 - 0.2) * canvas.width;
      const y = canvas.height * 0.2 + (Math.random() * 0.2) * canvas.height;
      
      faces.push({
        x,
        y,
        width,
        height,
        // Mock facial landmark points
        landmarks: Array(5).fill(0).map(() => ({
          x: x + Math.random() * width,
          y: y + Math.random() * height
        })),
        // Mock face descriptor (would normally be a 128-length feature vector)
        descriptor: new Float32Array(128).fill(0).map(() => Math.random() - 0.5)
      });
    }
    
    return faces;
  };
  
  // Simulate processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(simulateFaceDetection());
    }, 100);
  });
};

export const compareFaces = (face1: Float32Array, face2: Float32Array): number => {
  // In a real implementation, this would compute the Euclidean distance between face descriptors
  // For demo purposes, we'll just return a random similarity score
  return Math.random();
};

export const recognizeFace = async (faceDescriptor: Float32Array, knownFaces: Array<{id: string, descriptor: Float32Array}>): Promise<string | null> => {
  // In a real implementation, this would find the closest match in the known faces database
  // For demo, we'll randomly return a match or null
  
  if (Math.random() > 0.4 && knownFaces.length > 0) {
    const randomIndex = Math.floor(Math.random() * knownFaces.length);
    return knownFaces[randomIndex].id;
  }
  
  return null;
};

// Mock database of known faces
// In a real application, this would be stored in a database
export const mockUsers = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Admin',
    registered: '2023-01-15',
    lastSeen: '2023-04-24T09:15:00',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
    descriptor: new Float32Array(128).fill(0).map(() => Math.random() - 0.5)
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'User',
    registered: '2023-02-10',
    lastSeen: '2023-04-24T10:30:00',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
    descriptor: new Float32Array(128).fill(0).map(() => Math.random() - 0.5)
  },
  {
    id: '3',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    role: 'User',
    registered: '2023-03-05',
    lastSeen: '2023-04-23T16:45:00',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
    descriptor: new Float32Array(128).fill(0).map(() => Math.random() - 0.5)
  }
];

// Mock logs data
export const generateMockLogs = (count: number) => {
  const eventTypes = ['Entry', 'Exit', 'Failed Recognition'];
  const locations = ['Main Entrance', 'Back Door', 'Office 101', 'Conference Room'];
  
  return Array(count).fill(0).map((_, i) => {
    const user = Math.random() > 0.2 ? mockUsers[Math.floor(Math.random() * mockUsers.length)] : null;
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24 * 7)); // Within past week
    
    return {
      id: `log-${i}`,
      userId: user?.id || null,
      userName: user?.name || 'Unknown Person',
      userImage: user?.imageUrl || null,
      eventType,
      location,
      timestamp: timestamp.toISOString(),
      confidence: user ? 0.7 + Math.random() * 0.25 : 0.4 + Math.random() * 0.3
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
