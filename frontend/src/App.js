import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Photography from './pages/Photography';
import Contact from './pages/Contact';

// Google Analytics
import { initGA, trackPageView } from './utils/analytics';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    const gaId = process.env.REACT_APP_GA_ID;
    if (gaId) {
      initGA(gaId);
    }
  }, []);

  useEffect(() => {
    // Track page views
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <div className="App">
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