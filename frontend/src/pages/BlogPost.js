import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogPostById } from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      // Handle both slug and id for backwards compatibility
      const foundPost = getBlogPostById(slug);
      setPost(foundPost);
      setLoading(false);
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Saurabh Deshmukh`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', post.excerpt);
    }
  }, [post]);

  // If post has external link, redirect to it
  useEffect(() => {
    if (post?.externalLink) {
      window.location.href = post.externalLink;
    }
  }, [post]);

  if (loading) {
    return (
      <div className="bg-slate-900 text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // If post has external link, show redirect message
  if (post.externalLink) {
    return (
      <div className="bg-slate-900 text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting to External Post...</h1>
          <p className="text-slate-300 mb-6">
            You're being redirected to read "{post.title}" on an external platform.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href={post.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
            >
              Continue Reading
            </a>
            <Link
              to="/blog"
              className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen pt-20">
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back to Blog */}
        <Link
          to="/blog"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center text-sm text-amber-400 mb-4">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            {post.excerpt}
          </p>
          
          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg prose-invert prose-amber max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg mr-4">
                S
              </div>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-slate-400 text-sm">Full-Stack Developer & Digital Storyteller</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link
                to="/contact"
                className="px-4 py-2 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;