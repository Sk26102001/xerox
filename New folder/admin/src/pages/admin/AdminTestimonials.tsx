// import { useState } from 'react';
// import { Star, Plus, Trash2, Edit2, Check, X, MessageSquareQuote } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import { toast } from 'sonner';

// interface Testimonial {
//   id: string;
//   name: string;
//   role: string;
//   content: string;
//   rating: number;
//   active: boolean;
//   createdAt: string;
// }

// const initialTestimonials: Testimonial[] = [
//   { id: 't1', name: 'Rahul Sharma', role: 'Student', content: 'Amazing print quality and super fast delivery! Best printing service I have used so far.', rating: 5, active: true, createdAt: '2026-01-15' },
//   { id: 't2', name: 'Priya Patel', role: 'Business Owner', content: 'We get all our brochures printed here. The color accuracy is outstanding and prices are very reasonable.', rating: 5, active: true, createdAt: '2026-02-01' },
//   { id: 't3', name: 'Amit Kumar', role: 'Professor', content: 'Reliable service for bulk printing of course materials. The binding quality is excellent.', rating: 4, active: true, createdAt: '2026-02-10' },
//   { id: 't4', name: 'Sneha Reddy', role: 'Designer', content: 'Perfect for portfolio prints. The paper options are great and staff is very helpful.', rating: 5, active: false, createdAt: '2026-02-20' },
// ];

// const AdminTestimonials = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [form, setForm] = useState({ name: '', role: '', content: '', rating: 5 });

//   const resetForm = () => { setForm({ name: '', role: '', content: '', rating: 5 }); setEditingId(null); setShowForm(false); };

//   const handleSubmit = () => {
//     if (!form.name || !form.content) { toast.error('Name and content are required'); return; }
//     if (editingId) {
//       setTestimonials(prev => prev.map(t => t.id === editingId ? { ...t, ...form } : t));
//       toast.success('Testimonial updated');
//     } else {
//       const newT: Testimonial = { id: `t${Date.now()}`, ...form, active: true, createdAt: new Date().toISOString().split('T')[0] };
//       setTestimonials(prev => [newT, ...prev]);
//       toast.success('Testimonial added');
//     }
//     resetForm();
//   };

//   const handleEdit = (t: Testimonial) => {
//     setForm({ name: t.name, role: t.role, content: t.content, rating: t.rating });
//     setEditingId(t.id);
//     setShowForm(true);
//   };

//   const handleDelete = (id: string) => {
//     setTestimonials(prev => prev.filter(t => t.id !== id));
//     toast.success('Testimonial deleted');
//   };

//   const toggleActive = (id: string) => {
//     setTestimonials(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
//         <Button onClick={() => { resetForm(); setShowForm(true); }} className="gap-2">
//           <Plus className="h-4 w-4" /> Add Testimonial
//         </Button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="bg-card rounded-xl p-6 shadow-sm mb-6 border border-border">
//           <h3 className="font-semibold text-foreground mb-4">{editingId ? 'Edit' : 'Add'} Testimonial</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <Input placeholder="Customer Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
//             <Input placeholder="Role / Title" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
//           </div>
//           <Textarea placeholder="Testimonial content..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="mb-4" rows={3} />
//           <div className="flex items-center gap-3 mb-4">
//             <span className="text-sm text-muted-foreground">Rating:</span>
//             {[1, 2, 3, 4, 5].map(r => (
//               <button key={r} onClick={() => setForm(f => ({ ...f, rating: r }))}>
//                 <Star className={`h-5 w-5 ${r <= form.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
//               </button>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <Button onClick={handleSubmit} className="gap-2"><Check className="h-4 w-4" /> {editingId ? 'Update' : 'Save'}</Button>
//             <Button variant="outline" onClick={resetForm} className="gap-2"><X className="h-4 w-4" /> Cancel</Button>
//           </div>
//         </div>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">Total</p>
//           <p className="text-2xl font-bold text-foreground">{testimonials.length}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">Active</p>
//           <p className="text-2xl font-bold text-green-500">{testimonials.filter(t => t.active).length}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">Avg Rating</p>
//           <p className="text-2xl font-bold text-yellow-500">{(testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">5-Star</p>
//           <p className="text-2xl font-bold text-primary">{testimonials.filter(t => t.rating === 5).length}</p>
//         </div>
//       </div>

//       {/* Testimonials List */}
//       <div className="space-y-4">
//         {testimonials.map(t => (
//           <div key={t.id} className="bg-card rounded-xl p-5 shadow-sm border border-border flex flex-col md:flex-row md:items-start gap-4">
//             <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//               <MessageSquareQuote className="h-5 w-5 text-primary" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 mb-1">
//                 <span className="font-semibold text-foreground">{t.name}</span>
//                 {t.role && <span className="text-xs text-muted-foreground">• {t.role}</span>}
//               </div>
//               <div className="flex gap-0.5 mb-2">
//                 {[1, 2, 3, 4, 5].map(r => (
//                   <Star key={r} className={`h-3.5 w-3.5 ${r <= t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
//                 ))}
//               </div>
//               <p className="text-sm text-muted-foreground">{t.content}</p>
//               <p className="text-xs text-muted-foreground mt-2">Added: {t.createdAt}</p>
//             </div>
//             <div className="flex items-center gap-3 shrink-0">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-muted-foreground">{t.active ? 'Active' : 'Hidden'}</span>
//                 <Switch checked={t.active} onCheckedChange={() => toggleActive(t.id)} />
//               </div>
//               <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}><Edit2 className="h-4 w-4" /></Button>
//               <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminTestimonials;








// import { useState, useEffect, useRef } from 'react';
// import { Star, Plus, Trash2, Edit2, Check, X, MessageSquareQuote } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import { toast } from 'sonner';
// import axiosInstance from "@/api/axios.js";

// // Define Testimonial type locally
// interface Testimonial {
//   id?: string;
//   _id?: string;
//   name: string;
//   role: string;
//   content: string;
//   rating: number;
//   active: boolean;
//   createdAt: string;
// }

// interface TestimonialFormData {
//   name: string;
//   role: string;
//   content: string;
//   rating: number;
// }

// // Helper function to get unique ID
// const getTestimonialId = (testimonial: Testimonial): string => {
//   return testimonial.id || testimonial._id || '';
// };

// const AdminTestimonials = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const hasFetched = useRef(false);
//   const [form, setForm] = useState<TestimonialFormData>({ 
//     name: '', 
//     role: '', 
//     content: '', 
//     rating: 5 
//   });

//   // Fetch testimonials on component mount
//   useEffect(() => {
//     if (!hasFetched.current) {
//       hasFetched.current = true;
//       fetchTestimonials();
//     }
//   }, []);

//   const fetchTestimonials = async () => {
//     try {
//       setInitialLoading(true);
//       console.log('Fetching testimonials from API...');
      
//       const response = await axiosInstance.get('/testimonials');
//       console.log('API Response:', response.data);
      
//       if (response.data.success) {
//         // Transform backend data to match frontend Testimonial type
//         const transformedTestimonials: Testimonial[] = response.data.data.map((item: any) => ({
//           id: item._id || item.id,
//           _id: item._id,
//           name: item.name,
//           role: item.role || '',
//           content: item.content,
//           rating: item.rating,
//           active: item.active,
//           createdAt: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
//         }));
        
//         console.log('Transformed testimonials:', transformedTestimonials);
//         setTestimonials(transformedTestimonials);
//       } else {
//         console.warn('API returned success false:', response.data);
//         setTestimonials([]);
//       }
//     } catch (error: any) {
//       console.error('Error fetching testimonials:', error);
//       toast.error(error.response?.data?.error || 'Failed to fetch testimonials');
//     } finally {
//       setInitialLoading(false);
//       setLoading(false);
//     }
//   };

//   const resetForm = () => { 
//     setForm({ name: '', role: '', content: '', rating: 5 }); 
//     setEditingId(null); 
//     setShowForm(false); 
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.content) { 
//       toast.error('Name and content are required'); 
//       return; 
//     }
    
//     if (form.rating < 1 || form.rating > 5) {
//       toast.error('Rating must be between 1 and 5');
//       return;
//     }
    
//     try {
//       setLoading(true);
      
//       if (editingId) {
//         // Update existing testimonial
//         console.log('Updating testimonial:', editingId, form);
//         const response = await axiosInstance.put(`/testimonials/${editingId}`, {
//           name: form.name,
//           role: form.role,
//           content: form.content,
//           rating: form.rating
//         });
        
//         if (response.data.success) {
//           // Update in state
//           setTestimonials(prev => prev.map(t => {
//             const id = t.id || t._id;
//             if (id === editingId) {
//               return {
//                 ...t,
//                 name: form.name,
//                 role: form.role,
//                 content: form.content,
//                 rating: form.rating
//               };
//             }
//             return t;
//           }));
//           toast.success('Testimonial updated successfully');
//         }
//       } else {
//         // Create new testimonial
//         console.log('Creating new testimonial:', form);
//         const response = await axiosInstance.post('/testimonials', {
//           name: form.name,
//           role: form.role,
//           content: form.content,
//           rating: form.rating,
//           active: true
//         });
        
//         if (response.data.success) {
//           // Transform the new testimonial
//           const newTestimonial: Testimonial = {
//             id: response.data.data._id || response.data.data.id,
//             _id: response.data.data._id,
//             name: response.data.data.name,
//             role: response.data.data.role || '',
//             content: response.data.data.content,
//             rating: response.data.data.rating,
//             active: response.data.data.active,
//             createdAt: new Date().toISOString().split('T')[0]
//           };
          
//           setTestimonials(prev => [newTestimonial, ...prev]);
//           toast.success('Testimonial added successfully');
//         }
//       }
      
//       resetForm();
//     } catch (error: any) {
//       console.error('Error saving testimonial:', error);
//       toast.error(error.response?.data?.error || 'Failed to save testimonial');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (testimonial: Testimonial) => {
//     setForm({ 
//       name: testimonial.name, 
//       role: testimonial.role || '', 
//       content: testimonial.content, 
//       rating: testimonial.rating 
//     });
//     setEditingId(getTestimonialId(testimonial));
//     setShowForm(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!id) {
//       toast.error('Invalid testimonial ID');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log('Deleting testimonial:', id);
      
//       await axiosInstance.delete(`/testimonials/${id}`);
      
//       setTestimonials(prev => prev.filter(t => {
//         const testimonialId = t.id || t._id;
//         return testimonialId !== id;
//       }));
      
//       toast.success('Testimonial deleted successfully');
//     } catch (error: any) {
//       console.error('Error deleting testimonial:', error);
//       toast.error(error.response?.data?.error || 'Failed to delete testimonial');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleActive = async (id: string, currentActive: boolean) => {
//     if (!id) {
//       toast.error('Invalid testimonial ID');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log('Toggling active status for:', id, 'current:', currentActive);
      
//       const response = await axiosInstance.put(`/testimonials/${id}`, { 
//         active: !currentActive 
//       });
      
//       if (response.data.success) {
//         setTestimonials(prev => prev.map(t => {
//           const testimonialId = t.id || t._id;
//           if (testimonialId === id) {
//             return { ...t, active: !t.active };
//           }
//           return t;
//         }));
        
//         toast.success(`Testimonial ${!currentActive ? 'activated' : 'hidden'} successfully`);
//       }
//     } catch (error: any) {
//       console.error('Error toggling testimonial:', error);
//       toast.error(error.response?.data?.error || 'Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate stats
//   const activeCount = testimonials.filter(t => t.active).length;
//   const totalRatings = testimonials.reduce((sum, t) => sum + t.rating, 0);
//   const avgRating = testimonials.length > 0 ? (totalRatings / testimonials.length).toFixed(1) : '0';
//   const fiveStarCount = testimonials.filter(t => t.rating === 5).length;

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
//         <Button 
//           onClick={() => { resetForm(); setShowForm(true); }} 
//           className="gap-2"
//           disabled={loading}
//         >
//           <Plus className="h-4 w-4" /> Add Testimonial
//         </Button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="bg-card rounded-xl p-6 shadow-sm mb-6 border border-border">
//           <h3 className="font-semibold text-foreground mb-4">{editingId ? 'Edit' : 'Add'} Testimonial</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <Input 
//               placeholder="Customer Name" 
//               value={form.name} 
//               onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//               disabled={loading}
//             />
//             <Input 
//               placeholder="Role / Title (e.g., Student, Business Owner)" 
//               value={form.role} 
//               onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
//               disabled={loading}
//             />
//           </div>
//           <Textarea 
//             placeholder="Testimonial content..." 
//             value={form.content} 
//             onChange={e => setForm(f => ({ ...f, content: e.target.value }))} 
//             className="mb-4" 
//             rows={3}
//             disabled={loading}
//           />
//           <div className="flex items-center gap-3 mb-4">
//             <span className="text-sm text-muted-foreground">Rating:</span>
//             {[1, 2, 3, 4, 5].map(r => (
//               <button 
//                 key={r} 
//                 onClick={() => setForm(f => ({ ...f, rating: r }))}
//                 disabled={loading}
//                 type="button"
//               >
//                 <Star className={`h-5 w-5 ${r <= form.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
//               </button>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <Button onClick={handleSubmit} className="gap-2" disabled={loading}>
//               <Check className="h-4 w-4" /> 
//               {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')}
//             </Button>
//             <Button variant="outline" onClick={resetForm} className="gap-2" disabled={loading}>
//               <X className="h-4 w-4" /> Cancel
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">Total</p>
//           <p className="text-2xl font-bold text-foreground">{testimonials.length}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">Active</p>
//           <p className="text-2xl font-bold text-green-500">{activeCount}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">Avg Rating</p>
//           <p className="text-2xl font-bold text-yellow-500">{avgRating}</p>
//         </div>
//         <div className="bg-card rounded-xl p-4 shadow-sm text-center">
//           <p className="text-xs text-muted-foreground mb-1">5-Star</p>
//           <p className="text-2xl font-bold text-primary">{fiveStarCount}</p>
//         </div>
//       </div>

//       {/* Testimonials List */}
//       {initialLoading ? (
//         <div className="text-center py-8">
//           <div className="flex justify-center items-center gap-2">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
//             <span className="text-muted-foreground">Loading testimonials...</span>
//           </div>
//         </div>
//       ) : testimonials.length === 0 ? (
//         <div className="text-center py-8 text-muted-foreground">
//           No testimonials found. Click "Add Testimonial" to add your first review.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {testimonials.map(t => {
//             const uniqueId = getTestimonialId(t);
//             return (
//               <div key={uniqueId} className="bg-card rounded-xl p-5 shadow-sm border border-border flex flex-col md:flex-row md:items-start gap-4">
//                 <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                   <MessageSquareQuote className="h-5 w-5 text-primary" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="font-semibold text-foreground">{t.name}</span>
//                     {t.role && <span className="text-xs text-muted-foreground">• {t.role}</span>}
//                   </div>
//                   <div className="flex gap-0.5 mb-2">
//                     {[1, 2, 3, 4, 5].map(r => (
//                       <Star key={r} className={`h-3.5 w-3.5 ${r <= t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
//                     ))}
//                   </div>
//                   <p className="text-sm text-muted-foreground">{t.content}</p>
//                   <p className="text-xs text-muted-foreground mt-2">Added: {t.createdAt}</p>
//                 </div>
//                 <div className="flex items-center gap-3 shrink-0">
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-muted-foreground">{t.active ? 'Active' : 'Hidden'}</span>
//                     <Switch 
//                       checked={t.active} 
//                       onCheckedChange={() => toggleActive(uniqueId, t.active)}
//                       disabled={loading}
//                     />
//                   </div>
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     onClick={() => handleEdit(t)}
//                     disabled={loading}
//                   >
//                     <Edit2 className="h-4 w-4" />
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     onClick={() => handleDelete(uniqueId)} 
//                     className="text-destructive hover:text-destructive"
//                     disabled={loading}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminTestimonials;




import { useState, useEffect, useRef } from 'react';
import { Star, Plus, Trash2, Edit2, Check, X, MessageSquareQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import axiosInstance from "@/api/axios.js";

// Define Testimonial type locally
interface Testimonial {
  id?: string;
  _id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  active: boolean;
  createdAt: string;
}

interface TestimonialFormData {
  name: string;
  role: string;
  content: string;
  rating: number;
}

// Helper function to get unique ID
const getTestimonialId = (testimonial: Testimonial): string => {
  return testimonial.id || testimonial._id || '';
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const hasFetched = useRef(false);
  const [form, setForm] = useState<TestimonialFormData>({ 
    name: '', 
    role: '', 
    content: '', 
    rating: 5 
  });

  // Fetch testimonials on component mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchTestimonials();
    }
  }, []);

  const fetchTestimonials = async () => {
    try {
      setInitialLoading(true);
      console.log('📡 Fetching testimonials from API...');
      
      // Make sure to include auth token
      const response = await axiosInstance.get('/testimonials');
      console.log('📦 Full API Response:', response);
      console.log('📊 Response data:', response.data);
      
      if (response.data.success) {
        // Check if data is paginated or direct array
        let testimonialsData = [];
        if (Array.isArray(response.data.data)) {
          testimonialsData = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data.testimonials)) {
          testimonialsData = response.data.data.testimonials;
        } else {
          testimonialsData = [];
        }
        
        console.log(`✅ Found ${testimonialsData.length} testimonials`);
        
        // Transform backend data to match frontend Testimonial type
        const transformedTestimonials: Testimonial[] = testimonialsData.map((item: any) => ({
          id: item._id || item.id,
          _id: item._id,
          name: item.name || '',
          role: item.role || '',
          content: item.content || '',
          rating: item.rating || 5,
          active: item.active === true,
          createdAt: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));
        
        console.log('✨ Transformed testimonials:', transformedTestimonials);
        setTestimonials(transformedTestimonials);
      } else {
        console.warn('⚠️ API returned success false:', response.data);
        setTestimonials([]);
        toast.error(response.data.error || 'Failed to fetch testimonials');
      }
    } catch (error: any) {
      console.error('🔴 Error fetching testimonials:', error);
      
      // Better error messages
      if (error.response?.status === 401) {
        toast.error('Authentication required. Please login again.');
      } else if (error.response?.status === 403) {
        toast.error('Admin access required.');
      } else if (error.response?.status === 404) {
        toast.error('Testimonials endpoint not found. Please check API route.');
      } else {
        toast.error(error.response?.data?.error || 'Failed to fetch testimonials');
      }
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  };

  const resetForm = () => { 
    setForm({ name: '', role: '', content: '', rating: 5 }); 
    setEditingId(null); 
    setShowForm(false); 
  };

  const handleSubmit = async () => {
    if (!form.name || !form.content) { 
      toast.error('Name and content are required'); 
      return; 
    }
    
    if (form.rating < 1 || form.rating > 5) {
      toast.error('Rating must be between 1 and 5');
      return;
    }
    
    try {
      setLoading(true);
      
      if (editingId) {
        // Update existing testimonial
        console.log('✏️ Updating testimonial:', editingId, form);
        const response = await axiosInstance.put(`/testimonials/${editingId}`, {
          name: form.name,
          role: form.role,
          content: form.content,
          rating: form.rating
        });
        
        if (response.data.success) {
          // Update in state
          setTestimonials(prev => prev.map(t => {
            const id = t.id || t._id;
            if (id === editingId) {
              return {
                ...t,
                name: form.name,
                role: form.role,
                content: form.content,
                rating: form.rating
              };
            }
            return t;
          }));
          toast.success('Testimonial updated successfully');
          resetForm();
        }
      } else {
        // Create new testimonial
        console.log('➕ Creating new testimonial:', form);
        const response = await axiosInstance.post('/testimonials', {
          name: form.name,
          role: form.role,
          content: form.content,
          rating: form.rating,
          active: true
        });
        
        if (response.data.success) {
          // Transform the new testimonial
          const newTestimonial: Testimonial = {
            id: response.data.data._id || response.data.data.id,
            _id: response.data.data._id,
            name: response.data.data.name,
            role: response.data.data.role || '',
            content: response.data.data.content,
            rating: response.data.data.rating,
            active: response.data.data.active,
            createdAt: new Date().toISOString().split('T')[0]
          };
          
          setTestimonials(prev => [newTestimonial, ...prev]);
          toast.success('Testimonial added successfully');
          resetForm();
        }
      }
    } catch (error: any) {
      console.error('🔴 Error saving testimonial:', error);
      toast.error(error.response?.data?.error || 'Failed to save testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setForm({ 
      name: testimonial.name, 
      role: testimonial.role || '', 
      content: testimonial.content, 
      rating: testimonial.rating 
    });
    setEditingId(getTestimonialId(testimonial));
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error('Invalid testimonial ID');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }
    
    try {
      setLoading(true);
      console.log('🗑️ Deleting testimonial:', id);
      
      await axiosInstance.delete(`/testimonials/${id}`);
      
      setTestimonials(prev => prev.filter(t => {
        const testimonialId = t.id || t._id;
        return testimonialId !== id;
      }));
      
      toast.success('Testimonial deleted successfully');
    } catch (error: any) {
      console.error('🔴 Error deleting testimonial:', error);
      toast.error(error.response?.data?.error || 'Failed to delete testimonial');
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    if (!id) {
      toast.error('Invalid testimonial ID');
      return;
    }
    
    try {
      setLoading(true);
      console.log('🔄 Toggling active status for:', id, 'current:', currentActive);
      
      const response = await axiosInstance.put(`/testimonials/${id}`, { 
        active: !currentActive 
      });
      
      if (response.data.success) {
        setTestimonials(prev => prev.map(t => {
          const testimonialId = t.id || t._id;
          if (testimonialId === id) {
            return { ...t, active: !t.active };
          }
          return t;
        }));
        
        toast.success(`Testimonial ${!currentActive ? 'activated' : 'hidden'} successfully`);
      }
    } catch (error: any) {
      console.error('🔴 Error toggling testimonial:', error);
      toast.error(error.response?.data?.error || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const activeCount = testimonials.filter(t => t.active).length;
  const totalRatings = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const avgRating = testimonials.length > 0 ? (totalRatings / testimonials.length).toFixed(1) : '0';
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
        <Button 
          onClick={() => { resetForm(); setShowForm(true); }} 
          className="gap-2"
          disabled={loading}
        >
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-card rounded-xl p-6 shadow-sm mb-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">{editingId ? 'Edit' : 'Add'} Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input 
              placeholder="Customer Name" 
              value={form.name} 
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              disabled={loading}
            />
            <Input 
              placeholder="Role / Title (e.g., Student, Business Owner)" 
              value={form.role} 
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              disabled={loading}
            />
          </div>
          <Textarea 
            placeholder="Testimonial content..." 
            value={form.content} 
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))} 
            className="mb-4" 
            rows={3}
            disabled={loading}
          />
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Rating:</span>
            {[1, 2, 3, 4, 5].map(r => (
              <button 
                key={r} 
                onClick={() => setForm(f => ({ ...f, rating: r }))}
                disabled={loading}
                type="button"
              >
                <Star className={`h-5 w-5 ${r <= form.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="gap-2" disabled={loading}>
              <Check className="h-4 w-4" /> 
              {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')}
            </Button>
            <Button variant="outline" onClick={resetForm} className="gap-2" disabled={loading}>
              <X className="h-4 w-4" /> Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-muted-foreground mb-1">Total</p>
          <p className="text-2xl font-bold text-foreground">{testimonials.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-muted-foreground mb-1">Active</p>
          <p className="text-2xl font-bold text-green-500">{activeCount}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-muted-foreground mb-1">Avg Rating</p>
          <p className="text-2xl font-bold text-yellow-500">{avgRating}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm text-center">
          <p className="text-xs text-muted-foreground mb-1">5-Star</p>
          <p className="text-2xl font-bold text-primary">{fiveStarCount}</p>
        </div>
      </div>

      {/* Testimonials List */}
      {initialLoading ? (
        <div className="text-center py-8">
          <div className="flex justify-center items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Loading testimonials...</span>
          </div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No testimonials found. Click "Add Testimonial" to add your first review.
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map(t => {
            const uniqueId = getTestimonialId(t);
            return (
              <div key={uniqueId} className="bg-card rounded-xl p-5 shadow-sm border border-border flex flex-col md:flex-row md:items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquareQuote className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{t.name}</span>
                    {t.role && <span className="text-xs text-muted-foreground">• {t.role}</span>}
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map(r => (
                      <Star key={r} className={`h-3.5 w-3.5 ${r <= t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{t.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">Added: {t.createdAt}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.active ? 'Active' : 'Hidden'}</span>
                    <Switch 
                      checked={t.active} 
                      onCheckedChange={() => toggleActive(uniqueId, t.active)}
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEdit(t)}
                    disabled={loading}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(uniqueId)} 
                    className="text-destructive hover:text-destructive"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;