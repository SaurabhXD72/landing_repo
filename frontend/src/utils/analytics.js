// Enhanced Google Analytics utility functions with GA4 event tracking
// Migration-friendly: These functions will work with Next.js and gtag

import { SITE_CONFIG } from '../data/siteConfig';

export const initGA = (measurementId) => {
  if (typeof window === 'undefined' || !measurementId) return;

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
    });
  `;
  document.head.appendChild(script2);

  // Make gtag available globally
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
};

export const trackPageView = (url) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const gaId = SITE_CONFIG.analytics.gaId;
  if (!gaId) return;
  
  window.gtag('config', gaId, {
    page_path: url,
    page_title: document.title,
  });
};

// GA4 Event Tracking Functions
export const trackBlogImpression = (postId, title) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'blog_impression', {
    event_category: 'Content Engagement',
    event_label: title,
    blog_id: postId,
    engagement_type: 'impression'
  });
};

export const trackBlogClick = (postId, title, isExternal = false) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'blog_click', {
    event_category: 'Content Engagement',
    event_label: title,
    blog_id: postId,
    outbound_link: isExternal,
    engagement_type: 'click'
  });
};

export const trackPhotoView = (photoId, title, tags = []) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'photo_view', {
    event_category: 'Gallery Interaction',
    event_label: title,
    photo_id: photoId,
    tag_count: tags.length,
    first_tag: tags[0] || 'untagged'
  });
};

export const trackContactFormSubmit = (formData = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'contact_submit', {
    event_category: 'Lead Generation',
    event_label: 'Contact Form',
    form_type: 'contact',
    has_subject: !!formData.subject
  });
};

export const trackSocialClick = (platform, context = 'header') => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'social_click', {
    event_category: 'Social Engagement',
    event_label: platform,
    social_platform: platform,
    click_context: context
  });
};

export const trackDownload = (fileName, fileType = 'unknown') => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'download_click', {
    event_category: 'File Download',
    event_label: fileName,
    file_name: fileName,
    file_type: fileType
  });
};

// Advanced tracking for portfolio-specific events
export const trackSearchQuery = (query, resultCount, searchType = 'blog') => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'search', {
    event_category: 'Content Discovery',
    event_label: query,
    search_term: query,
    search_type: searchType,
    result_count: resultCount
  });
};

export const trackTagFilter = (tag, resultCount, contentType = 'blog') => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'tag_filter', {
    event_category: 'Content Discovery',
    event_label: tag,
    tag_name: tag,
    content_type: contentType,
    result_count: resultCount
  });
};

export const trackTimeOnPage = (pageType, timeSpent) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'page_engagement', {
    event_category: 'User Engagement',
    event_label: pageType,
    page_type: pageType,
    time_spent: timeSpent
  });
};

export const trackLightboxInteraction = (action, photoId) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'lightbox_interaction', {
    event_category: 'Gallery Interaction',
    event_label: action,
    photo_id: photoId,
    interaction_type: action
  });
};

// Initialize Google Analytics with site config
export const initializeAnalytics = () => {
  const gaId = SITE_CONFIG.analytics.gaId;
  if (gaId) {
    initGA(gaId);
  }
};

// Legacy support for existing functions
export const trackEvent = (action, category, label, value) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackBlogPostView = (postTitle) => {
  trackEvent('view', 'Blog', postTitle);
};

export const trackPhotoViewLegacy = (photoTitle) => {
  trackEvent('view', 'Photography', photoTitle);
};