// Blog utilities for handling markdown posts
// Migration-friendly: Will work seamlessly with Next.js getStaticProps/getStaticPaths

// Sample blog posts data (in production, this would read from actual markdown files)
const blogPosts = [
  {
    slug: 'how-i-built-this',
    title: 'How I Built This Personal Website',
    excerpt: 'A deep dive into the architecture decisions, tech stack choices, and lessons learned while building this portfolio site. From React components to deployment strategies.',
    content: `
      <h2>The Journey Begins</h2>
      <p>Building a personal website is both exciting and daunting. You want something that represents you professionally while showcasing your personality. Here's how I approached it.</p>
      
      <h3>Tech Stack Decisions</h3>
      <p>After considering various options, I settled on:</p>
      <ul>
        <li><strong>Frontend:</strong> React with React Router for navigation</li>
        <li><strong>Styling:</strong> TailwindCSS for rapid, responsive design</li>
        <li><strong>Backend:</strong> FastAPI for minimal API endpoints</li>
        <li><strong>Content:</strong> Markdown files for blog posts (future Next.js ready)</li>
      </ul>
      
      <h3>Architecture Principles</h3>
      <p>I focused on creating a <em>migration-friendly</em> architecture:</p>
      <blockquote>
        "Build it modular, keep it simple, make it scalable."
      </blockquote>
      
      <p>Every component was designed with future Next.js migration in mind. Clean separation of concerns, environment-based configuration, and minimal backend coupling.</p>
      
      <h3>Design Philosophy</h3>
      <p>The visual design follows a dual-tone approach with slate and amber colors. I wanted something that felt:</p>
      <ul>
        <li>Professional yet approachable</li>
        <li>Clean without being sterile</li>
        <li>Modern with subtle animations</li>
      </ul>
      
      <h3>Performance Considerations</h3>
      <p>Key optimizations included:</p>
      <ul>
        <li>Lazy loading for images</li>
        <li>Smooth parallax effects without jank</li>
        <li>Mobile-first responsive design</li>
        <li>SEO optimization with proper meta tags</li>
      </ul>
      
      <h3>Lessons Learned</h3>
      <p>The most important lesson? <strong>Start with the user experience</strong>, then build the tech stack around it. Every technical decision should serve the goal of creating something valuable for visitors.</p>
      
      <p>Next up, I'll be adding more interactive features and possibly migrating to Next.js once it's supported on my hosting platform.</p>
      
      <p><em>What would you like to see next on this site? Let me know!</em></p>
    `,
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    tags: ['Development', 'React', 'Portfolio'],
    author: 'Saurabh Deshmukh'
  },
  {
    slug: 'weekend-roadtrip',
    title: 'Weekend Road Trip: Chasing Sunsets and Code Inspiration',
    excerpt: 'Sometimes the best debugging happens away from the screen. A spontaneous weekend trip that reminded me why stepping away from code can actually make you a better developer.',
    content: `
      <h2>The Spontaneous Decision</h2>
      <p>It was Friday evening, and I was stuck on a particularly nasty bug. The kind that makes you question your career choices. Instead of pulling another all-nighter, I made a decision that changed everything.</p>
      
      <p>"Pack light, drive far, think differently."</p>
      
      <h3>The Route</h3>
      <p>No GPS, no detailed plans. Just picked a direction and drove. Ended up discovering some incredible spots:</p>
      <ul>
        <li>A hidden lake perfect for morning coffee</li>
        <li>A mountain viewpoint that puts everything in perspective</li>
        <li>A small town diner with the best pie I've ever had</li>
      </ul>
      
      <h3>The Photography</h3>
      <p>Brought my camera and captured some of my favorite shots this year. There's something about natural light that makes you appreciate the beauty in simple compositions.</p>
      
      <blockquote>
        "The best camera is the one you have with you, but the best photos happen when you're not thinking about the technical stuff."
      </blockquote>
      
      <h3>The Breakthrough</h3>
      <p>Here's the funny part - on Sunday evening, during the drive back, the solution to Friday's bug just came to me. Clear as day. Sometimes you need to step away to see clearly.</p>
      
      <p>It wasn't just about the bug though. The whole trip reminded me why I love what I do:</p>
      <ul>
        <li>Problem-solving is everywhere, not just in code</li>
        <li>The best solutions often come from unexpected angles</li>
        <li>Balance isn't just important - it's essential</li>
      </ul>
      
      <h3>Lessons for Developers</h3>
      <p>If you're stuck on something, try this:</p>
      <ol>
        <li>Step away from the screen</li>
        <li>Do something completely different</li>
        <li>Let your subconscious work on the problem</li>
        <li>Come back refreshed</li>
      </ol>
      
      <p>Your code will still be there, but you'll see it with fresh eyes.</p>
      
      <h3>The Photos</h3>
      <p>I'll be adding some of the shots from this trip to my photography gallery soon. There's something special about capturing moments when you're not trying too hard.</p>
      
      <p><em>When was the last time you took a spontaneous trip? Sometimes the best adventures are the unplanned ones.</em></p>
    `,
    date: 'Dec 28, 2024',
    readTime: '6 min read',
    tags: ['Travel', 'Photography', 'Productivity'],
    author: 'Saurabh Deshmukh'
  },
  {
    slug: 'photography-hacks',
    title: '5 Photography Hacks That Changed My Game',
    excerpt: 'Simple techniques that dramatically improved my photography without expensive gear. These practical tips work whether you\'re using a phone or a professional camera.',
    content: `
      <h2>Beyond the Gear</h2>
      <p>Everyone thinks better photography means better equipment. While good gear helps, these five techniques transformed my photos more than any camera upgrade ever did.</p>
      
      <h3>Hack #1: The Magic Hour Isn't What You Think</h3>
      <p>Forget the traditional "golden hour." The real magic happens in the 15 minutes right after sunset. The sky becomes a massive softbox, giving you incredible even lighting.</p>
      
      <blockquote>
        "Great lighting is more important than great equipment."
      </blockquote>
      
      <h3>Hack #2: Focus on the Eyes, Even in Landscapes</h3>
      <p>This sounds weird, but every great photo has a "focal point" that acts like the eyes in a portrait. Find it, nail the focus, and everything else falls into place.</p>
      
      <h3>Hack #3: The Rule of Thirds is Just the Beginning</h3>
      <p>Everyone knows about the rule of thirds, but here's the upgrade: use it for color composition too. Place your most vibrant colors at intersection points.</p>
      
      <h3>Hack #4: Shoot in Burst Mode for Everything</h3>
      <p>Not just for action shots. Burst mode captures micro-expressions and fleeting moments you'd never catch with single shots. Delete 90%, keep the magic.</p>
      
      <h3>Hack #5: The Power of Negative Space</h3>
      <p>What you don't include is as important as what you do. Give your subject room to breathe. Cluttered photos confuse the eye.</p>
      
      <h3>Practical Examples</h3>
      <p>Let me break down how I used these in recent shoots:</p>
      
      <h4>Portrait Session</h4>
      <ul>
        <li>Used hack #1 for soft, flattering light</li>
        <li>Applied hack #4 to catch natural expressions</li>
        <li>Leveraged hack #5 to make the subject pop</li>
      </ul>
      
      <h4>Landscape Photography</h4>
      <ul>
        <li>Found the "eyes" of the landscape (hack #2)</li>
        <li>Used color composition with rule of thirds (hack #3)</li>
        <li>Emphasized the vastness with negative space (hack #5)</li>
      </ul>
      
      <h3>The Technical Stuff</h3>
      <p>Here are the camera settings I use most often:</p>
      <ul>
        <li><strong>Aperture Priority Mode:</strong> Let the camera handle shutter speed</li>
        <li><strong>Single-point autofocus:</strong> You choose exactly where to focus</li>
        <li><strong>Back-button focus:</strong> Separate focus from shutter release</li>
        <li><strong>RAW format:</strong> More editing flexibility later</li>
      </ul>
      
      <h3>Phone Photography Bonus</h3>
      <p>These hacks work just as well on phone cameras:</p>
      <ul>
        <li>Use portrait mode strategically, not for everything</li>
        <li>Tap to focus on your chosen focal point</li>
        <li>Use the timer to avoid camera shake</li>
        <li>Edit with intention - less is usually more</li>
      </ul>
      
      <h3>Practice Exercise</h3>
      <p>Try this challenge: Take 10 photos today using just one of these hacks. Focus on mastering one technique before moving to the next.</p>
      
      <p><em>Which hack are you going to try first? Let me know how it goes!</em></p>
      
      <h3>What's Next?</h3>
      <p>I'm working on a follow-up post about post-processing workflows that complement these shooting techniques. Stay tuned!</p>
    `,
    date: 'Dec 10, 2024',
    readTime: '7 min read',
    tags: ['Photography', 'Tips', 'Creative'],
    author: 'Saurabh Deshmukh'
  }
];

// Utility functions
export const getBlogPosts = () => {
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentSlug, limit = 3) => {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => {
      // Find posts with similar tags
      const commonTags = post.tags?.filter(tag => 
        currentPost.tags?.includes(tag)
      ) || [];
      return commonTags.length > 0;
    })
    .slice(0, limit);
};

export const searchPosts = (query) => {
  const searchTerm = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};

export const getPostsByTag = (tag) => {
  return blogPosts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
};

export const getAllTags = () => {
  const allTags = blogPosts.reduce((tags, post) => {
    if (post.tags) {
      tags.push(...post.tags);
    }
    return tags;
  }, []);
  
  return [...new Set(allTags)].sort();
};

// SEO utilities
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

// Migration helpers for Next.js
export const getStaticPaths = () => {
  // This function structure is ready for Next.js migration
  return {
    paths: blogPosts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
};

export const getStaticProps = (slug) => {
  // This function structure is ready for Next.js migration
  const post = getBlogPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug);
  
  return {
    props: {
      post,
      relatedPosts
    }
  };
};