import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Palette,
  Music,
  Camera,
  Code,
  Gamepad2,
  Book,
  Terminal,
  Cpu,
  Bike,
  Activity,
  Waves,
} from "lucide-react";
import { handleCopyUrl } from "@/utils/urlUtils";

interface HobbiesSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const hobbies = [
    {
      title: "Linux ricing",
      description:
        "Things I watch too much YouTube about: distro hopping, dotfiles, CLI tools. Occasionally I open the terminal and actually try something.",
      icon: <Terminal className="w-5 h-5" />,
      tags: ["Linux", "Open Source", "CLI Tools"],
    },
    {
      title: "Silicon news",
      description:
        "Process nodes, chip launches, the latest argument about ARM vs x86. I read more about CPUs than I'll ever buy.",
      icon: <Cpu className="w-5 h-5" />,
      tags: ["CPU Architecture", "Semiconductors", "Hardware"],
    },
    {
      title: "Motorbike reviews",
      description:
        "Track days, long rides, gear breakdowns. Mostly sportbike and ADV stuff.",
      icon: <Bike className="w-5 h-5" />,
      tags: ["Motorcycles", "Reviews", "Track Days"],
    },
    {
      title: "Surfing",
      description:
        "Four lessons in Goa, first week of the year. Stood up a couple of times. Hooked.",
      icon: <Waves className="w-5 h-5" />,
      tags: ["Surfing", "Goa", "Learning"],
    },
    {
      title: "Concerts",
      description: "On a break right now.",
      icon: <Music className="w-5 h-5" />,
      tags: ["Live Music"],
    },
  ];

  return (
    <Card
      className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}
    >
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
          <p className="text-slate-700 text-sm sm:text-base mb-4">{subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-3">
            <Palette className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">My Hobbies</h2>
          </div>

          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-slate-700">{hobby.icon}</div>
                  <h3 className="text-base font-bold text-slate-900">
                    {hobby.title}
                  </h3>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">
                  {hobby.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hobby.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs bg-slate-800 text-white hover:bg-slate-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Code className="w-5 h-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">
              Personal Projects
            </h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-3">
            Dive deeper into my coding projects and creative endeavors. See what
            I've been building in my spare time.
          </p>
          <button
            onClick={() => onNavigateToSection("projects")}
            className="w-full px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-indigo-400/30"
          >
            <Code className="w-4 h-4" />
            View Personal Projects
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HobbiesSection;
