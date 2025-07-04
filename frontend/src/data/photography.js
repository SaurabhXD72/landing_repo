// Photography gallery data - centralized photo management
// AI-friendly: Easy to extend by adding new objects to the array

export const PHOTOS = [
  {
    id: 'coastal-cliff-landscape',
    title: 'Coastal Cliff Dawn',
    caption: 'The rugged coastline painted in golden hour light — nature\'s masterpiece unfolds with every sunrise.',
    imageUrl: 'https://images.pexels.com/photos/3558637/pexels-photo-3558637.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/3558637/pexels-photo-3558637.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-12-15',
    tags: ['Landscape', 'Coastal', 'Sunrise', 'Nature'],
    camera: 'Sony A7IV',
    location: 'Pacific Coast',
    settings: {
      aperture: 'f/8',
      shutter: '1/125s',
      iso: '200',
      focalLength: '24mm'
    }
  },
  {
    id: 'mountain-lake-reflection',
    title: 'Mountain Mirror',
    caption: 'Perfect stillness creates perfect reflections — sometimes the best moments happen in complete silence.',
    imageUrl: 'https://images.pexels.com/photos/2613946/pexels-photo-2613946.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/2613946/pexels-photo-2613946.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-11-28',
    tags: ['Landscape', 'Mountains', 'Reflection', 'Sunset'],
    camera: 'Sony A7IV',
    location: 'Alpine Lake Region',
    settings: {
      aperture: 'f/11',
      shutter: '1/60s',
      iso: '100',
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