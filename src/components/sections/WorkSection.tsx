import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Code,
  Download,
} from "lucide-react";
import { handleCopyUrl } from "@/utils/urlUtils";

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
  const HeadingTag = isActive ? "h1" : "h2";

  const currentRole = {
    title: "Senior Backend Engineer",
    company: "Ex-TestGorilla",
    location: "Remote",
    startDate: "October 2022",
    endDate: "August 2026",
    type: "Open for Work",
    description:
      "Recently wrapped up at TestGorilla after owning core backend systems processing 30M+ requests/month at <0.1% error rate and p95 latency under 150ms. Currently available for full-time senior backend roles and freelance client engagements.",
  };

  const careerJourney = [
    {
      title: "Senior Backend Engineer",
      company: "TestGorilla",
      period: "October 2022 - August 2026",
      achievements: [
        "Own a core backend system processing 30M+ requests/month at <0.1% error rate and p95 latency under 150ms, with near-zero on-call burden",
        "Designed the self-serve assessment flow, shifting the platform from customer-initiated to candidate-initiated — scaled to 52K+ candidates at a 78% completion rate with near-zero post-launch defects",
        "Engineered company's first localization support, resolving container-level font rendering, PDF generation, and headless Chrome issues that were blocking international expansion",
        "Designed feature-flag-driven cohorts and A/B testing infrastructure, enabling faster experimentation without redeployments",
        "Raised and addressed security risks in identity verification workflows; proposed multi-layered account-blocking measures to reduce fraud",
        "Solo-built a fully functional ATS demo integrated with the TestGorilla app in a 2-day company-wide hackathon",
        "Winner of the company-wide Ideathon (Croatia, 2024); formalized release management and mentored 3+ engineers to autonomy with PR standards adopted company-wide",
      ],
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
        "Sole owner of Windows Agent, handling bug fixes and feature enhancements",
      ],
    },
    {
      title: "Software Engineer",
      company: "MAQ Software Pvt. Ltd.",
      period: "April 2019 - March 2021",
      achievements: [
        "Developed backend services for microservices-based web applications using Azure cloud-native technologies",
        "Contributed to Microsoft's learning platform modularization initiative, supporting a rebuild-from-scratch architecture",
        "Subject Matter Expert for Mock/Unit testing",
        "Created CI/CD pipelines and Azure cloud web jobs",
      ],
    },
    {
      title: "Software Development Intern",
      company: "Odessa Technologies Pvt. Ltd.",
      period: "August 2018 - December 2018",
      achievements: [
        "Improved Odessa Build Platform",
        "Conducted performance profiling for Lease Wave project",
      ],
    },
  ];

  const technicalSkills = [
    { category: "Languages", skills: ["Python", "TypeScript", "C#", "SQL"] },
    {
      category: "Frameworks",
      skills: ["Django", "LangChain", "Node.js", ".NET/ASP.NET"],
    },
    {
      category: "AI / ML",
      skills: ["RAG", "Vector Embeddings", "Prompt Engineering", "OpenAI API"],
    },
    {
      category: "Cloud & Infra",
      skills: ["AWS", "Docker", "PostgreSQL", "Redis", "CI/CD"],
    },
    { category: "Platforms", skills: ["Linux", "FreeBSD", "Windows"] },
  ];

  const dailyTasks = [
    "Reviewing a PR and pushing back on a half-baked API contract",
    "Fixing something I shipped on Friday",
    "Mentoring an engineer through a tricky refactor",
    "Drawing boxes and arrows for a system that's about to get bigger",
  ];

  const handleOpportunitiesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateToSection?.("contact");
  };

  return (
    <Card
      className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors bg-white/80 hover:bg-white/90 px-3 py-2 rounded-lg text-sm font-medium shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </a>
          <button
            onClick={handleCopyUrl}
            className="text-2xl sm:text-3xl hover:scale-110 transition-transform duration-200 cursor-pointer"
            title="Copy page link"
          >
            {icon}
          </button>
        </div>

        <div className="text-center">
          <HeadingTag className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {title}
          </HeadingTag>
          <p className="text-slate-700 text-sm sm:text-base mb-4">{subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
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
                    {role.achievements.map((achievement, achIndex) => (
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
          <a
            href="/personal/Yash-resume-s-m.pdf"
            download
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Resume</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkSection;
