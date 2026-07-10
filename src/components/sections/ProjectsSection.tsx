
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Folder, ExternalLink, Code } from 'lucide-react';
import { handleCopyUrl } from '@/utils/urlUtils';

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
  const projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    url?: string;
  }> = [
    {
      title: "AI-Powered Mental Health Platform",
      description: "Backend for AI-assisted mental health platform serving hospitals and therapists. Features multi-role portals (Patient, Therapist, Admin) with role-based access control, designed with HIPAA compliance principles. Integrated OpenAI API with Supabase for secure therapeutic workflow automation.",
      technologies: ["Python", "OpenAI API", "Supabase", "HIPAA Compliance"],
      url: "https://mindcare-ai.surge.sh/"
    },
    {
      title: "INR Finance Compass (WIP)",
      description: "The AI-native personal finance platform I wish I'd had — one place that understands your whole financial life (bank, cards, cash, investments, long-horizon goals), not just what a bank balance says. Much like Claude Code is more useful because it grasps a whole codebase instead of isolated snippets, it builds full financial context before offering guidance. Self-hosted and INR-primary, with atomic ledger-derived balances and a live dashboard; budgeting, CSV import, and recurring transactions in progress.",
      technologies: ["React", "TypeScript", "Supabase", "AI-Native"],
      url: "https://finance-compass-dev.surge.sh/"
    },
    {
      title: "Tenor Cards",
      description: "Serverless web application for producing designer cards to share short messages. A lightweight platform for creating and sharing beautiful message cards.",
      technologies: ["HTML5", "CSS", "JavaScript", "Tailwind CSS"],
      url: "https://tenor-cards.surge.sh"
    },
    {
      title: "Knowledge•Day",
      description: "Blog-cum-newsletter platform that brings uncommon knowledge in 3-minute reads. Features custom email newsletter functionality and educational content curation.",
      technologies: ["Jekyll", ".NET Core", "Email Platform"],
      url: "https://kd_dev.surge.sh/"
    },
    {
      title: "Ava.js Test Library Enhancement",
      description: "Open source contribution enhancing the timeout() functionality in the popular JavaScript testing library. Improved testing capabilities for the developer community.",
      technologies: ["JavaScript", "Open Source", "Testing"]
    },
    {
      title: "Sailfish OS Port for YU Yuphoria",
      description: "Non-Android OS port for an Android device. Adapted device kernel configurations to run alternative mobile operating system using Hybris adaptation layer.",
      technologies: ["Hybris", "Linux Kernel", "Mobile OS"]
    },
    {
      title: "Image Stitching Software",
      description: "Console-based panorama generator developed during a 48-hour hackathon. Creates seamless panoramic images from multiple input photos using advanced stitching algorithms.",
      technologies: ["C++", "OpenCV", "Computer Vision"]
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
          <button
            onClick={handleCopyUrl}
            className="text-2xl sm:text-3xl hover:scale-110 transition-transform duration-200 cursor-pointer"
            title="Copy page link"
          >
            {icon}
          </button>
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
          <div className="flex items-center gap-3 mb-3">
            <Folder className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">Featured Projects</h2>
          </div>

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="w-4 h-4 text-slate-700" />
                    <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                {project.url && (
                  <div className="flex-shrink-0">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-slate-800 rounded-lg transition-all duration-300 text-xs font-semibold border border-blue-400/30"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit Project
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <ExternalLink className="w-5 h-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">Explore More</h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-3">
            Want to see more details about my professional work experience and technical skills?
          </p>
          <button 
            onClick={() => onNavigateToSection('work')}
            className="w-full px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-blue-400/30"
          >
            <ExternalLink className="w-4 h-4" />
            View Work Experience
          </button>
        </div>

      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
