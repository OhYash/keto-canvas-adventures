import React, { forwardRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { handleCopyUrl } from '@/utils/urlUtils';

export interface SectionCardProps {
  gradient: string;
  icon?: string | React.ReactNode;
  title: string;
  subtitle?: string;
  isActive?: boolean;
  onNavigateHome?: () => void;
  leftAction?: React.ReactNode;
  customHeader?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const SectionCard = forwardRef<HTMLDivElement, SectionCardProps>(
  (
    {
      gradient,
      icon,
      title,
      subtitle,
      isActive = false,
      onNavigateHome,
      leftAction,
      customHeader,
      className = '',
      contentClassName = 'space-y-5',
      children,
    },
    ref
  ) => {
    const HeadingTag = isActive ? 'h1' : 'h2';

    return (
      <Card
        ref={ref}
        className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50 shadow-xl custom-scrollbar cursor-default ${className}`}
      >
        <CardHeader className="pb-4">
          {customHeader ? (
            customHeader
          ) : (
            <>
              {/* Top Navigation & Share Link */}
              <div className="flex items-center justify-between mb-4">
                {leftAction ? (
                  leftAction
                ) : (
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateHome?.();
                    }}
                    className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors bg-white/80 hover:bg-white/90 px-3 py-2 rounded-lg text-sm font-medium shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Home
                  </a>
                )}

                {icon && (
                  <button
                    onClick={handleCopyUrl}
                    className="text-2xl sm:text-3xl hover:scale-110 transition-transform duration-200 cursor-pointer"
                    title="Copy page link"
                  >
                    {typeof icon === 'string' ? icon : icon}
                  </button>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="text-center">
                <HeadingTag className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {title}
                </HeadingTag>
                {subtitle && (
                  <p className="text-slate-700 text-sm sm:text-base mb-4">
                    {subtitle}
                  </p>
                )}
              </div>
            </>
          )}
        </CardHeader>

        <CardContent className={contentClassName}>{children}</CardContent>
      </Card>
    );
  }
);

SectionCard.displayName = 'SectionCard';

export default SectionCard;
