import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLogoProps {
  subtitle?: string;
}

export function AuthLogo({ subtitle = "Tu viaje comienza aquí" }: AuthLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <Link to="/" className="flex items-center justify-center gap-3 group mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <img
            src="/resources/orbis-sin-fondo.webp"
            alt="Orbis Airlines"
            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </motion.div>
      </Link>
      <p className="text-white text-lg font-medium drop-shadow-md">{subtitle}</p>
    </motion.div>
  );
}