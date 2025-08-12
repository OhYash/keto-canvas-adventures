import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Compass,
  Eye,
} from "lucide-react";
import { useVisitTracking } from "@/hooks/useVisitTracking";

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  direction: "right" | "left" | "up" | "down";
  gradient: string;
}

interface HomeSectionProps {
  sections: Section[];
  onNavigateToSection: (sectionId: string) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  sections,
  onNavigateToSection,
}) => {
  const { getSectionVisits, getTotalVisits, getMostVisitedSections } =
    useVisitTracking();

  const getArrowIcon = (direction: string) => {
    switch (direction) {
      case "right":
        return <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "left":
        return <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "up":
        return <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "down":
        return <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  // Update the sections to change "Personal Life" to "About Me" and reorder them
  const displaySections = sections.map((section) => {
    if (section.id === "personal") {
      return { ...section, title: "About Me" };
    }
    return section;
  });

  // Reorder sections: personal -> now -> keto -> hobbies -> work -> contact
  const reorderedSections = [
    displaySections.find((s) => s.id === "personal"),
    displaySections.find((s) => s.id === "now"),
    displaySections.find((s) => s.id === "keto"),
    displaySections.find((s) => s.id === "hobbies"),
    displaySections.find((s) => s.id === "work"),
    displaySections.find((s) => s.id === "contact"),
  ].filter(Boolean) as Section[];

  return (
    <Card className="w-[95vw] sm:w-[90vw] md:w-[600px] max-w-[600px] max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-slate-600/50">
      <CardHeader className="pb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Compass className="w-6 h-6 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-2xl sm:text-3xl mr-2">👋</span>
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Hey, I'm Yash
              </span>
            </h1>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-200 mb-4">
            Welcome to a Living Map of Me
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-6">
            Start wherever feels most you — explore my personal side, dive into
            my professional work, or see what's happening right now. Either way,
            it's all connected.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reorderedSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigateToSection(section.id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 group touch-manipulation"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{section.icon}</span>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity text-slate-300 group-hover:text-white">
                  {getArrowIcon(section.direction)}
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm mb-1">
                  {section.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {section.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Visit Statistics - Hidden but code preserved */}
        {false && getTotalVisits() > 0 && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-blue-400" />
              <h3 className="text-white font-semibold text-sm">
                Pages You've Visited
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">
                  {getTotalVisits()}
                </div>
                <div className="text-xs text-slate-300">Total Page Visits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {getMostVisitedSections(1)[0]?.visitCount || 0}
                </div>
                <div className="text-xs text-slate-300">Most Visited Page</div>
              </div>
            </div>
            {getMostVisitedSections(3).length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-xs text-slate-300 mb-2">
                  Your Most Visited Pages:
                </div>
                <div className="flex flex-wrap gap-2">
                  {getMostVisitedSections(3).map(
                    ({ sectionId, visitCount }) => {
                      const section = sections.find((s) => s.id === sectionId);
                      return section ? (
                        <button
                          key={sectionId}
                          onClick={() => onNavigateToSection(sectionId)}
                          className="text-xs bg-white/10 hover:bg-white/20 text-white border-0 px-2 py-1 rounded-md transition-colors duration-200 cursor-pointer"
                        >
                          {section.icon} {section.title} ({visitCount})
                        </button>
                      ) : null;
                    },
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Welcome Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-500/30">
          <p className="text-slate-200 text-sm italic text-center leading-relaxed">
            "This canvas grows with me. Each direction goes deeper. Come back
            anytime, and you’ll find more."
          </p>
        </div>

        {/* Where would you like to start */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white text-center mb-4">
            Where would you like to start?
          </h3>

          {/* For friends & the curious */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 text-left">
              For friends & the curious
            </h4>
            <button
              onClick={() => onNavigateToSection("personal")}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">
                📝 Get to know me{" "}
              </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">
                — a peek into who I am
              </span>
            </button>
            <button
              onClick={() => onNavigateToSection("now")}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">
                🍜 What I'm into right now{" "}
              </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">
                — current obsessions & hobbies
              </span>
            </button>
          </div>

          {/* For professionals & collaborators */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 text-left">
              For professionals & collaborators
            </h4>
            <button
              onClick={() => onNavigateToSection("work")}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">
                💼 My work & projects{" "}
              </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">
                — what I do and build
              </span>
            </button>
            <button
              onClick={() => onNavigateToSection("now")}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">
                🎯 Current focus{" "}
              </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">
                — where my energy is going right now
              </span>
            </button>
            <button
              onClick={() => onNavigateToSection("contact")}
              className="block w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors duration-200 group"
            >
              <span className="text-slate-300 group-hover:text-white">
                📮 Always reachable{" "}
              </span>
              <span className="text-blue-400 group-hover:text-blue-300 underline">
                — Contact me anytime
              </span>
            </button>
          </div>
        </div>

        <div className="text-center pt-4">
          <Badge
            variant="secondary"
            className="text-xs bg-white/20 text-white hover:bg-white/30 px-4 py-2 border-0"
          >
            🌀 Lost? No worries—tap "Home" anytime to re-center.
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeSection;
