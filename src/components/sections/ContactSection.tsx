
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Mail, MapPin, Github, Linkedin, MessageCircle, Twitter, Instagram } from 'lucide-react';
import { handleCopyUrl } from '@/utils/urlUtils';

interface ContactSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
}) => {
  const [emailRevealed, setEmailRevealed] = useState(false);
  
  const revealEmail = () => {
    setEmailRevealed(true);
  };

  const handleEmailClick = () => {
    if (emailRevealed) {
      const email = atob("eWFzaHlhZGF2LjcxMEBvdXRsb29rLmNvbQ==");
      window.location.href = `mailto:${email}`;
    } else {
      revealEmail();
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: emailRevealed ? atob("eWFzaHlhZGF2LjcxMEBvdXRsb29rLmNvbQ==") : "Click to reveal",
      action: handleEmailClick,
      description: "Email me for the real stuff.",
      isBlurred: !emailRevealed
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Telegram",
      value: "@OhYash",
      action: () => window.open("https://t.me/OhYash", '_blank'),
      description: "Telegram for everything else."
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      username: "ohyash",
      url: "https://github.com/ohyash"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      username: "ohyash",
      url: "https://linkedin.com/in/ohyash"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      username: "@OhY4sh",
      url: "https://twitter.com/OhY4sh"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      username: "@OhY4sh",
      url: "https://instagram.com/OhY4sh"
    }
  ];

  return (
    <Card className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}>
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
          <p className="text-slate-700 text-sm sm:text-base mb-4">
            {subtitle}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contact Methods */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 text-center">Get In Touch</h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                onClick={method.action}
                className="block bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="text-slate-700 group-hover:text-slate-900 transition-colors">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-slate-900">{method.label}</h3>
                        <div className="relative">
                          <p className={`text-slate-700 text-sm ${method.isBlurred ? 'filter blur-sm select-none' : ''}`}>
                            {method.value}
                          </p>
                          {method.isBlurred && (
                            <div className="absolute inset-0 flex items-center justify-start">
                              <span className="text-xs font-medium text-slate-900">
                                Click to reveal
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs mt-1">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 text-center">Social & Professional</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 hover:border-slate-400/50 transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-slate-700 group-hover:text-slate-900 transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{social.label}</h3>
                    <p className="text-slate-600 text-sm">{social.username}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">Location</h3>
          </div>
          <p className="text-slate-700 text-sm">
            Based in Rajasthan, India
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Available for remote work worldwide
          </p>
        </div>

        <p className="text-slate-600 text-sm text-center pt-2">
          If any of this resonated, write.
        </p>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
