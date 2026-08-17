import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import SectionCard from '@/components/canvas/SectionCard';
import { contactData } from '@/data/contactData';

const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ContactSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  isActive?: boolean;
  onNavigateHome: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  isActive = false,
  onNavigateHome,
}) => {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const getEmail = () => atob(contactData.primaryContact.encodedEmail);

  const handleRevealEmail = () => {
    setEmailRevealed(true);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    const email = getEmail();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionCard
      gradient={gradient}
      icon={icon}
      title={title}
      subtitle={subtitle}
      isActive={isActive}
      onNavigateHome={onNavigateHome}
      className="md:w-[680px] max-w-[680px]"
      contentClassName="space-y-6"
    >
      {/* 1. PRIMARY CONTACT */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase px-1">
          Primary Contact
        </h3>
        <div
          onClick={!emailRevealed ? handleRevealEmail : undefined}
          className={`bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/60 shadow-sm transition-all duration-200 hover:shadow-md ${
            !emailRevealed ? 'cursor-pointer group hover:border-slate-300' : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                {contactData.primaryContact.label}
              </h4>
              {emailRevealed ? (
                <p className="text-slate-800 text-sm font-medium font-mono select-all mt-0.5">
                  {getEmail()}
                </p>
              ) : (
                <p className="text-slate-400 text-sm font-medium transition-colors group-hover:text-indigo-600 mt-0.5">
                  Click to reveal
                </p>
              )}
            </div>

            {emailRevealed && (
              <div className="flex items-center gap-2 mt-1 sm:mt-0">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium transition-colors cursor-pointer border border-indigo-200/60"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <a
                  href={`mailto:${getEmail()}`}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium transition-colors border border-slate-200/60"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>
              </div>
            )}
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 pt-2 border-t border-slate-100">
            {contactData.primaryContact.description}
          </p>
        </div>
      </div>

      {/* 2. PROFESSIONAL */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase px-1">
          Professional
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contactData.professional.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-indigo-200/80 transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors inline-flex items-center gap-1">
                    {item.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                  </h4>
                  <p className="text-slate-500 text-sm mt-0.5">{item.username}</p>
                </div>
                <div className="text-slate-600 group-hover:text-indigo-600 transition-colors p-2 bg-slate-100 rounded-xl group-hover:bg-indigo-50">
                  {item.label === 'GitHub' ? (
                    <Github className="w-5 h-5" />
                  ) : (
                    <Linkedin className="w-5 h-5" />
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Location Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/60 shadow-sm flex items-start gap-3">
          <div className="p-2.5 bg-red-50 text-red-500 rounded-xl mt-0.5 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">
              {contactData.location.title}
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
              {contactData.location.description}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-slate-300/60 my-4" />

      {/* 3. ALSO HERE */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase px-1">
          Also Here
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm px-1 leading-relaxed">
          {contactData.alsoHere.description}
        </p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {contactData.alsoHere.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white backdrop-blur-sm text-slate-800 hover:text-indigo-600 border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:-translate-y-0.5"
            >
              {link.label === 'Telegram' && (
                <TelegramIcon className="w-4 h-4 text-[#229ED9] group-hover:scale-110 transition-transform" />
              )}
              {link.label.startsWith('X') && (
                <XIcon className="w-3.5 h-3.5 text-slate-900 group-hover:scale-110 transition-transform" />
              )}
              {link.label === 'Instagram' && (
                <Instagram className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
              )}
              <span>
                {link.label} {link.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default ContactSection;
