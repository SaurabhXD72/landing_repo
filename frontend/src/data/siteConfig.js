// Site configuration - centralized content management
// AI-friendly: Easy to update all site content from one place

export const SITE_CONFIG = {
  // Personal Information
  name: 'Saurabh Deshmukh',
  title: 'Full-Stack Developer & Digital Storyteller',
  tagline: 'Building scalable web experiences and capturing life through code and lens',
  email: 'hello@saurabhdeshmukh.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, India',
  
  // Social Links
  social: {
    github: 'https://github.com/saurabhdeshmukh',
    linkedin: 'https://linkedin.com/in/saurabhdeshmukh',
    twitter: 'https://twitter.com/saurabhdeshmukh',
    instagram: 'https://instagram.com/saurabhdeshmukh',
    medium: 'https://medium.com/@iamsaurabh',
    behance: 'https://behance.net/saurabhdeshmukh'
  },
  
  // Hero Section
  hero: {
    headline: 'Building Digital Experiences That Matter',
    subheadline: 'Full-stack developer by day, photographer by weekend, storyteller always. I create web applications that solve real problems and capture moments that tell stories.',
    cta: {
      primary: 'View My Work',
      secondary: 'Get In Touch'
    },
    backgroundImage: '/images/hero-bg.jpg'
  },
  
  // About Section
  about: {
    headline: 'Code, Create, Capture',
    description: [
      'I\'m a full-stack developer with 5+ years of experience building scalable web applications. My expertise spans React, Node.js, Python, and cloud technologies.',
      'When I\'m not coding, you\'ll find me behind a camera, exploring new places, or writing about the intersection of technology and creativity.',
      'I believe in building software that not only works flawlessly but also creates meaningful experiences for users.'
    ],
    skills: [
      'React & Next.js',
      'Node.js & Python',
      'AWS & Cloud Architecture',
      'MongoDB & PostgreSQL',
      'Photography & Visual Design',
      'Technical Writing'
    ],
    experience: [
      {
        company: 'Tech Startup',
        role: 'Senior Full-Stack Developer',
        duration: '2022 - Present',
        description: 'Led development of scalable web applications serving 100K+ users'
      },
      {
        company: 'Digital Agency',
        role: 'Full-Stack Developer',
        duration: '2020 - 2022',
        description: 'Built custom solutions for clients across various industries'
      }
    ]
  },
  
  // Services/What I Do
  services: [
    {
      title: 'Web Development',
      description: 'Full-stack web applications using modern technologies and best practices',
      icon: '💻',
      skills: ['React', 'Node.js', 'Python', 'MongoDB']
    },
    {
      title: 'Photography',
      description: 'Professional photography for events, portraits, and commercial projects',
      icon: '📸',
      skills: ['Portrait', 'Landscape', 'Event', 'Commercial']
    },
    {
      title: 'Technical Writing',
      description: 'Clear, engaging content about technology, development, and digital creativity',
      icon: '✍️',
      skills: ['Blog Posts', 'Documentation', 'Case Studies', 'Tutorials']
    }
  ],
  
  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Saurabh Deshmukh. All rights reserved.`,
    links: [
      { text: 'Privacy Policy', url: '/privacy' },
      { text: 'Terms of Service', url: '/terms' },
      { text: 'Contact', url: '/contact' }
    ],
    newsletter: {
      title: 'Stay Updated',
      description: 'Get notified about new blog posts, photography projects, and tech insights.',
      placeholder: 'Enter your email',
      cta: 'Subscribe'
    }
  },
  
  // SEO Configuration
  seo: {
    title: 'Saurabh Deshmukh - Full-Stack Developer & Digital Storyteller',
    description: 'Full-stack developer and photographer creating scalable web experiences and capturing life through code and lens. Based in Mumbai, India.',
    keywords: [
      'full-stack developer',
      'web developer',
      'photographer',
      'react developer',
      'node.js developer',
      'python developer',
      'technical writer',
      'mumbai developer',
      'portfolio website'
    ],
    ogImage: '/images/og-image.jpg',
    twitterCard: 'summary_large_image',
    favicon: '/images/logo/favicon.ico',
    themeColor: '#f59e0b' // amber-500
  },
  
  // Contact Form
  contact: {
    title: 'Let\'s Work Together',
    description: 'Have a project in mind? Whether it\'s web development, photography, or a creative collaboration, I\'d love to hear from you.',
    form: {
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'subject', label: 'Subject', type: 'text', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true }
      ],
      submitText: 'Send Message',
      successMessage: 'Thanks for reaching out! I\'ll get back to you within 24 hours.',
      errorMessage: 'Oops! Something went wrong. Please try again or email me directly.'
    },
    info: [
      { icon: '📧', label: 'Email', value: 'hello@saurabhdeshmukh.com' },
      { icon: '📱', label: 'Phone', value: '+91 98765 43210' },
      { icon: '📍', label: 'Location', value: 'Mumbai, India' },
      { icon: '⏰', label: 'Response Time', value: 'Within 24 hours' }
    ]
  },
  
  // Navigation
  navigation: {
    main: [
      { text: 'Home', url: '/' },
      { text: 'About', url: '/#about' },
      { text: 'Blog', url: '/blog' },
      { text: 'Photography', url: '/photography' },
      { text: 'Contact', url: '/contact' }
    ],
    mobile: [
      { text: 'Home', url: '/' },
      { text: 'Blog', url: '/blog' },
      { text: 'Photography', url: '/photography' },
      { text: 'Contact', url: '/contact' }
    ]
  },
  
  // Analytics Configuration
  analytics: {
    gaId: process.env.REACT_APP_GA_ID || process.env.NEXT_PUBLIC_GA_ID,
    trackingEvents: {
      blogImpression: 'blog_impression',
      blogClick: 'blog_click',
      photoView: 'photo_view',
      contactSubmit: 'contact_submit',
      socialClick: 'social_click',
      downloadClick: 'download_click'
    }
  }
};