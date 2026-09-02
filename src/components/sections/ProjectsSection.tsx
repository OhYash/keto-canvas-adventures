import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Folder, ExternalLink, Code, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import SectionCard from '@/components/canvas/SectionCard';
import { projectsData } from '@/data/projectsData';

interface ProjectsSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const navigate = useNavigate();
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <SectionCard
      gradient={gradient}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
      contentClassName="space-y-4"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Folder className="w-5 h-5 text-slate-800" />
          <h3 className="text-lg font-bold text-slate-900">Featured Projects</h3>
        </div>

        {projectsData.map((project, index) => {
          const isExpanded = !!expandedProjects[index];

          return (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    <h4 className="text-base font-bold text-slate-900">{project.title}</h4>
                    {project.badge && (
                      <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-300 font-mono">
                        {project.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={() => toggleExpand(index)}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1 rounded-md border border-blue-200/70 shadow-xs"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        {isExpanded
                          ? (project.badge ? `Hide ${project.badge} Features` : "Hide Details")
                          : (project.badge ? `What's new in ${project.badge}` : "More Details")}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700 space-y-1.5">
                          {project.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-emerald-600 font-bold select-none">•</span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {(project.links || project.url) && (
                  <div className="flex flex-wrap sm:flex-col gap-2 flex-shrink-0 w-full sm:w-auto">
                    {project.links
                      ? project.links.map((link, lIdx) => {
                          const isInternal = link.url.startsWith('/');
                          return (
                            <a
                              key={lIdx}
                              href={link.url}
                              {...(!isInternal && {
                                target: '_blank',
                                rel: 'noopener noreferrer',
                              })}
                              onClick={
                                isInternal
                                  ? (e) => {
                                      e.preventDefault();
                                      navigate(link.url);
                                    }
                                  : undefined
                              }
                              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 text-xs font-semibold border ${
                                isInternal
                                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-900 border-emerald-400/40 shadow-xs'
                                  : 'bg-blue-500/20 hover:bg-blue-500/30 text-slate-800 border-blue-400/30'
                              }`}
                            >
                              {isInternal ? (
                                <BookOpen className="w-3 h-3 text-emerald-700" />
                              ) : (
                                <ExternalLink className="w-3 h-3" />
                              )}
                              {link.label}
                            </a>
                          );
                        })
                      : project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-slate-800 rounded-lg transition-all duration-300 text-xs font-semibold border border-blue-400/30"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visit Project
                          </a>
                        )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <ExternalLink className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">Explore More</h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          Want to see more details about my professional work experience and technical skills?
        </p>
        <a
          href="/work"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection('work');
          }}
          className="w-full px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-blue-400/30 block text-center"
        >
          <ExternalLink className="w-4 h-4" />
          View Work Experience
        </a>
      </div>
    </SectionCard>
  );
};

export default ProjectsSection;
