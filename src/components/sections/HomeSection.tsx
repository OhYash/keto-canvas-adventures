import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, ArrowDownRight, ArrowDownLeft, Download } from "lucide-react";

/**
 * TODO (Future work):
 * - Move /hobbies and /keto sections to the About (/personal) page
 * - Add navigation links to hobbies & keto from within PersonalSection
 */

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

// Compass layout: 4 directions
// NORTH: Work (Recruiters) | SOUTH: Personal (Curious visitors)
// EAST: Contact (Everyone) | WEST: Now (Peers)
const compassLayout = {
  north: {
    id: "work",
    title: "Work",
    subtitle: "Projects & Experience",
    icon: "💼",
    Arrow: ArrowRight,
  },
  south: {
    id: "personal",
    title: "About Me",
    subtitle: "Background & Journey",
    icon: "🧠",
    Arrow: ArrowLeft,
  },
  east: {
    id: "contact",
    title: "Contact Me",
    subtitle: "Get in Touch",
    icon: "📡",
    Arrow: ArrowDownLeft,
  },
  west: {
    id: "now",
    title: "Now",
    subtitle: "What I'm Up To",
    icon: "⚡",
    Arrow: ArrowDownRight,
  },
};

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigateToSection }) => {
  const { north, south, east, west } = compassLayout;

  return (
    <Card className="w-[95vw] sm:w-[90vw] md:w-[500px] max-w-[500px] bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-slate-600/50">
      <CardHeader className="pb-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            I'm Yash. This is my Digital Brain.
          </h1>
          <p className="text-slate-400 text-sm">
            A non-linear portfolio. Navigate spatially to explore my work, my
            interests, and what I'm building right now.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Compass Grid: North at top, West-East in middle, South at bottom */}
        <div className="flex flex-col gap-3">
          {/* NORTH */}
          <button
            onClick={() => onNavigateToSection(north.id)}
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-[1.02] group touch-manipulation"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{north.icon}</span>
                <div className="text-left">
                  <h3 className="font-bold text-white text-sm">{north.title}</h3>
                  <p className="text-slate-400 text-xs">{north.subtitle}</p>
                </div>
              </div>
              <north.Arrow className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </button>

          {/* WEST and EAST side by side */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateToSection(west.id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-[1.02] group touch-manipulation"
            >
              <div className="flex items-center gap-2">
                <west.Arrow className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-lg">{west.icon}</span>
              </div>
              <div className="text-left mt-2">
                <h3 className="font-bold text-white text-sm">{west.title}</h3>
                <p className="text-slate-400 text-xs">{west.subtitle}</p>
              </div>
            </button>

            <button
              onClick={() => onNavigateToSection(east.id)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-[1.02] group touch-manipulation"
            >
              <div className="flex items-center justify-end gap-2">
                <span className="text-lg">{east.icon}</span>
                <east.Arrow className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-right mt-2">
                <h3 className="font-bold text-white text-sm">{east.title}</h3>
                <p className="text-slate-400 text-xs">{east.subtitle}</p>
              </div>
            </button>
          </div>

          {/* SOUTH */}
          <button
            onClick={() => onNavigateToSection(south.id)}
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-[1.02] group touch-manipulation"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{south.icon}</span>
                <div className="text-left">
                  <h3 className="font-bold text-white text-sm">{south.title}</h3>
                  <p className="text-slate-400 text-xs">{south.subtitle}</p>
                </div>
              </div>
              <south.Arrow className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </button>
        </div>

        {/* Resume Download. Generated using https://www.junian.dev/markdown-resume; This is also served in WorkSection.tsx */}
        <div className="pt-2 flex justify-end">
          <a
            href="/personal/Yash-resume-s.pdf"
            download
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Download Resume</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeSection;
