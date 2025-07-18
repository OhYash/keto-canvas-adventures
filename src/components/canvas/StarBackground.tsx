
import React, { useMemo } from 'react';

const StarBackground: React.FC = () => {
  const stars = useMemo(() => (
    [...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-40 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ))
  ), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars}
    </div>
  );
};

export default StarBackground;
