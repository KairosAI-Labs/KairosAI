import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <div 
      className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20"
      role="alert"
    >
      <AlertCircle 
        className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" 
        aria-hidden="true" 
      />
      <div className="flex-1">
        <p className="text-rose-200 text-sm">{message}</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-rose-400 hover:text-rose-200 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
}
