


import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from "@/api/axios.js";

// Define Offer type locally
interface Offer {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  appliesTo: 'all' | 'bw' | 'color' | 'student';
  startDate: string;
  endDate: string;
  minPurchase: number;
  maxDiscount: number | null;
  active: boolean;
  createdAt?: string;
}

interface OfferFormData {
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  appliesTo: 'all' | 'bw' | 'color' | 'student';
  startDate: string;
  endDate: string;
  minPurchase: number;
  maxDiscount: number | null;
  active: boolean;
}

// Helper function to get unique ID from offer object
const getOfferId = (offer: Offer): string => {
  return offer.id || offer._id || '';
};

const AdminOffers = () => {
  const { offers, setOffers } = useApp();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const hasFetched = useRef(false);
  
  const [form, setForm] = useState<OfferFormData>({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: 10,
    appliesTo: 'all',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    minPurchase: 0,
    maxDiscount: null,
    active: true,
  });

  const appliesToLabel: Record<string, string> = {
    all: 'All Orders',
    bw: 'B&W Only',
    color: 'Color Only',
    student: 'Students'
  };

  // Fetch offers on component mount (only once)
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchOffers();
    }
  }, []);

  const fetchOffers = async () => {
    try {
      setInitialLoading(true);
      console.log('Fetching offers from API...');
      
      const response = await axiosInstance.get('/offers');
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        // Transform backend data to match frontend Offer type
        const transformedOffers: Offer[] = response.data.data.map((item: any) => ({
          id: item._id || item.id,
          _id: item._id,
          title: item.title,
          description: item.description,
          discountType: item.discountType,
          discountValue: item.discountValue,
          appliesTo: item.appliesTo,
          startDate: item.startDate,
          endDate: item.endDate,
          minPurchase: item.minPurchase || 0,
          maxDiscount: item.maxDiscount || null,
          active: item.active,
          createdAt: item.createdAt
        }));
        
        console.log('Transformed offers:', transformedOffers);
        setOffers(transformedOffers as any);
      } else {
        console.warn('API returned success false:', response.data);
        if (offers.length === 0) {
          setOffers([]);
        }
      }
    } catch (error: any) {
      console.error('Error fetching offers:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to fetch offers',
        variant: 'destructive'
      });
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    // Validate form
    if (!form.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an offer title',
        variant: 'destructive'
      });
      return;
    }

    if (!form.description.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an offer description',
        variant: 'destructive'
      });
      return;
    }

    if (form.discountValue <= 0) {
      toast({
        title: 'Error',
        description: 'Discount value must be greater than 0',
        variant: 'destructive'
      });
      return;
    }

    if (new Date(form.startDate) > new Date(form.endDate)) {
      toast({
        title: 'Error',
        description: 'End date must be after start date',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      console.log('Creating offer:', form);
      
      const response = await axiosInstance.post('/offers', {
        title: form.title,
        description: form.description,
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        appliesTo: form.appliesTo,
        startDate: form.startDate,
        endDate: form.endDate,
        minPurchase: Number(form.minPurchase),
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : null,
        active: true
      });
      
      console.log('Create response:', response.data);
      
      if (response.data.success) {
        // Transform the new offer to match frontend Offer type
        const newOffer: Offer = {
          id: response.data.data._id || response.data.data.id,
          _id: response.data.data._id,
          title: response.data.data.title,
          description: response.data.data.description,
          discountType: response.data.data.discountType,
          discountValue: response.data.data.discountValue,
          appliesTo: response.data.data.appliesTo,
          startDate: response.data.data.startDate,
          endDate: response.data.data.endDate,
          minPurchase: response.data.data.minPurchase || 0,
          maxDiscount: response.data.data.maxDiscount || null,
          active: response.data.data.active,
          createdAt: response.data.data.createdAt
        };
        
        setOffers((prev: any) => [...prev, newOffer]);
        
        toast({
          title: 'Success',
          description: 'Offer created successfully'
        });
        setOpen(false);
        
        // Reset form
        setForm({
          title: '',
          description: '',
          discountType: 'percentage',
          discountValue: 10,
          appliesTo: 'all',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          minPurchase: 0,
          maxDiscount: null,
          active: true,
        });
      }
    } catch (error: any) {
      console.error('Error creating offer:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to create offer',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error('Cannot delete: ID is undefined');
      toast({
        title: 'Error',
        description: 'Invalid offer ID',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setLoading(true);
      console.log('Deleting offer:', id);
      
      await axiosInstance.delete(`/offers/${id}`);
      
      setOffers((prev: any) => prev.filter((o: any) => {
        const offerId = o.id || o._id;
        return offerId !== id;
      }));
      
      toast({
        title: 'Success',
        description: 'Offer deleted successfully'
      });
    } catch (error: any) {
      console.error('Error deleting offer:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to delete offer',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    if (!id) {
      console.error('Cannot toggle: ID is undefined', { id, currentActive });
      toast({
        title: 'Error',
        description: 'Invalid offer ID',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setLoading(true);
      console.log('Toggling active status for:', id, 'current:', currentActive);
      
      const response = await axiosInstance.put(`/offers/${id}`, { 
        active: !currentActive 
      });
      
      console.log('Toggle response:', response.data);
      
      if (response.data.success) {
        setOffers((prev: any) => prev.map((o: any) => {
          const offerId = o.id || o._id;
          if (offerId === id) {
            return { ...o, active: !o.active };
          }
          return o;
        }));
        
        toast({
          title: 'Success',
          description: `Offer ${!currentActive ? 'activated' : 'deactivated'} successfully`
        });
      }
    } catch (error: any) {
      console.error('Error toggling offer:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to update status',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Debug: Log when offers change
  useEffect(() => {
    console.log('Offers state updated:', offers);
  }, [offers]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Offers Management</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={fetchOffers}
            disabled={loading || initialLoading}
          >
            Refresh
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-primary hover:bg-cyan-light text-primary-foreground"
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-2" /> 
                Create Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Title</Label>
                  <Input 
                    value={form.title} 
                    onChange={e => setForm({ ...form, title: e.target.value })} 
                    placeholder="Summer Sale"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Input 
                    value={form.description} 
                    onChange={e => setForm({ ...form, description: e.target.value })} 
                    placeholder="Get 20% off on all orders"
                    disabled={loading}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Discount Type</Label>
                    <Select 
                      value={form.discountType} 
                      onValueChange={v => setForm({ ...form, discountType: v as any })}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Discount Value</Label>
                    <Input 
                      type="number" 
                      value={form.discountValue} 
                      onChange={e => setForm({ ...form, discountValue: Number(e.target.value) })} 
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Purchase (₹)</Label>
                    <Input 
                      type="number" 
                      value={form.minPurchase} 
                      onChange={e => setForm({ ...form, minPurchase: Number(e.target.value) })} 
                      placeholder="0"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label>Max Discount (₹)</Label>
                    <Input 
                      type="number" 
                      value={form.maxDiscount || ''} 
                      onChange={e => setForm({ ...form, maxDiscount: e.target.value ? Number(e.target.value) : null })} 
                      placeholder="Optional"
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Applies To</Label>
                  <Select 
                    value={form.appliesTo} 
                    onValueChange={v => setForm({ ...form, appliesTo: v as any })}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="bw">B&W Only</SelectItem>
                      <SelectItem value="color">Color Only</SelectItem>
                      <SelectItem value="student">Students Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input 
                      type="date" 
                      value={form.startDate} 
                      onChange={e => setForm({ ...form, startDate: e.target.value })} 
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input 
                      type="date" 
                      value={form.endDate} 
                      onChange={e => setForm({ ...form, endDate: e.target.value })} 
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCreate} 
                  className="w-full bg-primary hover:bg-cyan-light text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Offer'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialLoading ? (
          <div className="col-span-3 text-center py-8">
            <div className="flex justify-center items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Loading offers...</span>
            </div>
          </div>
        ) : (!offers || offers.length === 0) ? (
          <div className="col-span-3 text-center py-8 text-muted-foreground">
            No offers found. Click "Create Offer" to add your first offer.
          </div>
        ) : (
          (offers as any[]).map((offer: any) => {
            const uniqueId = offer.id || offer._id;
            return (
              <div 
                key={uniqueId} 
                className={`bg-card rounded-xl p-5 shadow-sm border-l-4 ${offer.active ? 'border-l-primary' : 'border-l-muted'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{offer.title}</h3>
                  <div className="flex gap-1">
                    <Switch 
                      checked={offer.active} 
                      onCheckedChange={() => toggleActive(uniqueId, offer.active)}
                      disabled={loading}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(uniqueId)}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Discount: {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}</p>
                  <p>Applies to: {appliesToLabel[offer.appliesTo]}</p>
                  <p>{new Date(offer.startDate).toLocaleDateString()} → {new Date(offer.endDate).toLocaleDateString()}</p>
                  {offer.minPurchase > 0 && <p>Min Purchase: ₹{offer.minPurchase}</p>}
                  {offer.maxDiscount && <p>Max Discount: ₹{offer.maxDiscount}</p>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminOffers;