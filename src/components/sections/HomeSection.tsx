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
    <div className="w-[95vw] sm:w-[90vw] md:w-[520px] max-w-[520px] bg-[#0d1322]/95 backdrop-blur-md border border-slate-800/80 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-slate-200">
      {/* Header Tag / Badge */}
      <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase mb-3 block">
        {homeData.badge}
      </span>

      {/* Hero Headline */}
      <HeadingTag className="text-2xl sm:text-3xl md:text-[2rem] font-bold text-white tracking-tight leading-snug mb-3">
        {homeData.headline}
      </HeadingTag>

      {/* Hero Subtitle */}
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
        {homeData.subtitle}
      </p>

      {/* Highlight Systems / Metric Card */}
      <div className="bg-[#151d30]/90 border border-slate-800/90 rounded-xl p-4 sm:p-5 mb-6 shadow-inner">
        <span className="text-xs text-slate-400 font-medium mb-3 block">
          {homeData.systemMetric.title}
        </span>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
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

      {/* Primary CTA: Contact */}
      <a
        href={homeData.primaryCta.path}
        onClick={(e) => handleNav(e, homeData.primaryCta.target)}
        className="group flex items-center justify-between text-white hover:text-cyan-400 text-base sm:text-lg font-semibold py-1 transition-colors touch-manipulation"
      >
        <span>{homeData.primaryCta.label}</span>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200" />
      </a>

      {/* Divider */}
      <div className="border-t border-slate-800/80 my-3 sm:my-4" />

      {/* Secondary Navigation Links */}
      <div className="space-y-1 sm:space-y-2">
        {homeData.navigationLinks.map((link) => (
          <a
            key={link.target}
            href={link.path}
            onClick={(e) => handleNav(e, link.target)}
            className="group flex items-center justify-between py-2 text-slate-300 hover:text-white text-sm sm:text-base font-medium transition-colors touch-manipulation"
          >
            <span>{link.label}</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-1 transition-all duration-200" />
          </a>
        ))}
      </div>

      {/* Footer / Navigation Hint & Resume Link */}
      {/* [Do not remove comment] Resume Download. Generated using https://www.junian.dev/markdown-resume; This is also served in WorkSection.tsx */}
      <div className="pt-4 mt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
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
