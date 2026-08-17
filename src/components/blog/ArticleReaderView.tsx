import React, { useEffect, useState, useRef } from 'react';
import { BlogPost, BLOG_POSTS } from '@/data/blogData';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Check, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { handleCopyUrl } from '@/utils/urlUtils';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

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

  // Helper to parse inline markdown (bold, italic, code, links)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
    const parts = text.split(pattern);

    return parts.map((part, i) => {
      if (!part) return null;

      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-slate-800/90 text-indigo-300 font-mono text-xs sm:text-sm border border-slate-700/60"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-100">
            {parseInlineMarkdown(part.slice(2, -2))}
          </strong>
        );
      }

      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-slate-200">
            {part.slice(1, -1)}
          </em>
        );
      }

      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-medium transition-colors"
          >
            {parseInlineMarkdown(linkText)}
          </a>
        );
      }

      return part;
    });
  };

  // Convert raw markdown string to structured rendered elements cleanly
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    // Helper to split a table row line into trimmed cells
    const parseTableRow = (rowLine: string): string[] => {
      let trimmed = rowLine.trim();
      if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
      if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);
      return trimmed.split('|').map((cell) => cell.trim());
    };

    // Helper to check if a line is a markdown table delimiter row (e.g., | :--- | :--- |)
    const isTableDelimiterRow = (lineStr: string): boolean => {
      const trimmed = lineStr.trim();
      if (!trimmed.includes('|')) return false;
      const cells = parseTableRow(trimmed);
      return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell));
    };

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.trim().startsWith('```')) {
        const codeLang = line.trim().slice(3).toLowerCase();
        const codeContent: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeContent.push(lines[i]);
          i++;
        }
        // Skip closing ``` line
        if (i < lines.length) i++;

        const rawCode = codeContent.join('\n');
        let highlightedHtml = '';
        try {
          if (codeLang && hljs.getLanguage(codeLang)) {
            highlightedHtml = hljs.highlight(rawCode, { language: codeLang }).value;
          } else {
            highlightedHtml = hljs.highlightAuto(rawCode).value;
          }
        } catch {
          highlightedHtml = rawCode;
        }

        elements.push(
          <div key={`code-${i}`} className="relative my-6 group">
            {codeLang && (
              <div className="absolute top-2 right-2 px-2.5 py-1 bg-slate-900/90 text-slate-400 text-xs font-mono rounded-md border border-slate-800 select-none uppercase tracking-wider">
                {codeLang}
              </div>
            )}
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl overflow-x-auto border border-slate-800/80 text-sm font-mono leading-relaxed shadow-xl">
              <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            </pre>
          </div>
        );
        continue;
      }

      // Check for Table: header row followed by delimiter row
      if (
        line.trim().includes('|') &&
        i + 1 < lines.length &&
        isTableDelimiterRow(lines[i + 1])
      ) {
        const headerCells = parseTableRow(line);
        const delimiterCells = parseTableRow(lines[i + 1]);

        // Determine column alignments
        const alignments = delimiterCells.map((cell) => {
          if (cell.startsWith(':') && cell.endsWith(':')) return 'text-center';
          if (cell.endsWith(':')) return 'text-right';
          return 'text-left';
        });

        // Skip header & delimiter lines
        const tableStartIndex = i;
        i += 2;

        // Collect body rows
        const rows: string[][] = [];
        while (i < lines.length && lines[i].trim().includes('|') && lines[i].trim().length > 0) {
          rows.push(parseTableRow(lines[i]));
          i++;
        }

        elements.push(
          <div key={`table-${tableStartIndex}`} className="my-6 w-full overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-800/80 text-xs uppercase tracking-wider text-slate-200 border-b border-slate-700/80">
                <tr>
                  {headerCells.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      className={`px-4 py-3 font-semibold ${alignments[hIdx] || 'text-left'}`}
                    >
                      {parseInlineMarkdown(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-4 py-3 text-slate-300 ${alignments[cIdx] || 'text-left'}`}
                      >
                        {parseInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Images: ![alt](url)
      const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        const [, altText, imgSrc] = imgMatch;
        elements.push(
          <figure key={`img-${i}`} className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl p-2">
            <img
              src={imgSrc}
              alt={altText}
              className="w-full h-auto rounded-xl object-cover"
              loading="lazy"
            />
            {altText && (
              <figcaption className="text-center text-xs text-slate-400 mt-2.5 mb-1 italic">
                {altText}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-indigo-500/80 bg-indigo-500/5 px-4 py-3 rounded-r-lg my-4 text-slate-300 italic text-base">
            {parseInlineMarkdown(line.slice(2))}
          </blockquote>
        );
        i++;
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        const headingText = line.slice(2).trim();
        if (headingText.toLowerCase() === post.title.toLowerCase()) {
          i++;
          continue;
        }
        elements.push(
          <h1 key={i} className="text-3xl sm:text-4xl font-bold text-slate-100 mt-8 mb-4 tracking-tight leading-tight">
            {parseInlineMarkdown(headingText)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl sm:text-3xl font-semibold text-slate-200 mt-8 mb-4 tracking-tight">
            {parseInlineMarkdown(line.slice(3))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl sm:text-2xl font-semibold text-slate-300 mt-6 mb-3">
            {parseInlineMarkdown(line.slice(4))}
          </h3>
        );
      } else if (line.startsWith('---')) {
        elements.push(<hr key={i} className="my-8 border-slate-700/60" />);
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="ml-6 list-disc text-slate-300 my-1 leading-relaxed">
            {parseInlineMarkdown(line.slice(2))}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        const itemText = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={i} className="ml-6 list-decimal text-slate-300 my-1 leading-relaxed">
            {parseInlineMarkdown(itemText)}
          </li>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={i} className="text-slate-300 my-4 text-base sm:text-lg leading-relaxed font-normal">
            {parseInlineMarkdown(line)}
          </p>
        );
      }

      i++;
    }

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
