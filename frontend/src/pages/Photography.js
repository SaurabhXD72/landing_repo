import React, { useState, useEffect, useCallback, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { getPhotos, getPhotosByTag, getAllPhotoTags, formatExifData } from '../data/photography';
import { trackPhotoView, trackLightboxInteraction, trackTagFilter } from '../utils/analytics';

const PhotoCard = ({ photo, onView }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showExif, setShowExif] = useState(false);
  const cardRef = useRef(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView) {
          onView(photo.id, photo.title, photo.tags);
          setHasTrackedView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [photo.id, photo.title, photo.tags, onView, hasTrackedView]);

  return (
    <div 
      ref={cardRef}
      className="mb-6 break-inside-avoid relative"
      onMouseEnter={() => setShowExif(true)}
      onMouseLeave={() => setShowExif(false)}
    >
      <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-slate-800">
        {!imageLoaded && (
          <div className="w-full h-64 bg-slate-700 animate-pulse flex items-center justify-center">
            <span className="text-4xl opacity-50">📸</span>
          </div>
        )}
        
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className={`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold mb-1 text-sm">{photo.title}</h3>
            <p className="text-slate-300 text-xs mb-2">{photo.location}</p>
            {photo.tags && (
              <div className="flex flex-wrap gap-1">
                {photo.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-amber-400/20 text-amber-400 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* EXIF Tooltip */}
        {showExif && photo.settings && (
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-xs text-white">
              <p className="font-semibold mb-1">{photo.camera}</p>
              <p>{formatExifData(photo)}</p>
            </div>
          </div>
        )}

        {/* Zoom Icon */}
        <div className="absolute top-4 left-4 bg-slate-900/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Photography = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTag, setActiveTag] = useState('All');
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState([]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const photoData = getPhotos();
      const tags = getAllPhotoTags();
      
      setPhotos(photoData);
      setFilteredPhotos(photoData);
      setAllTags(['All', ...tags]);
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    document.title = 'Photography - Saurabh Deshmukh';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Explore my photography portfolio featuring landscapes, portraits, and creative captures.'
    );
  }, []);

  useEffect(() => {
    if (activeTag === 'All') {
      setFilteredPhotos(photos);
    } else {
      const filtered = getPhotosByTag(activeTag);
      setFilteredPhotos(filtered);
      trackTagFilter(activeTag, filtered.length, 'photography');
    }
  }, [activeTag, photos]);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const handlePhotoView = (photoId, title, tags) => {
    trackPhotoView(photoId, title, tags);
  };

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
    trackLightboxInteraction('open', photo.id);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
    trackLightboxInteraction('close', selectedPhoto?.id);
  };

  const navigatePhoto = useCallback((direction) => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === filteredPhotos.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
    trackLightboxInteraction(direction, filteredPhotos[newIndex].id);
  }, [selectedPhoto, filteredPhotos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedPhoto) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigatePhoto('prev');
        if (e.key === 'ArrowRight') navigatePhoto('next');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhoto, navigatePhoto]);

  if (loading) {
    return (
      <div className="bg-slate-900 text-white min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
            Through My Lens
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Capturing moments, chasing light, and finding beauty in the everyday
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-amber-400 text-slate-900'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-amber-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Photo Gallery - Masonry Layout */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-6"
          columnClassName="pl-6 bg-clip-padding"
        >
          {filteredPhotos.map((photo) => (
            <div key={photo.id} onClick={() => openLightbox(photo)}>
              <PhotoCard photo={photo} onView={handlePhotoView} />
            </div>
          ))}
        </Masonry>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No photos found in this category.</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-slate-800/50 to-amber-400/10 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-amber-400">Like what you see?</h3>
          <p className="text-slate-300 mb-6">
            Let's work together on your next photography project or creative collaboration.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-10 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white z-10 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white z-10 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="max-w-6xl max-h-full flex flex-col items-center">
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[70vh] object-contain mb-6"
            />
            
            {/* Enhanced Image Info */}
            <div className="text-center text-white bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h3>
              <p className="text-slate-300 mb-4">{selectedPhoto.caption}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-amber-400 font-semibold mb-1">Details</p>
                  <p className="text-slate-300">{selectedPhoto.location}</p>
                  <p className="text-slate-400">{selectedPhoto.date}</p>
                </div>
                
                {selectedPhoto.settings && (
                  <div>
                    <p className="text-amber-400 font-semibold mb-1">Camera Settings</p>
                    <p className="text-slate-300">{selectedPhoto.camera}</p>
                    <p className="text-slate-400">{formatExifData(selectedPhoto)}</p>
                  </div>
                )}
              </div>
              
              {selectedPhoto.tags && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {selectedPhoto.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photography;