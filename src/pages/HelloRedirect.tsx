import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { useUmamiTracking } from '@/hooks/useUmamiTracking';
import { Loader2, ArrowRight } from 'lucide-react';

const HelloRedirect: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trackCardScan } = useUmamiTracking();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const src = searchParams.get('src') || 'c1';

    // Track card scan event in Umami analytics
    trackCardScan(src, 'contact');

    // Persist referral source across browser session
    try {
      sessionStorage.setItem('referral_source', src);
      sessionStorage.setItem('referral_timestamp', Date.now().toString());
    } catch {
      // Ignore storage errors in restricted private browsing
    }

    // Display welcome toast confirmation
    toast.info('Thanks for scanning my card! Shoot me a message, I am eager to hear from you.', {
      id: 'card-welcome',
      duration: 4000,
    });

    // Seamlessly navigate to contact while preserving query parameters
    navigate(
      {
        pathname: '/contact',
        search: location.search,
      },
      { replace: true }
    );
  }, [location.search, navigate, trackCardScan]);

  const targetUrl = `/contact${location.search}`;

  return (
    <div className="min-h-screen w-full bg-[#070b14] flex items-center justify-center p-4 text-slate-200">
      <Helmet>
        <title>Connect with Yash Yadav | Contact & Socials · OhYa.sh</title>
        <meta
          name="description"
          content="Get in touch with Yash Yadav. Connect via email, Telegram, or LinkedIn for backend engineering consulting, advisory, or collaboration opportunities."
        />
        <meta property="og:title" content="Connect with Yash Yadav | Contact & Socials · OhYa.sh" />
        <meta
          property="og:description"
          content="Get in touch with Yash Yadav. Connect via email, Telegram, or LinkedIn for backend engineering consulting, advisory, or collaboration opportunities."
        />
        <meta name="twitter:title" content="Connect with Yash Yadav | Contact & Socials · OhYa.sh" />
        <meta
          name="twitter:description"
          content="Get in touch with Yash Yadav. Connect via email, Telegram, or LinkedIn for backend engineering consulting, advisory, or collaboration opportunities."
        />
        <link rel="canonical" href="https://ohya.sh/contact" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="w-full max-w-md bg-[#0d1322]/95 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          Redirecting to Contact...
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Thanks for scanning my card! Taking you directly to my contact channels and socials.
        </p>

        <a
          href={targetUrl}
          className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
        >
          <span>Click here if not redirected automatically</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default HelloRedirect;
