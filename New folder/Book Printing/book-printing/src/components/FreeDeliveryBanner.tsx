// // components/FreeDeliveryBanner.tsx
// import React from 'react';
// import { Truck, Sparkles, X } from 'lucide-react';

// interface FreeDeliveryBannerProps {
//   minAmount?: number;
//   highlight?: boolean;
//   onClose?: () => void;
// }

// export const FreeDeliveryBanner: React.FC<FreeDeliveryBannerProps> = ({
//   minAmount = 5000,
//   highlight = true,
//   onClose,
// }) => {
//   const [isVisible, setIsVisible] = React.useState(true);

//   const handleClose = () => {
//     setIsVisible(false);
//     onClose?.();
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed top-0 left-0 right-0 z-[60] text-center py-3 px-4 bg-primary text-white shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap relative">
//         <Truck 
//           className="h-5 w-5 animate-bounce" 
//           style={{ animationDuration: '1.5s' }} 
//         />
        
//         <span className="font-semibold">
//           🎉 <span className="font-bold underline">FREE Delivery</span> on all orders above{' '}
//           <span className="font-bold text-yellow-300">₹{minAmount.toLocaleString('en-IN')}</span>!
//         </span>

//         <Sparkles className="h-4 w-4 text-yellow-300" />
//         <span className="text-sm text-white/90">Shop now & save on shipping</span>

//         {onClose && (
//           <button
//             onClick={handleClose}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
//             aria-label="Dismiss banner"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };



// import React from "react";
// import { Truck, Sparkles, X } from "lucide-react";

// interface FreeDeliveryBannerProps {
//   minAmount?: number;
//   onClose?: () => void;
//   show?: boolean;
// }

// export const FreeDeliveryBanner: React.FC<FreeDeliveryBannerProps> = ({
//   minAmount = 5000,
//   onClose,
//   show = true,
// }) => {
//   const [isVisible, setIsVisible] = React.useState(true);

//   const handleClose = () => {
//     setIsVisible(false);
//     onClose?.();
//   };

//   if (!isVisible) return null;

//   return (
//     <div
//       className={`fixed top-0 left-0 right-0 z-[60] text-center py-3 px-4  bg-primary text-white shadow-lg
//       transition-all duration-500 ease-in-out ${
//         show ? "translate-y-0 opacity-100 " : "-translate-y-full opacity-0 "
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap relative ">
//         <Truck className="h-5 w-5 animate-bounce" />

//         <span className="font-semibold">
//           🎉 <span className="font-bold underline">FREE Delivery</span> on all
//           orders above{" "}
//           <span className="font-bold text-yellow-300">
//             ₹{minAmount.toLocaleString("en-IN")}
//           </span>
//           !
//         </span>

//         <Sparkles className="h-4 w-4 text-yellow-300" />
//         <span className="text-sm text-white/90">
//           Shop now & save on shipping
//         </span>

//         {onClose && (
//           <button
//             onClick={handleClose}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useRef } from "react";
import { Truck, Sparkles, X } from "lucide-react";

interface FreeDeliveryBannerProps {
  minAmount?: number;
  onClose?: () => void;
  show?: boolean;
  setHeight?: (h: number) => void; // 👈 NEW
}

export const FreeDeliveryBanner: React.FC<FreeDeliveryBannerProps> = ({
  minAmount = 5000,
  onClose,
  show = true,
  setHeight,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsVisible(false);
    setHeight?.(0); // reset height
    onClose?.();
  };

  // 👇 measure height
  useEffect(() => {
    if (ref.current && setHeight) {
      setHeight(ref.current.offsetHeight);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div
     
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap relative">
        <Truck className="h-5 w-5 animate-bounce" />

        <span className="font-semibold">
          🎉 <span className="font-bold underline">FREE Delivery</span> on all orders above{" "}
          <span className="font-bold text-yellow-300">
            ₹{minAmount.toLocaleString("en-IN")}
          </span>
        </span>

        <Sparkles className="h-4 w-4 text-yellow-300" />

        {onClose && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X />
          </button>
        )}
      </div>
    </div>
  );
};