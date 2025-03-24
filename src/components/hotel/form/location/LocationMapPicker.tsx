
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { GeoLocation } from '@/models/HotelModel';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { MapPin, Locate } from 'lucide-react';

// Temporarily use a public token - in production this should be stored in environment variables
// This token should be replaced with your own
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby11c2VyLXRva2VuIiwiYSI6ImNsbjAwdnVvdDAyczQya3BpZmJ0N29mYmYifQ.3MeZOWIOeiBFrNxN1-5Duw';

interface LocationMapPickerProps {
  initialLocation?: GeoLocation;
}

const LocationMapPicker: React.FC<LocationMapPickerProps> = ({ initialLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const geocoder = useRef<mapboxgl.GeolocateControl | null>(null);
  const form = useFormContext();
  const [address, setAddress] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);

  // Initialize the map when the component mounts
  useEffect(() => {
    if (!mapContainer.current || mapInitialized) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
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
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?access_token=${mapboxgl.accessToken}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const firstFeature = data.features[0];
        const formattedAddress = firstFeature ? firstFeature.place_name : '';
        
        // Update form with new geolocation
        form.setValue('geolocation', {
          lat: coords.lat,
          lng: coords.lng,
          formattedAddress: formattedAddress,
        }, { shouldValidate: true, shouldDirty: true });
        
        setAddress(formattedAddress);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      
      // Still update coordinates even if geocoding fails
      form.setValue('geolocation', {
        lat: coords.lat,
        lng: coords.lng,
      }, { shouldValidate: true, shouldDirty: true });
    }
  };

  // Handle address search
  const searchAddress = async () => {
    if (!address || !map.current || !marker.current) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const firstResult = data.features[0];
          const [lng, lat] = firstResult.center;
          
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
      }
    } catch (error) {
      console.error('Error searching address:', error);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          Location Picker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Search for an address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchAddress()}
            className="flex-1"
          />
          <Button type="button" onClick={searchAddress} variant="outline">
            Search
          </Button>
          <Button 
            type="button" 
            onClick={useCurrentLocation} 
            variant="outline"
            title="Use current location"
          >
            <Locate className="h-4 w-4" />
          </Button>
        </div>
        
        <div 
          ref={mapContainer} 
          className="w-full h-[300px] rounded-md border border-slate-200 dark:border-slate-800"
        />
        
        <FormField
          control={form.control}
          name="geolocation"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Selected Coordinates</FormLabel>
                <Button 
                  type="button" 
                  onClick={resetLocation} 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700"
                >
                  Reset
                </Button>
              </div>
              <FormControl>
                <div className="text-sm text-muted-foreground">
                  {field.value ? (
                    <div className="space-y-1">
                      <p>Latitude: {field.value.lat.toFixed(6)}</p>
                      <p>Longitude: {field.value.lng.toFixed(6)}</p>
                      {field.value.formattedAddress && (
                        <p>Address: {field.value.formattedAddress}</p>
                      )}
                    </div>
                  ) : (
                    <p>No location selected</p>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Click on the map to select a location or search for an address
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default LocationMapPicker;
