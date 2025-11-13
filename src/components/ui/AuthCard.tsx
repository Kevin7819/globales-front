import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthCard({ children, icon, title, subtitle }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10"
    >
      <div 
        className="rounded-3xl p-8 shadow-2xl border border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Card Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: '#19bdba' }}
          >
            {icon}
          </motion.div>
          <h1 className="text-white text-2xl font-bold mb-2 drop-shadow-md">{title}</h1>
          <p className="text-white font-medium drop-shadow-sm">{subtitle}</p>
        </div>

        {children}
      </div>
    </motion.div>
  );
}