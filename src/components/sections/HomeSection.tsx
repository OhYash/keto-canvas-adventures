import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { homeData } from "@/data/homeData";

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  direction: "right" | "left" | "up" | "down";
  gradient: string;
}

interface HomeSectionProps {
  sections?: Section[];
  isActive?: boolean;
  onNavigateToSection: (sectionId: string) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  isActive = true,
  onNavigateToSection,
}) => {
  const HeadingTag = isActive ? "h1" : "h2";

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigateToSection(id);
  };

  return (
    <div className="w-[95vw] sm:w-[90vw] md:w-[500px] max-w-[500px] max-h-[85vh] overflow-y-auto bg-[#0d1322]/95 backdrop-blur-md border border-slate-800/80 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-slate-200 custom-scrollbar cursor-default">
      {/* Hero Heading with Entity Semantic Nesting */}
      <HeadingTag className="mb-3">
        <span className="block text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {homeData.name}
        </span>
        <span className="block text-base sm:text-lg font-semibold text-cyan-400 tracking-wide mt-1.5">
          {homeData.title}
        </span>
      </HeadingTag>

      {/* Hero Description */}
      <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed mb-5">
        {homeData.description}
      </p>

      {/* Navigation Links */}
      <div className="space-y-1 mb-2">
        {/* Work history link */}
        <a
          href={homeData.workLink.path}
          onClick={(e) => handleNav(e, homeData.workLink.target)}
          className="group flex items-center justify-between py-2 text-slate-300 hover:text-white text-sm sm:text-base font-medium transition-colors touch-manipulation"
        >
          <span>{homeData.workLink.label}</span>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-1 transition-transform duration-200" />
        </a>

        {/* Most Recent Role Box (slightly tabbed right below Work history) */}
        <a
          href={homeData.recentRole.path}
          onClick={(e) => handleNav(e, homeData.recentRole.target)}
          className="group block ml-3 sm:ml-4 p-3 sm:p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 mb-3 text-left"
        >
          <div className="text-xs sm:text-sm font-semibold text-slate-200 mb-0.5">
            <span className="text-white">{homeData.recentRole.company}</span>
            <span className="text-slate-400 font-normal"> · {homeData.recentRole.role} </span>
            <span className="text-slate-500 font-mono text-[11px] font-normal">
              ({homeData.recentRole.period})
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-400 mb-2 leading-snug">
            {homeData.recentRole.summary}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
            {homeData.recentRole.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </a>
        {/* Secondary / Essential Links */}
        {homeData.navigationLinks.map((link) => (
          <a
            key={link.target}
            href={link.path}
            onClick={(e) => handleNav(e, link.target)}
            className="group flex items-center justify-between py-2 text-slate-300 hover:text-white text-sm sm:text-base font-medium transition-colors touch-manipulation"
          >
            <span>{link.label}</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        ))}

        {/* Primary CTA: Contact */}
        <a
          href={homeData.primaryCta.path}
          onClick={(e) => handleNav(e, homeData.primaryCta.target)}
          className="group flex items-center justify-between py-2 text-cyan-400 hover:text-cyan-300 text-sm sm:text-base font-semibold transition-colors touch-manipulation"
        >
          <span>{homeData.primaryCta.label}</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>

      {/* Canvas Exploration Shortcuts & Crawler Links */}
      <div className="pt-2.5 mt-2 border-t border-slate-800/40 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-400">
        <span className="text-slate-500">Explore canvas:</span>
        {homeData.exploreLinks.map((link, idx) => (
          <React.Fragment key={link.target}>
            {idx > 0 && <span className="text-slate-600">·</span>}
            <a
              href={link.path}
              onClick={(e) => handleNav(e, link.target)}
              className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
            >
              {link.icon && <span>{link.icon}</span>}
              <span>{link.label}</span>
            </a>
          </React.Fragment>
        ))}
      </div>

      {/* Footer / Navigation Hint & Resume Link */}
      {/* [Do not remove comment] Resume Download. Generated using https://www.junian.dev/markdown-resume; This is also served in WorkSection.tsx */}
      <div className="pt-3 mt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
        <span>{homeData.canvasHint}</span>
        <a
          href="/personal/Yash-resume-s.pdf"
          download
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Resume</span>
        </a>
      </div>
    </div>
  );
};

export default HomeSection;
