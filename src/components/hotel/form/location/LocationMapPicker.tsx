
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { GeoLocation } from '@/models/HotelModel';
import { useMapLocation } from './hooks/useMapLocation';
import { LocationDisplay, SearchBar, MapContainer } from './components';

interface LocationMapPickerProps {
  initialLocation?: GeoLocation;
}

const LocationMapPicker: React.FC<LocationMapPickerProps> = ({ initialLocation }) => {
  const {
    mapContainer,
    address,
    setAddress,
    searchAddress,
    useCurrentLocation,
    resetLocation
  } = useMapLocation({ initialLocation });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          Location Picker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchBar 
          address={address}
          onAddressChange={setAddress}
          onSearch={searchAddress}
          onUseCurrentLocation={useCurrentLocation}
        />
        
        <MapContainer mapRef={mapContainer} />
        
        <LocationDisplay onReset={resetLocation} />
      </CardContent>
    </Card>
  );
};

export default LocationMapPicker;
