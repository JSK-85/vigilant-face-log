
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
    <div 
      className="min-h-screen flex flex-col items-center justify-center font-recoleta 
      bg-cover bg-center bg-no-repeat 
      light:bg-[url('https://wallpapers.com/images/high/aesthetic-baby-blue-gradient-i4clvor3aimq8rzu.webp')]
      dark:bg-[url('https://wallpapercave.com/wp/wp3354906.jpg')]"
    >
      <div className="bg-white/40 dark:bg-black/40 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-8">
          {greeting}, Welcome to FaceLog
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-200 mb-12 max-w-2xl text-center">
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
    </div>
  );
};

export default Welcome;
