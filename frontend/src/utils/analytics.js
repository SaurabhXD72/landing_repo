// Google Analytics utility functions
// Migration-friendly: These functions will work with Next.js and gtag

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
  
  window.gtag('config', process.env.REACT_APP_GA_ID || 'GA_MEASUREMENT_ID', {
    page_path: url,
    page_title: document.title,
  });
};

export const trackEvent = (action, category, label, value) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom events for portfolio site
export const trackContactFormSubmit = () => {
  trackEvent('submit', 'Contact', 'Contact Form');
};

export const trackBlogPostView = (postTitle) => {
  trackEvent('view', 'Blog', postTitle);
};

export const trackPhotoView = (photoTitle) => {
  trackEvent('view', 'Photography', photoTitle);
};

export const trackSocialClick = (platform) => {
  trackEvent('click', 'Social', platform);
};

export const trackDownload = (fileName) => {
  trackEvent('download', 'File', fileName);
};