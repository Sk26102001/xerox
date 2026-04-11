// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, BookOpen, Phone } from 'lucide-react';
// import logo from '@/assets/logo2.png';

// const navLinks = [
//   { href: '/', label: 'Home' },
//   { href: '/order', label: 'Place Order' },
//   { href: '/tracking', label: 'Track Order' },
//   { href: '/history', label: 'Order History' },
// ];

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-secondary shadow-2xl py-3.5'
//           : 'bg-secondary/95 backdrop-blur-sm py-5'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group">
//             <img
//               src={logo}
//               alt="BookPrinters.in"
//               className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
//             />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 to={link.href}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                   location.pathname === link.href
//                     ? 'bg-primary text-primary-foreground'
//                     : 'text-white/80 hover:text-white hover:bg-white/10'
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center gap-3">
//             <a
//               href="tel:+919999999999"
//               className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200"
//             >
//               <Phone className="h-4 w-4" />
//               <span>Call Us</span>
//             </a>
//             <Link
//               to="/auth"
//               className="px-4 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
//             >
//               Login
//             </Link>
//             <Link
//               to="/order"
//               className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               Order Now
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200"
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//           isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="bg-secondary border-t border-white/10 px-4 py-4 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               to={link.href}
//               className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
//                 location.pathname === link.href
//                   ? 'bg-primary text-primary-foreground'
//                   : 'text-white/80 hover:text-white hover:bg-white/10'
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
//             <Link
//               to="/auth"
//               className="block px-4 py-3 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
//             >
//               Login / Register
//             </Link>
//             <Link
//               to="/order"
//               className="block px-4 py-3 rounded-md text-sm font-bold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
//             >
//               Order Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }




// import { useState, useEffect } from 'react';
// import { useAuth } from "@/context/AuthContext";
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, Phone,ShoppingCart } from 'lucide-react';
// import logo from '@/assets/logo2.png';

// const navLinks = [
//   { href: '/', label: 'Home' },
//   { href: '/order', label: 'Place Order' },
//   { href: '/tracking', label: 'Track Order' },
//   { href: '/history', label: 'Order History' },
// ];

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   const { isAuthenticated, logout } = useAuth();
  

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-white shadow-lg py-2 lg:py-3.5'
//           : 'bg-white shadow-sm py-3 lg:py-5'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} alt="Logo" className="h-14 sm:h-16 lg:h-20 w-auto transition-all duration-300" />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 to={link.href}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                   location.pathname === link.href
//                     ? 'bg-primary text-primary-foreground'
//                     : 'text-gray-800 hover:text-primary hover:bg-gray-100'
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <a
//               href="/contact"
//               className="flex items-center gap-2 text-gray-700 hover:text-primary text-sm font-medium transition-colors duration-200"
//             >
//               <Phone className="h-4 w-4" />
//               <span>Contact Us</span>
//             </a>

//             {/* <Link
//               to="/auth"
//               className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-200"
//             >
//               Login
//             </Link> */}

//             {!isAuthenticated ? (
//   <Link
//     to="/auth"
//     className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-200"
//   >
//     Login
//   </Link>
// ) : (
//   <button
//     onClick={logout}
//     className="px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
//   >
//     Logout
//   </button>
// )}

//             <Link
//               to="/order"
//               className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               Order Now
//             </Link>


//              <Link to="/cart" className="relative group">
//     <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors duration-200 ml-4" />
    
//     {/* Cart Badge */}
//     <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//       1
//     </span>
//   </Link>
//           </div>
          

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//           isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="bg-white border-t border-gray-200 px-4 py-5 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               to={link.href}
//               className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
//                 location.pathname === link.href
//                   ? 'bg-primary text-primary-foreground'
//                   : 'text-gray-800 hover:text-primary hover:bg-gray-50'
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}

//           <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
//             {/* <Link
//               to="/auth"
//               className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50 transition-all duration-200"
//             >
//               Login / Register
//             </Link> */}
//             {!isAuthenticated ? (
//   <Link
//     to="/auth"
//     className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50"
//   >
//     Login / Register
//   </Link>
// ) : (
//   <button
//     onClick={logout}
//     className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
//   >
//     Logout
//   </button>
// )}

//             <Link
//               to="/order"
//               className="block px-4 py-3 rounded-md text-base font-bold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
//             >
//               Order Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }






// import { useState, useEffect } from 'react';
// import { useAuth } from "@/context/AuthContext";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
// import { toast } from "sonner";
// import logo from '@/assets/logo2.png';

// const navLinks = [
//   { href: '/', label: 'Home' },
//   { href: '/order', label: 'Place Order' },
//   { href: '/tracking', label: 'Track Order' },
//   { href: '/history', label: 'Order History' },
// ];

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { isAuthenticated, logout } = useAuth();

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   // ✅ Professional Logout Handler
//   const handleLogout = () => {
//     logout(); // remove token + update state
//     setIsMenuOpen(false); // close mobile menu
//     toast.success("Logged out successfully"); // feedback
//     navigate("/"); // redirect
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-white shadow-lg py-2 lg:py-3.5'
//           : 'bg-white shadow-sm py-3 lg:py-5'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14">

//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} alt="Logo" className="h-14 sm:h-16 lg:h-20 w-auto transition-all duration-300" />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 to={link.href}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                   location.pathname === link.href
//                     ? 'bg-primary text-primary-foreground'
//                     : 'text-gray-800 hover:text-primary hover:bg-gray-100'
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link
//               to="/contact"
//               className="flex items-center gap-2 text-gray-700 hover:text-primary text-sm font-medium transition-colors duration-200"
//             >
//               <Phone className="h-4 w-4" />
//               <span>Contact Us</span>
//             </Link>

//             {/* Auth Button */}
//             {!isAuthenticated ? (
//               <Link
//                 to="/auth"
//                 className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-200"
//               >
//                 Login
//               </Link>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
//               >
//                 Logout
//               </button>
//             )}

//             <Link
//               to="/order"
//               className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               Order Now
//             </Link>

//             {/* Cart */}
//             <Link to="/cart" className="relative group">
//               <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors duration-200 ml-4" />
//               <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                 1
//               </span>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//           isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="bg-white border-t border-gray-200 px-4 py-5 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               to={link.href}
//               className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
//                 location.pathname === link.href
//                   ? 'bg-primary text-primary-foreground'
//                   : 'text-gray-800 hover:text-primary hover:bg-gray-50'
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}

//           <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">

//             {!isAuthenticated ? (
//               <Link
//                 to="/auth"
//                 className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50"
//               >
//                 Login / Register
//               </Link>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
//               >
//                 Logout
//               </button>
//             )}

//             <Link
//               to="/order"
//               className="block px-4 py-3 rounded-md text-base font-bold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
//             >
//               Order Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }






// import { useState, useEffect } from 'react';
// import { useAuth } from "@/context/AuthContext";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
// import { toast } from "sonner";
// import logo from '@/assets/logo2.png';
// import axios from 'axios';

// const navLinks = [
//   { href: '/', label: 'Home' },
//   { href: '/order', label: 'Place Order' },
//   { href: '/tracking', label: 'Track Order' },
//   { href: '/history', label: 'Order History' },
// ];

// // ✅ API with auth header
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { isAuthenticated, logout } = useAuth();

//   // ✅ Fetch cart count
//   const fetchCartCount = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setCartItemCount(0);
//       return;
//     }

//     try {
//       const response = await API.get('/cart');
//       const itemCount = response.data?.items?.length || 0;
//       setCartItemCount(itemCount);
//     } catch (error) {
//       console.error("Error fetching cart count:", error);
//       setCartItemCount(0);
//     }
//   };

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Fetch cart count on mount and when auth changes
//   useEffect(() => {
//     fetchCartCount();
//   }, [isAuthenticated, location.pathname]); // Re-fetch when auth changes or page changes

//   // Close menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   // ✅ Professional Logout Handler
//   const handleLogout = () => {
//     logout(); // remove token + update state
//     setIsMenuOpen(false); // close mobile menu
//     setCartItemCount(0); // reset cart count
//     toast.success("Logged out successfully"); // feedback
//     navigate("/"); // redirect
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-white shadow-lg py-2 lg:py-3.5'
//           : 'bg-white shadow-sm py-3 lg:py-5'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14">

//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} alt="Logo" className="h-14 sm:h-16 lg:h-20 w-auto transition-all duration-300" />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 to={link.href}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                   location.pathname === link.href
//                     ? 'bg-primary text-primary-foreground'
//                     : 'text-gray-800 hover:text-primary hover:bg-gray-100'
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link
//               to="/contact"
//               className="flex items-center gap-2 text-gray-700 hover:text-primary text-sm font-medium transition-colors duration-200"
//             >
//               <Phone className="h-4 w-4" />
//               <span>Contact Us</span>
//             </Link>

//             {/* Auth Button */}
//             {!isAuthenticated ? (
//               <Link
//                 to="/auth"
//                 className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-200"
//               >
//                 Login
//               </Link>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
//               >
//                 Logout
//               </button>
//             )}

//             <Link
//               to="/order"
//               className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               Order Now
//             </Link>

//             {/* Cart Icon with Dynamic Count */}
//             <Link to="/cart" className="relative group ml-4">
//               <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors duration-200" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center shadow-md">
//                   {cartItemCount > 99 ? '99+' : cartItemCount}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//           isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="bg-white border-t border-gray-200 px-4 py-5 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               to={link.href}
//               className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
//                 location.pathname === link.href
//                   ? 'bg-primary text-primary-foreground'
//                   : 'text-gray-800 hover:text-primary hover:bg-gray-50'
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}

//           {/* Mobile Cart Link */}
//           <Link
//             to="/cart"
//             className="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50 transition-all duration-200"
//           >
//             <span>Cart</span>
//             {cartItemCount > 0 && (
//               <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
//                 {cartItemCount}
//               </span>
//             )}
//           </Link>

//           <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">

//             {!isAuthenticated ? (
//               <Link
//                 to="/auth"
//                 className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:text-primary hover:bg-gray-50"
//               >
//                 Login / Register
//               </Link>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
//               >
//                 Logout
//               </button>
//             )}

//             <Link
//               to="/order"
//               className="block px-4 py-3 rounded-md text-base font-bold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
//             >
//               Order Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }








import { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { toast } from "sonner";
import logo from '@/assets/logo2.png';
import axios from 'axios';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/order', label: 'Place Order' },
  { href: '/tracking', label: 'Track Order' },
  { href: '/history', label: 'Order History' },
];

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  // ✅ Fetch cart count safely
  const fetchCartCount = async () => {
    const token = localStorage.getItem('token');

    if (!token || !isAuthenticated) {
      setCartItemCount(0);
      return;
    }

    try {
      const response = await API.get('/cart');
      const itemCount = response.data?.items?.length || 0;
      setCartItemCount(itemCount);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [isAuthenticated, location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // ✅ FIXED LOGOUT
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setCartItemCount(0);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // ✅ FIXED CART NAVIGATION (IMPORTANT FIX)
  const handleCartClick = () => {
    setIsMenuOpen(false);

    if (!isAuthenticated) {
      toast.error("Please login to view cart");
      navigate("/auth");
      return;
    }

    navigate("/cart");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2 lg:py-3.5' : 'bg-white shadow-sm py-3 lg:py-5'
    }`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-14 sm:h-16 lg:h-20 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-800 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">

            <Link
              to="/contact"
              className="flex items-center gap-2 text-gray-700 hover:text-primary text-sm font-medium transition-colors duration-200 hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              <Phone className="h-4 w-4" />
              Contact
            </Link> 

            {!isAuthenticated ? (
              <Link to="/auth" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-200">Login</Link>
            ) : (
              <button onClick={handleLogout}  className="px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200">
                Logout
              </button>
            )}

            <Link
              to="/order"
              className="px-5 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Order Now
            </Link>

            {/* ✅ FIXED CART BUTTON */}
            <button onClick={handleCartClick} className="relative ml-4 h-6 w-6 text-gray-700 transition-all duration-300 
  hover:text-secondary hover:scale-110 active:scale-95 
  drop-shadow-sm hover:drop-shadow-md cursor-pointer">
             <ShoppingCart 
  className="" 
/>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-1.5  ">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>

        <div className="bg-white border-t px-4 py-5 space-y-2">

          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="block py-2">
              {link.label}
            </Link>
          ))}

          {/* Mobile Cart FIX */}
          <button
            onClick={handleCartClick}
            className="flex justify-between w-full py-3"
          >
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="bg-primary text-white text-xs px-2 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {!isAuthenticated ? (
            <Link to="/auth">Login</Link>
          ) : (
            <button onClick={handleLogout} className="text-red-600">
              Logout
            </button>
          )}

        </div>
      </div>

    </nav>
  );
}