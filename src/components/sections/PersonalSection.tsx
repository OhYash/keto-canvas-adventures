import React from 'react';
import { User, MapPin, Camera, Heart, Mail, Cat, Palette, Languages } from 'lucide-react';
import SectionCard from '@/components/canvas/SectionCard';
import { personalCategories, profileImage } from '@/data/personalData';

interface PersonalSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onNavigateHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const PersonalSection: React.FC<PersonalSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  onNavigateHome,
  onNavigateToSection,
}) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigateToSection?.(sectionId);
  };

  const renderIcon = (type: 'user' | 'heart' | 'languages') => {
    switch (type) {
      case 'user':
        return <User className="w-4 h-4" />;
      case 'heart':
        return <Heart className="w-4 h-4" />;
      case 'languages':
        return <Languages className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <SectionCard
      gradient={gradient}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
    >
      {/* Profile Image Section */}
      <div className="flex justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
          <img
            src={profileImage.src}
            alt={profileImage.alt}
            width={profileImage.width}
            height={profileImage.height}
            loading="lazy"
            className="w-28 h-40 sm:w-32 sm:h-48 object-cover rounded-lg mx-auto"
          />
        </div>
      </div>

      {/* Personal Facts */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <User className="w-5 h-5 text-slate-800" />
          <h3 className="text-lg font-bold text-slate-900">About Me</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {personalCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-slate-700">{renderIcon(category.iconType)}</div>
                <h4 className="text-base font-bold text-slate-900">{category.title}</h4>
              </div>
              <div className="space-y-1.5">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center">
                    <span className="text-slate-700 text-sm">{item.label}</span>
                    <span className="text-slate-600 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Adventures */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">Travel Adventures</h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          Explore my journey around the world through stories and photos from various destinations.
        </p>
        <a
          href="/travel"
          onClick={(e) => handleNav(e, 'travel')}
          className="w-full px-4 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-emerald-400/30 block text-center"
        >
          <Camera className="w-4 h-4" />
          View Travel Stories
        </a>
      </div>

      {/* Meet Keto */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Cat className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">Meet Keto</h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          The furry companion who keeps me company. Come say hi!
        </p>
        <a
          href="/keto"
          onClick={(e) => handleNav(e, 'keto')}
          className="w-full px-4 py-2.5 bg-orange-500/20 hover:bg-orange-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-orange-400/30 block text-center"
        >
          <Cat className="w-4 h-4" />
          Meet Keto
        </a>
      </div>

      {/* Hobbies */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Palette className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">Hobbies & Interests</h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          What I do when I'm not working. From tech tinkering to outdoor adventures.
        </p>
        <a
          href="/hobbies"
          onClick={(e) => handleNav(e, 'hobbies')}
          className="w-full px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-purple-400/30 block text-center"
        >
          <Palette className="w-4 h-4" />
          View Hobbies
        </a>
      </div>

      {/* Contact Me */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Mail className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">Get In Touch</h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-3">
          Want to connect? Find all my contact information and social links in one place.
        </p>
        <a
          href="/contact"
          onClick={(e) => handleNav(e, 'contact')}
          className="w-full px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-slate-800 rounded-lg transition-all duration-300 text-sm font-semibold touch-manipulation flex items-center justify-center gap-2 border border-indigo-400/30 block text-center"
        >
          <Mail className="w-4 h-4" />
          Contact Me
        </a>
      </div>
    </SectionCard>
  );
};

export default PersonalSection;
