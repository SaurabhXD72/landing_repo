// Blog posts data - centralized content management
// AI-friendly: Easy to extend by adding new objects to the array

export const BLOG_POSTS = [
  {
    id: 'lazy-devs-portfolio-playbook',
    title: 'The Lazy Dev\'s Portfolio Playbook',
    excerpt: 'I built this portfolio system so I never have to touch the code again. One data file update = entire site refresh. This is how you build a portfolio that scales with your laziness.',
    externalLink: 'https://medium.com/@iamsaurabh/the-lazy-devs-portfolio-playbook-1a2b3c',
    content: `
      <h2>The Problem: Portfolio Maintenance Hell</h2>
      <p>You know the drill. You build a beautiful portfolio, then spend months avoiding updates because touching the code feels like performing surgery. What if I told you there's a better way?</p>
      
      <blockquote>
        "The best portfolio is the one you actually update."
      </blockquote>
      
      <h3>The Solution: Data-Driven Everything</h3>
      <p>I built this portfolio with one rule: <strong>never touch the UI code again</strong>. Everything lives in data files:</p>
      
      <ul>
        <li><code>blogPosts.js</code> - All blog content and metadata</li>
        <li><code>photography.js</code> - Gallery photos with EXIF data</li>
        <li><code>siteConfig.js</code> - Portfolio text, SEO, contact info</li>
      </ul>
      
      <h3>The Magic: AI-Powered Updates</h3>
      <p>Here's where it gets interesting. I can now tell an AI:</p>
      
      <div class="bg-gray-100 p-4 rounded-lg">
        <p><em>"Here's my new blog post about React performance. Generate the JSON object for blogPosts.js"</em></p>
      </div>
      
      <p>The AI spits out a perfect object. I paste it. Done. No code changes, no UI adjustments, no mental overhead.</p>
      
      <h3>Technical Implementation</h3>
      <p>The architecture is beautifully simple:</p>
      
      <ul>
        <li><strong>External Links:</strong> Blog cards detect <code>externalLink</code> and open in new tab</li>
        <li><strong>Analytics:</strong> Every click, impression, and view is tracked automatically</li>
        <li><strong>Asset Management:</strong> Organized folder structure for images and thumbnails</li>
        <li><strong>Responsive Design:</strong> Masonry layouts and lazy loading built-in</li>
      </ul>
      
      <h3>The Lazy Dev's Checklist</h3>
      <p>Want to build your own maintenance-free portfolio? Here's your roadmap:</p>
      
      <ol>
        <li>Separate data from presentation (data files vs. components)</li>
        <li>Make everything configurable (no hardcoded strings)</li>
        <li>Add comprehensive analytics (know what's working)</li>
        <li>Build asset management (organized file structure)</li>
        <li>Test with AI prompts (make sure it's actually maintainable)</li>
      </ol>
      
      <h3>Real-World Results</h3>
      <p>Since implementing this system:</p>
      
      <ul>
        <li>Portfolio updates take 2 minutes instead of 2 hours</li>
        <li>I actually update my content regularly</li>
        <li>Analytics show 40% more engagement</li>
        <li>Zero technical debt accumulation</li>
      </ul>
      
      <h3>The Future: Full AI Integration</h3>
      <p>Next phase: Connect this to a CMS or AI assistant that can:</p>
      
      <ul>
        <li>Auto-generate blog metadata from content</li>
        <li>Optimize images and create thumbnails</li>
        <li>Suggest content based on analytics</li>
        <li>Handle SEO optimization automatically</li>
      </ul>
      
      <h3>Get Started Today</h3>
      <p>Stop building portfolios. Start building portfolio <em>systems</em>. Your future self will thank you.</p>
      
      <p>The code for this entire system is available in my GitHub. Clone it, customize it, and never touch your portfolio code again.</p>
      
      <p><em>What's your biggest portfolio maintenance pain point? Let me know in the comments!</em></p>
    `,
    date: '2025-01-15',
    tags: ['Development', 'Portfolio', 'Productivity', 'AI'],
    author: 'Saurabh Deshmukh',
    readTime: '8 min',
    featuredImage: '/images/blog/lazy-genius.jpg',
    previewImage: '/images/blog/lazy-genius-preview.jpg'
  }
];

// Utility functions for blog management
export const getBlogPosts = () => {
  return BLOG_POSTS.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getBlogPostById = (id) => {
  return BLOG_POSTS.find(post => post.id === id);
};

export const getRelatedPosts = (currentId, limit = 3) => {
  const currentPost = getBlogPostById(currentId);
  if (!currentPost) return [];
  
  return BLOG_POSTS
    .filter(post => post.id !== currentId)
    .filter(post => {
      const commonTags = post.tags?.filter(tag => 
        currentPost.tags?.includes(tag)
      ) || [];
      return commonTags.length > 0;
    })
    .slice(0, limit);
};

export const searchPosts = (query) => {
  const searchTerm = query.toLowerCase();
  return BLOG_POSTS.filter(post =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};

export const getPostsByTag = (tag) => {
  return BLOG_POSTS.filter(post => 
    post.tags && post.tags.includes(tag)
  );
};

export const getAllTags = () => {
  const allTags = BLOG_POSTS.reduce((tags, post) => {
    if (post.tags) {
      tags.push(...post.tags);
    }
    return tags;
  }, []);
  
  return [...new Set(allTags)].sort();
};

export const generatePostMeta = (post) => {
  return {
    title: `${post.title} - Saurabh Deshmukh`,
    description: post.excerpt,
    keywords: post.tags?.join(', ') || '',
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogType: 'article',
    articleAuthor: post.author,
    articlePublishedTime: post.date,
    articleTags: post.tags
  };
};