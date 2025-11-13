import { motion } from "framer-motion";
import { Plane } from "lucide-react";

interface AnimatedPlanesProps {
  count?: number;
  opacity?: number;
}

export function AnimatedPlanes({ count = 2, opacity = 0.3 }: AnimatedPlanesProps) {
  const planes = [
    {
      className: "top-1/4 left-0",
      initial: { x: -100, y: 0 },
      animate: { 
        x: typeof window !== 'undefined' ? window.innerWidth + 100 : 1200,
        y: [0, 60, 30, 90]
      },
      transition: {
        duration: 24,
        repeat: Infinity,
        ease: "easeInOut" as const
      },
      size: 12,
      rotation: 48
    },
    {
      className: "bottom-1/4 left-0",
      initial: { x: -150, y: 0 },
      animate: { 
        x: typeof window !== 'undefined' ? window.innerWidth + 150 : 1300,
        y: [0, -50, -70, -30]  
      },
      transition: {
        duration: 32,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: 12
      },
      size: 14,
      rotation: 45
    }
  ];

  return (
    <>
      {planes.slice(0, count).map((plane, index) => (
        <motion.div
          key={index}
          className={`absolute z-0 opacity-${Math.round(opacity * 100)} ${plane.className}`}
          initial={plane.initial}
          animate={plane.animate}
          transition={plane.transition}
        >
          <Plane 
            className={`w-${plane.size} h-${plane.size} text-white`} 
            style={{ transform: `rotate(${plane.rotation}deg)` }} 
          />  
        </motion.div>
      ))}
    </>
  );
}