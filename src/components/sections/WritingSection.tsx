import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Search,
  BookOpen,
  Video,
  ArrowRight,
} from 'lucide-react';
import { handleCopyUrl } from '@/utils/urlUtils';
import { BLOG_POSTS, getAllTags } from '@/data/blogData';

interface WritingSectionProps {
  gradient: string;
  icon: string;
  title: string;
  subtitle: string;
  onNavigateHome: () => void;
  onSelectArticle: (slug: string) => void;
}

const WritingSection: React.FC<WritingSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  onNavigateHome,
  onSelectArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => getAllTags(), []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <Card
      className={`w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto ${gradient} backdrop-blur-sm border-slate-600/50`}
    >
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
          <p className="text-slate-700 text-sm sm:text-base mb-4">{subtitle}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Search & Tag Filter Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-300/50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search essays or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100/90 text-slate-800 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge
              variant={selectedTag === null ? 'default' : 'outline'}
              onClick={() => setSelectedTag(null)}
              className="cursor-pointer text-xs transition-colors"
            >
              All Topics
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className="cursor-pointer text-xs transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.slug}
                onClick={() => onSelectArticle(post.slug)}
                className="group bg-white/90 hover:bg-white backdrop-blur-sm rounded-xl p-5 border border-slate-300/50 hover:border-blue-400/60 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {post.videoUrl && (
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-[10px] px-2 py-0.5 flex items-center gap-1 border border-indigo-200"
                    >
                      <Video className="w-3 h-3" />
                      Video Included
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between gap-2">
                    <span>{post.title}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                  </h3>
                  <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium border border-slate-200"
                    >
                      <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/80 rounded-xl p-8 text-center text-slate-600 border border-slate-300/50">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
              <p className="text-sm font-medium">No essays found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                className="mt-3 text-xs text-blue-600 hover:underline font-semibold"
              >
                Clear search filters
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WritingSection;
