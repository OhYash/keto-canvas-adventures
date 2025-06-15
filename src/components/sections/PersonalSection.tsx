
import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Camera, ArrowRight } from 'lucide-react';

interface PersonalSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
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
      
      {/* Profile Image Section */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=300&fit=crop" 
            alt="Full body profile" 
            className="w-32 h-48 sm:w-40 sm:h-60 object-cover rounded-lg mx-auto mb-3"
          />
          <p className="text-xs text-slate-400 text-center">Wii character style standing pose</p>
        </div>
      </div>
      
      {/* Personal Facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Physical Stats</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>Height:</span>
              <span>5'10" (178 cm)</span>
            </div>
            <div className="flex justify-between">
              <span>Weight:</span>
              <span>165 lbs (75 kg)</span>
            </div>
            <div className="flex justify-between">
              <span>Build:</span>
              <span>Athletic</span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Food Preferences</h3>
          <div className="space-y-1 text-sm text-slate-300">
            <div>🍕 Pizza lover</div>
            <div>🍜 Asian cuisine enthusiast</div>
            <div>☕ Coffee addict</div>
            <div>🥗 Health-conscious eater</div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Sports & Activities</h3>
          <div className="space-y-1 text-sm text-slate-300">
            <div>🏸 Badminton player</div>
            <div>🏃‍♂️ Running enthusiast</div>
            <div>🏊‍♂️ Swimming</div>
            <div>🧘‍♂️ Yoga practitioner</div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Lifestyle</h3>
          <div className="space-y-1 text-sm text-slate-300">
            <div>🌅 Early riser</div>
            <div>📚 Avid reader</div>
            <div>🎵 Music lover</div>
            <div>🌍 Travel enthusiast</div>
          </div>
        </div>
      </div>
      
      {/* Travel Stories Link */}
      <div className="bg-slate-800/50 p-4 rounded-lg mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Travel Adventures
        </h3>
        <p className="text-slate-300 text-sm mb-3">
          Explore my journey around the world through stories and photos from various destinations.
        </p>
        <button 
          onClick={() => console.log('Navigate to travel stories')}
          className="w-full px-4 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-white rounded-lg transition-all duration-300 text-sm touch-manipulation flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4" />
          View Travel Stories
          <ArrowRight className="w-4 h-4" />
        </button>
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

export default PersonalSection;
