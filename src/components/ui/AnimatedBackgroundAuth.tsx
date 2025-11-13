import { motion } from "framer-motion";
import { Cloud, Plane } from "lucide-react";

export interface AnimatedBackgroundProps {
  variant?: "clouds" | "planes" | "dots" | "gradient";
  className?: string;
  dotCount?: number;
  dotOpacity?: number;
}

export function AnimatedBackground({
  variant = "clouds",
  className = "",
  dotCount = 20,
  dotOpacity = 0.2,
}: AnimatedBackgroundProps) {
  // Nubes animadas
  if (variant === "clouds") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 80}%`,
            }}
            animate={{
              x: [0, 100, 200],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          >
            <Cloud className="text-white/20" size={40 + i * 10} />
          </motion.div>
        ))}
      </div>
    );
  }

  // Puntos animados (con gradiente base)
  if (variant === "dots") {
    return (
      <>
        <div
          className={`absolute inset-0 z-0 ${className}`}
          style={{
            background: "linear-gradient(135deg, #0a3a59 0%, #367589 50%, #19bdba 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ opacity: dotOpacity }}
        >
          {[...Array(dotCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </>
    );
  }

  // Gradiente animado
  if (variant === "gradient") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(25, 189, 186, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(54, 117, 137, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(25, 189, 186, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 80% 20%, rgba(10, 58, 89, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(25, 189, 186, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(10, 58, 89, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return null;
}
