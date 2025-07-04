import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, searchPosts } from '../data/blogPosts';
import { trackBlogImpression, trackBlogClick, trackSearchQuery } from '../utils/analytics';

const BlogCard = ({ post, onImpression }) => {
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedImpression) {
          onImpression(post.id, post.title);
          setHasTrackedImpression(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [post.id, post.title, onImpression, hasTrackedImpression]);

  const handleCardClick = () => {
    if (post.externalLink) {
      trackBlogClick(post.id, post.title, true);
      window.open(post.externalLink, '_blank', 'noopener,noreferrer');
    } else {
      trackBlogClick(post.id, post.title, false);
    }
  };

  return (
    <article 
      ref={cardRef}
      className="group bg-slate-800/50 rounded-xl p-8 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-[1.02]"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center text-sm text-amber-400 mb-3">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
            {post.tags && (
              <>
                <span className="mx-2">•</span>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-amber-400/20 text-amber-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
            {post.title}
          </h2>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleCardClick}
              className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors group"
            >
              {post.externalLink ? 'Read on Medium' : 'Read Full Story'}
              <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            {post.externalLink && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                External link
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        <div className="md:w-48 h-32 md:h-auto bg-gradient-to-br from-amber-400/20 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          {post.previewImage ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-700 animate-pulse flex items-center justify-center">
                  <span className="text-2xl opacity-50">📝</span>
                </div>
              )}
              <img
                src={post.previewImage}
                alt={post.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
              />
            </>
          ) : (
            <span className="text-4xl opacity-50">📝</span>
          )}
        </div>
      </div>
    </article>
  );
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const posts = getBlogPosts();
    setBlogPosts(posts);
    setFilteredPosts(posts);
  }, []);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      if (searchTerm.trim()) {
        const filtered = searchPosts(searchTerm);
        setFilteredPosts(filtered);
        trackSearchQuery(searchTerm, filtered.length, 'blog');
      } else {
        setFilteredPosts(blogPosts);
      }
    }, 500);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm, blogPosts]);

  const handleBlogImpression = (postId, title) => {
    trackBlogImpression(postId, title);
  };

  // Set page title for SEO
  useEffect(() => {
    document.title = 'Blog - Saurabh Deshmukh';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Read about backend development, photography, and digital storytelling adventures.'
    );
  }, []);

  return (
    <div className="bg-slate-900 text-white min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
            Stories & Thoughts
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Adventures in code, creativity, and everything that sparks my curiosity
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-4xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                {searchTerm ? `No posts found for "${searchTerm}"` : 'No posts available yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  onImpression={handleBlogImpression}
                />
              ))}
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-2xl mx-auto mt-16 text-center bg-gradient-to-r from-slate-800/50 to-amber-400/10 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-amber-400">Stay Updated</h3>
          <p className="text-slate-300 mb-6">
            Get notified when I publish new stories about development, photography, and creative adventures.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;