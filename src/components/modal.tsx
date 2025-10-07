import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6"
      onClick={onClose}
    >
      {/* Evitar cerrar al hacer click dentro del contenido */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transition-transform transform scale-100 animate-fadeIn"
      >
        {/* Botón para cerrar (parte superior izquierda) */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-2xl font-bold"
        >
          ×
        </button>

        {/* Contenido del modal */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
