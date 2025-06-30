
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, MapPin, Calendar } from 'lucide-react';

interface WorkSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const currentRole = {
    title: "Senior Frontend Developer",
    company: "Tech Innovation Corp",
    location: "San Francisco, CA",
    startDate: "January 2023",
    type: "Full-time",
    description: "Leading frontend development initiatives and building scalable web applications using modern technologies."
  };

  const currentProjects = [
    {
      name: "Customer Portal Redesign",
      description: "Complete overhaul of the customer-facing portal with improved UX and performance",
      technologies: ["React", "TypeScript", "Next.js"],
      status: "In Progress"
    },
    {
      name: "Design System Implementation",
      description: "Building and maintaining a comprehensive design system for consistent UI across products",
      technologies: ["Storybook", "Figma", "CSS-in-JS"],
      status: "Ongoing"
    }
  ];

  const dailyTasks = [
    "Code reviews and mentoring junior developers",
    "Architecture planning for new features",
    "Collaboration with design and product teams",
    "Performance optimization and bug fixes"
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

      <CardContent className="space-y-5">
        {/* Current Role */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
          <div className="flex items-center gap-3 mb-3">
            <Building className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">Current Role</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{currentRole.title}</h3>
              <p className="text-slate-700 font-medium">{currentRole.company}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {currentRole.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {currentRole.startDate} - Present
              </div>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                {currentRole.type}
              </Badge>
            </div>
            
            <p className="text-slate-700 text-sm leading-relaxed">
              {currentRole.description}
            </p>
          </div>
        </div>

        {/* Current Projects */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Current Projects</h3>
          
          <div className="space-y-3">
            {currentProjects.map((project, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{project.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs bg-slate-200 text-slate-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Responsibilities */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Daily Responsibilities</h3>
          <ul className="space-y-2">
            {dailyTasks.map((task, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-blue-500 mt-1">•</span>
                {task}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Currently employed · Open to opportunities
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkSection;
