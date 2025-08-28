import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface HeartData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartData[]>([]);
  const [burstingHearts, setBurstingHearts] = useState<Set<number>>(new Set());

  const heartColors = [
    'text-primary',
    'text-accent', 
    'text-primary/80',
    'text-accent/80',
    'text-destructive',
  ];

  const createHeart = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const spread = 300; // Hearts appear in a 300px radius around center
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * spread;
    
    const newHeart: HeartData = {
      id: Date.now() + Math.random(),
      x: centerX + Math.cos(angle) * distance - 30,
      y: window.innerHeight, // Start from bottom
      size: Math.random() * 15 + 15, // 15-30px
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      speed: Math.random() * 3 + 5, // 5-8 seconds to float up
    };
    return newHeart;
  }, []);

  // Create hearts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => {
        // Keep only last 6 hearts to prevent performance issues
        const newHearts = prev.length >= 6 ? prev.slice(1) : prev;
        return [...newHearts, createHeart()];
      });
    }, 2000); // New heart every 2 seconds

    return () => clearInterval(interval);
  }, [createHeart]);

  // Remove hearts after 10 seconds (they float up and disappear)
  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(prev => prev.filter(heart => Date.now() - heart.id < 10000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  const handleHeartClick = (heartId: number, event: React.MouseEvent) => {
    event.preventDefault();
    
    // Add to bursting hearts
    setBurstingHearts(prev => new Set(prev).add(heartId));
    
    // Remove heart after burst animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== heartId));
      setBurstingHearts(prev => {
        const newSet = new Set(prev);
        newSet.delete(heartId);
        return newSet;
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`heart-float heart-glow pointer-events-none ${
            burstingHearts.has(heart.id) ? 'heart-burst' : ''
          }`}
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animationDuration: `${heart.speed}s`,
          }}
        >
          <Heart 
            size={heart.size} 
            className={`${heart.color} fill-current`}
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(244, 63, 94, 0.3))',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
