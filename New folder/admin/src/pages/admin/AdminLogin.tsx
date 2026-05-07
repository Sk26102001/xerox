





// import { useState } from 'react';
// import { User } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import axiosInstance from "@/api/axios.js";

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post('/auth/login', {  emailOrPhone: email,  // ← key changed to match backend expectation
//       password });

//       const { token, user } = response.data;

//       if (user.role !== 'admin') {
//         toast({
//           title: 'Access Denied',
//           description: 'You must be an admin to login here',
//           variant: 'destructive'
//         });
//         return;
//       }

//       // Save token + user info in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));

//       toast({ title: 'Admin Login Successful' });
//       navigate('/dashboard');

//     } catch (error: any) {
//       toast({
//         title: 'Login Failed',
//         description: error.response?.data?.message || 'Invalid credentials',
//         variant: 'destructive'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="bg-navy rounded-xl p-8 shadow-2xl w-full max-w-md">
//         <div className="text-center mb-6">
//           <div className="inline-block bg-primary text-primary-foreground font-bold text-sm px-3 py-3 rounded-full mb-3">
//             <User className="h-10 w-10 "/>

//           </div>
//           <h1 className="text-2xl font-bold text-secondary-foreground">Admin Panel Login</h1>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label className="text-secondary-foreground">Email</Label>
//             <Input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder="admin@printshop.com"
//               className="bg-navy-light border-navy-light text-secondary-foreground placeholder:text-secondary-foreground/40"
//               required
//             />
//           </div>
//           <div>
//             <Label className="text-secondary-foreground">Password</Label>
//             <Input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               placeholder="Any password"
//               className="bg-navy-light border-navy-light text-secondary-foreground placeholder:text-secondary-foreground/40"
//               required
//             />
//           </div>
//           <Button
//             type="submit"
//             className="w-full bg-primary hover:bg-cyan-light text-primary-foreground font-semibold"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login to Admin Panel'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;




import { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from "@/api/axios.js";
import { useApp } from '@/context/AppContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        emailOrPhone: email,
        password
      });

      const { token, user } = response.data;

      if (user.role !== 'admin') {
        toast({
          title: 'Access Denied',
          description: 'You must be an admin to login here',
          variant: 'destructive'
        });
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Sync with AppContext
      const success = adminLogin(email, password);
      if (!success) {
        toast({
          title: 'Login Failed',
          description: 'Could not set admin session',
          variant: 'destructive'
        });
        return;
      }

      toast({ title: 'Admin Login Successful' });
      navigate('/dashboard');

    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'Invalid credentials',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-navy rounded-xl p-8 shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block bg-primary text-primary-foreground font-bold text-sm px-3 py-3 rounded-full mb-3">
            <User className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-foreground">Admin Panel Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-secondary-foreground">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@printshop.com"
              className="bg-navy-light border-navy-light text-secondary-foreground placeholder:text-secondary-foreground/40"
              required
            />
          </div>
          <div>
            <Label className="text-secondary-foreground">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              className="bg-navy-light border-navy-light text-secondary-foreground placeholder:text-secondary-foreground/40"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-cyan-light text-primary-foreground font-semibold"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;