// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';

// const AdminSettings = () => {
//   const { toast } = useToast();
//   const [adminName, setAdminName] = useState('Admin User');
//   const [adminEmail, setAdminEmail] = useState('admin@printshop.com');
//   const [shopName, setShopName] = useState('PrintShop');
//   const [shopAddress, setShopAddress] = useState('123 Print Street, New Delhi');
//   const [shopPhone, setShopPhone] = useState('+91 99999 99999');

//   const handleSave = () => toast({ title: 'Settings Saved', description: 'Your settings have been updated' });

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
//           <h2 className="font-semibold text-foreground">Admin Profile</h2>
//           <div><Label>Name</Label><Input value={adminName} onChange={e => setAdminName(e.target.value)} /></div>
//           <div><Label>Email</Label><Input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} /></div>
//           <div><Label>New Password</Label><Input type="password" placeholder="Leave empty to keep current" /></div>
//           <Button onClick={handleSave} className="bg-primary hover:bg-cyan-light text-primary-foreground">Update Profile</Button>
//         </div>
//         <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
//           <h2 className="font-semibold text-foreground">Shop Details</h2>
//           <div><Label>Shop Name</Label><Input value={shopName} onChange={e => setShopName(e.target.value)} /></div>
//           <div><Label>Address</Label><Input value={shopAddress} onChange={e => setShopAddress(e.target.value)} /></div>
//           <div><Label>Phone</Label><Input value={shopPhone} onChange={e => setShopPhone(e.target.value)} /></div>
//           <Button onClick={handleSave} className="bg-primary hover:bg-cyan-light text-primary-foreground">Update Shop</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Save, User, AlertCircle } from 'lucide-react';
import axiosInstance from "@/api/axios.js";
import { useApp } from '@/context/AppContext';

const AdminSettings = () => {
  const { toast } = useToast();
  const { auth, logout } = useApp();
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [emailChanged, setEmailChanged] = useState(false);

  // Fetch admin profile on component mount
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      setFetchLoading(true);
      console.log('Fetching profile from /auth/me');
      const response = await axiosInstance.get('/auth/me');
      
      console.log('Profile response:', response.data);
      
      if (response.data.success) {
        setAdminName(response.data.data.name);
        setAdminEmail(response.data.data.email);
      } else {
        console.error('Failed to fetch profile:', response.data);
        toast({
          title: 'Error',
          description: response.data.message || 'Failed to fetch profile',
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      console.error('Error response:', error.response);
      
      // Check if it's a 401 (unauthorized) error
      if (error.response?.status === 401) {
        toast({
          title: 'Session Expired',
          description: 'Please login again',
          variant: 'destructive'
        });
        logout();
        window.location.href = '/login';
      } else {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to fetch profile',
          variant: 'destructive'
        });
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const validateForm = () => {
    // Validate name
    if (!adminName.trim()) {
      toast({
        title: 'Error',
        description: 'Name is required',
        variant: 'destructive'
      });
      return false;
    }

    // Validate name length
    if (adminName.trim().length < 2) {
      toast({
        title: 'Error',
        description: 'Name must be at least 2 characters long',
        variant: 'destructive'
      });
      return false;
    }

    // Validate email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!adminEmail.trim() || !emailRegex.test(adminEmail)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      });
      return false;
    }

    // If trying to change password
    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        toast({
          title: 'Error',
          description: 'Please enter current password to change password',
          variant: 'destructive'
        });
        return false;
      }
      
      if (newPassword.length < 6) {
        toast({
          title: 'Error',
          description: 'New password must be at least 6 characters',
          variant: 'destructive'
        });
        return false;
      }
      
      if (newPassword !== confirmPassword) {
        toast({
          title: 'Error',
          description: 'New password and confirm password do not match',
          variant: 'destructive'
        });
        return false;
      }

      // Check if new password is same as current (optional but recommended)
      if (currentPassword === newPassword) {
        toast({
          title: 'Error',
          description: 'New password must be different from current password',
          variant: 'destructive'
        });
        return false;
      }
    }
    
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const updateData: any = {
        name: adminName.trim(),
        email: adminEmail.trim().toLowerCase()
      };
      
      // Only include password fields if trying to change password
      if (newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }
      
      console.log('Updating profile with:', { ...updateData, currentPassword: '***', newPassword: '***' });
      const response = await axiosInstance.put('/auth/update-profile', updateData);
      
      console.log('Update response:', response.data);
      
      if (response.data.success) {
        // Check if email was changed
        const wasEmailChanged = response.data.data.email !== adminEmail;
        
        toast({
          title: 'Success',
          description: wasEmailChanged ? 'Profile updated. Please login again.' : 'Profile updated successfully',
          variant: 'default'
        });
        
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // If email was changed, logout after showing success message
        if (wasEmailChanged) {
          setTimeout(() => {
            toast({
              title: 'Logging out',
              description: 'Please login with your new email address',
              variant: 'default'
            });
            setTimeout(() => {
              logout();
              window.location.href = '/login';
            }, 1500);
          }, 1000);
        }
      }
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      console.error('Error response:', error.response);
      
      // Handle specific error messages
      let errorMessage = 'Failed to update profile';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if any changes were made
  const hasChanges = () => {
    return adminName.trim() !== '' || adminEmail.trim() !== '' || newPassword || confirmPassword;
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>
      
      <div className="max-w-2xl">
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg">Admin Profile</h2>
              <p className="text-sm text-muted-foreground">Manage your account information</p>
            </div>
          </div>
          
          {/* Admin Name */}
          <div>
            <Label htmlFor="adminName">Full Name <span className="text-red-500">*</span></Label>
            <Input 
              id="adminName"
              value={adminName} 
              onChange={e => setAdminName(e.target.value)}
              disabled={loading}
              className="mt-1"
              placeholder="Enter your full name"
            />
          </div>
          
          {/* Admin Email */}
          <div>
            <Label htmlFor="adminEmail">Email Address <span className="text-red-500">*</span></Label>
            <Input 
              id="adminEmail"
              type="email" 
              value={adminEmail} 
              onChange={e => setAdminEmail(e.target.value)}
              disabled={loading}
              className="mt-1"
              placeholder="admin@example.com"
            />
            <div className="flex items-start gap-2 mt-1">
              <AlertCircle className="h-3 w-3 text-yellow-500 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Changing your email will require you to login again with the new email address
              </p>
            </div>
          </div>
          
          {/* Password Change Section */}
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="font-medium text-foreground mb-3">Change Password</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Leave password fields empty if you don't want to change your password
            </p>
            
            {/* Current Password */}
            <div className="mb-3">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative mt-1">
                <Input 
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"} 
                  value={currentPassword} 
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {/* New Password */}
            <div className="mb-3">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative mt-1">
                <Input 
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"} 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 characters)"
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div className="mb-3">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative mt-1">
                <Input 
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {/* Password Requirements */}
            {(newPassword || confirmPassword) && (
              <div className="text-xs space-y-1 mt-2 mb-3 p-3 bg-muted/30 rounded-lg">
                <p className="font-medium mb-1">Password Requirements:</p>
                <p className={`flex items-center gap-1 ${newPassword.length >= 6 ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <span className="inline-block w-3">✓</span> At least 6 characters
                </p>
                <p className={`flex items-center gap-1 ${newPassword === confirmPassword && newPassword ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <span className="inline-block w-3">✓</span> Passwords match
                </p>
                {newPassword && currentPassword === newPassword && (
                  <p className="flex items-center gap-1 text-yellow-500">
                    <span className="inline-block w-3">⚠</span> New password should be different from current password
                  </p>
                )}
                {newPassword && newPassword.length >= 6 && newPassword === confirmPassword && newPassword !== currentPassword && (
                  <p className="text-green-500 mt-1">✓ Password is valid!</p>
                )}
              </div>
            )}
          </div>
          
          {/* Save Button */}
          <Button 
            onClick={handleSave} 
            className="w-full bg-primary hover:bg-cyan-light text-primary-foreground mt-2"
            disabled={loading || (!adminName.trim() && !adminEmail.trim() && !newPassword)}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Profile
              </>
            )}
          </Button>
          
          {/* Info Note */}
          <div className="text-center text-xs text-muted-foreground pt-2">
            <p>Note: Phone number cannot be changed here. Contact support if needed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;