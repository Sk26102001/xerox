// import { Phone } from "lucide-react";

// export default function FloatingPhone() {
//   return (
//     <div className="fixed bottom-6 left-6 z-50">
//       {/* Ping Effect */}
//       <span className="absolute inline-flex h-14 w-14 rounded-full bg-green-400 opacity-75 animate-ping"></span>

//       {/* Ring Circle */}
//       <span className="absolute inline-flex h-10 w-10 rounded-full bg-green-500 opacity-30 animate-pulse"></span>

//       {/* Main Button */}
//       <a
//         href="tel:+919876543210"
//         className="relative flex items-center justify-center h-14 w-14 rounded-full bg-green-600 text-white shadow-lg hover:scale-110 transition"
//       >
//         <Phone size={24} />
//       </a>
//     </div>
//   );
// }



// import { motion } from "framer-motion";
// import { Phone } from "lucide-react";


// export default function FloatingPhone() {


//   return (
//     <motion.div
//       initial={{ y: -300, opacity: 0, rotate: -25 }}
//       animate={{ y: 0, opacity: 1, rotate: 0 }}
//       transition={{
//         type: "spring",
//         stiffness: 70,
//         damping: 10,
//       }}

    
//       className="
//         group
//         fixed 
//         bottom-8 
//         right-8 
//         z-[1000]
//         cursor-pointer
//       "
//     >
//          <a href="tel:+919876543210" className="relative block"></a>
//       {/* Hover Ring */}
//       <span className="absolute inset-0 flex items-center justify-center">
//         <span className="
//           h-12 w-12
//           rounded-full
//           bg-amber-700
//           opacity-0
//           group-hover:opacity-40
//           group-hover:animate-ping
//         "></span>
//       </span>

//       {/* Main Button */}
//       <div
//         className="
//           relative
//           bg-amber-700
//           text-white 
//           p-4 
//           rounded-full 
//           shadow-2xl 
//           hover:scale-110 
//           active:scale-95 
//           transition-transform
//         "
//       >
//         <Phone size={24} />
//       </div>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function FloatingPhone() {
  return (
    <motion.div
      initial={{ y: -300, opacity: 0, rotate: -25 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 10,
      }}
      className="fixed bottom-6 left-8 z-[1000]"
    >
      <a
        href="tel:+917230001405"
        className="flex items-center gap-3"
      >
        {/* 🔥 Phone Section */}
        <div className="relative flex items-center justify-center">
          
          {/* Continuous Ring */}
          <span className="absolute h-12 w-12 rounded-full bg-secondary opacity-40 animate-ping"></span>

          {/* Button */}
          <div className="relative bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform">
            <motion.div
              animate={{
                rotate: [0, -15, 15, -10, 10, -5, 5, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            >
              <Phone size={24} />
            </motion.div>
          </div>
        </div>

        {/* 🔥 Text Section (Right Side) */}
        <div className="bg-white text-primary font-medium px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
          Technical Issue? Call
        </div>
      </a>
    </motion.div>
  );
}