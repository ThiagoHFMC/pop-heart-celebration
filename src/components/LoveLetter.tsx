import { Card } from "@/components/ui/card";
import { useState } from "react";
import HeartExplosion from "./HeartExplosion";

interface LoveLetterProps {
  onExplode?: () => void;
}

const LoveLetter = ({ onExplode }: LoveLetterProps) => {
  const [isExploding, setIsExploding] = useState(false);

  const handleClick = () => {
    if (!isExploding) {
      setIsExploding(true);
      onExplode?.();
    }
  };

  const handleExplosionComplete = () => {
    setIsExploding(false);
  };

  return (
    <Card 
      className="love-letter max-w-2xl mx-auto p-8 border-2 border-primary/20 rounded-xl relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl" 
      onClick={handleClick}
    >
      <div className="absolute top-4 right-4 text-primary text-2xl">💕</div>
      <div className="letter-content">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          My Dearest Love
        </h2>
        
        <p className="mb-4">
          In this moment, surrounded by floating hearts that dance around us, 
          I want you to know how much you mean to me. Each heart that appears 
          represents a memory we've shared, a laugh we've enjoyed, a moment 
          of pure joy.
        </p>
        
        <p className="mb-4">
          Click on the hearts as they appear - watch them burst into sparkles 
          of love, just like how you make my heart burst with happiness every 
          single day.
        </p>
        
        <p className="mb-6">
          You are my sunshine, my moonlight, and everything beautiful in between. 
          This little interactive love note is just a tiny representation of the 
          endless love I have for you.
        </p>
        
        <div className="text-right">
          <p className="text-primary font-semibold text-lg">
            Forever yours,
          </p>
          <p className="text-accent text-xl font-bold mt-2">
            Your Secret Admirer 💖
          </p>
        </div>
      </div>
      
      <div className="absolute -bottom-2 -right-2 text-primary text-3xl opacity-60">
        💌
      </div>
      
      <HeartExplosion 
        isExploding={isExploding} 
        onComplete={handleExplosionComplete} 
      />
    </Card>
  );
};

export default LoveLetter;