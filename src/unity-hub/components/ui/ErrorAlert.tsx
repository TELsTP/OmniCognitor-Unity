import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 text-sm">Dismiss</button>
    </div>
  );
};

export default ErrorAlert;
