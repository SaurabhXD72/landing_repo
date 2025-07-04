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
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors group"
        >
          <svg className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center text-sm text-amber-400 mb-4">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
            {post.tags && (
              <>
                <span className="mx-2">•</span>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Post Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Share */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-3 text-amber-400">Share this post</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg mr-4">
                SD
              </div>
              <div>
                <p className="font-semibold">Saurabh Deshmukh</p>
                <p className="text-sm text-slate-400">Backend Developer & Digital Storyteller</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Related Posts CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-slate-800/50 to-amber-400/10 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-amber-400">Enjoyed this story?</h3>
          <p className="text-slate-300 mb-6">
            Check out more posts about development, photography, and creative adventures.
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
          >
            Read More Stories
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;