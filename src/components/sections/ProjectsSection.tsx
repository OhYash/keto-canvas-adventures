
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Folder, ExternalLink, Code } from 'lucide-react';

interface ProjectsSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const projects = [
    {
      title: "Interactive Portfolio",
      description: "This infinite canvas portfolio you're currently exploring! Built with React, TypeScript, and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Canvas API"]
    },
    {
      title: "Task Management App",
      description: "A full-stack productivity app with real-time collaboration features and advanced filtering options.",
      technologies: ["Next.js", "PostgreSQL", "WebSockets"]
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather visualization with interactive charts and location-based forecasts.",
      technologies: ["Vue.js", "Chart.js", "Weather API"]
    },
    {
      title: "Open Source Contributions",
      description: "Contributing to various open source projects, focusing on accessibility improvements and performance optimizations.",
      technologies: ["GitHub", "Accessibility", "Performance"]
    }
  ];

  return (
    <Card className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}>
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors bg-white/80 hover:bg-white/90 px-4 py-2 rounded-lg font-medium shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <div className="text-3xl sm:text-4xl">{icon}</div>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            {title}
          </h1>
          <p className="text-slate-700 text-base sm:text-lg mb-6 font-medium">
            {subtitle}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Folder className="w-6 h-6 text-slate-800" />
            <h2 className="text-xl font-bold text-slate-900">Featured Projects</h2>
          </div>

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="w-5 h-5 text-slate-700" />
                  <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-sm font-semibold bg-slate-800 text-white hover:bg-slate-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <ExternalLink className="w-6 h-6 text-slate-700" />
            <h3 className="text-xl font-bold text-slate-900">Explore More</h3>
          </div>
          <p className="text-slate-700 font-medium leading-relaxed mb-4">
            Want to see more details about my professional work experience and technical skills?
          </p>
          <button 
            onClick={() => onNavigateToSection('work')}
            className="w-full px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-slate-800 rounded-lg transition-all duration-300 font-semibold touch-manipulation flex items-center justify-center gap-2 border border-blue-400/30"
          >
            <ExternalLink className="w-4 h-4" />
            View Work Experience
          </button>
        </div>

        <div className="mt-8 p-6 bg-white/80 rounded-xl border border-slate-300/50">
          <p className="text-slate-700 text-base italic text-center font-medium leading-relaxed">
            "Every project is an opportunity to learn something new and create something meaningful."
          </p>
        </div>

        <div className="text-center pt-6">
          <Badge variant="secondary" className="text-sm font-semibold bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Always building · Always improving
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
