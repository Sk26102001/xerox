// import { useState } from 'react';
// import { Plus, Trash2, Edit2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// import axiosInstance from "@/api/axios.js";

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { useApp } from '@/context/AppContext';
// import { useToast } from '@/hooks/use-toast';
// import { Promocode } from '@/types';

// const AdminPromocodes = () => {
//   const { promocodes, setPromocodes } = useApp();
//   const { toast } = useToast();
//   const [open, setOpen] = useState(false);
//   const [form, setForm] = useState<Partial<Promocode>>({ code: '', discountType: 'percentage', discountValue: 10, minOrder: 0, expiryDate: '2026-12-31', usageLimit: 100, active: true });

//   const handleCreate = () => {
//     const newCode: Promocode = {
//       id: `p${Date.now()}`, code: form.code!.toUpperCase(), discountType: form.discountType!,
//       discountValue: form.discountValue!, minOrder: form.minOrder!, expiryDate: form.expiryDate!,
//       usageLimit: form.usageLimit!, usedCount: 0, active: form.active!,
//     };
//     setPromocodes(prev => [...prev, newCode]);
//     toast({ title: 'Promocode Created' });
//     setOpen(false);
//     setForm({ code: '', discountType: 'percentage', discountValue: 10, minOrder: 0, expiryDate: '2026-12-31', usageLimit: 100, active: true });
//   };

//   const handleDelete = (id: string) => {
//     setPromocodes(prev => prev.filter(p => p.id !== id));
//     toast({ title: 'Promocode Deleted' });
//   };

//   const toggleActive = (id: string) => {
//     setPromocodes(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Promocode Management</h1>
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild><Button className="bg-primary hover:bg-cyan-light text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> Create Code</Button></DialogTrigger>
//           <DialogContent>
//             <DialogHeader><DialogTitle>Create Promocode</DialogTitle></DialogHeader>
//             <div className="space-y-4 pt-4">
//               <div><Label>Code</Label><Input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="SAVE10" /></div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><Label>Type</Label>
//                   <Select value={form.discountType} onValueChange={v => setForm({ ...form, discountType: v as any })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="percentage">Percentage (%)</SelectItem><SelectItem value="fixed">Fixed (₹)</SelectItem></SelectContent></Select>
//                 </div>
//                 <div><Label>Value</Label><Input type="number" value={form.discountValue} onChange={e => setForm({ ...form, discountValue: Number(e.target.value) })} /></div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><Label>Min Order (₹)</Label><Input type="number" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: Number(e.target.value) })} /></div>
//                 <div><Label>Usage Limit</Label><Input type="number" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: Number(e.target.value) })} /></div>
//               </div>
//               <div><Label>Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} /></div>
//               <Button onClick={handleCreate} className="w-full bg-primary hover:bg-cyan-light text-primary-foreground">Create</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="bg-card rounded-xl shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Discount</TableHead><TableHead>Min Order</TableHead><TableHead>Used</TableHead><TableHead>Expiry</TableHead><TableHead>Active</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
//           <TableBody>
//             {promocodes.map(p => (
//               <TableRow key={p.id}>
//                 <TableCell className="font-mono font-bold">{p.code}</TableCell>
//                 <TableCell>{p.discountType === 'percentage' ? `${p.discountValue}%` : `₹${p.discountValue}`}</TableCell>
//                 <TableCell>₹{p.minOrder}</TableCell>
//                 <TableCell>{p.usedCount}/{p.usageLimit}</TableCell>
//                 <TableCell className="text-sm">{p.expiryDate}</TableCell>
//                 <TableCell><Switch checked={p.active} onCheckedChange={() => toggleActive(p.id)} /></TableCell>
//                 <TableCell><Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AdminPromocodes;






// import { useState, useEffect, useRef } from 'react';
// import { Plus, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import axiosInstance from "@/api/axios.js";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { useApp } from '@/context/AppContext';
// import { useToast } from '@/hooks/use-toast';

// interface PromoFormData {
//   code: string;
//   discountType: 'percentage' | 'fixed';
//   discountValue: number;
//   minOrder: number;
//   expiryDate: string;
//   usageLimit: number;
//   active: boolean;
// }

// // Define the Promocode type locally
// interface Promocode {
//   id?: string;
//   _id?: string;
//   code: string;
//   discountType: 'percentage' | 'fixed';
//   discountValue: number;
//   minOrder: number;
//   expiryDate: string;
//   usageLimit: number;
//   usedCount: number;
//   perUserLimit?: number;
//   active: boolean;
//   createdAt?: string;
// }

// // Helper function to get unique ID from promo object
// const getPromoId = (promo: Promocode): string => {
//   return promo.id || promo._id || '';
// };

// const AdminPromocodes = () => {
//   const { promocodes, setPromocodes } = useApp();
//   const { toast } = useToast();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const hasFetched = useRef(false);
  
//   const [form, setForm] = useState<PromoFormData>({
//     code: '',
//     discountType: 'percentage',
//     discountValue: 10,
//     minOrder: 0,
//     expiryDate: '2026-12-31',
//     usageLimit: 100,
//     active: true
//   });

//   // Fetch promocodes from API on component mount (only once)
//   useEffect(() => {
//     if (!hasFetched.current) {
//       hasFetched.current = true;
//       fetchPromoCodes();
//     }
//   }, []);

//   const fetchPromoCodes = async () => {
//     try {
//       setInitialLoading(true);
//       console.log('Fetching promocodes from API...');
      
//       const response = await axiosInstance.get('/promocode');
//       console.log('API Response:', response.data);
      
//       if (response.data.success) {
//         // Transform backend data to match frontend Promocode type
//         const transformedPromocodes: Promocode[] = response.data.data.map((item: any) => ({
//           id: item._id || item.id,
//           _id: item._id,
//           code: item.code,
//           discountType: item.discountType,
//           discountValue: item.discountValue,
//           minOrder: item.minOrder,
//           expiryDate: item.expiryDate,
//           usageLimit: item.usageLimit,
//           usedCount: item.usedCount || 0,
//           perUserLimit: item.perUserLimit,
//           active: item.active,
//           createdAt: item.createdAt
//         }));
        
//         console.log('Transformed promocodes:', transformedPromocodes);
//         setPromocodes(transformedPromocodes as any);
//       } else {
//         console.warn('API returned success false:', response.data);
//         if (promocodes.length === 0) {
//           setPromocodes([]);
//         }
//       }
//     } catch (error: any) {
//       console.error('Error fetching promocodes:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.error || 'Failed to fetch promocodes',
//         variant: 'destructive'
//       });
//     } finally {
//       setInitialLoading(false);
//       setLoading(false);
//     }
//   };

//   const handleCreate = async () => {
//     if (!form.code.trim()) {
//       toast({
//         title: 'Error',
//         description: 'Please enter a promo code',
//         variant: 'destructive'
//       });
//       return;
//     }

//     if (form.discountValue <= 0) {
//       toast({
//         title: 'Error',
//         description: 'Discount value must be greater than 0',
//         variant: 'destructive'
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log('Creating promo code:', form);
      
//       const response = await axiosInstance.post('/promocode', {
//         code: form.code.toUpperCase(),
//         discountType: form.discountType,
//         discountValue: Number(form.discountValue),
//         minOrder: Number(form.minOrder),
//         expiryDate: form.expiryDate,
//         usageLimit: Number(form.usageLimit),
//         active: true
//       });
      
//       console.log('Create response:', response.data);
      
//       if (response.data.success) {
//         // Transform the new promo to match frontend Promocode type
//         const newPromo: Promocode = {
//           id: response.data.data._id || response.data.data.id,
//           _id: response.data.data._id,
//           code: response.data.data.code,
//           discountType: response.data.data.discountType,
//           discountValue: response.data.data.discountValue,
//           minOrder: response.data.data.minOrder,
//           expiryDate: response.data.data.expiryDate,
//           usageLimit: response.data.data.usageLimit,
//           usedCount: response.data.data.usedCount || 0,
//           perUserLimit: response.data.data.perUserLimit,
//           active: response.data.data.active,
//           createdAt: response.data.data.createdAt
//         };
        
//         setPromocodes((prev: any) => [...prev, newPromo]);
        
//         toast({
//           title: 'Success',
//           description: 'Promocode created successfully'
//         });
//         setOpen(false);
        
//         setForm({
//           code: '',
//           discountType: 'percentage',
//           discountValue: 10,
//           minOrder: 0,
//           expiryDate: '2026-12-31',
//           usageLimit: 100,
//           active: true
//         });
//       }
//     } catch (error: any) {
//       console.error('Error creating promo code:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.error || 'Failed to create promo',
//         variant: 'destructive'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!id) {
//       console.error('Cannot delete: ID is undefined');
//       toast({
//         title: 'Error',
//         description: 'Invalid promo code ID',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log('Deleting promo code:', id);
      
//       await axiosInstance.delete(`/promocode/${id}`);
      
//       setPromocodes((prev: any) => prev.filter((p: any) => {
//         const promoId = p.id || p._id;
//         return promoId !== id;
//       }));
      
//       toast({
//         title: 'Success',
//         description: 'Promocode deleted successfully'
//       });
//     } catch (error: any) {
//       console.error('Error deleting promo code:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.error || 'Failed to delete promo',
//         variant: 'destructive'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleActive = async (id: string, currentActive: boolean) => {
//     if (!id) {
//       console.error('Cannot toggle: ID is undefined', { id, currentActive });
//       toast({
//         title: 'Error',
//         description: 'Invalid promo code ID',
//         variant: 'destructive'
//       });
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log('Toggling active status for:', id, 'current:', currentActive);
      
//       const response = await axiosInstance.put(`/promocode/${id}`, { 
//         active: !currentActive 
//       });
      
//       console.log('Toggle response:', response.data);
      
//       if (response.data.success) {
//         setPromocodes((prev: any) => prev.map((p: any) => {
//           const promoId = p.id || p._id;
//           if (promoId === id) {
//             return { ...p, active: !p.active };
//           }
//           return p;
//         }));
        
//         toast({
//           title: 'Success',
//           description: `Promocode ${!currentActive ? 'activated' : 'deactivated'} successfully`
//         });
//       }
//     } catch (error: any) {
//       console.error('Error toggling promo code:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.error || 'Failed to update status',
//         variant: 'destructive'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debug: Log when promocodes change
//   useEffect(() => {
//     console.log('Promocodes state updated:', promocodes);
//   }, [promocodes]);

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Promocode Management</h1>
//         <div className="flex gap-2">
//           <Button 
//             variant="outline" 
//             onClick={fetchPromoCodes}
//             disabled={loading || initialLoading}
//           >
//             Refresh
//           </Button>
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <Button 
//                 className="bg-primary hover:bg-cyan-light text-primary-foreground"
//                 disabled={loading}
//               >
//                 <Plus className="h-4 w-4 mr-2" /> 
//                 Create Code
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Create Promocode</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4 pt-4">
//                 <div>
//                   <Label>Code</Label>
//                   <Input 
//                     value={form.code} 
//                     onChange={e => setForm({ ...form, code: e.target.value })} 
//                     placeholder="SAVE10" 
//                     disabled={loading}
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label>Type</Label>
//                     <Select 
//                       value={form.discountType} 
//                       onValueChange={v => setForm({ ...form, discountType: v as any })}
//                       disabled={loading}
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="percentage">Percentage (%)</SelectItem>
//                         <SelectItem value="fixed">Fixed (₹)</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Value</Label>
//                     <Input 
//                       type="number" 
//                       value={form.discountValue} 
//                       onChange={e => setForm({ ...form, discountValue: Number(e.target.value) })} 
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label>Min Order (₹)</Label>
//                     <Input 
//                       type="number" 
//                       value={form.minOrder} 
//                       onChange={e => setForm({ ...form, minOrder: Number(e.target.value) })} 
//                       disabled={loading}
//                     />
//                   </div>
//                   <div>
//                     <Label>Usage Limit</Label>
//                     <Input 
//                       type="number" 
//                       value={form.usageLimit} 
//                       onChange={e => setForm({ ...form, usageLimit: Number(e.target.value) })} 
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <Label>Expiry Date</Label>
//                   <Input 
//                     type="date" 
//                     value={form.expiryDate} 
//                     onChange={e => setForm({ ...form, expiryDate: e.target.value })} 
//                     disabled={loading}
//                   />
//                 </div>
                
//                 <Button 
//                   onClick={handleCreate} 
//                   className="w-full bg-primary hover:bg-cyan-light text-primary-foreground"
//                   disabled={loading}
//                 >
//                   {loading ? 'Creating...' : 'Create'}
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="bg-card rounded-xl shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Code</TableHead>
//               <TableHead>Discount</TableHead>
//               <TableHead>Min Order</TableHead>
//               <TableHead>Used</TableHead>
//               <TableHead>Expiry</TableHead>
//               <TableHead>Active</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {initialLoading ? (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center py-8">
//                   <div className="flex justify-center items-center gap-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
//                     <span>Loading promocodes...</span>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : (!promocodes || promocodes.length === 0) ? (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
//                   No promocodes found. Click "Create Code" to add your first promo code.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               (promocodes as any[]).map((p: any) => {
//                 const uniqueId = p.id || p._id;
//                 return (
//                   <TableRow key={uniqueId}>
//                     <TableCell className="font-mono font-bold">{p.code}</TableCell>
//                     <TableCell>
//                       {p.discountType === 'percentage' ? `${p.discountValue}%` : `₹${p.discountValue}`}
//                     </TableCell>
//                     <TableCell>₹{p.minOrder}</TableCell>
//                     <TableCell>{p.usedCount || 0}/{p.usageLimit}</TableCell>
//                     <TableCell className="text-sm">
//                       {new Date(p.expiryDate).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell>
//                       <Switch 
//                         checked={p.active} 
//                         onCheckedChange={() => toggleActive(uniqueId, p.active)}
//                         disabled={loading}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Button 
//                         variant="ghost" 
//                         size="icon" 
//                         onClick={() => handleDelete(uniqueId)}
//                         disabled={loading}
//                       >
//                         <Trash2 className="h-4 w-4 text-destructive" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AdminPromocodes;





import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from "@/api/axios.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface PromoFormData {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  perUserLimit: number;
  active: boolean;
}

interface Promocode {
  id?: string;
  _id?: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  active: boolean;
  createdAt?: string;
}

const AdminPromocodes = () => {
  const { promocodes, setPromocodes } = useApp();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const hasFetched = useRef(false);

  const [form, setForm] = useState<PromoFormData>({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minOrder: 0,
    expiryDate: '2026-12-31',
    usageLimit: 100,
    perUserLimit: 1,
    active: true
  });

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchPromoCodes();
    }
  }, []);

  const fetchPromoCodes = async () => {
    try {
      setInitialLoading(true);
      const response = await axiosInstance.get('/promocode');
      if (response.data.success) {
        const transformed: Promocode[] = response.data.data.map((item: any) => ({
          id: item._id || item.id,
          _id: item._id,
          code: item.code,
          discountType: item.discountType,
          discountValue: item.discountValue,
          minOrder: item.minOrder,
          expiryDate: item.expiryDate,
          usageLimit: item.usageLimit,
          usedCount: item.usedCount || 0,
          perUserLimit: item.perUserLimit ?? 1,
          active: item.active,
          createdAt: item.createdAt
        }));
        setPromocodes(transformed as any);
      } else {
        if (promocodes.length === 0) setPromocodes([]);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to fetch', variant: 'destructive' });
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!form.code.trim()) {
      toast({ title: 'Error', description: 'Enter promo code', variant: 'destructive' });
      return;
    }
    if (form.discountValue <= 0) {
      toast({ title: 'Error', description: 'Discount must be > 0', variant: 'destructive' });
      return;
    }
    if (form.perUserLimit < 1) {
      toast({ title: 'Error', description: 'Per‑user limit must be at least 1', variant: 'destructive' });
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post('/promocode', {
        code: form.code.toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minOrder: Number(form.minOrder),
        expiryDate: form.expiryDate,
        usageLimit: Number(form.usageLimit),
        perUserLimit: Number(form.perUserLimit),
        active: true
      });

      if (response.data.success) {
        const newPromo: Promocode = {
          id: response.data.data._id,
          _id: response.data.data._id,
          code: response.data.data.code,
          discountType: response.data.data.discountType,
          discountValue: response.data.data.discountValue,
          minOrder: response.data.data.minOrder,
          expiryDate: response.data.data.expiryDate,
          usageLimit: response.data.data.usageLimit,
          usedCount: response.data.data.usedCount || 0,
          perUserLimit: response.data.data.perUserLimit,
          active: response.data.data.active,
          createdAt: response.data.data.createdAt
        };
        setPromocodes((prev: any) => [...prev, newPromo]);
        toast({ title: 'Success', description: 'Promocode created' });
        setOpen(false);
        setForm({
          code: '',
          discountType: 'percentage',
          discountValue: 10,
          minOrder: 0,
          expiryDate: '2026-12-31',
          usageLimit: 100,
          perUserLimit: 1,
          active: true
        });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Creation failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      setLoading(true);
      await axiosInstance.delete(`/promocode/${id}`);
      setPromocodes((prev: any) => prev.filter((p: any) => (p.id || p._id) !== id));
      toast({ title: 'Success', description: 'Deleted' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Delete failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/promocode/${id}`, { active: !currentActive });
      if (response.data.success) {
        setPromocodes((prev: any) =>
          prev.map((p: any) =>
            (p.id || p._id) === id ? { ...p, active: !p.active } : p
          )
        );
        toast({ title: 'Success', description: `Code ${!currentActive ? 'activated' : 'deactivated'}` });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Status update failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Promocode Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchPromoCodes} disabled={loading || initialLoading}>
            Refresh
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary" disabled={loading}>
                <Plus className="h-4 w-4 mr-2" /> Create Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Promocode</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Code</Label>
                  <Input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="SAVE10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={form.discountType} onValueChange={v => setForm({ ...form, discountType: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input type="number" value={form.discountValue} onChange={e => setForm({ ...form, discountValue: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Order (₹)</Label>
                    <Input type="number" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: Number(e.target.value) })} />
                  </div>
                  <div>
                    <Label>Total Usage Limit</Label>
                    <Input type="number" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Per‑User Limit</Label>
                    <Input type="number" min="1" value={form.perUserLimit} onChange={e => setForm({ ...form, perUserLimit: Number(e.target.value) })} />
                    <p className="text-xs text-muted-foreground">Max uses per customer</p>
                  </div>
                  <div>
                    <Label>Expiry Date</Label>
                    <Input type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} />
                  </div>
                </div>
                <Button onClick={handleCreate} className="w-full" disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Min Order</TableHead>
              <TableHead>Used (Total)</TableHead>
              <TableHead>Per‑User Limit</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex justify-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : !promocodes || promocodes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No promocodes found. Click "Create Code" to add one.
                </TableCell>
              </TableRow>
            ) : (
              (promocodes as any[]).map((p: any) => {
                const uniqueId = p.id || p._id;
                return (
                  <TableRow key={uniqueId}>
                    <TableCell className="font-mono font-bold">{p.code}</TableCell>
                    <TableCell>{p.discountType === 'percentage' ? `${p.discountValue}%` : `₹${p.discountValue}`}</TableCell>
                    <TableCell>₹{p.minOrder}</TableCell>
                    <TableCell>{p.usedCount ?? 0} / {p.usageLimit}</TableCell>
                    <TableCell>{p.perUserLimit ?? 1}</TableCell>
                    <TableCell className="text-sm">{new Date(p.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Switch checked={p.active} onCheckedChange={() => toggleActive(uniqueId, p.active)} disabled={loading} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(uniqueId)} disabled={loading}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPromocodes;