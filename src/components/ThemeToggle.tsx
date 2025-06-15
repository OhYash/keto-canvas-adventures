
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-gradient-to-br from-slate-200/20 to-slate-300/20 border border-slate-300/30 hover:from-slate-200/30 hover:to-slate-300/30 transition-all duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6 overflow-hidden">
        {/* Sun icon */}
        <Sun 
          className={`absolute inset-0 w-4 h-4 text-amber-500 transition-all duration-500 transform ${
            theme === 'light' 
              ? 'translate-x-0 rotate-0 opacity-100' 
              : 'translate-x-6 rotate-90 opacity-0'
          }`}
        />
        
        {/* Moon icon */}
        <Moon 
          className={`absolute inset-0 w-4 h-4 text-slate-300 transition-all duration-500 transform ${
            theme === 'dark' 
              ? 'translate-x-0 rotate-0 opacity-100' 
              : '-translate-x-6 -rotate-90 opacity-0'
          }`}
        />
        
        {/* Orbiter effect */}
        <div 
          className={`absolute w-1 h-1 bg-current rounded-full transition-all duration-500 ${
            theme === 'light'
              ? 'top-0 right-0 text-amber-400'
              : 'bottom-0 left-0 text-slate-400'
          }`}
        />
      </div>
      
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          theme === 'light'
            ? 'bg-amber-400/10 shadow-amber-400/20 shadow-lg'
            : 'bg-slate-400/10 shadow-slate-400/20 shadow-lg'
        }`}
      />
    </Button>
  );
};
