
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Briefcase, Code } from 'lucide-react';

interface WorkSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  const workAreas = [
    {
      category: "Frontend Development",
      description: "Building modern, responsive web applications with React, TypeScript, and modern CSS frameworks.",
      skills: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
      category: "UI/UX Design",
      description: "Creating intuitive user experiences and beautiful interfaces that users love to interact with.",
      skills: ["Figma", "Design Systems", "Prototyping"]
    }
  ];

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
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">Professional Experience</h2>
          </div>

          {workAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="w-4 h-4 text-slate-700" />
                  <h3 className="text-base font-bold text-slate-900">{area.category}</h3>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-sm italic text-center leading-relaxed">
            "Passionate about creating exceptional digital experiences through clean code and thoughtful design."
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Available for new opportunities
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkSection;
