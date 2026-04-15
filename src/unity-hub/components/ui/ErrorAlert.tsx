import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
  type?: 'error' | 'warning' | 'info' | 'success';
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  message, 
  onClose, 
  type = 'error'
}) => {
  const alertColors = {
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    success: 'bg-green-100 border-green-400 text-green-700',
  };

  const iconClasses = {
    error: '🚨',
    warning: '⚠️',
    info: 'ℹ️',
    success: '✅',
  };

  return (
    <div className={`border-l-4 p-4 rounded-md ${alertColors[type]}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-xl">{iconClasses[type]}</span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                type === 'error' ? 'hover:bg-red-200 focus:ring-red-600' :
                type === 'warning' ? 'hover:bg-yellow-200 focus:ring-yellow-600' :
                type === 'info' ? 'hover:bg-blue-200 focus:ring-blue-600' :
                'hover:bg-green-200 focus:ring-green-600'
              }`}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;