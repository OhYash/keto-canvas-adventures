
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Activity } from 'lucide-react';

interface NowSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const NowSection: React.FC<NowSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  const currentPlans = [
    {
      category: "Exploring",
      item: "AI agents",
      lastUpdated: "2025-06-10"
    },
    {
      category: "Planning",
      item: "Hiking plans for July",
      lastUpdated: "2025-06-08"
    },
    {
      category: "Reading",
      item: "'The Pragmatic Programmer'",
      lastUpdated: "2025-06-05"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  return (
    <Card className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/50 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <div className="text-2xl sm:text-3xl">{icon}</div>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mb-4">
            {subtitle}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {formatDate(currentPlans[0].lastUpdated)}</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Currently</h2>
          </div>

          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:border-slate-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {plan.category}
                    </Badge>
                  </div>
                  <p className="text-white font-medium text-base sm:text-lg">
                    {plan.item}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1">
                    {formatDate(plan.lastUpdated)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {getDaysAgo(plan.lastUpdated)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-600/30">
          <p className="text-slate-300 text-sm italic text-center">
            "What I'm focused on right now, what's capturing my attention, and what I'm working towards."
          </p>
        </div>

        <div className="text-center pt-4">
          <Badge variant="secondary" className="text-xs">
            Updated regularly · Check back for changes
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default NowSection;
