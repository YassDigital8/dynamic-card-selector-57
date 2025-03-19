
// Function to get a consistent avatar image based on hotel name
export const getHotelAvatar = (hotelName: string): string => {
  // Use a modulo operation to cycle through 5 placeholder images
  const nameHash = hotelName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageIndex = nameHash % 5 + 1;
  
  const placeholderImages = [
    'photo-1460925895917-afdab827c52f',
    'photo-1487958449943-2429e8be8625',
    'photo-1449157291145-7efd050a4d0e',
    'photo-1459767129954-1b1c1f9b9ace',
    'photo-1496307653780-42ee777d4833'
  ];
  
  return `https://images.unsplash.com/${placeholderImages[imageIndex - 1]}?auto=format&fit=crop&w=300&h=150&q=80`;
};

// Generate multiple hotel images with varied content
export const getHotelImages = (hotelName: string, hotelId: string): string[] => {
  // Create a unique but consistent set of images for each hotel
  const baseHash = (hotelName.length + parseInt(hotelId, 36)) % 10;
  
  // Collection of high-quality hotel-related images from Unsplash
  const hotelImageCollection = [
    // Room views
    'photo-1566665797739-1674de7a421a', // Luxury bedroom
    'photo-1590490360182-c33d57733427', // Modern hotel room
    'photo-1551632436-cbf8dd35adfa',   // Suite with sea view
    'photo-1598928636135-d146eb5c8a4c', // Elegant room with double bed
    
    // Hotel facilities
    'photo-1571896349842-33c89424de2d', // Swimming pool
    'photo-1520250497591-112f2f40a3f4', // Hotel lobby
    'photo-1584132967334-10e028bd69f7', // Gym
    'photo-1540304453527-62f9d5a5e685', // Restaurant
    
    // Hotel exteriors
    'photo-1542314831-068cd1dbfeeb', // Beach resort
    'photo-1564501049412-61c2a3083791', // Modern hotel building
    'photo-1568084680786-a84f91d1153c', // Luxury hotel exterior
    'photo-1542314831-068cd1dbfeeb', // Resort view
    
    // Atmospheric
    'photo-1551882547-ff40c63fe5fa', // Hotel corridor
    'photo-1529290130247-ef947d59f44b', // Rooftop bar
    'photo-1518733057094-95b53143d2a7', // Spa
    'photo-1578683010236-d716f9a3f461', // Balcony view
  ];
  
  // Generate a set of 4-6 images for this hotel
  const imageCount = (baseHash % 3) + 4; // 4-6 images
  const images = [];
  
  // Always start with the hotel avatar
  images.push(getHotelAvatar(hotelName));
  
  // Add unique additional images
  const usedIndices = new Set<number>();
  for (let i = 0; i < imageCount - 1; i++) {
    let index = (baseHash + i * 3) % hotelImageCollection.length;
    // Avoid duplicates
    while (usedIndices.has(index)) {
      index = (index + 1) % hotelImageCollection.length;
    }
    usedIndices.add(index);
    
    const imagePath = hotelImageCollection[index];
    images.push(`https://images.unsplash.com/${imagePath}?auto=format&fit=crop&w=300&h=150&q=80`);
  }
  
  return images;
};
