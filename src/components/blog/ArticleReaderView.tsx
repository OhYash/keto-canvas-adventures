import React, { useEffect, useState, useRef } from 'react';
import { BlogPost, BLOG_POSTS } from '@/data/blogData';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Check, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { handleCopyUrl } from '@/utils/urlUtils';

interface ArticleReaderViewProps {
  post: BlogPost;
  onClose: () => void;
  onSelectPost: (slug: string) => void;
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({
  post,
  onClose,
  onSelectPost,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find index for prev/next navigation
  const currentIndex = BLOG_POSTS.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  // Track scroll progress inside reader container
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      const currentProgress = (target.scrollTop / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
    }
  };

  const handleShare = () => {
    handleCopyUrl();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Convert raw markdown string to structured rendered elements cleanly
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLang = '';

    lines.forEach((line, index) => {
      // Code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-slate-950 text-slate-100 p-4 rounded-xl overflow-x-auto my-6 border border-slate-800 text-sm font-mono leading-relaxed">
              <code>{codeContent.join('\n')}</code>
            </pre>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLang = line.trim().slice(3);
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl sm:text-4xl font-bold text-slate-100 mt-8 mb-4 tracking-tight leading-tight">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl sm:text-3xl font-semibold text-slate-200 mt-8 mb-4 tracking-tight">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl sm:text-2xl font-semibold text-slate-300 mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('---')) {
        elements.push(<hr key={index} className="my-8 border-slate-700/60" />);
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-6 list-disc text-slate-300 my-1 leading-relaxed">
            {line.slice(2)}
          </li>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={index} className="text-slate-300 my-4 text-base sm:text-lg leading-relaxed font-normal">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col animate-fade-in overflow-hidden">
      {/* Top Reading Progress Bar */}
      <div className="w-full bg-slate-800/40 h-1">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Navigation Bar */}
      <div className="w-full border-b border-slate-800/80 px-4 sm:px-8 py-3 flex items-center justify-between bg-slate-900/90 z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-slate-800/80 hover:bg-slate-700/80 px-3.5 py-1.5 rounded-lg text-sm font-medium border border-slate-700/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Writing</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-700/50 transition-colors"
            title="Share article"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Link' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Reader Body */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <article className="max-w-3xl mx-auto space-y-8">
          {/* Article Header Metadata */}
          <div className="space-y-4 border-b border-slate-800/80 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
              {post.summary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-slate-800/80 text-slate-300 hover:bg-slate-700 text-xs px-2.5 py-1 border border-slate-700/60"
                >
                  <Tag className="w-3 h-3 mr-1 opacity-70" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Optional Video Hero Section */}
          {post.videoUrl && (
            <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
                <Video className="w-4 h-4 text-indigo-400" />
                <span>Featured Video Header</span>
              </div>
              <div className="relative aspect-video w-full">
                <iframe
                  src={post.videoUrl}
                  title={post.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Article Markdown Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-300 space-y-4">
            {renderMarkdown(post.content)}
          </div>

          {/* Prev / Next Navigation Footer */}
          <div className="pt-12 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <button
                onClick={() => onSelectPost(prevPost.slug)}
                className="text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-1 group-hover:text-blue-400">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Essay</span>
                </div>
                <div className="font-semibold text-slate-200 text-sm line-clamp-1 group-hover:text-white">
                  {prevPost.title}
                </div>
              </button>
            ) : <div />}

            {nextPost ? (
              <button
                onClick={() => onSelectPost(nextPost.slug)}
                className="text-right p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-center justify-end gap-1 text-xs text-slate-400 mb-1 group-hover:text-blue-400">
                  <span>Next Essay</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="font-semibold text-slate-200 text-sm line-clamp-1 group-hover:text-white">
                  {nextPost.title}
                </div>
              </button>
            ) : <div />}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleReaderView;
