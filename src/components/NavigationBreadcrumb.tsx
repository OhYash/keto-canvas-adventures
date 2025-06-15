
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

interface NavigationBreadcrumbProps {
  currentSection: string;
  navigationHistory: string[];
  onNavigate: (sectionId: string) => void;
  onNavigateHome: () => void;
}

const NavigationBreadcrumb: React.FC<NavigationBreadcrumbProps> = ({
  currentSection,
  navigationHistory,
  onNavigate,
  onNavigateHome,
}) => {
  const getSectionDisplayName = (sectionId: string) => {
    const sectionNames: Record<string, string> = {
      home: 'Home',
      work: 'Work Experience',
      personal: 'Personal Life',
      keto: 'Meet Keto',
      projects: 'Personal Projects',
    };
    return sectionNames[sectionId] || sectionId;
  };

  // Create breadcrumb path from navigation history
  const breadcrumbPath = [...new Set([...navigationHistory, currentSection])];

  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'home') {
      onNavigateHome();
    } else {
      onNavigate(sectionId);
    }
  };

  return (
    <div className="relative z-20 bg-slate-800/90 backdrop-blur-sm border-b border-slate-600/50 px-4 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbPath.map((sectionId, index) => (
            <React.Fragment key={sectionId}>
              <BreadcrumbItem>
                {index === breadcrumbPath.length - 1 ? (
                  <BreadcrumbPage className="text-white flex items-center gap-2">
                    {sectionId === 'home' && <Home className="w-4 h-4" />}
                    {getSectionDisplayName(sectionId)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    onClick={() => handleNavigation(sectionId)}
                    className="text-slate-300 hover:text-white cursor-pointer flex items-center gap-2 transition-colors"
                  >
                    {sectionId === 'home' && <Home className="w-4 h-4" />}
                    {getSectionDisplayName(sectionId)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbPath.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default NavigationBreadcrumb;
