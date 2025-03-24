
import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useFormContext } from 'react-hook-form';
import { GeoLocation } from '@/models/HotelModel';
import { initializeMapbox, reverseGeocode, geocodeAddress } from '../utils/mapboxUtils';

interface UseMapLocationProps {
  initialLocation?: GeoLocation;
}

export const useMapLocation = ({ initialLocation }: UseMapLocationProps) => {
  const [mapInitialized, setMapInitialized] = useState(false);
  const [address, setAddress] = useState('');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const geocoder = useRef<mapboxgl.GeolocateControl | null>(null);
  const form = useFormContext();

  // Initialize the map when the component mounts
  useEffect(() => {
    if (!mapContainer.current || mapInitialized) return;
    
    initializeMapbox();
    
    try {
      const initialCenter = initialLocation ? 
        [initialLocation.lng, initialLocation.lat] : 
        [35.5, 33.9]; // Default to Middle East region
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: initialCenter as [number, number],
        zoom: initialLocation ? 13 : 5,
      });
      
      // Add navigation controls
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add a geolocate control
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: false
      });
      newMap.addControl(geolocateControl, 'top-right');
      geocoder.current = geolocateControl;
      
      // Create a marker
      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: '#3b82f6'
      });
      
      if (initialLocation) {
        newMarker.setLngLat([initialLocation.lng, initialLocation.lat]).addTo(newMap);
        setAddress(initialLocation.formattedAddress || initialLocation.address || '');
      }
      
      // Update coordinates when marker is dragged
      newMarker.on('dragend', () => {
        const lngLat = newMarker.getLngLat();
        updateLocation({
          lat: lngLat.lat,
          lng: lngLat.lng
        });
      });
      
      // Add marker on map click
      newMap.on('click', (e) => {
        newMarker.setLngLat(e.lngLat).addTo(newMap);
        updateLocation({
          lat: e.lngLat.lat,
          lng: e.lngLat.lng
        });
      });
      
      map.current = newMap;
      marker.current = newMarker;
      setMapInitialized(true);
      
      // Clean up on unmount
      return () => {
        newMap.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [initialLocation, mapInitialized]);

  // Function to update location in form
  const updateLocation = async (coords: { lat: number, lng: number }) => {
    try {
      // Reverse geocode to get address
      const geocodeResult = await reverseGeocode(coords);
      
      if (geocodeResult.success) {
        // Update form with new geolocation
        form.setValue('geolocation', {
          lat: coords.lat,
          lng: coords.lng,
          formattedAddress: geocodeResult.formattedAddress,
        }, { shouldValidate: true, shouldDirty: true });
        
        setAddress(geocodeResult.formattedAddress || '');
      } else {
        // Still update coordinates even if geocoding fails
        form.setValue('geolocation', {
          lat: coords.lat,
          lng: coords.lng,
        }, { shouldValidate: true, shouldDirty: true });
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  // Handle address search
  const searchAddress = async () => {
    if (!address || !map.current || !marker.current) return;
    
    const result = await geocodeAddress(address);
    
    if (result.success) {
      const { lng, lat } = result.coordinates;
      
      // Update marker and map
      marker.current.setLngLat([lng, lat]).addTo(map.current);
      map.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        essential: true
      });
      
      // Update form
      updateLocation({ lat, lng });
    }
  };

  // Use current location
  const useCurrentLocation = () => {
    if (navigator.geolocation && geocoder.current) {
      geocoder.current.trigger();
    }
  };

  const resetLocation = () => {
    form.setValue('geolocation', undefined, { shouldValidate: true });
    if (marker.current && map.current) {
      marker.current.remove();
      map.current.flyTo({
        center: [35.5, 33.9],
        zoom: 5
      });
    }
    setAddress('');
  };

  return {
    mapContainer,
    address,
    setAddress,
    searchAddress,
    useCurrentLocation,
    resetLocation
  };
};
