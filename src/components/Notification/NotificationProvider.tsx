import { ReactNode, useState, useCallback } from "react";
import { NotificationContext, Notification, NotificationType } from "./NotificationContext";
import NotificationToast from "./Notification";

interface Props {
  children: ReactNode;
}

export default function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(
    (message: string, type: NotificationType = "info") => {
      if (!message) return;

      const id = Date.now();
      const duration =
        type === "error" ? 6000 : type === "success" ? 3000 : 4000;

      // Evita duplicar mensajes iguales
      setNotifications((prev) => {
        const alreadyExists = prev.some(
          (n) => n.message === message && n.type === type
        );
        if (alreadyExists) return prev;
        return [...prev, { id, message, type }];
      });

      setTimeout(() => removeNotification(id), duration);
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
        {notifications.map((n) => (
          <NotificationToast
            key={n.id}
            notification={n}
            onClose={() => removeNotification(n.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
