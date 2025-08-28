import LoveLetter from "@/components/LoveLetter";
import FloatingHearts from "@/components/FloatingHearts";
import { useEffect, useState } from "react";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <FloatingHearts />
      
      {/* Main Love Letter */}
      <div className="relative z-20 animate-fade-in">
        <LoveLetter />
      </div>
      
      {/* Romantic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 text-primary/20 text-6xl animate-pulse">💝</div>
        <div className="absolute top-20 right-20 text-accent/30 text-4xl animate-pulse">💕</div>
        <div className="absolute bottom-20 left-20 text-primary/25 text-5xl animate-pulse">💖</div>
        <div className="absolute bottom-10 right-10 text-accent/20 text-3xl animate-pulse">💗</div>
      </div>
    </div>
  );
};

export default Index;
