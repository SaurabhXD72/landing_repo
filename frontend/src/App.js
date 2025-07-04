import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';


// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Photography from './pages/Photography';
import Contact from './pages/Contact';

// Google Analytics and Configuration
import { initializeAnalytics, trackPageView } from './utils/analytics';
import { SITE_CONFIG } from './data/siteConfig';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initializeAnalytics();
  }, []);

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;