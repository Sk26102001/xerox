// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, Phone, Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import logo from '@/assets/logo.jpeg';

// export default function AuthPage() {
//   const [mode, setMode] = useState<'login' | 'register'>('login');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 1500));
//     setLoading(false);
//     setSuccess(true);
//     setTimeout(() => navigate('/history'), 1000);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="pt-20 min-h-screen flex">
//         {/* Left Panel */}
//         <div className="hidden lg:flex lg:w-1/2 bg-secondary flex-col items-center justify-center p-12 relative overflow-hidden">
//           <div className="absolute inset-0 opacity-5">
//             <div className="absolute inset-0" style={{
//               backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
//               backgroundSize: '20px 20px'
//             }} />
//           </div>
//           <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
//           <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          
//           <div className="relative z-10 text-center space-y-6">
//             <img src={logo} alt="BookPrinters.in" className="h-20 w-auto mx-auto" />
//             <h2 className="text-3xl font-black text-white">
//               Where Ideas<br />
//               <span className="text-primary">Ink Themselves</span>
//             </h2>
//             <p className="text-white/60 max-w-xs mx-auto leading-relaxed">
//               Join thousands of students, authors and businesses who trust BookPrinters.in for all their printing needs.
//             </p>
//             <div className="space-y-3">
//               {[
//                 'GST Invoice for every order',
//                 'Real-time order tracking',
//                 'Pan India courier delivery',
//                 'Bulk printing discounts',
//               ].map((point) => (
//                 <div key={point} className="flex items-center gap-2 text-white/70 text-sm">
//                   <div className="w-1.5 h-1.5 bg-primary rounded-full" />
//                   {point}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
//           <div className="w-full max-w-md">
//             {/* Mobile Logo */}
//             <div className="lg:hidden text-center mb-8">
//               <img src={logo} alt="BookPrinters.in" className="h-16 w-auto mx-auto" />
//             </div>

//             <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
//               {/* Tabs */}
//               <div className="flex bg-muted rounded-xl p-1 mb-8">
//                 {[
//                   { value: 'login', label: 'Login' },
//                   { value: 'register', label: 'Register' },
//                 ].map((tab) => (
//                   <button
//                     key={tab.value}
//                     onClick={() => setMode(tab.value as 'login' | 'register')}
//                     className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
//                       mode === tab.value
//                         ? 'bg-white text-foreground shadow-sm'
//                         : 'text-muted-foreground hover:text-foreground'
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               <h1 className="text-2xl font-black text-foreground mb-2">
//                 {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
//               </h1>
//               <p className="text-muted-foreground text-sm mb-6">
//                 {mode === 'login'
//                   ? 'Sign in to access your orders and profile'
//                   : 'Register to track orders and download invoices'}
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {mode === 'register' && (
//                   <div>
//                     <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Your full name"
//                         required
//                         className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {mode === 'register' && (
//                   <div>
//                     <label className="block text-sm font-semibold text-foreground mb-1">Phone / WhatsApp</label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <input
//                         type="tel"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         placeholder="+91 XXXXX XXXXX"
//                         required
//                         className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-1">Email Address</label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="your@email.com"
//                       required
//                       className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-foreground mb-1">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       required
//                       className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </button>
//                   </div>
//                 </div>

//                 {mode === 'login' && (
//                   <div className="text-right">
//                     <button type="button" className="text-primary text-sm hover:underline">
//                       Forgot password?
//                     </button>
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={loading || success}
//                   className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
//                 >
//                   {loading ? (
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   ) : success ? (
//                     <>Success! Redirecting...</>
//                   ) : (
//                     <>
//                       {mode === 'login' ? 'Sign In' : 'Create Account'}
//                       <ArrowRight className="h-4 w-4" />
//                     </>
//                   )}
//                 </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-muted-foreground text-sm">
//                   {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
//                   <button
//                     onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
//                     className="text-primary font-semibold hover:underline"
//                   >
//                     {mode === 'login' ? 'Register' : 'Sign In'}
//                   </button>
//                 </p>
//               </div>

//               <div className="mt-4 pt-4 border-t border-border">
//                 <p className="text-center text-xs text-muted-foreground">
//                   By continuing, you agree to our{' '}
//                   <Link to="/" className="text-primary hover:underline">Terms of Service</Link>
//                   {' '}and{' '}
//                   <Link to="/" className="text-primary hover:underline">Privacy Policy</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import logo from '@/assets/logo.jpeg';
// import { registerUser, loginUser } from "@/api/authApi";

// export default function AuthPage() {
//   const [mode, setMode] = useState<'login' | 'register'>('login');
//   const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');

//   // Form fields
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // OTP states
//   const [otpStep, setOtpStep] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const startOtpTimer = () => {
//     setCountdown(60);
//   };

//   const validatePhone = (ph: string) => /^[6-9]\d{9}$/.test(ph);

//   // const validateRegisterForm = () => {
//   //   if (!name.trim()) {
//   //     setError('Full name is required');
//   //     return false;
//   //   }
//   //   if (!validatePhone(phone)) {
//   //     setError('Please enter a valid 10-digit Indian mobile number');
//   //     return false;
//   //   }
//   //   if (password.length < 8) {
//   //     setError('Password must be at least 8 characters long');
//   //     return false;
//   //   }
//   //   if (password !== confirmPassword) {
//   //     setError('Passwords do not match');
//   //     return false;
//   //   }
//   //   return true;
//   // };



// const handleRegister = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError(null);

//   if (!name || !email || !password || !confirmPassword) {
//     setError("All fields are required");
//     return;
//   }

//   if (password.length < 6) {
//     setError("Password must be at least 6 characters");
//     return;
//   }

//   if (password !== confirmPassword) {
//     setError("Passwords do not match");
//     return;
//   }

//   try {
//     setLoading(true);

//     const res = await registerUser({
//       name,
//       email,
//       password,
//     });

//     localStorage.setItem("token", res.data.token);

//     setSuccess(true);
//     setTimeout(() => navigate("/history"), 800);

//   } catch (err: any) {
//     setError(err.response?.data?.message || "Registration failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   // ── Shared OTP input handlers ──
//   const handleOtpChange = (index: number, value: string) => {
//     if (!/^\d$/.test(value) && value !== '') return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) otpRefs.current[index + 1]?.focus();
//   };

//   const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   // ── Login with Email/Password ──

//   const handleEmailLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError(null);

//   try {
//     setLoading(true);

//     const res = await loginUser({
//       email,
//       password,
//     });

//     localStorage.setItem("token", res.data.token);

//     setSuccess(true);
//     setTimeout(() => navigate("/history"), 800);

//   } catch (err: any) {
//     setError(err.response?.data?.message || "Login failed");
//   } finally {
//     setLoading(false);
//   }
// };
//   // const handleEmailLogin = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError(null);
//   //   await new Promise(r => setTimeout(r, 1500));
//   //   setLoading(false);
//   //   setSuccess(true);
//   //   setTimeout(() => navigate('/history'), 800);
//   // };

//   // ── Send OTP (login or register) ──
//   const handleSendOtp = async (e: React.FormEvent, isRegister = false) => {
//     e.preventDefault();
//     setError(null);
//     if (isRegister && !handleRegisterForm()) return;
//     if (!isRegister && !validatePhone(phone)) {
//       setError('Please enter a valid 10-digit Indian mobile number');
//       return;
//     }
//     setLoading(true);
//     await new Promise(r => setTimeout(r, 1400));
//     setLoading(false);
//     setOtpStep(true);
//     startOtpTimer();
//   };

//   // ── Verify OTP ──
//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const otpValue = otp.join('');
//     if (otpValue.length !== 6) return;
//     setLoading(true);
//     setError(null);
//     await new Promise(r => setTimeout(r, 1200));
//     if (otpValue === '123456') {
//       setSuccess(true);
//       setTimeout(() => navigate('/history'), 800);
//     } else {
//       setError('Invalid OTP – please try again');
//       setLoading(false);
//     }
//   };

//   const handleResend = () => {
//     setOtp(Array(6).fill(''));
//     startOtpTimer();
//   };

//   useEffect(() => {
//     setOtpStep(false);
//     setOtp(Array(6).fill(''));
//     setError(null);
//     setPhone('');
//     setPassword('');
//     setConfirmPassword('');
//     if (mode === 'login') setName('');
//   }, [mode, loginMethod]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <Navbar />

//       <div className="pt-16 min-h-screen flex items-center justify-center">
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
//           <div className="w-full max-w-md">
//             <div className="bg-white rounded-2xl border border-blue-100 shadow-md p-8">
//               <h1 className="text-2xl font-black mb-2 text-slate-800">
//                 {mode === 'login'
//                   ? otpStep
//                     ? 'Enter OTP'
//                     : 'Welcome Back'
//                   : otpStep
//                   ? 'Verify your mobile'
//                   : 'Create Account'}
//               </h1>

//               <p className="text-slate-600 text-sm mb-6">
//                 {mode === 'login'
//                   ? otpStep
//                     ? `Code sent to +91 ${phone}`
//                     : 'Sign in with your preferred method'
//                   : otpStep
//                   ? `We sent a 6-digit code to +91 ${phone}`
//                   : 'Create your account to track orders & invoices'}
//               </p>

//               {error && (
//                 <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
//                   <XCircle className="h-4 w-4" />
//                   {error}
//                 </div>
//               )}

//               {mode === 'login' && !otpStep && (
//                 <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
//                   <button
//                     onClick={() => setLoginMethod('email')}
//                     className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
//                       loginMethod === 'email'
//                         ? 'bg-white shadow-sm text-slate-800'
//                         : 'text-slate-600 hover:text-slate-900'
//                     }`}
//                   >
//                     Email & Password
//                   </button>
//                   <button
//                     onClick={() => setLoginMethod('otp')}
//                     className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
//                       loginMethod === 'otp'
//                         ? 'bg-white shadow-sm text-slate-800'
//                         : 'text-slate-600 hover:text-slate-900'
//                     }`}
//                   >
//                     Mobile OTP
//                   </button>
//                 </div>
//               )}

//               {/* ── LOGIN ── */}
//               {mode === 'login' ? (
//                 !otpStep ? (
//                   loginMethod === 'email' ? (
//                     <form onSubmit={(e) => handleSendOtp(e)} className="space-y-5">
//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type="email"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             placeholder="your@email.com"
//                             required
//                             className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type={showPassword ? 'text' : 'password'}
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             placeholder="••••••••"
//                             required
//                             className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                           >
//                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="text-right text-sm">
//                         <button type="button" className="text-secondary hover:underline">
//                           Forgot password?
//                         </button>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading || success}
//                         className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
//                       >
//                         {loading ? (
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         ) : success ? (
//                           'Redirecting...'
//                         ) : (
//                           <>
//                             Sign In <ArrowRight className="h-4 w-4" />
//                           </>
//                         )}
//                       </button>
//                     </form>
//                   ) : (
//                     <form onSubmit={handleRegister} className="space-y-5">
//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Mobile Number</label>
//                         <div className="relative flex items-center">
//                           <div className="absolute left-3 text-slate-500">+91</div>
//                           <Phone className="absolute left-10 h-4 w-4 text-slate-400" />
//                           <input
//                             type="tel"
//                             value={phone}
//                             onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                             placeholder="XXXXXXXXXX"
//                             maxLength={10}
//                             required
//                             className="w-full pl-16 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
//                       >
//                         {loading ? (
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         ) : (
//                           <>
//                             Send OTP <ArrowRight className="h-4 w-4" />
//                           </>
//                         )}
//                       </button>
//                     </form>
//                   )
//                 ) : (
//                   <form onSubmit={handleVerifyOtp} className="space-y-6">
//                     <div className="flex justify-center gap-3 my-6">
//                       {otp.map((d, i) => (
//                         <input
//                           key={i}
//                           ref={el => (otpRefs.current[i] = el)}
//                           type="text"
//                           maxLength={1}
//                           value={d}
//                           onChange={e => handleOtpChange(i, e.target.value)}
//                           onKeyDown={e => handleOtpKeyDown(i, e)}
//                           className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
//                           autoFocus={i === 0}
//                         />
//                       ))}
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading || otp.join('').length < 6}
//                       className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
//                     >
//                       {loading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Verify & Login <CheckCircle2 className="h-4 w-4" />
//                         </>
//                       )}
//                     </button>

//                     <div className="text-center text-sm">
//                       {countdown > 0 ? (
//                         <p className="text-slate-500">
//                           Resend in {Math.floor(countdown / 60)}:
//                           {(countdown % 60).toString().padStart(2, '0')}
//                         </p>
//                       ) : (
//                         <button type="button" onClick={handleResend} className="text-blue-600 hover:underline">
//                           Resend OTP
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => setOtpStep(false)}
//                         className="block mx-auto mt-3 text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1"
//                       >
//                         <ArrowLeft className="h-3.5 w-3.5" /> Change number
//                       </button>
//                     </div>
//                   </form>
//                 )
//               ) : (
//                 // ── REGISTER ──
//                 !otpStep ? (
//                   <form onSubmit={handleRegister} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Full Name</label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type="text"
//                           value={name}
//                           onChange={e => setName(e.target.value)}
//                           placeholder="Your full name"
//                           required
//                           className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Mobile Number</label>
//                       <div className="relative flex items-center">
//                         <div className="absolute left-3 text-slate-500">+91</div>
//                         <Phone className="absolute left-10 h-4 w-4 text-slate-400" />
//                         <input
//                           type="tel"
//                           value={phone}
//                           onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                           placeholder="XXXXXXXXXX"
//                           maxLength={10}
//                           required
//                           className="w-full pl-16 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type="email"
//                           value={email}
//                           onChange={e => setEmail(e.target.value)}
//                           placeholder="your@email.com"
//                           className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type={showPassword ? 'text' : 'password'}
//                           value={password}
//                           onChange={e => setPassword(e.target.value)}
//                           placeholder="At least 8 characters"
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                         >
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Confirm Password</label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           value={confirmPassword}
//                           onChange={e => setConfirmPassword(e.target.value)}
//                           placeholder="Confirm password"
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                         >
//                           {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors mt-2"
//                     >
//                       {loading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Create Account <ArrowRight className="h-4 w-4" />
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleVerifyOtp} className="space-y-6">
//                     <div className="flex justify-center gap-3 my-6">
//                       {otp.map((d, i) => (
//                         <input
//                           key={i}
//                           ref={el => (otpRefs.current[i] = el)}
//                           type="text"
//                           maxLength={1}
//                           value={d}
//                           onChange={e => handleOtpChange(i, e.target.value)}
//                           onKeyDown={e => handleOtpKeyDown(i, e)}
//                           className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
//                           autoFocus={i === 0}
//                         />
//                       ))}
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading || otp.join('').length < 6}
//                       className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
//                     >
//                       {loading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Verify & Create Account <CheckCircle2 className="h-4 w-4" />
//                         </>
//                       )}
//                     </button>

//                     <div className="text-center text-sm">
//                       {countdown > 0 ? (
//                         <p className="text-slate-500">
//                           Resend in {Math.floor(countdown / 60)}:
//                           {(countdown % 60).toString().padStart(2, '0')}
//                         </p>
//                       ) : (
//                         <button type="button" onClick={handleResend} className="text-primary hover:underline">
//                           Resend OTP
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => setOtpStep(false)}
//                         className="block mx-auto mt-3 text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1"
//                       >
//                         <ArrowLeft className="h-3.5 w-3.5" /> Edit details
//                       </button>
//                     </div>
//                   </form>
//                 )
//               )}

//               <div className="mt-6 text-center text-sm text-slate-600">
//                 {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
//                 <button
//                   onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
//                   className="text-primary font-semibold hover:underline"
//                 >
//                   {mode === 'login' ? 'Register' : 'Login'}
//                 </button>
//               </div>

//               <div className="mt-5 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
//                 By continuing, you agree to our{' '}
//                 <Link to="/terms" className="text-red-600 hover:underline">
//                   Terms & Conditions
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }









// import { useState, useEffect, useRef } from 'react';
// import { useAuth } from "@/context/AuthContext";
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import logo from '@/assets/logo.jpeg';
// import { registerUser, loginUser, forgotPassword } from "@/api/authApi";

// export default function AuthPage() {
//   const [mode, setMode] = useState<'login' | 'register'>('login');
//   const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');

//   const [forgotMode, setForgotMode] = useState(false);
// const [otpSent, setOtpSent] = useState(false);


//   // Form fields
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // OTP states
//   const [otpStep, setOtpStep] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const startOtpTimer = () => {
//     setCountdown(60);
//   };

//   const validatePhone = (ph: string) => /^[6-9]\d{9}$/.test(ph);

//   const { login } = useAuth();

//   const { isAuthenticated } = useAuth();

// useEffect(() => {
//   if (isAuthenticated) {
//     navigate("/auth");
//   }
// }, [isAuthenticated]);
  

// const handleRegister = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError(null);

//   if (!name || !email || !phone || !password || !confirmPassword) {
//     setError("All fields are required");
//     return;
//   }

//   if (password.length < 6) {
//     setError("Password must be at least 6 characters");
//     return;
//   }

//   if (password !== confirmPassword) {
//     setError("Passwords do not match");
//     return;
//   }

//   try {
//     setLoading(true);

//     const res = await registerUser({
//       name,
//       email,
//       phone, 
//       password,
//     });

//   login(res.data.token, res.data.user);

//     setSuccess(true);
//     setTimeout(() => navigate("/order"), 800);

//   } catch (err: any) {
//     setError(err.response?.data?.message || "Registration failed");
//   } finally {
//     setLoading(false);
//   }
// };

// const handleEmailLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError(null);

//   try {
//     setLoading(true);

//     const res = await loginUser({
//       emailOrPhone: email, 
//       password,
//     });

//     // localStorage.setItem("token", res.data.token);
//     login(res.data.token);

//     setSuccess(true);
//     setTimeout(() => navigate("/order"), 800);

//   } catch (err: any) {
//     setError(err.response?.data?.message || "Login failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   // ── Shared OTP input handlers ──
//   const handleOtpChange = (index: number, value: string) => {
//     if (!/^\d$/.test(value) && value !== '') return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) otpRefs.current[index + 1]?.focus();
//   };

//   const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   // ── Send OTP (login or register) ── (currently not used – placeholder)
//   const handleSendOtp = async (e: React.FormEvent, isRegister = false) => {
//     e.preventDefault();
//     setError("Mobile OTP login is not available yet. Please use Email & Password.");
//   };

//   // ── Verify OTP ── (placeholder – not connected to backend)
//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("OTP verification is not implemented yet.");
//   };

//   const handleResend = () => {
//     setOtp(Array(6).fill(''));
//     startOtpTimer();
//   };

//   useEffect(() => {
//     setOtpStep(false);
//     setOtp(Array(6).fill(''));
//     setError(null);
//     setPhone('');
//     setPassword('');
//     setConfirmPassword('');
//     if (mode === 'login') setName('');
//   }, [mode, loginMethod]);



//   const handleForgotPassword = async () => {
//   try {
//     setLoading(true);
//     await forgotPassword({ email });
//     setOtpSent(true);
//   } catch (err: any) {
//     setError(err.response?.data?.message);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <Navbar />

//       <div className="pt-16 min-h-screen flex items-center justify-center">
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
//           <div className="w-full max-w-md">
//             <div className="bg-white rounded-2xl border border-blue-100 shadow-md p-8">
//               <h1 className="text-2xl font-black mb-2 text-slate-800">
//                 {mode === 'login'
//                   ? otpStep
//                     ? 'Enter OTP'
//                     : 'Welcome Back'
//                   : otpStep
//                   ? 'Verify your mobile'
//                   : 'Create Account'}
//               </h1>

//               <p className="text-slate-600 text-sm mb-6">
//                 {mode === 'login'
//                   ? otpStep
//                     ? `Code sent to +91 ${phone}`
//                     : 'Sign in with your preferred method'
//                   : otpStep
//                   ? `We sent a 6-digit code to +91 ${phone}`
//                   : 'Create your account to track orders & invoices'}
//               </p>

//               {error && (
//                 <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
//                   <XCircle className="h-4 w-4" />
//                   {error}
//                 </div>
//               )}

//               {mode === 'login' && !otpStep && (
//                 <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
//                   <button
//                     onClick={() => setLoginMethod('email')}
//                     className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
//                       loginMethod === 'email'
//                         ? 'bg-white shadow-sm text-slate-800'
//                         : 'text-slate-600 hover:text-slate-900'
//                     }`}
//                   >
//                     Email & Password
//                   </button>
//                   <button
//                     onClick={() => setLoginMethod('otp')}
//                     className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
//                       loginMethod === 'otp'
//                         ? 'bg-white shadow-sm text-slate-800'
//                         : 'text-slate-600 hover:text-slate-900'
//                     }`}
//                   >
//                     Mobile OTP
//                   </button>
//                 </div>
//               )}

//               {/* ── LOGIN ── */}
//               {mode === 'login' ? (
//                 !otpStep ? (
//                   loginMethod === 'email' ? (
//                     <form onSubmit={handleEmailLogin} className="space-y-5">
//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type="email"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             placeholder="your@email.com"
//                             required
//                             className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type={showPassword ? 'text' : 'password'}
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             placeholder="••••••••"
//                             required
//                             className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                           >
//                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="text-right text-sm">
//                         {/* <button type="button" className="text-secondary hover:underline">
//                           Forgot password?
//                         </button> */}

//                         <button onClick={() => setForgotMode(true)}  className="text-secondary hover:underline">
//   Forgot password?
// </button>

// {/* ───────── FORGOT PASSWORD ───────── */}
// {forgotMode && (
//   <div className="space-y-4">

//     {!otpSent ? (
//       <>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded-lg"
//         />

//         <button
//           onClick={handleForgotPassword}
//           className="w-full bg-green-600 text-white py-2 rounded-lg"
//         >
//           Send OTP
//         </button>
//       </>
//     ) : (
//       <>
//         <p className="text-green-600 text-sm">
//           OTP sent to your email
//         </p>
//       </>
//     )}

//     <button
//       onClick={() => {
//         setForgotMode(false);
//         setOtpSent(false);
//       }}
//       className="text-sm text-gray-600 hover:underline"
//     >
//       Back to Login
//     </button>
//   </div>
// )}
//                       </div>

                     
//                       <button
//                         type="submit"
//                         disabled={loading || success}
//                         className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
//                       >
//                         {loading ? (
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         ) : success ? (
//                           'Redirecting...'
//                         ) : (
//                           <>
//                             Sign In <ArrowRight className="h-4 w-4" />
//                           </>
//                         )}
//                       </button>
//                     </form>
//                   ) : (
//                     // OTP login placeholder
//                     <div className="py-10 text-center">
//                       <div className="text-6xl mb-4 opacity-70">🔨</div>
//                       <h3 className="text-xl font-semibold mb-3">Mobile OTP Login</h3>
//                       <p className="text-slate-600 mb-6 leading-relaxed">
//                         OTP-based login is coming soon.<br />
//                         For now, please use <strong>Email & Password</strong>.
//                       </p>
//                       <button
//                         onClick={() => setLoginMethod('email')}
//                         className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                       >
//                         Switch to Email Login
//                       </button>
//                     </div>
//                   )
//                 ) : (
//                   <form onSubmit={handleVerifyOtp} className="space-y-6">
//                     <div className="flex justify-center gap-3 my-6">
//                       {otp.map((d, i) => (
//                         <input
//                           key={i}
//                           ref={el => (otpRefs.current[i] = el)}
//                           type="text"
//                           maxLength={1}
//                           value={d}
//                           onChange={e => handleOtpChange(i, e.target.value)}
//                           onKeyDown={e => handleOtpKeyDown(i, e)}
//                           className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
//                           autoFocus={i === 0}
//                         />
//                       ))}
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading || otp.join('').length < 6}
//                       className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
//                     >
//                       {loading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Verify & Login <CheckCircle2 className="h-4 w-4" />
//                         </>
//                       )}
//                     </button>

//                     <div className="text-center text-sm">
//                       {countdown > 0 ? (
//                         <p className="text-slate-500">
//                           Resend in {Math.floor(countdown / 60)}:
//                           {(countdown % 60).toString().padStart(2, '0')}
//                         </p>
//                       ) : (
//                         <button type="button" onClick={handleResend} className="text-blue-600 hover:underline">
//                           Resend OTP
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => setOtpStep(false)}
//                         className="block mx-auto mt-3 text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1"
//                       >
//                         <ArrowLeft className="h-3.5 w-3.5" /> Change number
//                       </button>
//                     </div>
//                   </form>
//                 )
//               ) : (
//                 // ── REGISTER ──
//                 !otpStep ? (
//                   <form onSubmit={handleRegister} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Full Name</label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type="text"
//                           value={name}
//                           onChange={e => setName(e.target.value)}
//                           placeholder="Your full name"
//                           required
//                           className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Mobile Number</label>
//                       <div className="relative flex items-center">
//                         <div className="absolute left-3 text-slate-500">+91</div>
//                         <Phone className="absolute left-10 h-4 w-4 text-slate-400" />
//                         <input
//                           type="tel"
//                           value={phone}
//                           onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                           placeholder="XXXXXXXXXX"
//                           maxLength={10}
//                           required
//                           className="w-full pl-16 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type="email"
//                           value={email}
//                           onChange={e => setEmail(e.target.value)}
//                           placeholder="your@email.com"
//                           className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type={showPassword ? 'text' : 'password'}
//                           value={password}
//                           onChange={e => setPassword(e.target.value)}
//                           placeholder="At least 6 characters"
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                         >
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Confirm Password</label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           value={confirmPassword}
//                           onChange={e => setConfirmPassword(e.target.value)}
//                           placeholder="Confirm password"
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                         >
//                           {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading || success}
//                       className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors mt-2"
//                     >
//                       {loading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : success ? (
//                         'Redirecting...'
//                       ) : (
//                         <>
//                           Create Account <ArrowRight className="h-4 w-4" />
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleVerifyOtp} className="space-y-6">
//                     <div className="flex justify-center gap-3 my-6">
//                       {otp.map((d, i) => (
//                         <input
//                           key={i}
//                           ref={el => (otpRefs.current[i] = el)}
//                           type="text"
//                           maxLength={1}
//                           value={d}
//                           onChange={e => handleOtpChange(i, e.target.value)}
//                           onKeyDown={e => handleOtpKeyDown(i, e)}
//                           className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
//                           autoFocus={i === 0}
//                         />
//                       ))}
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading || otp.join('').length < 6}
//                       className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
//                     >
//                       {loading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           Verify & Create Account <CheckCircle2 className="h-4 w-4" />
//                         </>
//                       )}
//                     </button>

//                     <div className="text-center text-sm">
//                       {countdown > 0 ? (
//                         <p className="text-slate-500">
//                           Resend in {Math.floor(countdown / 60)}:
//                           {(countdown % 60).toString().padStart(2, '0')}
//                         </p>
//                       ) : (
//                         <button type="button" onClick={handleResend} className="text-primary hover:underline">
//                           Resend OTP
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => setOtpStep(false)}
//                         className="block mx-auto mt-3 text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1"
//                       >
//                         <ArrowLeft className="h-3.5 w-3.5" /> Edit details
//                       </button>
//                     </div>
//                   </form>
//                 )
//               )}

//               <div className="mt-6 text-center text-sm text-slate-600">
//                 {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
//                 <button
//                   onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
//                   className="text-primary font-semibold hover:underline"
//                 >
//                   {mode === 'login' ? 'Register' : 'Login'}
//                 </button>
//               </div>

//               <div className="mt-5 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
//                 By continuing, you agree to our{' '}
//                 <Link to="/terms" className="text-red-600 hover:underline">
//                   Terms & Conditions
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }






// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   CheckCircle2,
//   XCircle,
//   ArrowLeft,
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { useAuth } from "@/context/AuthContext";
// import {
//   registerUser,
//   loginUser,
//   forgotPassword,
//   resetPasswordWithOtp,     // ← updated name
// } from "@/api/authApi";

// export default function AuthPage() {
//   const [mode, setMode] = useState<'login' | 'register'>('login');
//   const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');

//   // Forgot password flow states
//   const [forgotMode, setForgotMode] = useState(false);
//   const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'new-password' | 'success'>('email');

//   // Form fields
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // OTP timer
//   const [countdown, setCountdown] = useState(0);
//   const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const navigate = useNavigate();
//   const { login, isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/order");
//     }
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const startOtpTimer = () => setCountdown(60);

//   // ─── REGISTER ────────────────────────────────────────────────────────
//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmNewPassword) {
//       setError("All fields are required");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }
//     if (password !== confirmNewPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await registerUser({
//         name: name.trim(),
//         email: email.trim().toLowerCase(),
//         phone: phone.trim(),
//         password,
//       });
//       login(res.data.token, res.data.user);
//       setTimeout(() => navigate("/order"), 800);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── EMAIL LOGIN ─────────────────────────────────────────────────────
//   const handleEmailLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!email.trim() || !password) {
//       setError("Email and password are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await loginUser({
//         emailOrPhone: email.trim(),
//         password,
//       });
//       login(res.data.token, res.data.user);
//       setTimeout(() => navigate("/order"), 800);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Login failed – check credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── FORGOT PASSWORD – 1. Send OTP ───────────────────────────────────
//   const handleSendResetOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!email.trim() || !email.includes('@')) {
//       setError("Please enter a valid email");
//       return;
//     }

//     try {
//       setLoading(true);
//       await forgotPassword({ email: email.trim() });
//       setForgotStep('otp');
//       setOtp(Array(6).fill(''));
//       startOtpTimer();
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to send reset code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── FORGOT PASSWORD – 2. Verify OTP & Reset Password ────────────────
//   const handleResetWithOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     const otpValue = otp.join('');
//     if (otpValue.length !== 6) {
//       setError("Please enter the full 6-digit code");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       await resetPasswordWithOtp({
//         email: email.trim(),
//         otp: otpValue,
//         newPassword,
//       });

//       // Success
//       setForgotStep('success');
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Invalid or expired code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // OTP input handlers
//   const handleOtpChange = (index: number, value: string) => {
//     if (value !== '' && !/^\d$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) otpRefs.current[index + 1]?.focus();
//   };

//   const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleResendOtp = () => handleSendResetOtp({ preventDefault: () => {} } as any);

//   // ────────────────────────────────────────────────────────────────
//   // RENDER
//   // ────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <Navbar />

//       <div className="pt-16 min-h-screen flex items-center justify-center">
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
//           <div className="w-full max-w-md">
//             <div className="bg-white rounded-2xl border border-blue-100 shadow-md p-8">

//               <h1 className="text-2xl font-black mb-2 text-slate-800">
//                 {forgotMode
//                   ? forgotStep === 'email' ? 'Reset Password'
//                   : forgotStep === 'otp' ? 'Enter Reset Code'
//                   : forgotStep === 'new-password' ? 'Set New Password'
//                   : 'Password Reset Complete'
//                   : mode === 'login' ? 'Welcome Back'
//                   : 'Create Account'}
//               </h1>

//               <p className="text-slate-600 text-sm mb-6">
//                 {forgotMode
//                   ? forgotStep === 'email' ? 'Enter your registered email'
//                   : forgotStep === 'otp' ? `Code sent to ${email}`
//                   : forgotStep === 'new-password' ? 'Choose a strong new password'
//                   : 'You can now sign in with your new password.'
//                   : mode === 'login' ? 'Sign in to your account'
//                   : 'Create your account to track orders & invoices'}
//               </p>

//               {error && (
//                 <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
//                   <XCircle className="h-4 w-4" />
//                   {error}
//                 </div>
//               )}

//               {forgotMode ? (
//                 <>
//                   {forgotStep === 'email' && (
//                     <form onSubmit={handleSendResetOtp} className="space-y-5">
//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type="email"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             placeholder="your@email.com"
//                             required
//                             className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                         </div>
//                       </div>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
//                       >
//                         {loading ? (
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         ) : (
//                           <>Send Reset Code <ArrowRight className="h-4 w-4" /></>
//                         )}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setForgotMode(false)}
//                         className="block mx-auto text-sm text-slate-600 hover:text-slate-800 mt-3"
//                       >
//                         ← Back to Login
//                       </button>
//                     </form>
//                   )}

//                   {forgotStep === 'otp' && (
//                     <form onSubmit={handleResetWithOtp} className="space-y-6">
//                       <div className="flex justify-center gap-3 my-6">
//                         {otp.map((d, i) => (
//                           <input
//                             key={i}
//                             ref={el => otpRefs.current[i] = el}
//                             type="text"
//                             maxLength={1}
//                             value={d}
//                             onChange={e => handleOtpChange(i, e.target.value)}
//                             onKeyDown={e => handleOtpKeyDown(i, e)}
//                             className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
//                             autoFocus={i === 0}
//                           />
//                         ))}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">New Password</label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type={showNewPassword ? 'text' : 'password'}
//                             value={newPassword}
//                             onChange={e => setNewPassword(e.target.value)}
//                             placeholder="At least 6 characters"
//                             required
//                             className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                           >
//                             {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </button>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Confirm New Password</label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type={showNewPassword ? 'text' : 'password'}
//                             value={confirmNewPassword}
//                             onChange={e => setConfirmNewPassword(e.target.value)}
//                             placeholder="Confirm password"
//                             required
//                             className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
//                       >
//                         {loading ? (
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         ) : (
//                           <>Reset Password <CheckCircle2 className="h-4 w-4" /></>
//                         )}
//                       </button>

//                       <div className="text-center text-sm mt-4">
//                         {countdown > 0 ? (
//                           <p className="text-slate-500">
//                             Resend in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
//                           </p>
//                         ) : (
//                           <button type="button" onClick={handleResendOtp} className="text-blue-600 hover:underline">
//                             Resend Code
//                           </button>
//                         )}
//                       </div>
//                     </form>
//                   )}

//                   {forgotStep === 'success' && (
//                     <div className="text-center py-10 space-y-6">
//                       <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
//                       <h3 className="text-xl font-semibold text-green-700">Password Reset Successful!</h3>
//                       <p className="text-slate-600">You can now sign in with your new password.</p>
//                       <button
//                         onClick={() => {
//                           setForgotMode(false);
//                           setForgotStep('email');
//                           setEmail('');
//                           setNewPassword('');
//                           setConfirmNewPassword('');
//                           setOtp(Array(6).fill(''));
//                         }}
//                         className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors"
//                       >
//                         Return to Login
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 // ── LOGIN ──
//                 mode === 'login' ? (
//                   loginMethod === 'email' ? (
//                     <form onSubmit={handleEmailLogin} className="space-y-5">
//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type="email"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             placeholder="your@email.com"
//                             required
//                             className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                           <input
//                             type={showPassword ? 'text' : 'password'}
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             placeholder="••••••••"
//                             required
//                             className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                           >
//                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="text-right text-sm">
//                         <button
//                           type="button"
//                           onClick={() => setForgotMode(true)}
//                           className="text-secondary hover:underline"
//                         >
//                           Forgot password?
//                         </button>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
//                       >
//                         {loading ? (
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         ) : (
//                           <>Sign In <ArrowRight className="h-4 w-4" /></>
//                         )}
//                       </button>
//                     </form>
//                   ) : (
//                     <div className="py-10 text-center">
//                       <div className="text-6xl mb-4 opacity-70">🔨</div>
//                       <h3 className="text-xl font-semibold mb-3">Mobile OTP Login</h3>
//                       <p className="text-slate-600 mb-6">
//                         OTP login coming soon.<br />
//                         Use Email & Password for now.
//                       </p>
//                       <button
//                         onClick={() => setLoginMethod('email')}
//                         className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                       >
//                         Switch to Email Login
//                       </button>
//                     </div>
//                   )
//                 ) : (
//                   // ── REGISTER ──
//                   <form onSubmit={handleRegister} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Full Name</label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type="text"
//                           value={name}
//                           onChange={e => setName(e.target.value)}
//                           placeholder="Your full name"
//                           required
//                           className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Mobile Number</label>
//                       <div className="relative flex items-center">
//                         <div className="absolute left-3 text-slate-500">+91</div>
//                         <Phone className="absolute left-10 h-4 w-4 text-slate-400" />
//                         <input
//                           type="tel"
//                           value={phone}
//                           onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
//                           placeholder="XXXXXXXXXX"
//                           maxLength={10}
//                           required
//                           className="w-full pl-16 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type="email"
//                           value={email}
//                           onChange={e => setEmail(e.target.value)}
//                           placeholder="your@email.com"
//                           required
//                           className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type={showPassword ? 'text' : 'password'}
//                           value={password}
//                           onChange={e => setPassword(e.target.value)}
//                           placeholder="At least 6 characters"
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                         >
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold mb-1 text-slate-700">Confirm Password</label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//                         <input
//                           type={showPassword ? 'text' : 'password'}
//                           value={confirmNewPassword}
//                           onChange={e => setConfirmNewPassword(e.target.value)}
//                           placeholder="Confirm password"
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                         />
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors mt-2"
//                     >
//                       {loading ? (
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <>Create Account <ArrowRight className="h-4 w-4" /></>
//                       )}
//                     </button>
//                   </form>
//                 )
//               )}

//               {!forgotMode && (
//                 <div className="mt-6 text-center text-sm text-slate-600">
//                   {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
//                   <button
//                     onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
//                     className="text-primary font-semibold hover:underline"
//                   >
//                     {mode === 'login' ? 'Register' : 'Login'}
//                   </button>
//                 </div>
//               )}

//               <div className="mt-5 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
//                 By continuing, you agree to our{' '}
//                 <Link to="/terms" className="text-red-600 hover:underline">
//                   Terms & Conditions
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from "@/context/AuthContext";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPasswordWithOtp,
  sendRegistrationOtp,    // new API function
  verifyRegistrationOtp,  // new API function
} from "@/api/authApi";

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');

  // Registration OTP flow
  const [regStep, setRegStep] = useState<'form' | 'otp'>('form');
  const [regEmail, setRegEmail] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regOtp, setRegOtp] = useState<string[]>(Array(6).fill(''));
  const [regOtpTimer, setRegOtpTimer] = useState(0);
  const regOtpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Forgot password flow
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'new-password' | 'success'>('email');

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/order");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (regOtpTimer > 0) {
      const timer = setTimeout(() => setRegOtpTimer(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [regOtpTimer]);

  const startOtpTimer = () => setCountdown(60);
  const startRegOtpTimer = () => setRegOtpTimer(60);

  // ─── REGISTRATION – STEP 1: SEND OTP ────────────────────────────────
  const handleSendRegistrationOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regPhone.trim() || !regEmail.trim() || !regPassword || !regConfirmPassword) {
      setError("All fields are required");
      return;
    }
    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // Call API to send OTP to the provided email
      await sendRegistrationOtp({ email: regEmail.trim().toLowerCase() });
      setRegStep('otp');
      setRegOtp(Array(6).fill(''));
      startRegOtpTimer();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // ─── REGISTRATION – STEP 2: VERIFY OTP & CREATE ACCOUNT ──────────────
  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const otpValue = regOtp.join('');
    if (otpValue.length !== 6) {
      setError("Please enter the full 6-digit code");
      return;
    }

    try {
      setLoading(true);
      // Verify OTP
      await verifyRegistrationOtp({ email: regEmail.trim().toLowerCase(), otp: otpValue });
      
      // OTP verified – now create the account
      const res = await registerUser({
        name: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim(),
        password: regPassword,
      });
      login(res.data.token, res.data.user);
      setTimeout(() => navigate("/order"), 800);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP input handlers (for both forgot and registration)
  const handleOtpChange = (index: number, value: string, isReg = false) => {
    if (value !== '' && !/^\d$/.test(value)) return;
    if (isReg) {
      const newOtp = [...regOtp];
      newOtp[index] = value;
      setRegOtp(newOtp);
      if (value && index < 5) regOtpRefs.current[index + 1]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>, isReg = false) => {
    if (e.key === 'Backspace') {
      if (isReg) {
        if (regOtp[index] === '' && index > 0) regOtpRefs.current[index - 1]?.focus();
      } else {
        if (otp[index] === '' && index > 0) otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendRegOtp = () => handleSendRegistrationOtp({ preventDefault: () => {} } as any);

  // ─── FORGOT PASSWORD (unchanged) ───────────────────────────────────
  const handleSendResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes('@')) {
      setError("Please enter a valid email");
      return;
    }
    try {
      setLoading(true);
      await forgotPassword({ email: email.trim() });
      setForgotStep('otp');
      setOtp(Array(6).fill(''));
      startOtpTimer();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetWithOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError("Please enter the full 6-digit code");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await resetPasswordWithOtp({ email: email.trim(), otp: otpValue, newPassword });
      setForgotStep('success');
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => handleSendResetOtp({ preventDefault: () => {} } as any);

  // ─── EMAIL LOGIN (unchanged) ────────────────────────────────────────
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      const res = await loginUser({ emailOrPhone: email.trim(), password });
      login(res.data.token, res.data.user);
      setTimeout(() => navigate("/order"), 800);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed – check credentials");
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl border border-blue-100 shadow-md p-8">

              <h1 className="text-2xl font-black mb-2 text-slate-800">
                {forgotMode
                  ? forgotStep === 'email' ? 'Reset Password'
                  : forgotStep === 'otp' ? 'Enter Reset Code'
                  : forgotStep === 'new-password' ? 'Set New Password'
                  : 'Password Reset Complete'
                  : mode === 'login' ? 'Welcome Back'
                  : regStep === 'form' ? 'Create Account'
                  : 'Verify Your Email'}
              </h1>

              <p className="text-slate-600 text-sm mb-6">
                {forgotMode
                  ? forgotStep === 'email' ? 'Enter your registered email'
                  : forgotStep === 'otp' ? `Code sent to ${email}`
                  : forgotStep === 'new-password' ? 'Choose a strong new password'
                  : 'You can now sign in with your new password.'
                  : mode === 'login' ? 'Sign in to your account'
                  : regStep === 'form' 
                    ? 'Create your account to track orders & invoices'
                    : `We sent a 6‑digit code to ${regEmail}`}
              </p>

              {error && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {forgotMode ? (
                // ── FORGOT PASSWORD (unchanged) ─────────────────────────
                <>
                  {forgotStep === 'email' && (
                    <form onSubmit={handleSendResetOtp} className="space-y-5">
                      {/* ... same as before ... */}
                      <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Send Reset Code <ArrowRight className="h-4 w-4" /></>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setForgotMode(false)}
                        className="block mx-auto text-sm text-slate-600 hover:text-slate-800 mt-3"
                      >
                        ← Back to Login
                      </button>
                    </form>
                  )}

                  {forgotStep === 'otp' && (
                    <form onSubmit={handleResetWithOtp} className="space-y-6">
                      <div className="flex justify-center gap-3 my-6">
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            ref={el => otpRefs.current[i] = el}
                            type="text"
                            maxLength={1}
                            value={d}
                            onChange={e => handleOtpChange(i, e.target.value, false)}
                            onKeyDown={e => handleOtpKeyDown(i, e, false)}
                            className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                            autoFocus={i === 0}
                          />
                        ))}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            required
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700">Confirm New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            placeholder="Confirm password"
                            required
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
                      >
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Reset Password <CheckCircle2 className="h-4 w-4" /></>}
                      </button>
                      <div className="text-center text-sm mt-4">
                        {countdown > 0 ? (
                          <p className="text-slate-500">Resend in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</p>
                        ) : (
                          <button type="button" onClick={handleResendOtp} className="text-blue-600 hover:underline">Resend Code</button>
                        )}
                      </div>
                    </form>
                  )}

                  {forgotStep === 'success' && (
                    <div className="text-center py-10 space-y-6">
                      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                      <h3 className="text-xl font-semibold text-green-700">Password Reset Successful!</h3>
                      <p className="text-slate-600">You can now sign in with your new password.</p>
                      <button
                        onClick={() => {
                          setForgotMode(false);
                          setForgotStep('email');
                          setEmail('');
                          setNewPassword('');
                          setConfirmNewPassword('');
                          setOtp(Array(6).fill(''));
                        }}
                        className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors"
                      >
                        Return to Login
                      </button>
                    </div>
                  )}
                </>
              ) : mode === 'login' ? (
                // ── LOGIN (unchanged) ─────────────────────────────────────
                loginMethod === 'email' ? (
                  <form onSubmit={handleEmailLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <button type="button" onClick={() => setForgotMode(true)} className="text-secondary hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
                    >
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight className="h-4 w-4" /></>}
                    </button>
                  </form>
                ) : (
                  <div className="py-10 text-center">
                    <div className="text-6xl mb-4 opacity-70">🔨</div>
                    <h3 className="text-xl font-semibold mb-3">Mobile OTP Login</h3>
                    <p className="text-slate-600 mb-6">OTP login coming soon.<br />Use Email & Password for now.</p>
                    <button onClick={() => setLoginMethod('email')} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Switch to Email Login
                    </button>
                  </div>
                )
              ) : regStep === 'form' ? (
                // ── REGISTRATION FORM (Step 1) ─────────────────────────────
                <form onSubmit={handleSendRegistrationOtp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={regName}
                        onChange={e => setRegName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">Mobile Number</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-slate-500">+91</div>
                      <Phone className="absolute left-10 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="XXXXXXXXXX"
                        maxLength={10}
                        required
                        className="w-full pl-16 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        required
                        className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={e => setRegConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                        className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors mt-2"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continue <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </form>
              ) : (
                // ── OTP VERIFICATION (Step 2) ──────────────────────────────
                <form onSubmit={handleVerifyOtpAndRegister} className="space-y-6">
                  <div className="flex justify-center gap-3 my-6">
                    {regOtp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={el => regOtpRefs.current[idx] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(idx, e.target.value, true)}
                        onKeyDown={e => handleOtpKeyDown(idx, e, true)}
                        className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Verify & Create Account <CheckCircle2 className="h-4 w-4" /></>}
                  </button>

                  <div className="text-center text-sm">
                    {regOtpTimer > 0 ? (
                      <p className="text-slate-500">Resend in {Math.floor(regOtpTimer / 60)}:{(regOtpTimer % 60).toString().padStart(2, '0')}</p>
                    ) : (
                      <button type="button" onClick={handleResendRegOtp} className="text-blue-600 hover:underline">
                        Resend Code
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setRegStep('form')}
                    className="block mx-auto text-sm text-slate-500 hover:text-slate-700 mt-2"
                  >
                    ← Edit email or details
                  </button>
                </form>
              )}

              {!forgotMode && mode === 'login' && (
                <div className="mt-6 text-center text-sm text-slate-600">
                  Don't have an account?{' '}
                  <button onClick={() => setMode('register')} className="text-primary font-semibold hover:underline">
                    Register
                  </button>
                </div>
              )}
              {!forgotMode && mode === 'register' && regStep === 'form' && (
                <div className="mt-6 text-center text-sm text-slate-600">
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="text-primary font-semibold hover:underline">
                    Login
                  </button>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-red-600 hover:underline">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}