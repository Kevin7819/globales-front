import React, { useState, ReactNode, cloneElement, isValidElement } from "react";

interface DialogProps {
  children: ReactNode;
}

interface DialogTriggerProps {
  children: ReactNode;
  onClick?: () => void;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: ReactNode;
}

const DialogContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function Dialog({ children }: DialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}


export function DialogTrigger({ children, onClick }: DialogTriggerProps) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogTrigger must be used within a <Dialog>");

  const handleClick = () => {
    if (onClick) onClick();
    ctx.setOpen(true);
  };

  if (isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
    });
  }

  return null;
}


export function DialogContent({ children, className }: DialogContentProps) {
  const ctx = React.useContext(DialogContext);

  if (!ctx) {
    throw new Error("DialogContent must be used within a <Dialog>");
  }

  if (!ctx.open) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      onClick={() => ctx.setOpen(false)}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 ${className || ""}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}
