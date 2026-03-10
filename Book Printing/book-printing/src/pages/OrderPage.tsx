import { useState, useRef } from 'react';

import { Link,useNavigate } from 'react-router-dom';
import {
  Upload, X, FileText, Image, File, AlertCircle, CheckCircle,
  ArrowRight, ArrowLeft, Calculator, Package, CreditCard, Info, Plus, Trash2, Copy, Layers
} from 'lucide-react';
import {
  calculatePrice, paperTypeLabels, bindingLabels,
  type PaperSize, type PaperType, type PrintColor, type PrintSide, type BindingType
} from '@/lib/pricingData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';



const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png'];

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  error?: string;
}

interface OrderItem {
  id: string;
  files: UploadedFile[];
  pages: number;
  copies: number;
  paperSize: PaperSize;
  paperType: PaperType;
  printColor: PrintColor;
  printSide: PrintSide;
  bindingType: BindingType;
  lamination: 'none' | 'glossy' | 'matt' | 'velvate';
  instructions: string;
}

const createNewItem = (): OrderItem => ({
  id: Math.random().toString(36).slice(2),
  files: [],
  pages: 100,
  copies: 10,
  paperSize: 'A4',
  paperType: '70gsm_normal',
  printColor: 'bw',
  printSide: 'double',
  bindingType: 'perfect_glue',
  lamination: 'none',
  instructions: '',
});

export default function OrderPage() {


  
  const [orderMode, setOrderMode] = useState<'single' | 'bulk'>('single');
  const [items, setItems] = useState<OrderItem[]>([createNewItem()]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier'>('pickup');
  const [step, setStep] = useState<1 | 2 | 3| 4>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
   const [state, setState] = useState('');
    const [city, setCity] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);



  
const navigate = useNavigate();


const [termsAccepted, setTermsAccepted] = useState(false);


  const activeItem = items[activeItemIndex];

  const updateItem = (index: number, updates: Partial<OrderItem>) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
  };

  const addItem = () => {
    const newItem = createNewItem();
    setItems(prev => [...prev, newItem]);
    setActiveItemIndex(items.length);
  };

  const duplicateItem = (index: number) => {
    const source = items[index];
    const newItem: OrderItem = { ...source, id: Math.random().toString(36).slice(2), files: [] };
    setItems(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)]);
    setActiveItemIndex(index + 1);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
    setActiveItemIndex(Math.min(activeItemIndex, items.length - 2));
  };

  // Calculate totals across all items
  const itemPrices = items.map(item => calculatePrice({
    pages: item.pages, copies: item.copies, paperSize: item.paperSize,
    paperType: item.paperType, printColor: item.printColor,
    printSide: item.printSide, bindingType: item.bindingType,
  }));
  const totalPrintingCost = itemPrices.reduce((sum, p) => sum + p.totalCost, 0);
  const totalGst = totalPrintingCost * 0.05;
  const totalBeforeDelivery = totalPrintingCost + totalGst;
  const deliveryCharge = deliveryType === 'courier' ? 0 : 0;
  const grandTotal = totalBeforeDelivery + deliveryCharge;

  // For single mode, use first item's price directly
  const price = itemPrices[0];
  const totalWithDelivery = orderMode === 'single' ? price.grandTotal + deliveryCharge : grandTotal;

  const simulateUpload = (file: File, itemIndex: number): Promise<void> => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).slice(2);
      const newFile: UploadedFile = { file, id, progress: 0, status: 'uploading' };
      setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, files: [...item.files, newFile] } : item));

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setItems(prev => prev.map((item, i) => i === itemIndex
            ? { ...item, files: item.files.map(f => f.id === id ? { ...f, progress: 100, status: 'done' as const } : f) }
            : item));
          resolve();
        } else {
          setItems(prev => prev.map((item, i) => i === itemIndex
            ? { ...item, files: item.files.map(f => f.id === id ? { ...f, progress: Math.floor(progress) } : f) }
            : item));
        }
      }, 200);
    });
  };

  const handleFiles = async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    for (const file of fileArray) {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} is too large. Max size is 500MB.`);
        continue;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`${file.name} is not a supported file type.`);
        continue;
      }
      await simulateUpload(file, activeItemIndex);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (itemIndex: number, fileId: string) => {
    setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, files: item.files.filter(f => f.id !== fileId) } : item));
  };

  const placeOrder = () => {
    const id = 'BP' + Date.now().toString().slice(-8).toUpperCase();
    setOrderId(id);
    setOrderPlaced(true);
  };

  const allItemsHaveFiles = items.every(item => item.files.some(f => f.status === 'done'));

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="h-5 w-5 text-primary" />;
    if (file.type.startsWith('image/')) return <Image className="h-5 w-5 text-primary/70" />;
    return <File className="h-5 w-5 text-muted-foreground" />;
  };

  // Render print preferences for a given item
  const renderPrintPreferences = (item: OrderItem, itemIndex: number) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Number of Pages</label>
  <input
  type="number"
  min={1}
  value={item.pages === 0 ? '' : item.pages}
  placeholder="Enter pages"
  onChange={(e) => {
    const value = e.target.value;

    if (value === '') {
      updateItem(itemIndex, { pages: 0 }); // allow empty temporarily
    } else {
      updateItem(itemIndex, { pages: Math.max(1, parseInt(value)) });
    }
  }}
  className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
/>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Number of Copies</label>
       <input
  type="number"
  min={1}
  value={item.copies === 1 ? '' : item.copies}  // hide 1
  placeholder="Enter copies"
  onChange={(e) =>
    updateItem(itemIndex, { copies: Math.max(1, parseInt(e.target.value) || 1) })
  }
  className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
/>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Paper Size</label>
        <select value={item.paperSize} onChange={(e) => updateItem(itemIndex, { paperSize: e.target.value as PaperSize })}
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
          <option value="A4">A4 (210×297mm / 8.27×11.69")</option>
          <option value="B5">B5 (176×250mm / 6.9×9.8")</option>
          <option value="A5">A5 (148×210mm / 5.83×8.27")</option>
          <option value="6x9">6×9 inch</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Paper Type</label>
        <select value={item.paperType} onChange={(e) => updateItem(itemIndex, { paperType: e.target.value as PaperType })}
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
          {Object.entries(paperTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Print Color</label>
        <div className="flex gap-2">
          {[{ v: 'bw', l: 'B&W' }, { v: 'color', l: 'Full Color' }].map((o) => (
            <button key={o.v} onClick={() => updateItem(itemIndex, { printColor: o.v as PrintColor })}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printColor === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              {o.l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Printing Side</label>
        <div className="flex gap-2">
          {[{ v: 'double', l: 'Double Side' }, { v: 'single', l: 'Single Side' }].map((o) => (
            <button key={o.v} onClick={() => updateItem(itemIndex, { printSide: o.v as PrintSide })}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printSide === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              {o.l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Binding Type</label>
        <select value={item.bindingType} onChange={(e) => updateItem(itemIndex, { bindingType: e.target.value as BindingType })}
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
          {Object.entries(bindingLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Cover Lamination</label>
        <select value={item.lamination} onChange={(e) => updateItem(itemIndex, { lamination: e.target.value as any })}
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
          <option value="none">No Lamination</option>
          <option value="glossy">Glossy Lamination</option>
          <option value="matt">Matt Lamination</option>
          <option value="velvate">Velvate Lamination</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-foreground mb-1">Special Instructions</label>
        <textarea rows={2} value={item.instructions} onChange={(e) => updateItem(itemIndex, { instructions: e.target.value })} placeholder="Any special requirements or notes..."
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
      </div>
    </div>
  );

  
// Prepare clean, serializable data
const prepareOrderDataForCart = () => {
  const sanitizedItems = items.map(item => ({
    id: item.id,
    pages: item.pages,
    copies: item.copies,
    paperSize: item.paperSize,
    paperType: item.paperType,
    printColor: item.printColor,
    printSide: item.printSide,
    bindingType: item.bindingType,
    lamination: item.lamination,
    instructions: item.instructions,
    files: item.files.map(f => ({
      id: f.id,
      name: f.file.name,
      size: f.file.size,
      type: f.file.type,
      status: f.status,
      // Do NOT pass actual File — not serializable
      // If uploaded → pass url / key instead
    })),
  }));

  return {
    item: sanitizedItems,           // renamed to match your cart expectation
    orderMode,
    deliveryType,
    customer: {
      name,
      phone,
      address: deliveryType === 'courier' ? address : undefined,
      pincode: deliveryType === 'courier' ? pincode : undefined,
      city: deliveryType === 'courier' ? city : undefined,
      state: deliveryType === 'courier' ? state : undefined,
    },
    // Optional: pass pre-calculated totals if you want
    totalPrintingCost,
    totalGst,
    totalWithDelivery,
    // itemPrices,           // ← if needed in cart
  };
};

const handleContinue = () => {
  if (!name.trim() || !phone.trim()) {
    alert("Please fill name and phone");
    return;
  }
  if (deliveryType === 'courier' && (!address || !pincode || !city || !state)) {
    alert("Please complete delivery address");
    return;
  }

  const orderData = prepareOrderDataForCart();

  navigate('/cart', { state: orderData });
};




  // Render file upload for a given item

const renderFileUpload = (item: OrderItem, itemIndex: number) => (
  <div className="space-y-6">
    {/* Terms acceptance area – disappears after check */}
    <div 
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        termsAccepted ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'
      }`}
    >
      <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-5 mb-4">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="terms-accept"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1.5 h-5 w-5 accent-primary rounded border-border focus:ring-primary cursor-pointer"
          />
          <label 
            htmlFor="terms-accept" 
            className="text-sm leading-relaxed text-foreground/90 cursor-pointer select-none"
          >
            I agree to the{' '}
            <Link
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Terms & Conditions
            </Link>
            . I confirm that uploaded files do not violate copyrights, contain illegal content, or breach any laws/platform rules.
          </label>
        </div>
      </div>
    </div>

    {/* Confirmation message – appears only after acceptance */}
    {termsAccepted && (
      <div 
        className="bg-green-50/60 border border-green-300 rounded-xl p-4 text-sm text-green-800 flex items-center gap-3 animate-fade-in"
      >
        <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
        <span>
          Terms & Conditions accepted — file upload is now enabled
        </span>
      </div>
    )}

    {/* File Upload Area */}
    <div
      className={`border-2 rounded-xl p-8 text-center transition-all duration-300 ${
        termsAccepted
          ? isDragging && activeItemIndex === itemIndex
            ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
            : 'border-dashed border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer'
          : 'border-dashed border-muted-foreground/40 bg-muted/10 opacity-60 cursor-not-allowed'
      }`}
      onClick={() => {
        if (termsAccepted) {
          setActiveItemIndex(itemIndex);
          fileInputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        if (termsAccepted) {
          e.preventDefault();
          setActiveItemIndex(itemIndex);
          setIsDragging(true);
        }
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        if (termsAccepted) {
          setActiveItemIndex(itemIndex);
          handleDrop(e);
        } else {
          e.preventDefault();
        }
      }}
    >
      <Upload
        className={`h-12 w-12 mx-auto mb-4 transition-colors ${
          termsAccepted && isDragging && activeItemIndex === itemIndex
            ? 'text-primary'
            : 'text-muted-foreground'
        }`}
      />
      <p className="font-semibold text-lg text-foreground mb-2">
        {termsAccepted ? 'Drag & drop files here' : 'Accept Terms First'}
      </p>
      <p className="text-muted-foreground mb-3">
        {termsAccepted
          ? 'or click to browse files (PDF, DOC, DOCX, JPG, PNG • max 500MB)'
          : 'Please accept the terms & conditions above to unlock upload'}
      </p>
    </div>

    {/* Uploaded files list */}
    {item.files.length > 0 && (
      <div className="space-y-3 mt-6">
        <p className="text-sm font-medium text-foreground">Uploaded Files</p>
        {item.files.map((f) => (
          <div 
            key={f.id}
            className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50"
          >
            {getFileIcon(f.file)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{f.file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(f.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {f.status === 'uploading' && (
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
              )}
            </div>
            {f.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
            {f.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
            <button
              onClick={() => removeFile(itemIndex, f.id)}
              className="p-2 hover:bg-muted rounded-full"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    )}

    {termsAccepted && item.files.length === 0 && (
      <p className="text-center text-sm text-muted-foreground mt-4">
        Upload at least one file to proceed to the next step
      </p>
    )}
  </div>
);
  // const renderFileUpload = (item: OrderItem, itemIndex: number) => (
  //   <>
  //     <div
  //       className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
  //         isDragging && activeItemIndex === itemIndex ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'
  //       }`}
  //       onClick={() => { setActiveItemIndex(itemIndex); fileInputRef.current?.click(); }}
  //       onDragOver={(e) => { e.preventDefault(); setActiveItemIndex(itemIndex); setIsDragging(true); }}
  //       onDragLeave={() => setIsDragging(false)}
  //       onDrop={(e) => { setActiveItemIndex(itemIndex); handleDrop(e); }}
  //     >
  //       <Upload className={`h-10 w-10 mx-auto mb-3 transition-colors duration-200 ${isDragging && activeItemIndex === itemIndex ? 'text-primary' : 'text-muted-foreground'}`} />
  //       <p className="font-semibold text-foreground mb-1">Drag & drop files here</p>
  //       <p className="text-muted-foreground text-sm mb-3">or click to browse</p>
  //       <p className="text-xs text-muted-foreground">Supported: PDF, DOC, DOCX, JPEG, JPG, PNG • Max 500MB per file</p>
  //     </div>

  //     {item.files.length > 0 && (
  //       <div className="mt-4 space-y-2">
  //         {item.files.map((f) => (
  //           <div key={f.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
  //             {getFileIcon(f.file)}
  //             <div className="flex-1 min-w-0">
  //               <p className="text-sm font-medium text-foreground truncate">{f.file.name}</p>
  //               <p className="text-xs text-muted-foreground">{(f.file.size / 1024 / 1024).toFixed(2)} MB</p>
  //               {f.status === 'uploading' && (
  //                 <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
  //                   <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${f.progress}%` }} />
  //                 </div>
  //               )}
  //             </div>
  //             {f.status === 'done' && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
  //             {f.status === 'error' && <AlertCircle className="h-4 w-4 text-destructive shrink-0" />}
  //             <button onClick={() => removeFile(itemIndex, f.id)} className="p-1 hover:bg-muted rounded transition-colors">
  //               <X className="h-4 w-4 text-muted-foreground" />
  //             </button>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </>
  // );

  // if (orderPlaced) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Navbar />
  //       <div className="pt-24 pb-12 flex items-center justify-center min-h-screen">
  //         <div className="max-w-md mx-auto px-4 text-center animate-slide-up">
  //           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //             <CheckCircle className="h-10 w-10 text-green-600" />
  //           </div>
  //           <h2 className="text-3xl font-black text-foreground mb-3">Order Placed!</h2>
  //           <p className="text-muted-foreground mb-2">
  //             Your {orderMode === 'bulk' ? `bulk order (${items.length} items)` : 'order'} has been successfully placed.
  //           </p>
  //           <p className="text-muted-foreground mb-6">We'll start printing soon!</p>
  //           <div className="bg-secondary rounded-xl p-6 mb-6 text-left space-y-3">
  //             <div className="flex justify-between">
  //               <span className="text-white/60 text-sm">Order ID</span>
  //               <span className="text-primary font-bold font-mono">{orderId}</span>
  //             </div>
  //             {orderMode === 'bulk' && (
  //               <div className="flex justify-between">
  //                 <span className="text-white/60 text-sm">Items</span>
  //                 <span className="text-white font-bold">{items.length} print jobs</span>
  //               </div>
  //             )}
  //             <div className="flex justify-between">
  //               <span className="text-white/60 text-sm">Total Amount</span>
  //               <span className="text-white font-bold">₹{totalWithDelivery.toFixed(2)}</span>
  //             </div>
  //             <div className="flex justify-between">
  //               <span className="text-white/60 text-sm">Status</span>
  //               <span className="text-yellow-400 font-medium">Pending</span>
  //             </div>
  //             <div className="flex justify-between">
  //               <span className="text-white/60 text-sm">Delivery</span>
  //               <span className="text-white/80 text-sm">{deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}</span>
  //             </div>
  //           </div>
  //           <div className="flex flex-col gap-3">
  //             <Link to={`/tracking?orderId=${orderId}`} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 text-center">
  //               Track Order
  //             </Link>
  //             <Link to="/" className="w-full border border-border text-foreground font-medium py-3 rounded-lg hover:bg-muted transition-all duration-200 text-center">
  //               Back to Home
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <input ref={fileInputRef} type="file" className="hidden" multiple accept={ALLOWED_EXTENSIONS.join(',')}
        onChange={(e) => e.target.files && handleFiles(e.target.files)} />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-secondary py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Place Your Order</h1>
            <p className="text-white/60">Upload files, choose print options and proceed to payment</p>

            {/* Order Mode Toggle */}
            <div className="flex gap-2 mt-4 mb-4">
              <button onClick={() => { setOrderMode('single'); setItems([items[0] || createNewItem()]); setActiveItemIndex(0); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'single' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                <Package className="h-4 w-4" /> Single Order
              </button>
              <button onClick={() => setOrderMode('bulk')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'bulk' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                <Layers className="h-4 w-4" /> Bulk Order
              </button>
            </div>

            {/* Steps */}
            <div className="flex items-center gap-2 mt-2">
              {[
                { n: 1, label: 'Upload & Options' },
                { n: 2, label: 'Delivery Details' },
                { n: 3, label: 'Add to Cart' },
                // { n: 4, label: 'Payment' },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= s.n ? 'bg-primary text-white' : 'bg-white/10 text-white/40'
                  }`}>
                    {step > s.n ? <CheckCircle className="h-4 w-4" /> : s.n}
                  </div>
                  <span className={`text-sm hidden sm:block ${step >= s.n ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
                  {i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${step > s.n ? 'bg-primary' : 'bg-white/10'}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-slide-up">

                  {/* Bulk Order: Item Tabs */}
                  {orderMode === 'bulk' && (
                    <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" /> Order ({items.length})
                        </h2>
                        <button onClick={addItem}
                          className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                          <Plus className="h-4 w-4" /> Add Item
                        </button>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {items.map((item, i) => (
                          <div key={item.id} className="flex items-center gap-1">
                            <button
                              onClick={() => setActiveItemIndex(i)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                                activeItemIndex === i
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-foreground hover:bg-muted/80'
                              }`}>
                              {item.files.some(f => f.status === 'done') && <CheckCircle className="h-3 w-3" />}
                              Item {i + 1}
                            </button>
                            {items.length > 1 && (
                              <div className="flex">
                                <button onClick={() => duplicateItem(i)} className="p-1 text-muted-foreground hover:text-primary transition-colors" title="Duplicate">
                                  <Copy className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" title="Remove">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Upload className="h-5 w-5 text-primary" /> Upload Files {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
                    </h2>
                    {renderFileUpload(activeItem, activeItemIndex)}
                  </div>

                  {/* Print Preferences */}
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" /> Print Preferences {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
                    </h2>
                    {renderPrintPreferences(activeItem, activeItemIndex)}
                  </div>

                  {/* Delivery Option (shared across all items) */}
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <label className="block text-sm font-semibold text-foreground mb-2">Delivery Option</label>
                    <div className="flex gap-3">
                      {[{ v: 'pickup', l: '🏪 Store Pickup (Free)' }, { v: 'courier', l: '🚚 Courier Delivery' }].map((o) => (
                        <button key={o.v} onClick={() => setDeliveryType(o.v as any)}
                          className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border ${deliveryType === o.v ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border hover:bg-muted/80'}`}>
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* <button onClick={() => setStep(2)} disabled={!allItemsHaveFiles}
                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    Add to Cart <ArrowRight className="h-5 w-5" />
                  </button>
                  {!allItemsHaveFiles && (
                    <p className="text-center text-muted-foreground text-sm">
                      {orderMode === 'bulk' ? 'Please upload at least one file per item to continue' : 'Please upload at least one file to continue'}
                    </p>
                  )} */}


                  <button
  onClick={() => setStep(2)}
  disabled={!allItemsHaveFiles || !termsAccepted}  // ← added !termsAccepted
  className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  Add to Cart <ArrowRight className="h-5 w-5" />
</button>
{(!allItemsHaveFiles || !termsAccepted) && (
  <p className="text-center text-muted-foreground text-sm mt-2">
    {!termsAccepted
      ? 'Please accept the Terms & Conditions to upload files'
      : orderMode === 'bulk'
      ? 'Please upload at least one file per item to continue'
      : 'Please upload at least one file to continue'}
  </p>
)}
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-slide-up">
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-foreground mb-4">Delivery Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1">Full Name *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
                          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1">Phone / WhatsApp *</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX"
                          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                      </div>
                      {deliveryType === 'courier' && (
                        <>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-foreground mb-1">Delivery Address *</label>
                            <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address..."
                              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-1">Pincode *</label>
                            <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="110001"
                              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                          </div>
                           <div>
                            <label className="block text-sm font-semibold text-foreground mb-1">City *</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="city"
                              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                          </div>
                           <div>
                            <label className="block text-sm font-semibold text-foreground mb-1">State *</label>
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="state"
                              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                          </div>
                        </>
                      )}
                      {deliveryType === 'pickup' && (
                        <div className="sm:col-span-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm text-foreground font-medium">📍 Pickup Location</p>
                          <p className="text-sm text-muted-foreground mt-1">Shree Education and Publication Private Limited
Mother’s School Campus
Gaddi Maliyan, Jonsganj Road
Ajmer, Rajasthan – 305001
India 
</p>
<p className="text-sm text-muted-foreground">📞 +917230001405</p>
                          <p className="text-xs text-muted-foreground mt-2">Mon–Sat: 9AM–8PM</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    {/* <button onClick={() => setStep(3)} disabled={!name || !phone}
                      className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      Continue <ArrowRight className="h-5 w-5" />
                    </button> */}
                    {/* <Link to="/cart" className=''>
                           <button 
                      className="flex-[2] bg-primary text-primary-foreground font-bold py-3 px-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      Continue <ArrowRight className="h-5 w-5" />
                    </button>
                    </Link> */}

                    <div className="flex gap-3">
  {/* <button
    onClick={() => setStep(1)}
    className="flex-1 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2"
  >
    <ArrowLeft className="h-4 w-4" /> Back
  </button> */}

  <button
    onClick={handleContinue}
    disabled={
      !allItemsHaveFiles ||
      !termsAccepted ||
      !name.trim() ||
      !phone.trim() ||
      (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim()))
    }
    className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4"
  >
    Continue to Cart <ArrowRight className="h-5 w-5" />
  </button>
</div>

                  </div>
                </div>
              )}




             {/* {step === 3 && (
  <div className="space-y-6 animate-slide-up">
    <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-bold text-foreground mb-4">
        Review Order
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Name</span>
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex justify-between">
          <span>Phone</span>
          <span className="font-medium">{phone}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-medium">
            {deliveryType === 'courier' ? 'Courier' : 'Pickup'}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-3 border-t">
          <span>Total Amount</span>
          <span className="text-primary">
            ₹{totalWithDelivery.toFixed(2)}
          </span>
        </div>
      </div>
    </div>

    <div className="flex gap-3">
      <button
        onClick={() => setStep(2)}
        className="flex-1 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-all duration-200"
      >
        Back
      </button>

      <button
        onClick={() => setStep(4)}
        className="flex-[2] bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200"
      >
        Proceed to Payment
      </button>
    </div>
  </div>
)} */}

            
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="bg-secondary p-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" /> Order Summary
                    {orderMode === 'bulk' && <span className="text-white/60 text-xs font-normal">({items.length} items)</span>}
                  </h3>
                </div>
                <div className="p-4 space-y-3 text-sm max-h-[70vh] overflow-y-auto">
                  {orderMode === 'bulk' ? (
                    <>
                      {items.map((item, i) => {
                        const p = itemPrices[i];
                        return (
                          <div key={item.id} className={`p-3 rounded-lg border transition-all duration-200 ${activeItemIndex === i ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <button onClick={() => setActiveItemIndex(i)} className="w-full text-left">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-foreground text-xs">Item {i + 1}</span>
                                <span className="font-bold text-primary text-sm">₹{p.grandTotal.toFixed(2)}</span>
                              </div>
                              <div className="text-xs text-muted-foreground space-y-0.5">
                                <p>{item.pages} pages × {item.copies} copies • {item.paperSize}</p>
                                <p>{paperTypeLabels[item.paperType].split(' ').slice(0, 3).join(' ')} • {item.printColor === 'bw' ? 'B&W' : 'Color'} • {item.printSide === 'double' ? 'Double' : 'Single'}</p>
                                <p>{bindingLabels[item.bindingType].split('(')[0].trim()}</p>
                              </div>
                            </button>
                          </div>
                        );
                      })}
                      <div className="border-t border-border pt-3 space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>₹{totalPrintingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>GST (5%)</span>
                          <span>₹{totalGst.toFixed(2)}</span>
                        </div>
                        {deliveryType === 'courier' && (
                          <div className="flex justify-between text-muted-foreground">
                            {/* <span>Delivery</span> */}
                            {/* <span>₹80.00</span> */}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {[
                        { label: 'Pages', value: `${items[0].pages} pages` },
                        { label: 'Copies', value: `${items[0].copies} copies` },
                        { label: 'Paper Size', value: items[0].paperSize },
                        { label: 'Paper Type', value: paperTypeLabels[items[0].paperType].split(' ').slice(0, 3).join(' ') },
                        { label: 'Print Color', value: items[0].printColor === 'bw' ? 'B&W' : 'Color' },
                        { label: 'Printing Side', value: items[0].printSide === 'double' ? 'Double Side' : 'Single Side' },
                        { label: 'Binding', value: bindingLabels[items[0].bindingType].split('(')[0].trim() },
                        { label: 'Lamination', value: items[0].lamination === 'none' ? 'None' : items[0].lamination.charAt(0).toUpperCase() + items[0].lamination.slice(1) },
                        { label: 'Delivery', value: deliveryType === 'courier' ? 'Courier' : 'Store Pickup' },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground text-right">{item.value}</span>
                        </div>
                      ))}
                      <div className="border-t border-border pt-3 space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Per Page</span>
                          <span>₹{price.pricePerPage.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Printing Cost</span>
                          <span>₹{price.printingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Binding Cost</span>
                          <span>₹{price.bindingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>GST (5%)</span>
                          <span>₹{price.gst.toFixed(2)}</span>
                        </div>
                        {deliveryType === 'courier' && (
                          <div className="flex justify-between text-muted-foreground">
                            {/* <span>Delivery</span> */}
                            {/* <span>₹80.00</span> */}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-black text-primary text-xl">₹{totalWithDelivery.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 text-xs text-muted-foreground text-center">
                    Inclusive of all taxes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
