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
      {/* Header Tag / Badge */}
      <div className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase mb-3">
        {homeData.badge}
      </div>

      {/* Hero Headline */}
      <HeadingTag className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-2.5">
        {homeData.headline}
      </HeadingTag>

      {/* Hero Subtitle */}
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5">
        {homeData.subtitle}
      </p>

      {/* Production Metric Strip */}
      <div className="border-y border-slate-800/80 py-4 my-5">
        <span className="text-[11px] sm:text-xs text-slate-500 uppercase font-mono font-medium tracking-wider mb-2.5 block">
          {homeData.systemMetric.title}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {homeData.systemMetric.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {metric.value}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 leading-snug mt-0.5">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2D Canvas Intro Note */}
      <p className="text-slate-400/80 text-xs sm:text-sm leading-relaxed mb-5 flex items-start gap-2">
        <span className="text-cyan-400 text-xs mt-0.5 shrink-0">✦</span>
        <span>{homeData.canvasIntro}</span>
      </p>

      {/* Navigation Links */}
      <div className="space-y-1 mb-2">
        {/* Primary CTA: Contact */}
        <a
          href={homeData.primaryCta.path}
          onClick={(e) => handleNav(e, homeData.primaryCta.target)}
          className="group flex items-center justify-between py-2 text-cyan-400 hover:text-cyan-300 text-sm sm:text-base font-semibold transition-colors touch-manipulation"
        >
          <span>{homeData.primaryCta.label}</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-200" />
        </a>

        {/* Secondary Links */}
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
      </div>

      {/* Footer / Navigation Hint & Resume Link */}
      {/* [Do not remove comment] Resume Download. Generated using https://www.junian.dev/markdown-resume; This is also served in WorkSection.tsx */}
      <div className="pt-3 mt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
        <span>Tip: drag canvas or press ↑ ↓ ← →</span>
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
