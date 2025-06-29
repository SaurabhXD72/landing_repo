import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Contact - Saurabh Deshmukh';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Get in touch for collaborations, projects, or just to say hello.'
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    // Log form submission attempt
    console.log('=== CONTACT FORM SUBMISSION START ===');
    console.log('Form data being submitted:', formData);
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
    console.log('Full endpoint URL:', `${process.env.REACT_APP_BACKEND_URL}/api/contact`);

    try {
      // Force the request to be visible in Network tab
      const requestUrl = `${process.env.REACT_APP_BACKEND_URL}/api/contact`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors',
        credentials: 'same-origin',
      };

      console.log('Making fetch request with options:', requestOptions);
      console.log('Request URL:', requestUrl);

      // This WILL show up in Network tab
      const response = await fetch(requestUrl, requestOptions);
      
      console.log('Fetch response received:', response);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', [...response.headers.entries()]);
      
      let responseData;
      try {
        responseData = await response.json();
        console.log('Response data parsed:', responseData);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        const textResponse = await response.text();
        console.log('Response as text:', textResponse);
        throw new Error('Invalid JSON response from server');
      }
      
      if (response.ok && responseData.success) {
        console.log('✅ SUCCESS: Form submitted successfully');
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setStatus(''), 5000);
      } else {
        console.error('❌ SERVER ERROR: Server responded with error:', responseData);
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('❌ NETWORK ERROR: Failed to submit form:', error);
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
      console.log('=== CONTACT FORM SUBMISSION END ===');
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have an idea? Want to collaborate? Or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-800/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-amber-400">Send a Message</h2>
            
            {/* Debug Info */}
            <div className="mb-4 p-2 bg-slate-700/50 rounded text-xs text-slate-400">
              <strong>Debug:</strong> Backend URL: {process.env.REACT_APP_BACKEND_URL}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-slate-400 resize-none transition-all duration-200"
                  placeholder="Tell me more about your project, idea, or just say hi..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-400 font-medium">✅ Message sent successfully! I'll get back to you soon.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-400 font-medium">❌ Something went wrong. Please try again or email me directly.</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-slate-800/50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-amber-400">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:saurabh@email.com" className="text-slate-300 hover:text-amber-400 transition-colors">
                    saurabh@email.com
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-amber-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a href="https://www.linkedin.com/in/saurabhmittal13" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-amber-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/iamsa" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>

            {/* What I'm Looking For */}
            <div className="bg-slate-800/50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-amber-400">What I'm Looking For</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">Freelance Projects</h4>
                    <p className="text-slate-300 text-sm">Backend development, API design, and full-stack solutions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">Photography Collaborations</h4>
                    <p className="text-slate-300 text-sm">Event photography, portrait sessions, and creative projects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">Content Partnerships</h4>
                    <p className="text-slate-300 text-sm">Guest writing, podcast appearances, and knowledge sharing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">Just Saying Hi</h4>
                    <p className="text-slate-300 text-sm">Always happy to connect with fellow creators and developers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-amber-400/10 to-amber-400/5 rounded-xl p-6 border border-amber-400/20">
              <h3 className="text-lg font-semibold mb-2 text-amber-400">Quick Response Promise</h3>
              <p className="text-slate-300 text-sm">
                I typically respond to messages within 24-48 hours. For urgent projects, feel free to mention it in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;