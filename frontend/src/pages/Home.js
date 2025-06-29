import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../utils/blogUtils';

const Home = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const blogRef = useRef(null);
  const photosRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Parallax effect for hero section
      if (heroRef.current) {
        const translateY = scrollY * 0.5;
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }

      // Parallax effect for other sections
      [aboutRef, blogRef, photosRef].forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            const translateY = (scrollY - (window.innerHeight * (index + 1))) * 0.2;
            ref.current.style.transform = `translateY(${translateY}px)`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blogPosts = getBlogPosts().slice(0, 3); // Get latest 3 posts
  
  const photoPlaceholders = [
    'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
    'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGV8ZW58MHx8fHwxNzUxMjI4MzU4fDA&ixlib=rb-4.0.3&q=85',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxsYW5kc2NhcGV8ZW58MHx8fHwxNzUxMjI4MzU4fDA&ixlib=rb-4.0.3&q=85',
    'https://images.pexels.com/photos/32770300/pexels-photo-32770300.jpeg',
    'https://images.pexels.com/photos/32769142/pexels-photo-32769142.jpeg'
  ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"></div>
        </div>

        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
            Saurabh Deshmukh
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
            Backend Developer. Digital Storyteller. Pixel Chaser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="px-8 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-all duration-200 transform hover:scale-105"
            >
              Read My Stories
            </Link>
            <Link
              to="/photography"
              className="px-8 py-3 border-2 border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-all duration-200 transform hover:scale-105"
            >
              View Photography
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center text-amber-400">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I'm a MERN-stack backend-heavy developer who occasionally flirts with photography, 
                builds things that solve problems, and writes when the code stops compiling.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Currently experimenting with tech, travel, and telling better stories—both in code and beyond.
              </p>
              <div className="mt-8 flex space-x-4">
                <span className="px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-medium">
                  Backend Development
                </span>
                <span className="px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-medium">
                  Photography
                </span>
                <span className="px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-medium">
                  Storytelling
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/4549411/pexels-photo-4549411.jpeg"
                  alt="Developer workspace"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400/20 rounded-lg blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section ref={blogRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-amber-400">Latest Stories</h2>
            <p className="text-slate-300 text-lg">Thoughts on code, creativity, and everything in between</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <article key={post.slug} className="group">
                <div className="bg-slate-800/50 rounded-lg overflow-hidden hover:bg-slate-800/70 transition-all duration-300 transform group-hover:scale-105">
                  <div className="h-48 bg-gradient-to-br from-amber-400/20 to-slate-700 flex items-center justify-center">
                    <span className="text-6xl opacity-50">📝</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-amber-400 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="px-8 py-3 border-2 border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-all duration-200 transform hover:scale-105"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Photography Preview Section */}
      <section ref={photosRef} className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-amber-400">Through My Lens</h2>
            <p className="text-slate-300 text-lg">Capturing moments, chasing light</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {photoPlaceholders.map((photo, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={photo}
                  alt={`Photography ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/photography"
              className="px-8 py-3 border-2 border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-all duration-200 transform hover:scale-105"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-amber-400">Let's Build Something Together</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Have an idea? Want to collaborate? Or just want to say hello? I'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-all duration-200 transform hover:scale-105"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;