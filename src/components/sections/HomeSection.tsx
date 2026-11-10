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
    <div className="relative w-[95vw] sm:w-[90vw] md:w-[500px] max-w-[500px] max-h-[85vh] overflow-y-auto bg-[#0d1322]/95 backdrop-blur-md border border-slate-800/80 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-slate-200 custom-scrollbar cursor-default">
      {/* Top Right "Open to work" Corner Ribbon */}
      <a
        href={homeData.openToWork.path}
        onClick={(e) => handleNav(e, homeData.openToWork.target)}
        className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20 group cursor-pointer block pointer-events-none rounded-tr-2xl sm:rounded-tr-3xl"
        title={homeData.openToWork.tooltip}
        aria-label={homeData.openToWork.text}
      >
        <div className="absolute top-[35px] -right-[29px] w-[150px] transform rotate-45 bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 font-bold text-[10px] py-1 text-center shadow-md tracking-wider uppercase transition-colors duration-200 flex items-center justify-center gap-1.5 select-none border-y border-emerald-300/40 pointer-events-auto pr-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
          <span>{homeData.openToWork.text}</span>
        </div>
      </a>

      {/* Hero Heading with Entity Semantic Nesting */}
      <HeadingTag className="mb-3 pr-14 sm:pr-16">
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

        {/* Recent Full-Time Experience Highlight & Production Metrics */}
        <a
          href={homeData.recentRole.path}
          onClick={(e) => handleNav(e, homeData.recentRole.target)}
          className="group block p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 mb-5 text-left"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-cyan-400/90 font-mono">
                {homeData.recentRole.label}
              </span>
            </div>
            <span className="text-slate-500 font-mono text-[11px] font-normal shrink-0">
              ({homeData.recentRole.period})
            </span>
          </div>

          <div className="text-xs sm:text-sm font-semibold mb-1 text-white group-hover:text-cyan-300 transition-colors">
            <span>{homeData.recentRole.company}</span>
            <span className="text-slate-400 font-normal"> · {homeData.recentRole.role}</span>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-400 mb-2.5 leading-snug">
            {homeData.recentRole.summary}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-800/80">
            {homeData.recentRole.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </a>

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
        <span className="text-slate-500">Further exploration on this 2D Canvas:</span>
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
