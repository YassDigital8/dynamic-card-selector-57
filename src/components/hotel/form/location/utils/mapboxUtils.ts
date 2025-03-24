
import mapboxgl from 'mapbox-gl';

// Temporarily use a public token - in production this should be stored in environment variables
// This token should be replaced with your own
export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby11c2VyLXRva2VuIiwiYSI6ImNsbjAwdnVvdDAyczQya3BpZmJ0N29mYmYifQ.3MeZOWIOeiBFrNxN1-5Duw';

// Function to initialize mapbox token
export const initializeMapbox = () => {
  mapboxgl.accessToken = MAPBOX_TOKEN;
};

// Reverse geocode coordinates to get address
export const reverseGeocode = async (coords: { lat: number, lng: number }) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?access_token=${mapboxgl.accessToken}`
    );
    
    if (response.ok) {
      const data = await response.json();
      const firstFeature = data.features[0];
      return {
        formattedAddress: firstFeature ? firstFeature.place_name : '',
        success: true
      };
    }
    return { success: false };
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return { success: false };
  }
};

// Search for an address and return coordinates
export const geocodeAddress = async (address: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
    );
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const firstResult = data.features[0];
        const [lng, lat] = firstResult.center;
        return {
          coordinates: { lng, lat },
          formattedAddress: firstResult.place_name,
          success: true
        };
      }
    }
    return { success: false };
  } catch (error) {
    console.error('Error searching address:', error);
    return { success: false };
  }
};
