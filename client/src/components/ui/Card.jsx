import React from 'react';

export const Card = ({ children, className, ...props }) => {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={`px-6 pt-4 pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-2xl font-bold ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`px-6 py-2 ${className}`} {...props}>
      {children}
    </div>
  );
};