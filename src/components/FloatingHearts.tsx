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
    const newHeart: HeartData = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 60),
      y: Math.random() * (window.innerHeight - 60),
      size: Math.random() * 20 + 20, // 20-40px
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      speed: Math.random() * 2 + 1, // 1-3 seconds
    };
    return newHeart;
  }, []);

  // Create hearts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => {
        // Keep only last 8 hearts to prevent performance issues
        const newHearts = prev.length >= 8 ? prev.slice(1) : prev;
        return [...newHearts, createHeart()];
      });
    }, 1500); // New heart every 1.5 seconds

    return () => clearInterval(interval);
  }, [createHeart]);

  // Remove hearts after 8 seconds if not clicked
  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(prev => prev.filter(heart => Date.now() - heart.id < 8000));
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
          className={`heart-float heart-glow pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110 ${
            burstingHearts.has(heart.id) ? 'heart-burst' : ''
          }`}
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animationDuration: `${heart.speed}s`,
          }}
          onClick={(e) => handleHeartClick(heart.id, e)}
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
