// components/FreeDeliveryBanner.tsx
import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, X } from 'lucide-react';

interface FreeDeliveryBannerProps {
  minAmount?: number;
  onClose?: () => void;
}

export const FreeDeliveryBanner: React.FC<FreeDeliveryBannerProps> = ({
  minAmount = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down → hide banner
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling up → show banner
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, [lastScrollY]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] text-center py-3 px-4 
                    bg-primary text-white shadow-lg transition-all duration-300 ease-out">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap relative">
        <Truck 
          className="h-5 w-5 animate-bounce" 
          style={{ animationDuration: '1.5s' }} 
        />
        
        <span className="font-semibold">
          🎉 <span className="font-bold underline">FREE Delivery</span> on all orders above{' '}
          <span className="font-bold text-yellow-300">₹{minAmount.toLocaleString('en-IN')}</span>!
        </span>

        <Sparkles className="h-4 w-4 text-yellow-300" />
        <span className="text-sm text-white/90">Shop now & save on shipping</span>

        {onClose && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};