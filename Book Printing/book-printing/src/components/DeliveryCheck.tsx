// components/DeliveryCheck.tsx
import React, { useState } from 'react';
import { shippingService, ServiceabilityResult } from '../services/shippingService';

interface DeliveryCheckProps {
  onServiceable?: (result: ServiceabilityResult) => void;
  warehousePincode?: string;
}

const DeliveryCheck: React.FC<DeliveryCheckProps> = ({ 
  onServiceable, 
  warehousePincode = '400001' 
}) => {
  const [pincode, setPincode] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(false);
  const [result, setResult] = useState<ServiceabilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckDelivery = async (): Promise<void> => {
    if (!pincode || pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setChecking(true);
    setError(null);
    setResult(null);

    try {
      const response = await shippingService.checkDeliveryAvailability(pincode, warehousePincode);
      
      if (response.success) {
        setResult(response.data);
        if (response.data.serviceable && onServiceable) {
          onServiceable(response.data);
        }
      } else {
        setError(response.message || 'Failed to check delivery');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Network error. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="delivery-check">
      <h3>Check Delivery Availability</h3>
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPincode(e.target.value)}
          maxLength={6}
        />
        <button onClick={handleCheckDelivery} disabled={checking}>
          {checking ? 'Checking...' : 'Check'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className={`result ${result.serviceable ? 'serviceable' : 'not-serviceable'}`}>
          {result.serviceable ? (
            <>
              <div className="success-icon">✅</div>
              <h4>Delivery Available!</h4>
              <p>We deliver to {result.pincode}</p>
              <div className="courier-info">
                <strong>Available Couriers:</strong> {result.couriers?.total || 0}
                {result.couriers?.recommendations?.cheapest && (
                  <div className="cheapest">
                    Best Price: {result.couriers.recommendations.cheapest.name} - 
                    ₹{result.couriers.recommendations.cheapest.charge}
                  </div>
                )}
                {result.couriers?.recommendations?.fastest && (
                  <div className="fastest">
                    Fastest: {result.couriers.recommendations.fastest.name}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="error-icon">❌</div>
              <h4>Sorry, Delivery Not Available</h4>
              <p>We don't deliver to {result.pincode} yet</p>
              {result.suggestions?.alternativePincodes && (
                <div className="suggestions">
                  <strong>Try nearby pincodes:</strong>
                  <div className="pincodes-list">
                    {result.suggestions.alternativePincodes.slice(0, 3).map((p: string) => (
                      <button 
                        key={p} 
                        onClick={() => setPincode(p)}
                        className="pincode-btn"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryCheck;