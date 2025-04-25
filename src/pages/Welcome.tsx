
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-recoleta bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-900 dark:to-purple-900">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
        {greeting}, Welcome to FaceLog
      </h1>
      <p className="text-xl text-white mb-12 max-w-2xl text-center">
        Experience secure and seamless face detection and recognition system
      </p>
      <Button
        size="lg"
        className="text-lg"
        onClick={() => navigate('/dashboard')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Welcome;
