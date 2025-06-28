
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, MapPin, Github, Linkedin, MessageCircle, Twitter, Instagram } from 'lucide-react';

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
    const email = atob("eWFzaHlhZGF2LjcxMEBvdXRsb29rLmNvbQ==");
    setEmailRevealed(true);
    // Also navigate to mailto
    window.location.href = `mailto:${email}`;
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: emailRevealed ? atob("eWFzaHlhZGF2LjcxMEBvdXRsb29rLmNvbQ==") : "Click to reveal",
      action: revealEmail,
      description: "Best for professional inquiries",
      isBlurred: !emailRevealed
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Telegram",
      value: "@OhYash",
      action: "https://t.me/OhYash",
      description: "Quick messages and calls"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      username: "@yourusername",
      url: "https://github.com/yourusername"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      username: "Your Name",
      url: "https://linkedin.com/in/yourprofile"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      username: "@yourusername",
      url: "https://twitter.com/yourusername"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      username: "@yourusername",
      url: "https://instagram.com/yourusername"
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
          <div className="text-2xl sm:text-3xl">{icon}</div>
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
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face" 
              alt="Contact profile" 
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mx-auto mb-2"
            />
            <p className="text-xs text-slate-600 text-center">Ready to connect!</p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 text-center">Get In Touch</h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                onClick={typeof method.action === 'function' ? method.action : () => window.open(method.action, '_blank')}
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
                        <p className={`text-slate-700 text-sm ${method.isBlurred ? 'filter blur-sm relative' : ''}`}>
                          {method.value}
                          {method.isBlurred && (
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-900 bg-white/80 rounded">
                              reveal
                            </span>
                          )}
                        </p>
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
            Based in San Francisco, CA
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Available for remote work worldwide
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-white/80 rounded-xl p-4 border border-slate-300/50">
          <p className="text-slate-700 text-sm italic text-center leading-relaxed">
            "I'm always excited to connect with like-minded people. Whether it's about work, travel, or just sharing stories - don't hesitate to reach out!"
          </p>
        </div>

        <div className="text-center pt-3">
          <Badge variant="secondary" className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-4 py-2">
            Let's build something amazing together
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
