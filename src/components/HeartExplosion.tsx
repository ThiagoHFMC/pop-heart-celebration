import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface ExplosionHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  direction: { x: number; y: number };
}

interface HeartExplosionProps {
  isExploding: boolean;
  onComplete: () => void;
}

const HeartExplosion = ({ isExploding, onComplete }: HeartExplosionProps) => {
  const [explosionHearts, setExplosionHearts] = useState<ExplosionHeart[]>([]);

  const heartColors = [
    'text-primary',
    'text-accent', 
    'text-primary/80',
    'text-accent/80',
    'text-destructive',
  ];

  useEffect(() => {
    if (isExploding) {
      // Create explosion hearts
      const hearts: ExplosionHeart[] = [];
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const speed = Math.random() * 200 + 100;
        hearts.push({
          id: i,
          x: 0, // Relative to explosion center
          y: 0,
          size: Math.random() * 20 + 10,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          direction: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
        });
      }
      setExplosionHearts(hearts);

      // Clear explosion after animation
      const timeout = setTimeout(() => {
        setExplosionHearts([]);
        onComplete();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isExploding, onComplete]);

  if (!isExploding || explosionHearts.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {explosionHearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-explosion heart-glow absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${heart.direction.x}px, ${heart.direction.y}px)`,
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

export default HeartExplosion;