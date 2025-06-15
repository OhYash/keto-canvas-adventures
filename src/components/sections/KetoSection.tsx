
import React from 'react';
import { Card } from '@/components/ui/card';

interface KetoSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const KetoSection: React.FC<KetoSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  return (
    <Card className={`p-4 sm:p-6 ${gradient} backdrop-blur-sm border-slate-600/50 w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto`}>
      <div className="text-center mb-4 sm:mb-6">
        <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 block">{icon}</span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>
      </div>
      
      {/* Cat Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 sm:mb-6">
        <div className="bg-slate-800/50 p-3 rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop" 
            alt="Orange tabby cat like Keto" 
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <h4 className="text-sm font-semibold text-white">Keto's Relaxation Time</h4>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop&sat=-100" 
            alt="Another adorable photo of Keto" 
            className="w-full h-32 object-cover rounded-lg mb-2 grayscale"
          />
          <h4 className="text-sm font-semibold text-white">Portrait Mode</h4>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Personality</h3>
          <p className="text-slate-300 text-sm">Keto is the most curious and playful cat you'll ever meet. Always getting into mischief and making us laugh.</p>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Favorite Activities</h3>
          <p className="text-slate-300 text-sm">Chasing laser dots, napping in sunbeams, and somehow always knowing when it's treat time.</p>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Special Talents</h3>
          <p className="text-slate-300 text-sm">Master of opening doors, professional lap warmer, and expert at judging my coding skills from across the room.</p>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Life Lessons</h3>
          <p className="text-slate-300 text-sm">Keto has taught me the importance of curiosity, rest, and finding joy in simple moments.</p>
        </div>
      </div>
      
      <button 
        onClick={onNavigateHome}
        className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 mx-auto block text-sm touch-manipulation"
      >
        ← Back to Home
      </button>
    </Card>
  );
};

export default KetoSection;
