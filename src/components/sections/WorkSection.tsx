
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, MapPin, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [showAllExperience, setShowAllExperience] = useState(false);
  const currentRole = {
    title: "Senior Backend Engineer",
    company: "TestGorilla",
    location: "Remote",
    startDate: "October 2022",
    type: "Full-time",
    description: "Fixed bugs and improved code test coverage while working on scalable assessment platform solutions."
  };

  const careerJourney = [
    {
      title: "Senior Backend Engineer",
      company: "TestGorilla",
      period: "October 2022 - Present",
      achievements: [
        "Fixed bugs and improved code test coverage",
        "Enhanced assessment platform reliability"
      ]
    },
    {
      title: "Software Engineer",
      company: "Digital Guardian Pvt. Ltd.",
      period: "March 2021 - September 2022",
      achievements: [
        "Built performance profiling tool with minimal runtime overhead",
        "Identified 54% performance boost in product",
        "Developed JS-based UI summary viewer",
        "Led SDK port from Linux to FreeBSD",
        "Fixed memory issues, enabling 70% performance improvement",
        "Improved data protection by introducing IBAN detection",
        "Sole owner of Windows Agent, handling bug fixes and feature enhancements"
      ]
    },
    {
      title: "Software Engineer",
      company: "MAQ Software Pvt. Ltd.",
      period: "April 2019 - March 2021",
      achievements: [
        "Transformed monolithic architecture to microservices",
        "Subject Matter Expert for Mock/Unit testing",
        "Developed Azure cloud web jobs",
        "Created CI/CD pipelines",
        "Developed multilingual HTML marketing emails"
      ]
    },
    {
      title: "Software Development Intern",
      company: "Odessa Technologies Pvt. Ltd.",
      period: "August 2018 - December 2018",
      achievements: [
        "Improved Odessa Build Platform",
        "Conducted performance profiling for Lease Wave project"
      ]
    }
  ];

  const technicalSkills = [
    { category: "Performance", skills: ["Performance Optimization", "Memory Management", "Profiling"] },
    { category: "Architecture", skills: ["Microservices", "SDK Development", "System Design"] },
    { category: "Cloud & DevOps", skills: ["Azure", "CI/CD Pipelines", "Web Jobs"] },
    { category: "Development", skills: ["UI Development", "Testing Methodologies", "Bug Fixing"] },
    { category: "Platforms", skills: ["Linux", "FreeBSD", "Windows"] }
  ];

  const dailyTasks = [
    "Performance optimization and system reliability",
    "Bug fixing and code quality improvements",
    "Architecture design and implementation",
    "Test coverage enhancement and code reviews"
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

        {/* Career Journey */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Career Journey</h3>
          
          <div className="space-y-4">
            {careerJourney.slice(0, showAllExperience ? careerJourney.length : 2).map((role, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">{role.title}</h4>
                    <p className="text-slate-600 text-sm">{role.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {role.period}
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {role.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2 text-xs text-slate-700">
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
                    View Earlier Experience ({careerJourney.length - 2} more roles)
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Technical Skills</h3>
          
          <div className="space-y-3">
            {technicalSkills.map((skillGroup, index) => (
              <div key={index}>
                <h4 className="font-semibold text-slate-800 text-sm mb-2">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-1">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
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
