import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ScreenLayout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 safe-area-padding ${className}`}>
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col gap-8 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export const ResponsiveContainer: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col md:flex-row gap-8 items-center md:items-stretch ${className}`}>
      {children}
    </div>
  );
};
