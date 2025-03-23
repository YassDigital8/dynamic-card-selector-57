
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';

interface ExtendedFeaturesSectionProps {
  hotel: Hotel;
}

const ExtendedFeaturesSection: React.FC<ExtendedFeaturesSectionProps> = ({ hotel }) => {
  return (
    <Card className="border-0 shadow-none mb-4">
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Geolocation */}
          <div>
            <h3 className="text-lg font-medium mb-4">Geolocation</h3>
            {hotel.geolocation ? (
              <div className="p-3 border rounded-md">
                <div className="flex flex-col space-y-2">
                  <div>
                    <span className="text-sm font-medium">Coordinates:</span>
                    <p className="text-gray-800">
                      {hotel.geolocation.lat}, {hotel.geolocation.lng}
                    </p>
                  </div>
                  {hotel.geolocation.formattedAddress && (
                    <div>
                      <span className="text-sm font-medium">Address:</span>
                      <p className="text-gray-800">{hotel.geolocation.formattedAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No geolocation information available.</p>
            )}
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
            {hotel.paymentMethods && hotel.paymentMethods.length > 0 ? (
              <div className="space-y-3">
                {hotel.paymentMethods
                  .filter(method => method.enabled)
                  .map((method) => (
                    <div key={method.id} className="p-3 border rounded-md">
                      <h4 className="font-medium">{method.name}</h4>
                      {method.bankAccountDetails && (
                        <div className="mt-2 text-sm">
                          <p><span className="font-medium">Account Name:</span> {method.bankAccountDetails.accountName}</p>
                          <p><span className="font-medium">Account Number:</span> {method.bankAccountDetails.accountNumber}</p>
                          <p><span className="font-medium">Bank:</span> {method.bankAccountDetails.bankName}</p>
                          {method.bankAccountDetails.iban && (
                            <p><span className="font-medium">IBAN:</span> {method.bankAccountDetails.iban}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No payment methods available.</p>
            )}
          </div>

          {/* Extra Bed Policy */}
          {hotel.extraBedPolicy && (
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Extra Bed Policy</h3>
              <div className="p-3 border rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium">Price per Night:</span>
                    <p className="text-gray-800">${hotel.extraBedPolicy.pricePerNight}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Max Extra Beds per Room:</span>
                    <p className="text-gray-800">{hotel.extraBedPolicy.maxExtraBedsPerRoom}</p>
                  </div>
                  {hotel.extraBedPolicy.notes && (
                    <div className="md:col-span-2">
                      <span className="text-sm font-medium">Notes:</span>
                      <p className="text-gray-800">{hotel.extraBedPolicy.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtendedFeaturesSection;
