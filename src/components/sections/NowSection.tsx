
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
      category: "Planning",
      item: "Next travel with Schengen visa - exploring destinations",
      lastUpdated: "2025-08-08"
    },
    {
      category: "Building",
      item: "This infinite canvas website",
      lastUpdated: "2025-08-08"
    },
    {
      category: "Building",
      item: "Personal finance management app (reinventing the wheel :p)",
      lastUpdated: "2025-08-08"
    },
    {
      category: "Running",
      item: "Every Wednesday - crossed 10k last-to-last Wednesday",
      lastUpdated: "2025-06-30"
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
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors bg-white/80 hover:bg-white/90 px-3 py-2 rounded-lg text-sm font-medium shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <div className="text-2xl sm:text-3xl">{icon}</div>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {title}
          </h1>
          <p className="text-slate-700 text-sm sm:text-base mb-4">
            {subtitle}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-slate-600 text-xs bg-white/60 rounded-lg px-3 py-2 w-fit mx-auto">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {formatDate(currentPlans[0].lastUpdated)}</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">Currently</h2>
          </div>

          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700">
                      {plan.category}
                    </Badge>
                  </div>
                  <p className="text-slate-900 font-semibold text-base leading-relaxed">
                    {plan.item}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-700 mb-1">
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

        <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-sm italic text-center leading-relaxed">
            "What I'm focused on right now, what's capturing my attention, and what I'm working towards."
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Updated regularly · Check back for changes
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default NowSection;
