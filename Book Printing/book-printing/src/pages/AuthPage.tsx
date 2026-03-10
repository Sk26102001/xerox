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





import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import logo from '@/assets/logo.jpeg';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OTP states
  const [otpStep, setOtpStep] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const startOtpTimer = () => {
    setCountdown(60);
  };

  const validatePhone = (ph: string) => /^[6-9]\d{9}$/.test(ph);

  const validateRegisterForm = () => {
    if (!name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  // ── Shared OTP input handlers ──
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d$/.test(value) && value !== '') return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // ── Login with Email/Password ──
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/history'), 800);
  };

  // ── Send OTP (login or register) ──
  const handleSendOtp = async (e: React.FormEvent, isRegister = false) => {
    e.preventDefault();
    setError(null);
    if (isRegister && !validateRegisterForm()) return;
    if (!isRegister && !validatePhone(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setOtpStep(true);
    startOtpTimer();
  };

  // ── Verify OTP ──
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;
    setLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 1200));
    if (otpValue === '123456') {
      setSuccess(true);
      setTimeout(() => navigate('/history'), 800);
    } else {
      setError('Invalid OTP – please try again');
      setLoading(false);
    }
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    startOtpTimer();
  };

  useEffect(() => {
    setOtpStep(false);
    setOtp(Array(6).fill(''));
    setError(null);
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    if (mode === 'login') setName('');
  }, [mode, loginMethod]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl border border-blue-100 shadow-md p-8">
              <h1 className="text-2xl font-black mb-2 text-slate-800">
                {mode === 'login'
                  ? otpStep
                    ? 'Enter OTP'
                    : 'Welcome Back'
                  : otpStep
                  ? 'Verify your mobile'
                  : 'Create Account'}
              </h1>

              <p className="text-slate-600 text-sm mb-6">
                {mode === 'login'
                  ? otpStep
                    ? `Code sent to +91 ${phone}`
                    : 'Sign in with your preferred method'
                  : otpStep
                  ? `We sent a 6-digit code to +91 ${phone}`
                  : 'Create your account to track orders & invoices'}
              </p>

              {error && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {mode === 'login' && !otpStep && (
                <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                      loginMethod === 'email'
                        ? 'bg-white shadow-sm text-slate-800'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Email & Password
                  </button>
                  <button
                    onClick={() => setLoginMethod('otp')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                      loginMethod === 'otp'
                        ? 'bg-white shadow-sm text-slate-800'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Mobile OTP
                  </button>
                </div>
              )}

              {/* ── LOGIN ── */}
              {mode === 'login' ? (
                !otpStep ? (
                  loginMethod === 'email' ? (
                    <form onSubmit={handleEmailLogin} className="space-y-4">
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
                        <button type="button" className="text-secondary hover:underline">
                          Forgot password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : success ? (
                          'Redirecting...'
                        ) : (
                          <>
                            Sign In <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={e => handleSendOtp(e)} className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold mb-1 text-slate-700">Mobile Number</label>
                        <div className="relative flex items-center">
                          <div className="absolute left-3 text-slate-500">+91</div>
                          <Phone className="absolute left-10 h-4 w-4 text-slate-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="XXXXXXXXXX"
                            maxLength={10}
                            required
                            className="w-full pl-16 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
                          <>
                            Send OTP <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="flex justify-center gap-3 my-6">
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          ref={el => (otpRefs.current[i] = el)}
                          type="text"
                          maxLength={1}
                          value={d}
                          onChange={e => handleOtpChange(i, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(i, e)}
                          className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                          autoFocus={i === 0}
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.join('').length < 6}
                      className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Verify & Login <CheckCircle2 className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-sm">
                      {countdown > 0 ? (
                        <p className="text-slate-500">
                          Resend in {Math.floor(countdown / 60)}:
                          {(countdown % 60).toString().padStart(2, '0')}
                        </p>
                      ) : (
                        <button type="button" onClick={handleResend} className="text-blue-600 hover:underline">
                          Resend OTP
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setOtpStep(false)}
                        className="block mx-auto mt-3 text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Change number
                      </button>
                    </div>
                  </form>
                )
              ) : (
                // ── REGISTER ──
                !otpStep ? (
                  <form onSubmit={e => handleSendOtp(e, true)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-slate-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
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
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
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
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
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
                          placeholder="At least 8 characters"
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
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Confirm password"
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors mt-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send OTP <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="flex justify-center gap-3 my-6">
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          ref={el => (otpRefs.current[i] = el)}
                          type="text"
                          maxLength={1}
                          value={d}
                          onChange={e => handleOtpChange(i, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(i, e)}
                          className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                          autoFocus={i === 0}
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.join('').length < 6}
                      className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary flex justify-center items-center gap-2 disabled:opacity-60 transition-colors"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Verify & Create Account <CheckCircle2 className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-sm">
                      {countdown > 0 ? (
                        <p className="text-slate-500">
                          Resend in {Math.floor(countdown / 60)}:
                          {(countdown % 60).toString().padStart(2, '0')}
                        </p>
                      ) : (
                        <button type="button" onClick={handleResend} className="text-primary hover:underline">
                          Resend OTP
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setOtpStep(false)}
                        className="block mx-auto mt-3 text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Edit details
                      </button>
                    </div>
                  </form>
                )
              )}

              <div className="mt-6 text-center text-sm text-slate-600">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-primary font-semibold hover:underline"
                >
                  {mode === 'login' ? 'Register' : 'Login'}
                </button>
              </div>

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




