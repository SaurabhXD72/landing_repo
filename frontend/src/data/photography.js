// Photography gallery data - centralized photo management
// AI-friendly: Easy to extend by adding new objects to the array

export const PHOTOS = [
  {
    id: 'himalayan-sunrise',
    title: 'Himalayan Sunrise',
    caption: 'First light painting the peaks gold — sometimes the best shots happen when you can barely keep your eyes open.',
    imageUrl: '/images/photos/himalayan-sunrise.jpg',
    thumbnailUrl: '/images/photos/thumbs/himalayan-sunrise.jpg',
    date: '2024-12-15',
    tags: ['Landscape', 'Mountains', 'Sunrise'],
    camera: 'Sony A7IV',
    location: 'Himachal Pradesh, India',
    settings: {
      aperture: 'f/8',
      shutter: '1/125s',
      iso: '200',
      focalLength: '24mm'
    }
  },
  {
    id: 'monsoon-reflection',
    title: 'Monsoon Reflection',
    caption: 'Rain-soaked streets make the best mirrors. This shot happened during a random evening walk.',
    imageUrl: '/images/photos/monsoon-reflection.jpg',
    thumbnailUrl: '/images/photos/thumbs/monsoon-reflection.jpg',
    date: '2024-11-28',
    tags: ['Street', 'Rain', 'Reflection'],
    camera: 'Sony A7IV',
    location: 'Mumbai, India',
    settings: {
      aperture: 'f/4',
      shutter: '1/60s',
      iso: '800',
      focalLength: '35mm'
    }
  }
];

// Utility functions for photo management
export const getPhotos = () => {
  return PHOTOS.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPhotoById = (id) => {
  return PHOTOS.find(photo => photo.id === id);
};

export const getPhotosByTag = (tag) => {
  return PHOTOS.filter(photo => 
    photo.tags && photo.tags.includes(tag)
  );
};

export const getAllPhotoTags = () => {
  const allTags = PHOTOS.reduce((tags, photo) => {
    if (photo.tags) {
      tags.push(...photo.tags);
    }
    return tags;
  }, []);
  
  return [...new Set(allTags)].sort();
};

export const searchPhotos = (query) => {
  const searchTerm = query.toLowerCase();
  return PHOTOS.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm) ||
    photo.caption.toLowerCase().includes(searchTerm) ||
    photo.location.toLowerCase().includes(searchTerm) ||
    (photo.tags && photo.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};

export const getPhotosByLocation = (location) => {
  return PHOTOS.filter(photo => 
    photo.location && photo.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getPhotosByCamera = (camera) => {
  return PHOTOS.filter(photo => 
    photo.camera && photo.camera.toLowerCase().includes(camera.toLowerCase())
  );
};

// Generate EXIF display string
export const formatExifData = (photo) => {
  if (!photo.settings) return '';
  
  const { aperture, shutter, iso, focalLength } = photo.settings;
  const parts = [];
  
  if (aperture) parts.push(aperture);
  if (shutter) parts.push(shutter);
  if (iso) parts.push(`ISO ${iso}`);
  if (focalLength) parts.push(focalLength);
  
  return parts.join(' • ');
};