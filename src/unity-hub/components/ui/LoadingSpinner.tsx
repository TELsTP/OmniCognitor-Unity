import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-20 h-20'
  };

  return (
    <div className={`animate-spin rounded-full border-4 border-blue-500 border-t-transparent ${sizeClasses[size]}`} />
  );
};

export default LoadingSpinner;
