
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
