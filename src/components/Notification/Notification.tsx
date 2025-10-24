// src/components/Notification/Notification.tsx
import { Notification } from "./NotificationContext";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  notification: Notification;
  onClose: () => void;
}

export default function NotificationToast({ notification, onClose }: Props) {
  const typeStyles: Record<string, string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <AnimatePresence>
      <motion.div
        key={notification.id}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center justify-between w-80 px-4 py-3 rounded-xl shadow-lg ${typeStyles[notification.type]}`}
      >
        <span>{notification.message}</span>
        <button onClick={onClose} className="ml-3">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
