import React, { useState, useEffect, useCallback } from 'react';

const Photography = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // High-quality placeholder photos
  const photos = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
      title: 'Mountain Lake Reflection',
      description: 'Serene morning light reflecting off pristine mountain lake waters.',
      category: 'Landscape',
      location: 'Mountain Region'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg',
      title: 'Dawn at the Cabin',
      description: 'A peaceful cabin nestled by the lake during golden hour.',
      category: 'Landscape',
      location: 'Alpine Lake'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGV8ZW58MHx8fHwxNzUxMjI4MzU4fDA&ixlib=rb-4.0.3&q=85',
      title: 'Misty Valley',
      description: 'Fog rolling through the valley, creating an ethereal landscape.',
      category: 'Landscape',
      location: 'Valley Vista'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxsYW5kc2NhcGV8ZW58MHx8fHwxNzUxMjI4MzU4fDA&ixlib=rb-4.0.3&q=85',
      title: 'Mountain Valley Stream',
      description: 'Crystal clear waters flowing through a mountain valley.',
      category: 'Landscape',
      location: 'Mountain Stream'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/32770300/pexels-photo-32770300.jpeg',
      title: 'Shadow Play',
      description: 'Creative use of shadows and light in portrait photography.',
      category: 'Portrait',
      location: 'Studio'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/32769142/pexels-photo-32769142.jpeg',
      title: 'Natural Beauty',
      description: 'Portrait enhanced by natural elements and soft lighting.',
      category: 'Portrait',
      location: 'Outdoor Studio'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/4549411/pexels-photo-4549411.jpeg',
      title: 'Tools of the Trade',
      description: 'Behind the scenes - camera gear and creative workspace.',
      category: 'Equipment',
      location: 'Studio'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1505934763054-93cd118ee9dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxwaG90b2dyYXBoeSUyMHBvcnRmb2xpb3xlbnwwfHx8fDE3NTEyMjgzNDZ8MA&ixlib=rb-4.0.3&q=85',
      title: 'Still Life',
      description: 'Artistic composition with everyday objects and natural light.',
      category: 'Still Life',
      location: 'Studio'
    }
  ];

  const categories = ['All', ...new Set(photos.map(photo => photo.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPhotos, setFilteredPhotos] = useState(photos);

  useEffect(() => {
    document.title = 'Photography - Saurabh Deshmukh';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Explore my photography portfolio featuring landscapes, portraits, and creative captures.'
    );
    
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === activeCategory));
    }
  }, [activeCategory]);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
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
    setPhotoIndex(newIndex);
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-amber-400 text-slate-900'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-amber-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg aspect-square bg-slate-800"
              onClick={() => openLightbox(photo, index)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold mb-1">{photo.title}</h3>
                  <p className="text-slate-300 text-sm">{photo.location}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-slate-900/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

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

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-full flex flex-col">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[70vh] object-contain"
            />
            
            {/* Image Info */}
            <div className="text-center mt-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h3>
              <p className="text-slate-300 mb-2">{selectedPhoto.description}</p>
              <div className="flex justify-center gap-4 text-sm text-slate-400">
                <span>{selectedPhoto.category}</span>
                <span>•</span>
                <span>{selectedPhoto.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photography;