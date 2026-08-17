import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Code,
  Download,
} from "lucide-react";
import SectionCard from "@/components/canvas/SectionCard";
import { currentRole, careerJourney, technicalSkills, dailyTasks } from "@/data/workData";

interface WorkSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const [showAllExperience, setShowAllExperience] = useState(false);

  const handleOpportunitiesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateToSection?.("contact");
  };

  return (
    <SectionCard
      gradient={gradient}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
    >
      {/* Most Recent Role */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
        <div className="flex items-center gap-3 mb-3">
          <Building className="w-5 h-5 text-slate-800" />
          <h3 className="text-lg font-bold text-slate-900">
            Most Recent Role
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-xl font-bold text-slate-900">
              {currentRole.title}
            </h4>
            <p className="text-slate-700 font-medium">
              {currentRole.company}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {currentRole.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {currentRole.startDate} - {currentRole.endDate}
            </div>
            <Badge
              variant="secondary"
              className="text-xs bg-green-100 text-green-800"
            >
              {currentRole.type}
            </Badge>
          </div>

          <p className="text-slate-700 text-sm leading-relaxed">
            {currentRole.description}
          </p>
        </div>
      </div>

      {/* Career Journey */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
        <h3 className="text-lg font-bold text-slate-900 mb-3">
          Career Journey
        </h3>

        <div className="space-y-4">
          {careerJourney
            .slice(0, showAllExperience ? careerJourney.length : 2)
            .map((role, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-400 pl-4 py-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {role.title}
                    </h4>
                    <p className="text-slate-600 text-sm">{role.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {role.period}
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {role.achievements?.map((achievement, achIndex) => (
                    <li
                      key={achIndex}
                      className="flex items-start gap-2 text-xs text-slate-700"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {careerJourney.length > 2 && (
            <button
              onClick={() => setShowAllExperience(!showAllExperience)}
              className="w-full mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 border border-slate-300"
            >
              {showAllExperience ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  View Earlier Experience ({careerJourney.length - 2} more
                  roles)
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Technical Skills */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
        <h3 className="text-lg font-bold text-slate-900 mb-3">
          Technical Skills
        </h3>

        <div className="space-y-3">
          {technicalSkills.map((skillGroup, index) => (
            <div key={index}>
              <h4 className="font-semibold text-slate-800 text-sm mb-2">
                {skillGroup.category}
              </h4>
              <div className="flex flex-wrap gap-1">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Responsibilities */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
        <h3 className="text-lg font-bold text-slate-900 mb-3">
          On a normal Tuesday
        </h3>
        <ul className="space-y-2">
          {dailyTasks.map((task, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-slate-700"
            >
              <span className="text-blue-500 mt-1">•</span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      {/* Personal Projects Link */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Code className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">
            Personal Projects
          </h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          Beyond work, I build side projects to explore new technologies and
          solve problems I care about.
        </p>
        <a
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSection?.("projects");
          }}
          className="w-full px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-indigo-400/30 block text-center"
        >
          <Code className="w-4 h-4" />
          View Personal Projects
        </a>
      </div>

      {/* Writing & Essays Link */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">✍️</span>
          <h3 className="text-lg font-bold text-slate-900">
            Writing & Essays
          </h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          Deep dives into backend engineering, system design, and building spatial web apps.
        </p>
        <button
          onClick={() => onNavigateToSection?.("writing")}
          className="w-full px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-blue-400/30"
        >
          <span>✍️</span>
          Read Writing & Essays
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 pt-3">
        <a
          href="/contact"
          onClick={handleOpportunitiesClick}
          className="inline-block"
        >
          <Badge
            variant="secondary"
            className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2 cursor-pointer"
          >
            Open for full-time & freelance opportunities
          </Badge>
        </a>
        {/* Resume Download. Generated using https://www.junian.dev/markdown-resume; This is also served in WorkSection.tsx */}
        <a
          href="/personal/Yash-resume-s.pdf"
          download
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs transition-colors"
        >
          <Download className="w-3 h-3" />
          <span>Resume</span>
        </a>
      </div>
    </SectionCard>
  );
};

export default WorkSection;
