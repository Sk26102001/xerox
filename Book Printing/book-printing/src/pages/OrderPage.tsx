// import { useState, useRef } from 'react';
// import { saveToCart } from "@/services/orderService";
// import { Link,useNavigate } from 'react-router-dom';
// import {
//   Upload, X, FileText, Image, File, AlertCircle, CheckCircle,
//   ArrowRight, ArrowLeft, Calculator, Package, CreditCard, Info, Plus, Trash2, Copy, Layers
// } from 'lucide-react';
// import {
//   calculatePrice, paperTypeLabels, bindingLabels,
//   type PaperSize, type PaperType, type PrintColor, type PrintSide, type BindingType
// } from '@/lib/pricingData';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";

// import { Toaster } from "sonner";
// import { toast } from "sonner";



// const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
// const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
// const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png'];

// interface UploadedFile {
//   file: File;
//   id: string;
//   progress: number;
//   status: 'uploading' | 'done' | 'error';
//   error?: string;
// }

// interface OrderItem {
//   id: string;
//   files: UploadedFile[];
//   pages: number;
//   copies: number;
//   paperSize: PaperSize;
//   paperType: PaperType;
//   printColor: PrintColor;
//   printSide: PrintSide;
//   bindingType: BindingType;
//   lamination: 'none' | 'glossy' | 'matt' | 'velvate';
//   instructions: string;
// }

// const createNewItem = (): OrderItem => ({
//   id: Math.random().toString(36).slice(2),
//   files: [],
//   pages: 100,
//   copies: 10,
//   paperSize: 'A4',
//   paperType: '70gsm_normal',
//   printColor: 'bw',
//   printSide: 'double',
//   bindingType: 'perfect_glue',
//   lamination: 'none',
//   instructions: '',
// });

// export default function OrderPage() {


  
//   const [orderMode, setOrderMode] = useState<'single' | 'bulk'>('single');
//   const [items, setItems] = useState<OrderItem[]>([createNewItem()]);
//   const [activeItemIndex, setActiveItemIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier'>('pickup');
//   const [step, setStep] = useState<1 | 2 | 3| 4>(1);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [pincode, setPincode] = useState('');
//    const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [orderId, setOrderId] = useState('');
//   const fileInputRef = useRef<HTMLInputElement>(null);



  
// const navigate = useNavigate();


// const [termsAccepted, setTermsAccepted] = useState(false);


//   const activeItem = items[activeItemIndex];

//   const updateItem = (index: number, updates: Partial<OrderItem>) => {
//     setItems(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
//   };

//   const addItem = () => {
//     const newItem = createNewItem();
//     setItems(prev => [...prev, newItem]);
//     setActiveItemIndex(items.length);
//   };

//   const duplicateItem = (index: number) => {
//     const source = items[index];
//     const newItem: OrderItem = { ...source, id: Math.random().toString(36).slice(2), files: [] };
//     setItems(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)]);
//     setActiveItemIndex(index + 1);
//   };

//   const removeItem = (index: number) => {
//     if (items.length <= 1) return;
//     setItems(prev => prev.filter((_, i) => i !== index));
//     setActiveItemIndex(Math.min(activeItemIndex, items.length - 2));
//   };

//   // Calculate totals across all items
//   const itemPrices = items.map(item => calculatePrice({
//     pages: item.pages, copies: item.copies, paperSize: item.paperSize,
//     paperType: item.paperType, printColor: item.printColor,
//     printSide: item.printSide, bindingType: item.bindingType,
//   }));
//   const totalPrintingCost = itemPrices.reduce((sum, p) => sum + p.totalCost, 0);
//   const totalGst = totalPrintingCost * 0.05;
//   const totalBeforeDelivery = totalPrintingCost + totalGst;
//   const deliveryCharge = deliveryType === 'courier' ? 0 : 0;
//   const grandTotal = totalBeforeDelivery + deliveryCharge;

//   // For single mode, use first item's price directly
//   const price = itemPrices[0];
//   const totalWithDelivery = orderMode === 'single' ? price.grandTotal + deliveryCharge : grandTotal;

//   const simulateUpload = (file: File, itemIndex: number): Promise<void> => {
//     return new Promise((resolve) => {
//       const id = Math.random().toString(36).slice(2);
//       const newFile: UploadedFile = { file, id, progress: 0, status: 'uploading' };
//       setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, files: [...item.files, newFile] } : item));

//       let progress = 0;
//       const interval = setInterval(() => {
//         progress += Math.random() * 20;
//         if (progress >= 100) {
//           progress = 100;
//           clearInterval(interval);
//           setItems(prev => prev.map((item, i) => i === itemIndex
//             ? { ...item, files: item.files.map(f => f.id === id ? { ...f, progress: 100, status: 'done' as const } : f) }
//             : item));
//           resolve();
//         } else {
//           setItems(prev => prev.map((item, i) => i === itemIndex
//             ? { ...item, files: item.files.map(f => f.id === id ? { ...f, progress: Math.floor(progress) } : f) }
//             : item));
//         }
//       }, 200);
//     });
//   };

//   const handleFiles = async (newFiles: FileList | File[]) => {
//     const fileArray = Array.from(newFiles);
//     for (const file of fileArray) {
//       if (file.size > MAX_FILE_SIZE) {
//         alert(`${file.name} is too large. Max size is 500MB.`);
//         continue;
//       }
//       if (!ALLOWED_TYPES.includes(file.type)) {
//         alert(`${file.name} is not a supported file type.`);
//         continue;
//       }
//       await simulateUpload(file, activeItemIndex);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     handleFiles(e.dataTransfer.files);
//   };

//   const removeFile = (itemIndex: number, fileId: string) => {
//     setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, files: item.files.filter(f => f.id !== fileId) } : item));
//   };

//   const placeOrder = () => {
//     const id = 'BP' + Date.now().toString().slice(-8).toUpperCase();
//     setOrderId(id);
//     setOrderPlaced(true);
//   };

//   const allItemsHaveFiles = items.every(item => item.files.some(f => f.status === 'done'));

//   const getFileIcon = (file: File) => {
//     if (file.type === 'application/pdf') return <FileText className="h-5 w-5 text-primary" />;
//     if (file.type.startsWith('image/')) return <Image className="h-5 w-5 text-primary/70" />;
//     return <File className="h-5 w-5 text-muted-foreground" />;
//   };

//   // Render print preferences for a given item
//   const renderPrintPreferences = (item: OrderItem, itemIndex: number) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Number of Pages</label>
//   <input
//   type="number"
//   min={1}
//   value={item.pages === 0 ? '' : item.pages}
//   placeholder="Enter pages"
//   onChange={(e) => {
//     const value = e.target.value;

//     if (value === '') {
//       updateItem(itemIndex, { pages: 0 }); // allow empty temporarily
//     } else {
//       updateItem(itemIndex, { pages: Math.max(1, parseInt(value)) });
//     }
//   }}
//   className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
// />
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Number of Copies</label>
//        <input
//   type="number"
//   min={1}
//   value={item.copies === 1 ? '' : item.copies}  // hide 1
//   placeholder="Enter copies"
//   onChange={(e) =>
//     updateItem(itemIndex, { copies: Math.max(1, parseInt(e.target.value) || 1) })
//   }
//   className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
// />
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Paper Size</label>
//         <select value={item.paperSize} onChange={(e) => updateItem(itemIndex, { paperSize: e.target.value as PaperSize })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           <option value="A4">A4 (210×297mm / 8.27×11.69")</option>
//           <option value="B5">B5 (176×250mm / 6.9×9.8")</option>
//           <option value="A5">A5 (148×210mm / 5.83×8.27")</option>
//           <option value="6x9">6×9 inch</option>
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Paper Type</label>
//         <select value={item.paperType} onChange={(e) => updateItem(itemIndex, { paperType: e.target.value as PaperType })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           {Object.entries(paperTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-2">Print Color</label>
//         <div className="flex gap-2">
//           {[{ v: 'bw', l: 'B&W' }, { v: 'color', l: 'Full Color' }].map((o) => (
//             <button key={o.v} onClick={() => updateItem(itemIndex, { printColor: o.v as PrintColor })}
//               className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printColor === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//               {o.l}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-2">Printing Side</label>
//         <div className="flex gap-2">
//           {[{ v: 'double', l: 'Double Side' }, { v: 'single', l: 'Single Side' }].map((o) => (
//             <button key={o.v} onClick={() => updateItem(itemIndex, { printSide: o.v as PrintSide })}
//               className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printSide === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//               {o.l}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Binding Type</label>
//         <select value={item.bindingType} onChange={(e) => updateItem(itemIndex, { bindingType: e.target.value as BindingType })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           {Object.entries(bindingLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Cover Lamination</label>
//         <select value={item.lamination} onChange={(e) => updateItem(itemIndex, { lamination: e.target.value as any })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           <option value="none">No Lamination</option>
//           <option value="glossy">Glossy Lamination</option>
//           <option value="matt">Matt Lamination</option>
//           <option value="velvate">Velvate Lamination</option>
//         </select>
//       </div>
//       <div className="sm:col-span-2">
//         <label className="block text-sm font-semibold text-foreground mb-1">Special Instructions</label>
//         <textarea rows={2} value={item.instructions} onChange={(e) => updateItem(itemIndex, { instructions: e.target.value })} placeholder="Any special requirements or notes..."
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//       </div>
//     </div>
//   );

  
// // Prepare clean, serializable data
// // const prepareOrderDataForCart = () => {
// //   const sanitizedItems = items.map(item => ({
// //     id: item.id,
// //     pages: item.pages,
// //     copies: item.copies,
// //     paperSize: item.paperSize,
// //     paperType: item.paperType,
// //     printColor: item.printColor,
// //     printSide: item.printSide,
// //     bindingType: item.bindingType,
// //     lamination: item.lamination,
// //     instructions: item.instructions,
// //     files: item.files.map(f => ({
// //       id: f.id,
// //       name: f.file.name,
// //       size: f.file.size,
// //       type: f.file.type,
// //       status: f.status,
// //       // Do NOT pass actual File — not serializable
// //       // If uploaded → pass url / key instead
// //     })),
// //   }));

// //   return {
// //     items: sanitizedItems,           // renamed to match your cart expectation
// //     orderMode,
// //     deliveryType,
// //     customer: {
// //       name,
// //       phone,
// //       address: deliveryType === 'courier' ? address : undefined,
// //       pincode: deliveryType === 'courier' ? pincode : undefined,
// //       city: deliveryType === 'courier' ? city : undefined,
// //       state: deliveryType === 'courier' ? state : undefined,
// //     },
// //     // Optional: pass pre-calculated totals if you want
// //     totalPrintingCost,
// //     totalGst,
// //     totalWithDelivery,
// //     // itemPrices,           // ← if needed in cart
// //   };
// // };
// const prepareOrderDataForCart = () => {
//   const sanitizedItems = items.map(item => ({
//     pages: item.pages,
//     copies: item.copies,
//     paperSize: item.paperSize,
//     paperType: item.paperType,
//     printColor: item.printColor,
//     printSide: item.printSide,
//     bindingType: item.bindingType,
//     lamination: item.lamination,
//     instructions: item.instructions,

//     // ✅ IMPORTANT FIX: always backend-safe structure
//     // files: item.files.map(f => ({
//     //   name: f.file.name,
//     //   size: f.file.size,
//     //   type: f.file.type,
//     //   status: f.status,

//     //   // optional safe fallback (use later if upload system added)
//     //   url: ""
//     // })),
//     files: [
//   {
//     name: "file.pdf",
//     size: 123,
//     type: "application/pdf",
//     status: "done",
//     url: ""
//   }
// ]
//   }));

//   return {
//     items: sanitizedItems,
//     orderMode,
//     deliveryType,

//     customer: {
//       name,
//       phone,
//       address: deliveryType === 'courier' ? address : undefined,
//       pincode: deliveryType === 'courier' ? pincode : undefined,
//       city: deliveryType === 'courier' ? city : undefined,
//       state: deliveryType === 'courier' ? state : undefined,
//     },

//     totalPrintingCost,
//     totalGst,
//     totalWithDelivery,
//   };
// };
// // const handleContinue = () => {
// //   if (!name.trim() || !phone.trim()) {
// //     alert("Please fill name and phone");
// //     return;
// //   }
// //   if (deliveryType === 'courier' && (!address || !pincode || !city || !state)) {
// //     alert("Please complete delivery address");
// //     return;
// //   }

// //   const orderData = prepareOrderDataForCart();

// //   navigate('/cart', { state: orderData });
// // };

// // const handleContinue = () => {
// //   if (!name.trim() || !phone.trim()) {
// //     toast.error("Please fill name and phone");
// //     return;
// //   }

// //   if (deliveryType === 'courier' && (!address || !pincode || !city || !state)) {
// //     toast.error("Please complete delivery address");
// //     return;
// //   }

// //   const orderData = prepareOrderDataForCart();

// //   // 🔥 SAVE MESSAGE
// //   toast.success("Your order has been saved to cart 🛒");

// //   // small delay for better UX
// //   setTimeout(() => {
// //     navigate('/cart', { state: orderData });
// //   }, 800);
// // };
// const handleContinue = async () => {
//   if (!name.trim() || !phone.trim()) {
//     toast.error("Please fill name and phone");
//     return;
//   }

//   if (
//     deliveryType === 'courier' &&
//     (!address.trim() || !pincode.trim() || !city.trim() || !state.trim())
//   ) {
//     toast.error("Please complete delivery address");
//     return;
//   }

//   const orderData = prepareOrderDataForCart();

//   try {
//     const res = await saveToCart(orderData);

//     const savedOrderId = res?.data?._id;

//     toast.success("Your order has been saved to cart 🛒");

//     navigate("/cart", {
//       state: { orderId: savedOrderId }
//     });

//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to save order ❌");
//   }
// };

//   // Render file upload for a given item

// const renderFileUpload = (item: OrderItem, itemIndex: number) => (
//   <div className="space-y-6">
//     {/* Terms acceptance area – disappears after check */}
//     <div 
//       className={`transition-all duration-300 ease-in-out overflow-hidden ${
//         termsAccepted ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'
//       }`}
//     >
//       <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-5 mb-4">
//         <div className="flex items-start gap-4">
//           <input
//             type="checkbox"
//             id="terms-accept"
//             checked={termsAccepted}
//             onChange={(e) => setTermsAccepted(e.target.checked)}
//             className="mt-1.5 h-5 w-5 accent-primary rounded border-border focus:ring-primary cursor-pointer"
//           />
//           <label 
//             htmlFor="terms-accept" 
//             className="text-sm leading-relaxed text-foreground/90 cursor-pointer select-none"
//           >
//             I agree to the{' '}
//             <Link
//               to="/terms"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-primary font-medium hover:underline"
//             >
//               Terms & Conditions
//             </Link>
//             . I confirm that uploaded files do not violate copyrights, contain illegal content, or breach any laws/platform rules.
//           </label>
//         </div>
//       </div>
//     </div>

//     {/* Confirmation message – appears only after acceptance */}
//     {termsAccepted && (
//       <div 
//         className="bg-green-50/60 border border-green-300 rounded-xl p-4 text-sm text-green-800 flex items-center gap-3 animate-fade-in"
//       >
//         <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
//         <span>
//           Terms & Conditions accepted — file upload is now enabled
//         </span>
//       </div>
//     )}

//     {/* File Upload Area */}
//     <div
//       className={`border-2 rounded-xl p-8 text-center transition-all duration-300 ${
//         termsAccepted
//           ? isDragging && activeItemIndex === itemIndex
//             ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
//             : 'border-dashed border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer'
//           : 'border-dashed border-muted-foreground/40 bg-muted/10 opacity-60 cursor-not-allowed'
//       }`}
//       onClick={() => {
//         if (termsAccepted) {
//           setActiveItemIndex(itemIndex);
//           fileInputRef.current?.click();
//         }
//       }}
//       onDragOver={(e) => {
//         if (termsAccepted) {
//           e.preventDefault();
//           setActiveItemIndex(itemIndex);
//           setIsDragging(true);
//         }
//       }}
//       onDragLeave={() => setIsDragging(false)}
//       onDrop={(e) => {
//         if (termsAccepted) {
//           setActiveItemIndex(itemIndex);
//           handleDrop(e);
//         } else {
//           e.preventDefault();
//         }
//       }}
//     >
//       <Upload
//         className={`h-12 w-12 mx-auto mb-4 transition-colors ${
//           termsAccepted && isDragging && activeItemIndex === itemIndex
//             ? 'text-primary'
//             : 'text-muted-foreground'
//         }`}
//       />
//       <p className="font-semibold text-lg text-foreground mb-2">
//         {termsAccepted ? 'Drag & drop files here' : 'Accept Terms First'}
//       </p>
//       <p className="text-muted-foreground mb-3">
//         {termsAccepted
//           ? 'or click to browse files (PDF, DOC, DOCX, JPG, PNG • max 500MB)'
//           : 'Please accept the terms & conditions above to unlock upload'}
//       </p>
//     </div>

//     {/* Uploaded files list */}
//     {item.files.length > 0 && (
//       <div className="space-y-3 mt-6">
//         <p className="text-sm font-medium text-foreground">Uploaded Files</p>
//         {item.files.map((f) => (
//           <div 
//             key={f.id}
//             className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50"
//           >
//             {getFileIcon(f.file)}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium truncate">{f.file.name}</p>
//               <p className="text-xs text-muted-foreground">
//                 {(f.file.size / 1024 / 1024).toFixed(2)} MB
//               </p>
//               {f.status === 'uploading' && (
//                 <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-primary rounded-full transition-all duration-300"
//                     style={{ width: `${f.progress}%` }}
//                   />
//                 </div>
//               )}
//             </div>
//             {f.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
//             {f.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
//             <button
//               onClick={() => removeFile(itemIndex, f.id)}
//               className="p-2 hover:bg-muted rounded-full"
//             >
//               <X className="h-5 w-5 text-muted-foreground" />
//             </button>
//           </div>
//         ))}
//       </div>
//     )}

//     {termsAccepted && item.files.length === 0 && (
//       <p className="text-center text-sm text-muted-foreground mt-4">
//         Upload at least one file to proceed to the next step
//       </p>
//     )}
//   </div>
// );
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <input ref={fileInputRef} type="file" className="hidden" multiple accept={ALLOWED_EXTENSIONS.join(',')}
//         onChange={(e) => e.target.files && handleFiles(e.target.files)} />

//       <div className="pt-20">
//         {/* Header */}
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Place Your Order</h1>
//             <p className="text-white/60">Upload files, choose print options and proceed to payment</p>

//             {/* Order Mode Toggle */}
//             <div className="flex gap-2 mt-4 mb-4">
//               <button onClick={() => { setOrderMode('single'); setItems([items[0] || createNewItem()]); setActiveItemIndex(0); }}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'single' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Package className="h-4 w-4" /> Single Order
//               </button>
//               <button onClick={() => setOrderMode('bulk')}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'bulk' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Layers className="h-4 w-4" /> Bulk Order
//               </button>
//             </div>

//             {/* Steps */}
//             <div className="flex items-center gap-2 mt-2">
//               {[
//                 { n: 1, label: 'Upload & Options' },
//                 { n: 2, label: 'Delivery Details' },
//                 { n: 3, label: 'Add to Cart' },
//                 // { n: 4, label: 'Payment' },
//               ].map((s, i) => (
//                 <div key={s.n} className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
//                     step >= s.n ? 'bg-primary text-white' : 'bg-white/10 text-white/40'
//                   }`}>
//                     {step > s.n ? <CheckCircle className="h-4 w-4" /> : s.n}
//                   </div>
//                   <span className={`text-sm hidden sm:block ${step >= s.n ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
//                   {i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${step > s.n ? 'bg-primary' : 'bg-white/10'}`} />}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Step 1 */}
//               {step === 1 && (
//                 <div className="space-y-6 animate-slide-up">

//                   {/* Bulk Order: Item Tabs */}
//                   {orderMode === 'bulk' && (
//                     <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                       <div className="flex items-center justify-between mb-3">
//                         <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
//                           <Layers className="h-4 w-4 text-primary" /> Order ({items.length})
//                         </h2>
//                         <button onClick={addItem}
//                           className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
//                           <Plus className="h-4 w-4" /> Add Item
//                         </button>
//                       </div>
//                       <div className="flex gap-2 flex-wrap">
//                         {items.map((item, i) => (
//                           <div key={item.id} className="flex items-center gap-1">
//                             <button
//                               onClick={() => setActiveItemIndex(i)}
//                               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
//                                 activeItemIndex === i
//                                   ? 'bg-primary text-primary-foreground'
//                                   : 'bg-muted text-foreground hover:bg-muted/80'
//                               }`}>
//                               {item.files.some(f => f.status === 'done') && <CheckCircle className="h-3 w-3" />}
//                               Item {i + 1}
//                             </button>
//                             {items.length > 1 && (
//                               <div className="flex">
//                                 <button onClick={() => duplicateItem(i)} className="p-1 text-muted-foreground hover:text-primary transition-colors" title="Duplicate">
//                                   <Copy className="h-3.5 w-3.5" />
//                                 </button>
//                                 <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" title="Remove">
//                                   <Trash2 className="h-3.5 w-3.5" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* File Upload */}
//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Upload className="h-5 w-5 text-primary" /> Upload Files {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {renderFileUpload(activeItem, activeItemIndex)}
//                   </div>

//                   {/* Print Preferences */}
//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Calculator className="h-5 w-5 text-primary" /> Print Preferences {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {renderPrintPreferences(activeItem, activeItemIndex)}
//                   </div>

//                   {/* Delivery Option (shared across all items) */}
//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <label className="block text-sm font-semibold text-foreground mb-2">Delivery Option</label>
//                     <div className="flex gap-3">
//                       {[{ v: 'pickup', l: '🏪 Store Pickup (Free)' }, { v: 'courier', l: '🚚 Courier Delivery' }].map((o) => (
//                         <button key={o.v} onClick={() => setDeliveryType(o.v as any)}
//                           className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border ${deliveryType === o.v ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border hover:bg-muted/80'}`}>
//                           {o.l}
//                         </button>
//                       ))}
//                     </div>
//                   </div>


//                   <button
//   onClick={() => setStep(2)}
//   disabled={!allItemsHaveFiles || !termsAccepted}  // ← added !termsAccepted
//   className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// >
//   Add to Cart <ArrowRight className="h-5 w-5" />
// </button>
// {(!allItemsHaveFiles || !termsAccepted) && (
//   <p className="text-center text-muted-foreground text-sm mt-2">
//     {!termsAccepted
//       ? 'Please accept the Terms & Conditions to upload files'
//       : orderMode === 'bulk'
//       ? 'Please upload at least one file per item to continue'
//       : 'Please upload at least one file to continue'}
//   </p>
// )}
//                 </div>
//               )}

//               {/* Step 2 */}
//               {step === 2 && (
//                 <div className="space-y-6 animate-slide-up">
//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4">Delivery Details</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Full Name *</label>
//                         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Phone / WhatsApp *</label>
//                         <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       {deliveryType === 'courier' && (
//                         <>
//                           <div className="sm:col-span-2">
//                             <label className="block text-sm font-semibold text-foreground mb-1">Delivery Address *</label>
//                             <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address..."
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">Pincode *</label>
//                             <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="110001"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                            <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">City *</label>
//                             <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="city"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                            <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">State *</label>
//                             <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="state"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                         </>
//                       )}
//                       {deliveryType === 'pickup' && (
//                         <div className="sm:col-span-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
//                           <p className="text-sm text-foreground font-medium">📍 Pickup Location</p>
//                           <p className="text-sm text-muted-foreground mt-1">Shree Education and Publication Private Limited
// Mother’s School Campus
// Gaddi Maliyan, Jonsganj Road
// Ajmer, Rajasthan – 305001
// India 
// </p>
// <p className="text-sm text-muted-foreground">📞 +917230001405</p>
//                           <p className="text-xs text-muted-foreground mt-2">Mon–Sat: 9AM–8PM</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(1)} className="flex-1 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2">
//                       <ArrowLeft className="h-4 w-4" /> Back
//                     </button>


//                     <div className="flex gap-3">


//   <button
//     onClick={handleContinue}
//     disabled={
//       !allItemsHaveFiles ||
//       !termsAccepted ||
//       !name.trim() ||
//       !phone.trim() ||
//       (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim()))
//     }
//     className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4"
//   >
//     Save to Cart <ArrowRight className="h-5 w-5" />
//   </button>
// </div>

//                   </div>
//                 </div>
//               )}




            
//             </div>

//             {/* Order Summary Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-24 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
//                 <div className="bg-secondary p-4">
//                   <h3 className="text-white font-bold flex items-center gap-2">
//                     <Package className="h-4 w-4 text-primary" /> Order Summary
//                     {orderMode === 'bulk' && <span className="text-white/60 text-xs font-normal">({items.length} items)</span>}
//                   </h3>
//                 </div>
//                 <div className="p-4 space-y-3 text-sm max-h-[70vh] overflow-y-auto">
//                   {orderMode === 'bulk' ? (
//                     <>
//                       {items.map((item, i) => {
//                         const p = itemPrices[i];
//                         return (
//                           <div key={item.id} className={`p-3 rounded-lg border transition-all duration-200 ${activeItemIndex === i ? 'border-primary bg-primary/5' : 'border-border'}`}>
//                             <button onClick={() => setActiveItemIndex(i)} className="w-full text-left">
//                               <div className="flex justify-between items-center mb-1">
//                                 <span className="font-bold text-foreground text-xs">Item {i + 1}</span>
//                                 <span className="font-bold text-primary text-sm">₹{p.grandTotal.toFixed(2)}</span>
//                               </div>
//                               <div className="text-xs text-muted-foreground space-y-0.5">
//                                 <p>{item.pages} pages × {item.copies} copies • {item.paperSize}</p>
//                                 <p>{paperTypeLabels[item.paperType].split(' ').slice(0, 3).join(' ')} • {item.printColor === 'bw' ? 'B&W' : 'Color'} • {item.printSide === 'double' ? 'Double' : 'Single'}</p>
//                                 <p>{bindingLabels[item.bindingType].split('(')[0].trim()}</p>
//                               </div>
//                             </button>
//                           </div>
//                         );
//                       })}
//                       <div className="border-t border-border pt-3 space-y-2">
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Subtotal</span>
//                           <span>₹{totalPrintingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>GST (5%)</span>
//                           <span>₹{totalGst.toFixed(2)}</span>
//                         </div>
//                         {deliveryType === 'courier' && (
//                           <div className="flex justify-between text-muted-foreground">
//                             {/* <span>Delivery</span> */}
//                             {/* <span>₹80.00</span> */}
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {[
//                         { label: 'Pages', value: `${items[0].pages} pages` },
//                         { label: 'Copies', value: `${items[0].copies} copies` },
//                         { label: 'Paper Size', value: items[0].paperSize },
//                         { label: 'Paper Type', value: paperTypeLabels[items[0].paperType].split(' ').slice(0, 3).join(' ') },
//                         { label: 'Print Color', value: items[0].printColor === 'bw' ? 'B&W' : 'Color' },
//                         { label: 'Printing Side', value: items[0].printSide === 'double' ? 'Double Side' : 'Single Side' },
//                         { label: 'Binding', value: bindingLabels[items[0].bindingType].split('(')[0].trim() },
//                         { label: 'Lamination', value: items[0].lamination === 'none' ? 'None' : items[0].lamination.charAt(0).toUpperCase() + items[0].lamination.slice(1) },
//                         { label: 'Delivery', value: deliveryType === 'courier' ? 'Courier' : 'Store Pickup' },
//                       ].map((item) => (
//                         <div key={item.label} className="flex justify-between">
//                           <span className="text-muted-foreground">{item.label}</span>
//                           <span className="font-medium text-foreground text-right">{item.value}</span>
//                         </div>
//                       ))}
//                       <div className="border-t border-border pt-3 space-y-2">
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Per Page</span>
//                           <span>₹{price.pricePerPage.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Printing Cost</span>
//                           <span>₹{price.printingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Binding Cost</span>
//                           <span>₹{price.bindingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>GST (5%)</span>
//                           <span>₹{price.gst.toFixed(2)}</span>
//                         </div>
//                         {deliveryType === 'courier' && (
//                           <div className="flex justify-between text-muted-foreground">
//                             {/* <span>Delivery</span> */}
//                             {/* <span>₹80.00</span> */}
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}

//                   <div className="border-t border-border pt-3 flex justify-between items-center">
//                     <span className="font-bold text-foreground">Total</span>
//                     <span className="font-black text-primary text-xl">₹{totalWithDelivery.toFixed(2)}</span>
//                   </div>
//                   <div className="pt-2 text-xs text-muted-foreground text-center">
//                     Inclusive of all taxes
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
         

//       <Footer />
//     </div>
//   );
// }





// import { useState, useRef } from 'react';
// import { API } from '@/api/api';
// // To this:
// import { addToCart } from "@/services/orderService";
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Upload, X, FileText, Image, File, AlertCircle, CheckCircle,
//   ArrowRight, ArrowLeft, Calculator, Package, Plus, Trash2, Copy, Layers
// } from 'lucide-react';
// import {
//   calculatePrice, paperTypeLabels, bindingLabels,
//   type PaperSize, type PaperType, type PrintColor, type PrintSide, type BindingType
// } from '@/lib/pricingData';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { toast } from "sonner";

// import { uploadFile } from "@/services/uploadService";

// const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
// const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
// const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png'];

// // interface UploadedFile {
// //   file: File;
// //   id: string;
// //   progress: number;
// //   status: 'uploading' | 'done' | 'error';
// //   error?: string;
// // }

// interface UploadedFile {
//   file: File;
//   id: string;
//   progress: number;
//   status: 'uploading' | 'done' | 'error';
//   error?: string;
//    url?: string; // Add this property
//   fileData?: {
//     name: string;
//     size: number;
//     type: string;
//   };
// }

// interface OrderItem {
//   id: string;
//   files: UploadedFile[];
//   pages: number;
//   copies: number;
//   paperSize: PaperSize;
//   paperType: PaperType;
//   printColor: PrintColor;
//   printSide: PrintSide;
//   bindingType: BindingType;
//   lamination: 'none' | 'glossy' | 'matt' | 'velvate';
//   instructions: string;
// }

// const createNewItem = (): OrderItem => ({
//   id: Math.random().toString(36).slice(2),
//   files: [],
//   pages: 100,
//   copies: 10,
//   paperSize: 'A4',
//   paperType: '70gsm_normal',
//   printColor: 'bw',
//   printSide: 'double',
//   bindingType: 'perfect_glue',
//   lamination: 'none',
//   instructions: '',
// });

// export default function OrderPage() {
//   const [orderMode, setOrderMode] = useState<'single' | 'bulk'>('single');
//   const [items, setItems] = useState<OrderItem[]>([createNewItem()]);
//   const [activeItemIndex, setActiveItemIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier'>('pickup');
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   // const activeItem = items[activeItemIndex];
// const activeItem = items[activeItemIndex] || items[0];
//   const updateItem = (index: number, updates: Partial<OrderItem>) => {
//     setItems(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
//   };

//   const addItem = () => {
//     const newItem = createNewItem();
//     setItems(prev => [...prev, newItem]);
//     setActiveItemIndex(items.length);
//   };

//   const duplicateItem = (index: number) => {
//     const source = items[index];
//     const newItem: OrderItem = { ...source, id: Math.random().toString(36).slice(2), files: [] };
//     setItems(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)]);
//     setActiveItemIndex(index + 1);
//   };

//   const removeItem = (index: number) => {
//     if (items.length <= 1) return;
//     setItems(prev => prev.filter((_, i) => i !== index));
//     // setActiveItemIndex(Math.min(activeItemIndex, items.length - 2));

//     setItems(prev => {
//   const newItems = prev.filter((_, i) => i !== index);
//   setActiveItemIndex(prevIndex =>
//     Math.max(0, Math.min(prevIndex, newItems.length - 1))
//   );
//   return newItems;
// });
//   };

//   // Calculate totals across all items
//   const itemPrices = items.map(item => calculatePrice({
//     pages: item.pages, copies: item.copies, paperSize: item.paperSize,
//     paperType: item.paperType, printColor: item.printColor,
//     printSide: item.printSide, bindingType: item.bindingType,
//   }));
//   const totalPrintingCost = itemPrices.reduce((sum, p) => sum + p.totalCost, 0);
//   const totalGst = totalPrintingCost * 0.05;
//   const deliveryCharge = 0;
//   const price = itemPrices[0];
//   const totalWithDelivery = orderMode === 'single' ? price.grandTotal + deliveryCharge : totalPrintingCost + totalGst;

//   // const simulateUpload = (file: File, itemIndex: number): Promise<void> => {
//   //   return new Promise((resolve) => {
//   //     const id = Math.random().toString(36).slice(2);
//   //     const newFile: UploadedFile = { file, id, progress: 0, status: 'uploading' };
//   //     setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, files: [...item.files, newFile] } : item));

//   //     let progress = 0;
//   //     const interval = setInterval(() => {
//   //       progress += Math.random() * 20;
//   //       if (progress >= 100) {
//   //         progress = 100;
//   //         clearInterval(interval);
//   //         setItems(prev => prev.map((item, i) => i === itemIndex
//   //           ? { ...item, files: item.files.map(f => f.id === id ? { ...f, progress: 100, status: 'done' as const } : f) }
//   //           : item));
//   //         resolve();
//   //       } else {
//   //         setItems(prev => prev.map((item, i) => i === itemIndex
//   //           ? { ...item, files: item.files.map(f => f.id === id ? { ...f, progress: Math.floor(progress) } : f) }
//   //           : item));
//   //       }
//   //     }, 200);
//   //   });
//   // };

// // Replace the uploadFileToServer with this working simulation
// const uploadFileToServer = async (file: File, itemIndex: number): Promise<void> => {
//   return new Promise(async (resolve, reject) => {
//     const id = Math.random().toString(36).slice(2);
    
//     // Add file with uploading status
//     const newFile: UploadedFile = { 
//       file, 
//       id, 
//       progress: 0, 
//       status: 'uploading',
//       url: ''
//     };
    
//     setItems(prev => prev.map((item, i) => 
//       i === itemIndex ? { ...item, files: [...item.files, newFile] } : item
//     ));

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       // Use fetch with progress tracking
//       const xhr = new XMLHttpRequest();
      
//       xhr.upload.addEventListener('progress', (event) => {
//         if (event.lengthComputable) {
//           const percent = Math.round((event.loaded / event.total) * 100);
//           setItems(prev => prev.map((item, i) => 
//             i === itemIndex ? { 
//               ...item, 
//               files: item.files.map(f => 
//                 f.id === id ? { ...f, progress: percent } : f
//               ) 
//             } : item
//           ));
//         }
//       });
      
//       const response = await new Promise<{ data: any }>((resolveXhr, rejectXhr) => {
//         xhr.open('POST', `${API.defaults.baseURL}/upload`, true);
//         xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        
//         xhr.onload = () => {
//           if (xhr.status === 200) {
//             resolveXhr({ data: JSON.parse(xhr.responseText) });
//           } else {
//             rejectXhr(new Error('Upload failed'));
//           }
//         };
        
//         xhr.onerror = () => rejectXhr(new Error('Network error'));
//         xhr.send(formData);
//       });
      
//       const fileUrl = response.data.url;
      
//       // Update file with URL and done status
//       setItems(prev => prev.map((item, i) => 
//         i === itemIndex ? { 
//           ...item, 
//           files: item.files.map(f => 
//             f.id === id ? { ...f, progress: 100, status: 'done', url: fileUrl } : f
//           ) 
//         } : item
//       ));
//       resolve();
//     } catch (error) {
//       setItems(prev => prev.map((item, i) => 
//         i === itemIndex ? { 
//           ...item, 
//           files: item.files.map(f => 
//             f.id === id ? { ...f, status: 'error', error: 'Upload failed' } : f
//           ) 
//         } : item
//       ));
//       reject(error);
//     }
//   });
// };

// // Update handleFiles to use real upload
// const handleFiles = async (newFiles: FileList | File[]) => {
//   const fileArray = Array.from(newFiles);
//   for (const file of fileArray) {
//     if (file.size > MAX_FILE_SIZE) {
//       toast.error(`${file.name} is too large. Max size is 500MB.`);
//       continue;
//     }
//     if (!ALLOWED_TYPES.includes(file.type)) {
//       toast.error(`${file.name} is not a supported file type.`);
//       continue;
//     }
//     await uploadFileToServer(file, activeItemIndex);
//   }
// };
//   // const handleFiles = async (newFiles: FileList | File[]) => {
//   //   const fileArray = Array.from(newFiles);
//   //   for (const file of fileArray) {
//   //     if (file.size > MAX_FILE_SIZE) {
//   //       toast.error(`${file.name} is too large. Max size is 500MB.`);
//   //       continue;
//   //     }
//   //     if (!ALLOWED_TYPES.includes(file.type)) {
//   //       toast.error(`${file.name} is not a supported file type.`);
//   //       continue;
//   //     }
//   //     await simulateUpload(file, activeItemIndex);
//   //   }
//   // };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     handleFiles(e.dataTransfer.files);
//   };

//   const removeFile = (itemIndex: number, fileId: string) => {
//     setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, files: item.files.filter(f => f.id !== fileId) } : item));
//   };

//   const allItemsHaveFiles = items.every(item => item.files.some(f => f.status === 'done'));

//   const getFileIcon = (file: File) => {
//     if (file.type === 'application/pdf') return <FileText className="h-5 w-5 text-primary" />;
//     if (file.type.startsWith('image/')) return <Image className="h-5 w-5 text-primary/70" />;
//     return <File className="h-5 w-5 text-muted-foreground" />;
//   };

//   // ✅ FIXED: Use actual uploaded files, not hardcoded
//   // const prepareOrderDataForCart = () => {
//   //   const sanitizedItems = items.map(item => ({
//   //     pages: item.pages,
//   //     copies: item.copies,
//   //     paperSize: item.paperSize,
//   //     paperType: item.paperType,
//   //     printColor: item.printColor,
//   //     printSide: item.printSide,
//   //     bindingType: item.bindingType,
//   //     lamination: item.lamination,
//   //     instructions: item.instructions,
//   //     // ✅ Use actual uploaded files from the item
//   //     files: item.files.map(f => ({
//   //       name: f.file.name,
//   //       size: f.file.size,
//   //       type: f.file.type,
//   //       status: f.status,
//   //       url: ""
//   //     }))
//   //   }));

//   //   return {
//   //     items: sanitizedItems,
//   //     orderMode,
//   //     deliveryType,
//   //     customer: {
//   //       name,
//   //       phone,
//   //       address: deliveryType === 'courier' ? address : undefined,
//   //       pincode: deliveryType === 'courier' ? pincode : undefined,
//   //       city: deliveryType === 'courier' ? city : undefined,
//   //       state: deliveryType === 'courier' ? state : undefined,
//   //     },
//   //     totalPrintingCost,
//   //     totalGst,
//   //     totalWithDelivery,
//   //   };
//   // };



// const prepareOrderDataForCart = () => {
//   const sanitizedItems = items.map(item => ({
//     pages: item.pages,
//     copies: item.copies,
//     paperSize: item.paperSize,
//     paperType: item.paperType,
//     printColor: item.printColor,
//     printSide: item.printSide,
//     bindingType: item.bindingType,
//     lamination: item.lamination,
//     instructions: item.instructions,
//     // ✅ Include file data to save in cart
//     files: item.files
//       .filter(f => f.status === 'done')
//       .map(f => ({
//         name: f.file.name,
//         size: f.file.size,
//         type: f.file.type,
//         status: f.status,
//         url: f.url || "" // Will be empty until file upload is implemented
//       }))
//   }));

//   // Debug: Log what we're sending
//   console.log('=== PREPARING CART DATA ===');
//   console.log('Items count:', sanitizedItems.length);
//   console.log('First item files:', sanitizedItems[0]?.files);
//   console.log('Full data:', {
//     items: sanitizedItems,
//     orderMode,
//     deliveryType,
//     customer: {
//       name,
//       phone,
//       address: deliveryType === 'courier' ? address : undefined,
//       pincode: deliveryType === 'courier' ? pincode : undefined,
//       city: deliveryType === 'courier' ? city : undefined,
//       state: deliveryType === 'courier' ? state : undefined,
//     },
//     totalPrintingCost,
//     totalGst,
//     totalWithDelivery,
//   });

//   return {
//     items: sanitizedItems,
//     orderMode,
//     deliveryType,
//     customer: {
//       name,
//       phone,
//       address: deliveryType === 'courier' ? address : undefined,
//       pincode: deliveryType === 'courier' ? pincode : undefined,
//       city: deliveryType === 'courier' ? city : undefined,
//       state: deliveryType === 'courier' ? state : undefined,
//     },
//     totalPrintingCost,
//     totalGst,
//     totalWithDelivery,
//   };
// };
// const handleContinue = async () => {
//   if (!name.trim() || !phone.trim()) {
//     toast.error("Please fill name and phone");
//     return;
//   }

//   if (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim())) {
//     toast.error("Please complete delivery address");
//     return;
//   }

//   // Check if user is logged in
//   const token = localStorage.getItem('token');
//   if (!token) {
//     toast.error("Please login to save your cart");
//     navigate("/login", { state: { from: "/order" } });
//     return;
//   }

//   setIsSaving(true);
//   const loadingToast = toast.loading("Adding to cart...");

//   try {
//     const orderData = prepareOrderDataForCart();
//     // ✅ Use addToCart which APPENDS items, not replaces
//     const res = await addToCart(orderData);
    
//     toast.dismiss(loadingToast);
//     toast.success(`${orderData.items.length} item(s) added to cart 🛒`);
    
//     // ✅ Option: Clear the form or stay on order page to add more
//     // Reset form for next order
//     setName('');
//     setPhone('');
//     setAddress('');
//     setPincode('');
//     setCity('');
//     setState('');
//     setItems([createNewItem()]);
//     setTermsAccepted(false);
//     setStep(1);
    
//     // ✅ Stay on order page to add more items
//     // setTimeout(() => {
//     //   navigate("/cart");
//     // }, 800);
    
//   } catch (error: any) {
//     toast.dismiss(loadingToast);
//     console.error("Error adding to cart:", error);
//     toast.error(error.response?.data?.message || "Failed to add to cart. Please try again.");
//   } finally {
//     setIsSaving(false);
//   }
// };

  

//   // const handleContinue = async () => {
//   //   if (!name.trim() || !phone.trim()) {
//   //     toast.error("Please fill name and phone");
//   //     return;
//   //   }

//   //   if (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim())) {
//   //     toast.error("Please complete delivery address");
//   //     return;
//   //   }

//   //   // Check if user is logged in
//   //   const token = localStorage.getItem('token');
//   //   if (!token) {
//   //     toast.error("Please login to save your cart");
//   //     navigate("/login", { state: { from: "/order" } });
//   //     return;
//   //   }

//   //   setIsSaving(true);
//   //   const loadingToast = toast.loading("Saving to cart...");

//   //   try {
//   //     const orderData = prepareOrderDataForCart();
//   //     const res = await saveToCart(orderData);
      
//   //     toast.dismiss(loadingToast);
//   //     toast.success("Your order has been saved to cart 🛒");
      
//   //     setTimeout(() => {
//   //       navigate("/cart");
//   //     }, 800);
//   //   } catch (error: any) {
//   //     toast.dismiss(loadingToast);
//   //     console.error("Error saving cart:", error);
//   //     toast.error(error.response?.data?.message || "Failed to save cart. Please try again.");
//   //   } finally {
//   //     setIsSaving(false);
//   //   }
//   // };

//   const renderPrintPreferences = (item: OrderItem, itemIndex: number) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Number of Pages</label>
//         <input
//           type="number"
//           min={1}
//           value={item.pages === 0 ? '' : item.pages}
//           placeholder="Enter pages"
//           onChange={(e) => {
//             const value = e.target.value;
//             if (value === '') {
//               updateItem(itemIndex, { pages: 0 });
//             } else {
//               updateItem(itemIndex, { pages: Math.max(1, parseInt(value)) });
//             }
//           }}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Number of Copies</label>
//         <input
//           type="number"
//           min={1}
//           value={item.copies === 1 ? '' : item.copies}
//           placeholder="Enter copies"
//           onChange={(e) =>
//             updateItem(itemIndex, { copies: Math.max(1, parseInt(e.target.value) || 1) })
//           }
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Paper Size</label>
//         <select value={item.paperSize} onChange={(e) => updateItem(itemIndex, { paperSize: e.target.value as PaperSize })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           <option value="A4">A4 (210×297mm / 8.27×11.69")</option>
//           <option value="B5">B5 (176×250mm / 6.9×9.8")</option>
//           <option value="A5">A5 (148×210mm / 5.83×8.27")</option>
//           <option value="6x9">6×9 inch</option>
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Paper Type</label>
//         <select value={item.paperType} onChange={(e) => updateItem(itemIndex, { paperType: e.target.value as PaperType })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           {Object.entries(paperTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-2">Print Color</label>
//         <div className="flex gap-2">
//           {[{ v: 'bw', l: 'B&W' }, { v: 'color', l: 'Full Color' }].map((o) => (
//             <button key={o.v} onClick={() => updateItem(itemIndex, { printColor: o.v as PrintColor })}
//               className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printColor === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//               {o.l}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-2">Printing Side</label>
//         <div className="flex gap-2">
//           {[{ v: 'double', l: 'Double Side' }, { v: 'single', l: 'Single Side' }].map((o) => (
//             <button key={o.v} onClick={() => updateItem(itemIndex, { printSide: o.v as PrintSide })}
//               className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printSide === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//               {o.l}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Binding Type</label>
//         <select value={item.bindingType} onChange={(e) => updateItem(itemIndex, { bindingType: e.target.value as BindingType })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           {Object.entries(bindingLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Cover Lamination</label>
//         <select value={item.lamination} onChange={(e) => updateItem(itemIndex, { lamination: e.target.value as any })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           <option value="none">No Lamination</option>
//           <option value="glossy">Glossy Lamination</option>
//           <option value="matt">Matt Lamination</option>
//           <option value="velvate">Velvate Lamination</option>
//         </select>
//       </div>
//       <div className="sm:col-span-2">
//         <label className="block text-sm font-semibold text-foreground mb-1">Special Instructions</label>
//         <textarea rows={2} value={item.instructions} onChange={(e) => updateItem(itemIndex, { instructions: e.target.value })} placeholder="Any special requirements or notes..."
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//       </div>
//     </div>
//   );

//   const renderFileUpload = (item: OrderItem, itemIndex: number) => (
//     <div className="space-y-6">
//       <div 
//         className={`transition-all duration-300 ease-in-out overflow-hidden ${
//           termsAccepted ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'
//         }`}
//       >
//         <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-5 mb-4">
//           <div className="flex items-start gap-4">
//             <input
//               type="checkbox"
//               id="terms-accept"
//               checked={termsAccepted}
//               onChange={(e) => setTermsAccepted(e.target.checked)}
//               className="mt-1.5 h-5 w-5 accent-primary rounded border-border focus:ring-primary cursor-pointer"
//             />
//             <label 
//               htmlFor="terms-accept" 
//               className="text-sm leading-relaxed text-foreground/90 cursor-pointer select-none"
//             >
//               I agree to the{' '}
//               <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
//                 Terms & Conditions
//               </Link>
//               . I confirm that uploaded files do not violate copyrights, contain illegal content, or breach any laws/platform rules.
//             </label>
//           </div>
//         </div>
//       </div>

//       {termsAccepted && (
//         <div className="bg-green-50/60 border border-green-300 rounded-xl p-4 text-sm text-green-800 flex items-center gap-3 animate-fade-in">
//           <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
//           <span>Terms & Conditions accepted — file upload is now enabled</span>
//         </div>
//       )}

//       <div
//         className={`border-2 rounded-xl p-8 text-center transition-all duration-300 ${
//           termsAccepted
//             ? isDragging && activeItemIndex === itemIndex
//               ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
//               : 'border-dashed border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer'
//             : 'border-dashed border-muted-foreground/40 bg-muted/10 opacity-60 cursor-not-allowed'
//         }`}
//         onClick={() => {
//           if (termsAccepted) {
//             setActiveItemIndex(itemIndex);
//             fileInputRef.current?.click();
//           }
//         }}
//         onDragOver={(e) => {
//           if (termsAccepted) {
//             e.preventDefault();
//             setActiveItemIndex(itemIndex);
//             setIsDragging(true);
//           }
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={(e) => {
//           if (termsAccepted) {
//             setActiveItemIndex(itemIndex);
//             handleDrop(e);
//           } else {
//             e.preventDefault();
//           }
//         }}
//       >
//         <Upload
//           className={`h-12 w-12 mx-auto mb-4 transition-colors ${
//             termsAccepted && isDragging && activeItemIndex === itemIndex
//               ? 'text-primary'
//               : 'text-muted-foreground'
//           }`}
//         />
//         <p className="font-semibold text-lg text-foreground mb-2">
//           {termsAccepted ? 'Drag & drop files here' : 'Accept Terms First'}
//         </p>
//         <p className="text-muted-foreground mb-3">
//           {termsAccepted
//             ? 'or click to browse files (PDF, DOC, DOCX, JPG, PNG • max 500MB)'
//             : 'Please accept the terms & conditions above to unlock upload'}
//         </p>
//       </div>

//       {item.files.length > 0 && (
//         <div className="space-y-3 mt-6">
//           <p className="text-sm font-medium text-foreground">Uploaded Files</p>
//           {/* {item.files.map((f) => (
//             <div key={f.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
//               {getFileIcon(f.file)}
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">{f.file.name}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {(f.file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>
//                 {f.status === 'uploading' && (
//                   <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${f.progress}%` }} />
//                   </div>
//                 )}
//               </div>
//               {f.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
//               {f.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
//               <button onClick={() => removeFile(itemIndex, f.id)} className="p-2 hover:bg-muted rounded-full">
//                 <X className="h-5 w-5 text-muted-foreground" />
//               </button>
//             </div>
//           ))} */}

//           {item.files.map((f) => (
//   <div key={f.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
//     {getFileIcon(f.file)}
//     <div className="flex-1 min-w-0">
//       <p className="text-sm font-medium truncate">{f.file.name}</p>
//       <p className="text-xs text-muted-foreground">
//         {(f.file.size / 1024 / 1024).toFixed(2)} MB
//         {f.url && <span className="ml-2 text-green-600">✓ Uploaded</span>}
//       </p>
//       {f.status === 'uploading' && (
//         <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
//           <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${f.progress}%` }} />
//         </div>
//       )}
//     </div>
//     {f.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
//     {f.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
//     <button onClick={() => removeFile(itemIndex, f.id)} className="p-2 hover:bg-muted rounded-full">
//       <X className="h-5 w-5 text-muted-foreground" />
//     </button>
//   </div>
// ))}
//         </div>
//       )}

//       {termsAccepted && item.files.length === 0 && (
//         <p className="text-center text-sm text-muted-foreground mt-4">
//           Upload at least one file to proceed to the next step
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <input ref={fileInputRef} type="file" className="hidden" multiple accept={ALLOWED_EXTENSIONS.join(',')}
//         onChange={(e) => e.target.files && handleFiles(e.target.files)} />

//       <div className="pt-20">
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Place Your Order</h1>
//             <p className="text-white/60">Upload files, choose print options and proceed to payment</p>

//             <div className="flex gap-2 mt-4 mb-4">
//               <button onClick={() => { setOrderMode('single'); setItems([items[0] || createNewItem()]); setActiveItemIndex(0); }}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'single' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Package className="h-4 w-4" /> Single Order
//               </button>
//               <button onClick={() => setOrderMode('bulk')}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'bulk' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Layers className="h-4 w-4" /> Bulk Order
//               </button>
//             </div>

//             <div className="flex items-center gap-2 mt-2">
//               {[
//                 { n: 1, label: 'Upload & Options' },
//                 { n: 2, label: 'Delivery Details' },
//                 { n: 3, label: 'Add to Cart' },
//               ].map((s, i) => (
//                 <div key={s.n} className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
//                     step >= s.n ? 'bg-primary text-white' : 'bg-white/10 text-white/40'
//                   }`}>
//                     {step > s.n ? <CheckCircle className="h-4 w-4" /> : s.n}
//                   </div>
//                   <span className={`text-sm hidden sm:block ${step >= s.n ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
//                   {i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${step > s.n ? 'bg-primary' : 'bg-white/10'}`} />}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               {step === 1 && (
//                 <div className="space-y-6 animate-slide-up">
//                   {orderMode === 'bulk' && (
//                     <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                       <div className="flex items-center justify-between mb-3">
//                         <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
//                           <Layers className="h-4 w-4 text-primary" /> Order ({items.length})
//                         </h2>
//                         <button onClick={addItem} className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
//                           <Plus className="h-4 w-4" /> Add Item
//                         </button>
//                       </div>
//                       <div className="flex gap-2 flex-wrap">
//                         {items.map((item, i) => (
//                           <div key={item.id} className="flex items-center gap-1">
//                             <button onClick={() => setActiveItemIndex(i)}
//                               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
//                                 activeItemIndex === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
//                               }`}>
//                               {item.files.some(f => f.status === 'done') && <CheckCircle className="h-3 w-3" />}
//                               Item {i + 1}
//                             </button>
//                             {items.length > 1 && (
//                               <div className="flex">
//                                 <button onClick={() => duplicateItem(i)} className="p-1 text-muted-foreground hover:text-primary transition-colors">
//                                   <Copy className="h-3.5 w-3.5" />
//                                 </button>
//                                 <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
//                                   <Trash2 className="h-3.5 w-3.5" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Upload className="h-5 w-5 text-primary" /> Upload Files {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {/* {renderFileUpload(activeItem, activeItemIndex)} */}
//                     {activeItem && renderFileUpload(activeItem, activeItemIndex)}
//                   </div>

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Calculator className="h-5 w-5 text-primary" /> Print Preferences {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {renderPrintPreferences(activeItem, activeItemIndex)}
//                   </div>

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <label className="block text-sm font-semibold text-foreground mb-2">Delivery Option</label>
//                     <div className="flex gap-3">
//                       {[{ v: 'pickup', l: '🏪 Store Pickup (Free)' }, { v: 'courier', l: '🚚 Courier Delivery' }].map((o) => (
//                         <button key={o.v} onClick={() => setDeliveryType(o.v as any)}
//                           className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border ${deliveryType === o.v ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border hover:bg-muted/80'}`}>
//                           {o.l}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <button onClick={() => setStep(2)} disabled={!allItemsHaveFiles || !termsAccepted}
//                     className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
//                     Continue <ArrowRight className="h-5 w-5" />
//                   </button>
//                   {(!allItemsHaveFiles || !termsAccepted) && (
//                     <p className="text-center text-muted-foreground text-sm mt-2">
//                       {!termsAccepted
//                         ? 'Please accept the Terms & Conditions to upload files'
//                         : orderMode === 'bulk'
//                         ? 'Please upload at least one file per item to continue'
//                         : 'Please upload at least one file to continue'}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {step === 2 && (
//                 <div className="space-y-6 animate-slide-up">
//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4">Delivery Details</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Full Name *</label>
//                         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Phone / WhatsApp *</label>
//                         <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       {deliveryType === 'courier' && (
//                         <>
//                           <div className="sm:col-span-2">
//                             <label className="block text-sm font-semibold text-foreground mb-1">Delivery Address *</label>
//                             <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address..."
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">Pincode *</label>
//                             <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="110001"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">City *</label>
//                             <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="city"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">State *</label>
//                             <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="state"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                         </>
//                       )}
//                       {deliveryType === 'pickup' && (
//                         <div className="sm:col-span-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
//                           <p className="text-sm text-foreground font-medium">📍 Pickup Location</p>
//                           <p className="text-sm text-muted-foreground mt-1">Shree Education and Publication Private Limited
// Mother's School Campus
// Gaddi Maliyan, Jonsganj Road
// Ajmer, Rajasthan – 305001 India</p>
//                           <p className="text-sm text-muted-foreground">📞 +917230001405</p>
//                           <p className="text-xs text-muted-foreground mt-2">Mon–Sat: 9AM–8PM</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(1)} className="flex-1 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2">
//                       <ArrowLeft className="h-4 w-4" /> Back
//                     </button>
//                     <button
//                       onClick={handleContinue}
//                       disabled={isSaving || !allItemsHaveFiles || !termsAccepted || !name.trim() || !phone.trim() || (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim()))}
//                       className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4"
//                     >
//                       {isSaving ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           Save to Cart <ArrowRight className="h-5 w-5" />
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-24 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
//                 <div className="bg-secondary p-4">
//                   <h3 className="text-white font-bold flex items-center gap-2">
//                     <Package className="h-4 w-4 text-primary" /> Order Summary
//                     {orderMode === 'bulk' && <span className="text-white/60 text-xs font-normal">({items.length} items)</span>}
//                   </h3>
//                 </div>
//                 <div className="p-4 space-y-3 text-sm max-h-[70vh] overflow-y-auto">
//                   {orderMode === 'bulk' ? (
//                     <>
//                       {items.map((item, i) => {
//                         const p = itemPrices[i];
//                         return (
//                           <div key={item.id} className={`p-3 rounded-lg border transition-all duration-200 ${activeItemIndex === i ? 'border-primary bg-primary/5' : 'border-border'}`}>
//                             <button onClick={() => setActiveItemIndex(i)} className="w-full text-left">
//                               <div className="flex justify-between items-center mb-1">
//                                 <span className="font-bold text-foreground text-xs">Item {i + 1}</span>
//                                 <span className="font-bold text-primary text-sm">₹{p.grandTotal.toFixed(2)}</span>
//                               </div>
//                               <div className="text-xs text-muted-foreground space-y-0.5">
//                                 <p>{item.pages} pages × {item.copies} copies • {item.paperSize}</p>
//                                 <p>{paperTypeLabels[item.paperType].split(' ').slice(0, 3).join(' ')} • {item.printColor === 'bw' ? 'B&W' : 'Color'} • {item.printSide === 'double' ? 'Double' : 'Single'}</p>
//                                 <p>{bindingLabels[item.bindingType].split('(')[0].trim()}</p>
//                               </div>
//                             </button>
//                           </div>
//                         );
//                       })}
//                       <div className="border-t border-border pt-3 space-y-2">
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Subtotal</span>
//                           <span>₹{totalPrintingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>GST (5%)</span>
//                           <span>₹{totalGst.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {[
//                         { label: 'Pages', value: `${items[0].pages} pages` },
//                         { label: 'Copies', value: `${items[0].copies} copies` },
//                         { label: 'Paper Size', value: items[0].paperSize },
//                         { label: 'Paper Type', value: paperTypeLabels[items[0].paperType].split(' ').slice(0, 3).join(' ') },
//                         { label: 'Print Color', value: items[0].printColor === 'bw' ? 'B&W' : 'Color' },
//                         { label: 'Printing Side', value: items[0].printSide === 'double' ? 'Double Side' : 'Single Side' },
//                         { label: 'Binding', value: bindingLabels[items[0].bindingType].split('(')[0].trim() },
//                         { label: 'Lamination', value: items[0].lamination === 'none' ? 'None' : items[0].lamination.charAt(0).toUpperCase() + items[0].lamination.slice(1) },
//                         { label: 'Delivery', value: deliveryType === 'courier' ? 'Courier' : 'Store Pickup' },
//                       ].map((item) => (
//                         <div key={item.label} className="flex justify-between">
//                           <span className="text-muted-foreground">{item.label}</span>
//                           <span className="font-medium text-foreground text-right">{item.value}</span>
//                         </div>
//                       ))}
//                       <div className="border-t border-border pt-3 space-y-2">
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Per Page</span>
//                           <span>₹{price.pricePerPage.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Printing Cost</span>
//                           <span>₹{price.printingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Binding Cost</span>
//                           <span>₹{price.bindingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>GST (5%)</span>
//                           <span>₹{price.gst.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <div className="border-t border-border pt-3 flex justify-between items-center">
//                     <span className="font-bold text-foreground">Total</span>
//                     <span className="font-black text-primary text-xl">₹{totalWithDelivery.toFixed(2)}</span>
//                   </div>
//                   <div className="pt-2 text-xs text-muted-foreground text-center">
//                     Inclusive of all taxes
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }














// import { useState, useRef, useEffect } from 'react';
// import { API } from '@/api/api';
// import { addToCart } from "@/services/orderService";
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Upload, X, FileText, Image, File, AlertCircle, CheckCircle,
//   ArrowRight, ArrowLeft, Calculator, Package, Plus, Trash2, Copy, Layers
// } from 'lucide-react';
// import {
//   calculatePrice, paperTypeLabels, bindingLabels, paperSizeLabels,
//   setPricingConfig, getPricingConfig,
//   type PaperSize, type PaperType, type PrintColor, type PrintSide, type BindingType
// } from '@/lib/pricingData';
// import { fetchPricing } from '@/services/pricingService';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { toast } from "sonner";
// import { uploadFile } from "@/services/uploadService";

// const MAX_FILE_SIZE = 500 * 1024 * 1024;
// const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
// const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png'];

// interface UploadedFile {
//   file: File;
//   id: string;
//   progress: number;
//   status: 'uploading' | 'done' | 'error';
//   error?: string;
//   url?: string;
// }

// interface OrderItem {
//   id: string;
//   files: UploadedFile[];
//   pages: number;
//   copies: number;
//   paperSize: PaperSize;
//   paperType: PaperType;
//   printColor: PrintColor;
//   printSide: PrintSide;
//   bindingType: BindingType;
//   lamination: 'none' | 'glossy' | 'matt' | 'velvate';
//   instructions: string;
// }

// const createNewItem = (): OrderItem => ({
//   id: Math.random().toString(36).slice(2),
//   files: [],
//   pages: 100,
//   copies: 10,
//   paperSize: 'A4',
//   paperType: '70gsm_normal',
//   printColor: 'bw',
//   printSide: 'double',
//   bindingType: 'perfect_glue',
//   lamination: 'none',
//   instructions: '',
// });

// export default function OrderPage() {
//   const [orderMode, setOrderMode] = useState<'single' | 'bulk'>('single');
//   const [items, setItems] = useState<OrderItem[]>([createNewItem()]);
//   const [activeItemIndex, setActiveItemIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier'>('pickup');
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [pricingLoaded, setPricingLoaded] = useState(false);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   // Load pricing on component mount
//   useEffect(() => {
//     const loadPricing = async () => {
//       try {
//         const pricing = await fetchPricing();
//         setPricingConfig(pricing);
//         setPricingLoaded(true);
//         console.log('Pricing loaded successfully');
//       } catch (error) {
//         console.error('Failed to load pricing:', error);
//         toast.error('Failed to load pricing. Using default rates.');
//         setPricingLoaded(true); // Still set loaded to true to show UI
//       }
//     };
    
//     loadPricing();
//   }, []);

//   const activeItem = items[activeItemIndex] || items[0];
  
//   const updateItem = (index: number, updates: Partial<OrderItem>) => {
//     setItems(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
//   };

//   const addItem = () => {
//     const newItem = createNewItem();
//     setItems(prev => [...prev, newItem]);
//     setActiveItemIndex(items.length);
//   };

//   const duplicateItem = (index: number) => {
//     const source = items[index];
//     const newItem: OrderItem = { ...source, id: Math.random().toString(36).slice(2), files: [] };
//     setItems(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)]);
//     setActiveItemIndex(index + 1);
//   };

//   const removeItem = (index: number) => {
//     if (items.length <= 1) return;
//     setItems(prev => prev.filter((_, i) => i !== index));
//     setActiveItemIndex(prevIndex => Math.max(0, Math.min(prevIndex, items.length - 2)));
//   };

//   // Calculate totals across all items using current pricing config
//   const itemPrices = items.map(item => {
//     const config = getPricingConfig();
//     return calculatePrice({
//       pages: item.pages,
//       copies: item.copies,
//       paperSize: item.paperSize,
//       paperType: item.paperType,
//       printColor: item.printColor,
//       printSide: item.printSide,
//       bindingType: item.bindingType,
//     }, config || undefined);
//   });
  
//   const totalPrintingCost = itemPrices.reduce((sum, p) => sum + p.totalCost, 0);
//   const totalGst = totalPrintingCost * 0.05;
//   const deliveryCharge = 0;
//   const price = itemPrices[0];
//   const totalWithDelivery = orderMode === 'single' ? price?.grandTotal + deliveryCharge : totalPrintingCost + totalGst;

//   // Replace the entire uploadFileToServer function
// // Replace your existing uploadFileToServer with this version
// const uploadFileToServer = async (file: File, itemIndex: number): Promise<void> => {
//   const id = Math.random().toString(36).slice(2);
  
//   const newFile: UploadedFile = { 
//     file, 
//     id, 
//     progress: 0, 
//     status: 'uploading',
//     url: ''
//   };
  
//   setItems(prev => prev.map((item, i) => 
//     i === itemIndex ? { ...item, files: [...item.files, newFile] } : item
//   ));

//   try {
//     // Use the imported uploadFile function from your service
//     const fileUrl = await uploadFile(file, (progress) => {
//       setItems(prev => prev.map((item, i) => 
//         i === itemIndex ? { 
//           ...item, 
//           files: item.files.map(f => 
//             f.id === id ? { ...f, progress } : f
//           ) 
//         } : item
//       ));
//     });
    
//     setItems(prev => prev.map((item, i) => 
//       i === itemIndex ? { 
//         ...item, 
//         files: item.files.map(f => 
//           f.id === id ? { ...f, progress: 100, status: 'done', url: fileUrl } : f
//         ) 
//       } : item
//     ));
    
//     toast.success(`${file.name} uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     setItems(prev => prev.map((item, i) => 
//       i === itemIndex ? { 
//         ...item, 
//         files: item.files.map(f => 
//           f.id === id ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed' } : f
//         ) 
//       } : item
//     ));
//     toast.error(error instanceof Error ? error.message : `Failed to upload ${file.name}`);
//   }
// };

// // Your handleFiles function (keep as is - it's correct)
// const handleFiles = async (newFiles: FileList | File[]) => {
//   // Check if terms are accepted first
//   if (!termsAccepted) {
//     toast.error('Please accept Terms & Conditions before uploading files');
//     return;
//   }
  
//   const fileArray = Array.from(newFiles);
  
//   for (const file of fileArray) {
//     if (file.size > MAX_FILE_SIZE) {
//       toast.error(`${file.name} is too large. Max size is 500MB.`);
//       continue;
//     }
    
//     // Improved file type validation
//     const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
//     const isValidExtension = ALLOWED_EXTENSIONS.includes(fileExtension);
//     const isValidType = ALLOWED_TYPES.includes(file.type);
    
//     if (!isValidExtension && !isValidType) {
//       toast.error(`${file.name} is not a supported file type.`);
//       continue;
//     }
    
//     await uploadFileToServer(file, activeItemIndex);
//   }
// };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     handleFiles(e.dataTransfer.files);
//   };

//   const removeFile = (itemIndex: number, fileId: string) => {
//     setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, files: item.files.filter(f => f.id !== fileId) } : item));
//   };

//   const allItemsHaveFiles = items.every(item => item.files.some(f => f.status === 'done'));

//   const getFileIcon = (file: File) => {
//     if (file.type === 'application/pdf') return <FileText className="h-5 w-5 text-primary" />;
//     if (file.type.startsWith('image/')) return <Image className="h-5 w-5 text-primary/70" />;
//     return <File className="h-5 w-5 text-muted-foreground" />;
//   };

//   const prepareOrderDataForCart = () => {
//     const sanitizedItems = items.map(item => ({
//       pages: item.pages,
//       copies: item.copies,
//       paperSize: item.paperSize,
//       paperType: item.paperType,
//       printColor: item.printColor,
//       printSide: item.printSide,
//       bindingType: item.bindingType,
//       lamination: item.lamination,
//       instructions: item.instructions,
//       files: item.files
//         .filter(f => f.status === 'done')
//         .map(f => ({
//           name: f.file.name,
//           size: f.file.size,
//           type: f.file.type,
//           status: f.status,
//           url: f.url || ""
//         }))
//     }));

//     return {
//       items: sanitizedItems,
//       orderMode,
//       deliveryType,
//       customer: {
//         name,
//         phone,
//         address: deliveryType === 'courier' ? address : undefined,
//         pincode: deliveryType === 'courier' ? pincode : undefined,
//         city: deliveryType === 'courier' ? city : undefined,
//         state: deliveryType === 'courier' ? state : undefined,
//       },
//       totalPrintingCost,
//       totalGst,
//       totalWithDelivery,
//     };
//   };

//   const handleContinue = async () => {
//     if (!name.trim() || !phone.trim()) {
//       toast.error("Please fill name and phone");
//       return;
//     }

//     if (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim())) {
//       toast.error("Please complete delivery address");
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error("Please login to save your cart");
//       navigate("/login", { state: { from: "/order" } });
//       return;
//     }

//     setIsSaving(true);
//     const loadingToast = toast.loading("Adding to cart...");

//     try {
//       const orderData = prepareOrderDataForCart();
//       await addToCart(orderData);
      
//       toast.dismiss(loadingToast);
//       toast.success(`${orderData.items.length} item(s) added to cart 🛒`);
      
//       setName('');
//       setPhone('');
//       setAddress('');
//       setPincode('');
//       setCity('');
//       setState('');
//       setItems([createNewItem()]);
//       setTermsAccepted(false);
//       setStep(1);
      
//     } catch (error: any) {
//       toast.dismiss(loadingToast);
//       console.error("Error adding to cart:", error);
//       toast.error(error.response?.data?.message || "Failed to add to cart. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const renderPrintPreferences = (item: OrderItem, itemIndex: number) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Number of Pages</label>
//         <input
//           type="number"
//           min={1}
//           value={item.pages === 0 ? '' : item.pages}
//           placeholder="Enter pages"
//           onChange={(e) => {
//             const value = e.target.value;
//             if (value === '') {
//               updateItem(itemIndex, { pages: 0 });
//             } else {
//               updateItem(itemIndex, { pages: Math.max(1, parseInt(value)) });
//             }
//           }}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Number of Copies</label>
//         <input
//           type="number"
//           min={1}
//           value={item.copies === 1 ? '' : item.copies}
//           placeholder="Enter copies"
//           onChange={(e) =>
//             updateItem(itemIndex, { copies: Math.max(1, parseInt(e.target.value) || 1) })
//           }
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Paper Size</label>
//         <select value={item.paperSize} onChange={(e) => updateItem(itemIndex, { paperSize: e.target.value as PaperSize })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           {Object.entries(paperSizeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Paper Type</label>
//         <select value={item.paperType} onChange={(e) => updateItem(itemIndex, { paperType: e.target.value as PaperType })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           {Object.entries(paperTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-2">Print Color</label>
//         <div className="flex gap-2">
//           {[{ v: 'bw', l: 'B&W' }, { v: 'color', l: 'Full Color' }].map((o) => (
//             <button key={o.v} onClick={() => updateItem(itemIndex, { printColor: o.v as PrintColor })}
//               className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printColor === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//               {o.l}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-2">Printing Side</label>
//         <div className="flex gap-2">
//           {[{ v: 'double', l: 'Double Side' }, { v: 'single', l: 'Single Side' }].map((o) => (
//             <button key={o.v} onClick={() => updateItem(itemIndex, { printSide: o.v as PrintSide })}
//               className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printSide === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//               {o.l}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Binding Type</label>
//         <select value={item.bindingType} onChange={(e) => updateItem(itemIndex, { bindingType: e.target.value as BindingType })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           {Object.entries(bindingLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-semibold text-foreground mb-1">Cover Lamination</label>
//         <select value={item.lamination} onChange={(e) => updateItem(itemIndex, { lamination: e.target.value as any })}
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//           <option value="none">No Lamination</option>
//           <option value="glossy">Glossy Lamination</option>
//           <option value="matt">Matt Lamination</option>
//           <option value="velvate">Velvate Lamination</option>
//         </select>
//       </div>
//       <div className="sm:col-span-2">
//         <label className="block text-sm font-semibold text-foreground mb-1">Special Instructions</label>
//         <textarea rows={2} value={item.instructions} onChange={(e) => updateItem(itemIndex, { instructions: e.target.value })} 
//           placeholder="Any special requirements or notes..."
//           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//       </div>
//     </div>
//   );

//   if (!pricingLoaded) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="pt-20 flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//             <p className="text-muted-foreground">Loading pricing...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }


//   const renderFileUpload = (item: OrderItem, itemIndex: number) => (
//   <div className="space-y-6">
//     <div 
//       className={`transition-all duration-300 ease-in-out overflow-hidden ${
//         termsAccepted ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'
//       }`}
//     >
//       <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-5 mb-4">
//         <div className="flex items-start gap-4">
//           <input
//             type="checkbox"
//             id="terms-accept"
//             checked={termsAccepted}
//             onChange={(e) => setTermsAccepted(e.target.checked)}
//             className="mt-1.5 h-5 w-5 accent-primary rounded border-border focus:ring-primary cursor-pointer"
//           />
//           <label 
//             htmlFor="terms-accept" 
//             className="text-sm leading-relaxed text-foreground/90 cursor-pointer select-none"
//           >
//             I agree to the{' '}
//             <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
//               Terms & Conditions
//             </Link>
//             . I confirm that uploaded files do not violate copyrights, contain illegal content, or breach any laws/platform rules.
//           </label>
//         </div>
//       </div>
//     </div>

//     {termsAccepted && (
//       <div className="bg-green-50/60 border border-green-300 rounded-xl p-4 text-sm text-green-800 flex items-center gap-3 animate-fade-in">
//         <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
//         <span>Terms & Conditions accepted — file upload is now enabled</span>
//       </div>
//     )}

//     <div
//       className={`border-2 rounded-xl p-8 text-center transition-all duration-300 ${
//         termsAccepted
//           ? isDragging && activeItemIndex === itemIndex
//             ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
//             : 'border-dashed border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer'
//           : 'border-dashed border-muted-foreground/40 bg-muted/10 opacity-60 cursor-not-allowed'
//       }`}
//       onClick={() => {
//         if (termsAccepted) {
//           setActiveItemIndex(itemIndex);
//           fileInputRef.current?.click();
//         }
//       }}
//       onDragOver={(e) => {
//         if (termsAccepted) {
//           e.preventDefault();
//           setActiveItemIndex(itemIndex);
//           setIsDragging(true);
//         }
//       }}
//       onDragLeave={() => setIsDragging(false)}
//       onDrop={(e) => {
//         if (termsAccepted) {
//           setActiveItemIndex(itemIndex);
//           handleDrop(e);
//         } else {
//           e.preventDefault();
//         }
//       }}
//     >
//       <Upload
//         className={`h-12 w-12 mx-auto mb-4 transition-colors ${
//           termsAccepted && isDragging && activeItemIndex === itemIndex
//             ? 'text-primary'
//             : 'text-muted-foreground'
//         }`}
//       />
//       <p className="font-semibold text-lg text-foreground mb-2">
//         {termsAccepted ? 'Drag & drop files here' : 'Accept Terms First'}
//       </p>
//       <p className="text-muted-foreground mb-3">
//         {termsAccepted
//           ? 'or click to browse files (PDF, DOC, DOCX, JPG, PNG • max 500MB)'
//           : 'Please accept the terms & conditions above to unlock upload'}
//       </p>
//     </div>

//     {item.files.length > 0 && (
//       <div className="space-y-3 mt-6">
//         <p className="text-sm font-medium text-foreground">Uploaded Files</p>
//         {item.files.map((f) => (
//           <div key={f.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
//             {getFileIcon(f.file)}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium truncate">{f.file.name}</p>
//               <p className="text-xs text-muted-foreground">
//                 {(f.file.size / 1024 / 1024).toFixed(2)} MB
//                 {f.url && <span className="ml-2 text-green-600">✓ Uploaded</span>}
//               </p>
//               {f.status === 'uploading' && (
//                 <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
//                   <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${f.progress}%` }} />
//                 </div>
//               )}
//             </div>
//             {f.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
//             {f.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
//             <button onClick={() => removeFile(itemIndex, f.id)} className="p-2 hover:bg-muted rounded-full">
//               <X className="h-5 w-5 text-muted-foreground" />
//             </button>
//           </div>
//         ))}
//       </div>
//     )}

//     {termsAccepted && item.files.length === 0 && (
//       <p className="text-center text-sm text-muted-foreground mt-4">
//         Upload at least one file to proceed to the next step
//       </p>
//     )}
//   </div>
// );

//   // Rest of your JSX remains the same...
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <input ref={fileInputRef} type="file" className="hidden" multiple accept={ALLOWED_EXTENSIONS.join(',')}
//         onChange={(e) => e.target.files && handleFiles(e.target.files)} />

//       <div className="pt-20">
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Place Your Order</h1>
//             <p className="text-white/60">Upload files, choose print options and proceed to payment</p>

//             <div className="flex gap-2 mt-4 mb-4">
//               <button onClick={() => { setOrderMode('single'); setItems([items[0] || createNewItem()]); setActiveItemIndex(0); }}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'single' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Package className="h-4 w-4" /> Single Order
//               </button>
//               <button onClick={() => setOrderMode('bulk')}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'bulk' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Layers className="h-4 w-4" /> Bulk Order
//               </button>
//             </div>

//             <div className="flex items-center gap-2 mt-2">
//               {[
//                 { n: 1, label: 'Upload & Options' },
//                 { n: 2, label: 'Delivery Details' },
//                 { n: 3, label: 'Add to Cart' },
//               ].map((s, i) => (
//                 <div key={s.n} className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
//                     step >= s.n ? 'bg-primary text-white' : 'bg-white/10 text-white/40'
//                   }`}>
//                     {step > s.n ? <CheckCircle className="h-4 w-4" /> : s.n}
//                   </div>
//                   <span className={`text-sm hidden sm:block ${step >= s.n ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
//                   {i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${step > s.n ? 'bg-primary' : 'bg-white/10'}`} />}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               {step === 1 && (
//                 <div className="space-y-6 animate-slide-up">
//                   {orderMode === 'bulk' && (
//                     <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                       <div className="flex items-center justify-between mb-3">
//                         <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
//                           <Layers className="h-4 w-4 text-primary" /> Order ({items.length})
//                         </h2>
//                         <button onClick={addItem} className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
//                           <Plus className="h-4 w-4" /> Add Item
//                         </button>
//                       </div>
//                       <div className="flex gap-2 flex-wrap">
//                         {items.map((item, i) => (
//                           <div key={item.id} className="flex items-center gap-1">
//                             <button onClick={() => setActiveItemIndex(i)}
//                               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
//                                 activeItemIndex === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
//                               }`}>
//                               {item.files.some(f => f.status === 'done') && <CheckCircle className="h-3 w-3" />}
//                               Item {i + 1}
//                             </button>
//                             {items.length > 1 && (
//                               <div className="flex">
//                                 <button onClick={() => duplicateItem(i)} className="p-1 text-muted-foreground hover:text-primary transition-colors">
//                                   <Copy className="h-3.5 w-3.5" />
//                                 </button>
//                                 <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
//                                   <Trash2 className="h-3.5 w-3.5" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Upload className="h-5 w-5 text-primary" /> Upload Files {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {activeItem && renderFileUpload(activeItem, activeItemIndex)}
//                   </div>

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Calculator className="h-5 w-5 text-primary" /> Print Preferences {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {renderPrintPreferences(activeItem, activeItemIndex)}
//                   </div>

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <label className="block text-sm font-semibold text-foreground mb-2">Delivery Option</label>
//                     <div className="flex gap-3">
//                       {[{ v: 'pickup', l: '🏪 Store Pickup (Free)' }, { v: 'courier', l: '🚚 Courier Delivery' }].map((o) => (
//                         <button key={o.v} onClick={() => setDeliveryType(o.v as any)}
//                           className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border ${deliveryType === o.v ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border hover:bg-muted/80'}`}>
//                           {o.l}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <button onClick={() => setStep(2)} disabled={!allItemsHaveFiles || !termsAccepted}
//                     className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
//                     Continue <ArrowRight className="h-5 w-5" />
//                   </button>
//                   {(!allItemsHaveFiles || !termsAccepted) && (
//                     <p className="text-center text-muted-foreground text-sm mt-2">
//                       {!termsAccepted
//                         ? 'Please accept the Terms & Conditions to upload files'
//                         : orderMode === 'bulk'
//                         ? 'Please upload at least one file per item to continue'
//                         : 'Please upload at least one file to continue'}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {step === 2 && (
//                 <div className="space-y-6 animate-slide-up">
//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4">Delivery Details</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Full Name *</label>
//                         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Phone / WhatsApp *</label>
//                         <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       {deliveryType === 'courier' && (
//                         <>
//                           <div className="sm:col-span-2">
//                             <label className="block text-sm font-semibold text-foreground mb-1">Delivery Address *</label>
//                             <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address..."
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">Pincode *</label>
//                             <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="110001"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">City *</label>
//                             <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">State *</label>
//                             <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                         </>
//                       )}
//                       {deliveryType === 'pickup' && (
//                         <div className="sm:col-span-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
//                           <p className="text-sm text-foreground font-medium">📍 Pickup Location</p>
//                           <p className="text-sm text-muted-foreground mt-1">Shree Education and Publication Private Limited
//                             Mother's School Campus, Gaddi Maliyan, Jonsganj Road, Ajmer, Rajasthan – 305001 India</p>
//                           <p className="text-sm text-muted-foreground">📞 +917230001405</p>
//                           <p className="text-xs text-muted-foreground mt-2">Mon–Sat: 9AM–8PM</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(1)} className="flex-1 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2">
//                       <ArrowLeft className="h-4 w-4" /> Back
//                     </button>
//                     <button
//                       onClick={handleContinue}
//                       disabled={isSaving || !allItemsHaveFiles || !termsAccepted || !name.trim() || !phone.trim() || (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim()))}
//                       className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4"
//                     >
//                       {isSaving ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           Save to Cart <ArrowRight className="h-5 w-5" />
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-24 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
//                 <div className="bg-secondary p-4">
//                   <h3 className="text-white font-bold flex items-center gap-2">
//                     <Package className="h-4 w-4 text-primary" /> Order Summary
//                     {orderMode === 'bulk' && <span className="text-white/60 text-xs font-normal">({items.length} items)</span>}
//                   </h3>
//                 </div>
//                 <div className="p-4 space-y-3 text-sm max-h-[70vh] overflow-y-auto">
//                   {orderMode === 'bulk' ? (
//                     <>
//                       {items.map((item, i) => {
//                         const p = itemPrices[i];
//                         return p ? (
//                           <div key={item.id} className={`p-3 rounded-lg border transition-all duration-200 ${activeItemIndex === i ? 'border-primary bg-primary/5' : 'border-border'}`}>
//                             <button onClick={() => setActiveItemIndex(i)} className="w-full text-left">
//                               <div className="flex justify-between items-center mb-1">
//                                 <span className="font-bold text-foreground text-xs">Item {i + 1}</span>
//                                 <span className="font-bold text-primary text-sm">₹{p.grandTotal.toFixed(2)}</span>
//                               </div>
//                               <div className="text-xs text-muted-foreground space-y-0.5">
//                                 <p>{item.pages} pages × {item.copies} copies • {paperSizeLabels[item.paperSize]}</p>
//                                 <p>{paperTypeLabels[item.paperType].split(' ').slice(0, 3).join(' ')} • {item.printColor === 'bw' ? 'B&W' : 'Color'} • {item.printSide === 'double' ? 'Double' : 'Single'}</p>
//                                 <p>{bindingLabels[item.bindingType].split('(')[0].trim()}</p>
//                               </div>
//                             </button>
//                           </div>
//                         ) : null;
//                       })}
//                       <div className="border-t border-border pt-3 space-y-2">
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Subtotal</span>
//                           <span>₹{totalPrintingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>GST (5%)</span>
//                           <span>₹{totalGst.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     price && (
//                       <>
//                         {[
//                           { label: 'Pages', value: `${items[0].pages} pages` },
//                           { label: 'Copies', value: `${items[0].copies} copies` },
//                           { label: 'Paper Size', value: paperSizeLabels[items[0].paperSize] },
//                           { label: 'Paper Type', value: paperTypeLabels[items[0].paperType].split(' ').slice(0, 3).join(' ') },
//                           { label: 'Print Color', value: items[0].printColor === 'bw' ? 'B&W' : 'Color' },
//                           { label: 'Printing Side', value: items[0].printSide === 'double' ? 'Double Side' : 'Single Side' },
//                           { label: 'Binding', value: bindingLabels[items[0].bindingType].split('(')[0].trim() },
//                           { label: 'Lamination', value: items[0].lamination === 'none' ? 'None' : items[0].lamination.charAt(0).toUpperCase() + items[0].lamination.slice(1) },
//                           { label: 'Delivery', value: deliveryType === 'courier' ? 'Courier' : 'Store Pickup' },
//                         ].map((item) => (
//                           <div key={item.label} className="flex justify-between">
//                             <span className="text-muted-foreground">{item.label}</span>
//                             <span className="font-medium text-foreground text-right">{item.value}</span>
//                           </div>
//                         ))}
//                         <div className="border-t border-border pt-3 space-y-2">
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>Per Page</span>
//                             <span>₹{price.pricePerPage.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>Printing Cost</span>
//                             <span>₹{price.printingCost.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>Binding Cost</span>
//                             <span>₹{price.bindingCost.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>GST (5%)</span>
//                             <span>₹{price.gst.toFixed(2)}</span>
//                           </div>
//                         </div>
//                       </>
//                     )
//                   )}

//                   <div className="border-t border-border pt-3 flex justify-between items-center">
//                     <span className="font-bold text-foreground">Total</span>
//                     <span className="font-black text-primary text-xl">₹{totalWithDelivery.toFixed(2)}</span>
//                   </div>
//                   <div className="pt-2 text-xs text-muted-foreground text-center">
//                     Inclusive of all taxes
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }




// import { useState, useRef, useEffect } from 'react';
// import { API } from '@/api/api';
// import { addToCart } from "@/services/orderService";
// import { Link, useNavigate } from 'react-router-dom';
// import { getPdfPageCount } from "@/utils/pdfUtils";
// import {
//   Upload, X, FileText, Image, File, AlertCircle, CheckCircle,
//   ArrowRight, ArrowLeft, Calculator, Package, Plus, Trash2, Copy, Layers, Truck, MapPin
// } from 'lucide-react';
// import {
//   calculatePrice, paperTypeLabels, bindingLabels, paperSizeLabels,
//   setPricingConfig, getPricingConfig,
//   type PaperSize, type PaperType, type PrintColor, type PrintSide, type BindingType
// } from '@/lib/pricingData';
// import { fetchPricing } from '@/services/pricingService';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { toast } from "sonner";
// import { uploadFile } from "@/services/uploadService";



// const MAX_FILE_SIZE = 500 * 1024 * 1024;
// const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
// const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png'];

// interface UploadedFile {
//   file: File;
//   id: string;
//   progress: number;
//   status: 'uploading' | 'done' | 'error';
//   error?: string;
//   url?: string;
// }

// interface OrderItem {
//   id: string;
//   files: UploadedFile[];
//   pages: number;
//   copies: number;
//   paperSize: PaperSize;
//   paperType: PaperType;
//   printColor: PrintColor;
//   printSide: PrintSide;
//   bindingType: BindingType;
//   lamination: 'none' | 'glossy' | 'matte' | 'velvate';
//   instructions: string;
// }

// // Calculate order weight - MATCHING CART COMPONENT with correct binding types
// const calculateOrderWeight = (items: OrderItem[]): number => {
//   let totalWeightKg = 0;

//   items.forEach(item => {
//     const totalPages = item.pages * item.copies;
    
//     let paperWeightPerPage = 0.002;
    
//     let itemWeight = totalPages * paperWeightPerPage;
    
//     if (item.bindingType === 'spiral') itemWeight += 0.050;
//     else if (item.bindingType === 'perfect_glue') itemWeight += 0.080;
//     else if (item.bindingType === 'hardbound') itemWeight += 0.200;
//     else if (item.bindingType === 'centre_staple' || item.bindingType === 'corner_staple') itemWeight += 0.030;
    
//     if (item.lamination === 'matte' || item.lamination === 'glossy') {
//       itemWeight += totalPages * 0.001;
//     }
    
//     totalWeightKg += itemWeight;
//   });

//   if (totalWeightKg > 2) totalWeightKg += 0.3;
//   else if (totalWeightKg > 1) totalWeightKg += 0.2;
//   else totalWeightKg += 0.1;
  
//   return Math.max(0.1, Math.round(totalWeightKg * 1000) / 1000);
// };

// // Calculate delivery charge - MATCHING CART COMPONENT
// const calculateDeliveryCharge = (weightKg: number): number => {
//   if (weightKg < 0.5) return 50;
//   else if (weightKg >= 0.5 && weightKg < 1) return 100;
//   else if (weightKg >= 1 && weightKg < 3) return 200;
//   else if (weightKg >= 3 && weightKg < 5) return 230;
//   else if (weightKg >= 5 && weightKg < 10) return 400;
//   else if (weightKg >= 10 && weightKg < 15) return 700;
//   else if (weightKg >= 15 && weightKg < 20) return 900;
//   else if (weightKg >= 20 && weightKg < 40) return 1200;
//   else if (weightKg >= 40 && weightKg < 80) return 1600;
//   else if (weightKg >= 80) return Math.ceil(weightKg) * 10;
//   return 50;
// };

// const formatWeight = (kg: number): string => {
//   return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
// };

// // ✅ Helper function to get dynamic binding label with cost based on copies
// const getDynamicBindingLabel = (bindingType: BindingType, copies: number): string => {
//   const config = getPricingConfig();
//   const bindingPrice = config?.bindingPrices?.[bindingType] ?? 0;
//   const totalCost = bindingPrice * copies;
  
//   if (bindingPrice === 0) {
//     return bindingLabels[bindingType];
//   }
  
//   return `${bindingLabels[bindingType]} (+₹${bindingPrice} × ${copies} = ₹${totalCost})`;
// };

// const createNewItem = (): OrderItem => ({
//   id: Math.random().toString(36).slice(2),
//   files: [],
//   pages: 100,
//   copies: 10,
//   paperSize: 'A4',
//   paperType: '70gsm_normal',
//   printColor: 'bw',
//   printSide: 'double',
//   bindingType: 'perfect_glue',
//   lamination: 'none',
//   instructions: '',
// });

// export default function OrderPage() {
//   const [orderMode, setOrderMode] = useState<'single' | 'bulk'>('single');
//   const [items, setItems] = useState<OrderItem[]>([createNewItem()]);
//   const [activeItemIndex, setActiveItemIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier'>('pickup');
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [pricingLoaded, setPricingLoaded] = useState(false);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadPricing = async () => {
//       try {
//         const pricing = await fetchPricing();
//         setPricingConfig(pricing);
//         setPricingLoaded(true);
//       } catch (error) {
//         console.error('Failed to load pricing:', error);
//         toast.error('Failed to load pricing. Using default rates.');
//         setPricingLoaded(true);
//       }
//     };
//     loadPricing();
//   }, []);

//   const activeItem = items[activeItemIndex] || items[0];
  
//   const updateItem = (index: number, updates: Partial<OrderItem>) => {
//     setItems(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
//   };

//   const addItem = () => {
//     const newItem = createNewItem();
//     setItems(prev => [...prev, newItem]);
//     setActiveItemIndex(items.length);
//   };

//   const duplicateItem = (index: number) => {
//     const source = items[index];
//     const newItem: OrderItem = { ...source, id: Math.random().toString(36).slice(2), files: [] };
//     setItems(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1)]);
//     setActiveItemIndex(index + 1);
//   };

//   const removeItem = (index: number) => {
//     if (items.length <= 1) return;
//     setItems(prev => prev.filter((_, i) => i !== index));
//     setActiveItemIndex(prevIndex => Math.max(0, Math.min(prevIndex, items.length - 2)));
//   };

//   // Calculate totals
//   const itemPrices = items.map(item => {
//     const config = getPricingConfig();
//     return calculatePrice({
//       pages: item.pages,
//       copies: item.copies,
//       paperSize: item.paperSize,
//       paperType: item.paperType,
//       printColor: item.printColor,
//       printSide: item.printSide,
//       bindingType: item.bindingType,
//     }, config || undefined);
//   });
  
//   const totalPrintingCost = itemPrices.reduce((sum, p) => sum + p.totalCost, 0);
//   const totalGst = totalPrintingCost * 0.05;
  
//   // Calculate weight and delivery charge
//   const orderWeight = calculateOrderWeight(items);
//   const deliveryCharge = deliveryType === 'courier' ? calculateDeliveryCharge(orderWeight) : 0;
  
//   const price = itemPrices[0];
//   const totalWithDelivery = orderMode === 'single' 
//     ? (price?.grandTotal || 0) + deliveryCharge 
//     : totalPrintingCost + totalGst + deliveryCharge;

//   const uploadFileToServer = async (file: File, itemIndex: number): Promise<void> => {
//     const id = Math.random().toString(36).slice(2);
    
//     const newFile: UploadedFile = { 
//       file, 
//       id, 
//       progress: 0, 
//       status: 'uploading',
//       url: ''
//     };
    
//     setItems(prev => prev.map((item, i) => 
//       i === itemIndex ? { ...item, files: [...item.files, newFile] } : item
//     ));

//     try {
//       const fileUrl = await uploadFile(file, (progress) => {
//         setItems(prev => prev.map((item, i) => 
//           i === itemIndex ? { 
//             ...item, 
//             files: item.files.map(f => f.id === id ? { ...f, progress } : f)
//           } : item
//         ));
//       });
      
//       setItems(prev => prev.map((item, i) => 
//         i === itemIndex ? { 
//           ...item, 
//           files: item.files.map(f => f.id === id ? { ...f, progress: 100, status: 'done', url: fileUrl } : f)
//         } : item
//       ));
      
//       toast.success(`${file.name} uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       setItems(prev => prev.map((item, i) => 
//         i === itemIndex ? { 
//           ...item, 
//           files: item.files.map(f => f.id === id ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed' } : f)
//         } : item
//       ));
//       toast.error(error instanceof Error ? error.message : `Failed to upload ${file.name}`);
//     }
//   };

//   // const handleFiles = async (newFiles: FileList | File[]) => {
//   //   if (!termsAccepted) {
//   //     toast.error('Please accept Terms & Conditions before uploading files');
//   //     return;
//   //   }
    
//   //   const fileArray = Array.from(newFiles);
//   //   for (const file of fileArray) {
//   //     if (file.size > MAX_FILE_SIZE) {
//   //       toast.error(`${file.name} is too large. Max size is 500MB.`);
//   //       continue;
//   //     }
      
//   //     const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
//   //     const isValidExtension = ALLOWED_EXTENSIONS.includes(fileExtension);
//   //     const isValidType = ALLOWED_TYPES.includes(file.type);
      
//   //     if (!isValidExtension && !isValidType) {
//   //       toast.error(`${file.name} is not a supported file type.`);
//   //       continue;
//   //     }
      
//   //     await uploadFileToServer(file, activeItemIndex);
//   //   }
//   // };



//   const handleFiles = async (newFiles: FileList | File[]) => {
//   if (!termsAccepted) {
//     toast.error('Please accept Terms & Conditions before uploading files');
//     return;
//   }
  
//   const fileArray = Array.from(newFiles);

//   for (const file of fileArray) {
//     if (file.size > MAX_FILE_SIZE) {
//       toast.error(`${file.name} is too large. Max size is 500MB.`);
//       continue;
//     }
    
//     const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
//     const isValidExtension = ALLOWED_EXTENSIONS.includes(fileExtension);
//     const isValidType = ALLOWED_TYPES.includes(file.type);
    
//     if (!isValidExtension && !isValidType) {
//       toast.error(`${file.name} is not a supported file type.`);
//       continue;
//     }

//     // 🔥 NEW: Auto-detect PDF pages
//     if (fileExtension === '.pdf') {
//       try {
//         const pages = await getPdfPageCount(file);

//         // ✅ Add pages (for multiple files)
// setItems(prev => prev.map((item, i) => {
//   if (i !== activeItemIndex) return item;

//   return {
//     ...item,
//     pages: item.files.length === 0 ? pages : item.pages + pages
//   };
// }));

//         toast.success(`📄 ${file.name}: ${pages} pages detected`);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to read PDF pages");
//       }
//     }

//     // ✅ Keep your upload logic SAME
//     await uploadFileToServer(file, activeItemIndex);
//   }
// };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     handleFiles(e.dataTransfer.files);
//   };

//   const removeFile = (itemIndex: number, fileId: string) => {
//     setItems(prev => prev.map((item, i) => 
//       i === itemIndex ? { ...item, files: item.files.filter(f => f.id !== fileId) } : item
//     ));
//   };

//   const allItemsHaveFiles = items.every(item => item.files.some(f => f.status === 'done'));

//   const getFileIcon = (file: File) => {
//     if (file.type === 'application/pdf') return <FileText className="h-5 w-5 text-primary" />;
//     if (file.type.startsWith('image/')) return <Image className="h-5 w-5 text-primary/70" />;
//     return <File className="h-5 w-5 text-muted-foreground" />;
//   };

//   const prepareOrderDataForCart = () => {
//     const sanitizedItems = items.map(item => ({
//       pages: item.pages,
//       copies: item.copies,
//       paperSize: item.paperSize,
//       paperType: item.paperType,
//       printColor: item.printColor,
//       printSide: item.printSide,
//       bindingType: item.bindingType,
//       lamination: item.lamination,
//       instructions: item.instructions,
//       files: item.files
//         .filter(f => f.status === 'done')
//         .map(f => ({
//           name: f.file.name,
//           size: f.file.size,
//           type: f.file.type,
//           status: f.status,
//           url: f.url || ""
//         }))
//     }));

//     return {
//       items: sanitizedItems,
//       orderMode,
//       deliveryType,
//       customer: {
//         name,
//         phone,
//         address: deliveryType === 'courier' ? address : undefined,
//         pincode: deliveryType === 'courier' ? pincode : undefined,
//         city: deliveryType === 'courier' ? city : undefined,
//         state: deliveryType === 'courier' ? state : undefined,
//       },
//       totalPrintingCost,
//       totalGst,
//       totalWithDelivery,
//     };
//   };

//   const handleContinue = async () => {
//     if (!name.trim() || !phone.trim()) {
//       toast.error("Please fill name and phone");
//       return;
//     }

//     if (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim())) {
//       toast.error("Please complete delivery address");
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error("Please login to save your cart");
//       navigate("/login", { state: { from: "/order" } });
//       return;
//     }

//     setIsSaving(true);
//     const loadingToast = toast.loading("Adding to cart...");

//     try {
//       const orderData = prepareOrderDataForCart();
//       console.log("📦 Sending to cart:", orderData);
      
//       const response = await addToCart(orderData);
      
//       toast.dismiss(loadingToast);
      
//       if (response?.data?.success) {
//         toast.success(`${orderData.items.length} item(s) added to cart 🛒`);
        
//         // Reset form
//         setName('');
//         setPhone('');
//         setAddress('');
//         setPincode('');
//         setCity('');
//         setState('');
//         setItems([createNewItem()]);
//         setTermsAccepted(false);
//         setStep(1);
//       } else {
//         toast.error(response?.data?.message || "Failed to add to cart");
//       }
      
//     } catch (error: any) {
//       toast.dismiss(loadingToast);
//       console.error("Error adding to cart:", error);
//       toast.error(error.response?.data?.message || error.message || "Failed to add to cart. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const renderPrintPreferences = (item: OrderItem, itemIndex: number) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-1">Number of Pages</label>
//       <input
//         type="number"
//         min={1}
//         value={item.pages === 0 ? '' : item.pages}
//         placeholder="Enter pages"
//         onChange={(e) => {
//           const value = e.target.value;
//           if (value === '') {
//             updateItem(itemIndex, { pages: 0 });
//           } else {
//             updateItem(itemIndex, { pages: Math.max(1, parseInt(value)) });
//           }
//         }}
//         className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//       />
//     </div>
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-1">Number of Copies</label>
//       <input
//         type="number"
//         min={1}
//         value={item.copies === 1 ? '' : item.copies}
//         placeholder="Enter copies"
//         onChange={(e) =>
//           updateItem(itemIndex, { copies: Math.max(1, parseInt(e.target.value) || 1) })
//         }
//         className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//       />
//     </div>
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-1">Paper Size</label>
//       <select value={item.paperSize} onChange={(e) => updateItem(itemIndex, { paperSize: e.target.value as PaperSize })}
//         className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//         {Object.entries(paperSizeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//       </select>
//     </div>
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-1">Paper Type</label>
//       <select value={item.paperType} onChange={(e) => updateItem(itemIndex, { paperType: e.target.value as PaperType })}
//         className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//         {Object.entries(paperTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//       </select>
//     </div>
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-2">Print Color</label>
//       <div className="flex gap-2">
//         {[{ v: 'bw', l: 'B&W' }, { v: 'color', l: 'Full Color' }].map((o) => (
//           <button key={o.v} onClick={() => updateItem(itemIndex, { printColor: o.v as PrintColor })}
//             className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printColor === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//             {o.l}
//           </button>
//         ))}
//       </div>
//     </div>
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-2">Printing Side</label>
//       <div className="flex gap-2">
//         {[{ v: 'double', l: 'Double Side' }, { v: 'single', l: 'Single Side' }].map((o) => (
//           <button key={o.v} onClick={() => updateItem(itemIndex, { printSide: o.v as PrintSide })}
//             className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${item.printSide === o.v ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
//             {o.l}
//           </button>
//         ))}
//       </div>
//     </div>
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-1">Binding Type</label>
//       <select 
//         value={item.bindingType} 
//         onChange={(e) => updateItem(itemIndex, { bindingType: e.target.value as BindingType })}
//         className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
//       >
//         {Object.entries(bindingLabels).map(([key, label]) => {
//           const config = getPricingConfig();
//           const bindingPrice = config?.bindingPrices?.[key as BindingType] ?? 0;
//           const displayLabel = bindingPrice > 0 ? `${label} (+₹${bindingPrice})` : label;
//           return (
//             <option key={key} value={key}>
//               {displayLabel}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//     <div>
//       <label className="block text-sm font-semibold text-foreground mb-1">Cover Lamination</label>
//       <select value={item.lamination} onChange={(e) => updateItem(itemIndex, { lamination: e.target.value as any })}
//         className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
//         <option value="none">No Lamination</option>
//         <option value="glossy">Glossy Lamination</option>
//         <option value="matte">Matte Lamination</option>
//         <option value="velvate">Velvate Lamination</option>
//       </select>
//     </div>
//     <div className="sm:col-span-2">
//       <label className="block text-sm font-semibold text-foreground mb-1">Special Instructions</label>
//       <textarea rows={2} value={item.instructions} onChange={(e) => updateItem(itemIndex, { instructions: e.target.value })} 
//         placeholder="Any special requirements or notes..."
//         className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//     </div>
//   </div>
// );

//   const renderFileUpload = (item: OrderItem, itemIndex: number) => (
//     <div className="space-y-6">
//       <div className={`transition-all duration-300 ease-in-out overflow-hidden ${termsAccepted ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'}`}>
//         <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-5 mb-4">
//           <div className="flex items-start gap-4">
//             <input
//               type="checkbox"
//               id="terms-accept"
//               checked={termsAccepted}
//               onChange={(e) => setTermsAccepted(e.target.checked)}
//               className="mt-1.5 h-5 w-5 accent-primary rounded border-border focus:ring-primary cursor-pointer"
//             />
//             <label htmlFor="terms-accept" className="text-sm leading-relaxed text-foreground/90 cursor-pointer select-none">
//               I agree to the{' '}
//               <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
//                 Terms & Conditions
//               </Link>
//               . I confirm that uploaded files do not violate copyrights, contain illegal content, or breach any laws/platform rules.
//             </label>
//           </div>
//         </div>
//       </div>

//       {termsAccepted && (
//         <div className="bg-green-50/60 border border-green-300 rounded-xl p-4 text-sm text-green-800 flex items-center gap-3 animate-fade-in">
//           <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
//           <span>Terms & Conditions accepted — file upload is now enabled</span>
//         </div>
//       )}

//       <div
//         className={`border-2 rounded-xl p-8 text-center transition-all duration-300 ${
//           termsAccepted
//             ? isDragging && activeItemIndex === itemIndex
//               ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
//               : 'border-dashed border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer'
//             : 'border-dashed border-muted-foreground/40 bg-muted/10 opacity-60 cursor-not-allowed'
//         }`}
//         onClick={() => {
//           if (termsAccepted) {
//             setActiveItemIndex(itemIndex);
//             fileInputRef.current?.click();
//           }
//         }}
//         onDragOver={(e) => {
//           if (termsAccepted) {
//             e.preventDefault();
//             setActiveItemIndex(itemIndex);
//             setIsDragging(true);
//           }
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={(e) => {
//           if (termsAccepted) {
//             setActiveItemIndex(itemIndex);
//             handleDrop(e);
//           } else {
//             e.preventDefault();
//           }
//         }}
//       >
//         <Upload className={`h-12 w-12 mx-auto mb-4 transition-colors ${termsAccepted && isDragging && activeItemIndex === itemIndex ? 'text-primary' : 'text-muted-foreground'}`} />
//         <p className="font-semibold text-lg text-foreground mb-2">
//           {termsAccepted ? 'Drag & drop files here' : 'Accept Terms First'}
//         </p>
//         <p className="text-muted-foreground mb-3">
//           {termsAccepted
//             ? 'or click to browse files (PDF, DOC, DOCX, JPG, PNG • max 500MB)'
//             : 'Please accept the terms & conditions above to unlock upload'}
//         </p>
//       </div>

//       {item.files.length > 0 && (
//         <div className="space-y-3 mt-6">
//           <p className="text-sm font-medium text-foreground">Uploaded Files</p>
//           {item.files.map((f) => (
//             <div key={f.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
//               {getFileIcon(f.file)}
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">{f.file.name}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {(f.file.size / 1024 / 1024).toFixed(2)} MB
//                   {f.url && <span className="ml-2 text-green-600">✓ Uploaded</span>}
//                 </p>
//                 {f.status === 'uploading' && (
//                   <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${f.progress}%` }} />
//                   </div>
//                 )}
//               </div>
//               {f.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
//               {f.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
//               <button onClick={() => removeFile(itemIndex, f.id)} className="p-2 hover:bg-muted rounded-full">
//                 <X className="h-5 w-5 text-muted-foreground" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {termsAccepted && item.files.length === 0 && (
//         <p className="text-center text-sm text-muted-foreground mt-4">
//           Upload at least one file to proceed to the next step
//         </p>
//       )}
//     </div>
//   );

//   if (!pricingLoaded) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="pt-20 flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//             <p className="text-muted-foreground">Loading pricing...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <input ref={fileInputRef} type="file" className="hidden" multiple accept={ALLOWED_EXTENSIONS.join(',')}
//         onChange={(e) => e.target.files && handleFiles(e.target.files)} />

//       <div className="pt-20">
//         <div className="bg-secondary py-10">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Place Your Order</h1>
//             <p className="text-white/60">Upload files, choose print options and proceed to payment</p>

//             <div className="flex gap-2 mt-4 mb-4">
//               <button onClick={() => { setOrderMode('single'); setItems([items[0] || createNewItem()]); setActiveItemIndex(0); }}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'single' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Package className="h-4 w-4" /> Single Order
//               </button>
//               <button onClick={() => setOrderMode('bulk')}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${orderMode === 'bulk' ? 'bg-primary text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
//                 <Layers className="h-4 w-4" /> Bulk Order
//               </button>
//             </div>

//             <div className="flex items-center gap-2 mt-2">
//               {[
//                 { n: 1, label: 'Upload & Options' },
//                 { n: 2, label: 'Delivery Details' },
//                 { n: 3, label: 'Add to Cart' },
//               ].map((s, i) => (
//                 <div key={s.n} className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
//                     step >= s.n ? 'bg-primary text-white' : 'bg-white/10 text-white/40'
//                   }`}>
//                     {step > s.n ? <CheckCircle className="h-4 w-4" /> : s.n}
//                   </div>
//                   <span className={`text-sm hidden sm:block ${step >= s.n ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
//                   {i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${step > s.n ? 'bg-primary' : 'bg-white/10'}`} />}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               {step === 1 && (
//                 <div className="space-y-6 animate-slide-up">
//                   {orderMode === 'bulk' && (
//                     <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
//                       <div className="flex items-center justify-between mb-3">
//                         <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
//                           <Layers className="h-4 w-4 text-primary" /> Order ({items.length})
//                         </h2>
//                         <button onClick={addItem} className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
//                           <Plus className="h-4 w-4" /> Add Item
//                         </button>
//                       </div>
//                       <div className="flex gap-2 flex-wrap">
//                         {items.map((item, i) => (
//                           <div key={item.id} className="flex items-center gap-1">
//                             <button onClick={() => setActiveItemIndex(i)}
//                               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
//                                 activeItemIndex === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
//                               }`}>
//                               {item.files.some(f => f.status === 'done') && <CheckCircle className="h-3 w-3" />}
//                               Item {i + 1}
//                             </button>
//                             {items.length > 1 && (
//                               <div className="flex">
//                                 <button onClick={() => duplicateItem(i)} className="p-1 text-muted-foreground hover:text-primary transition-colors">
//                                   <Copy className="h-3.5 w-3.5" />
//                                 </button>
//                                 <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
//                                   <Trash2 className="h-3.5 w-3.5" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Upload className="h-5 w-5 text-primary" /> Upload Files {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {activeItem && renderFileUpload(activeItem, activeItemIndex)}
//                   </div>

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
//                       <Calculator className="h-5 w-5 text-primary" /> Print Preferences {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
//                     </h2>
//                     {renderPrintPreferences(activeItem, activeItemIndex)}
//                   </div>

//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <label className="block text-sm font-semibold text-foreground mb-2">Delivery Option</label>
//                     <div className="flex gap-3">
//                       {[{ v: 'pickup', l: '🏪 Store Pickup (Free)' }, { v: 'courier', l: '🚚 Courier Delivery' }].map((o) => (
//                         <button key={o.v} onClick={() => setDeliveryType(o.v as any)}
//                           className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border ${deliveryType === o.v ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border hover:bg-muted/80'}`}>
//                           {o.l}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <button onClick={() => setStep(2)} disabled={!allItemsHaveFiles || !termsAccepted}
//                     className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
//                     Continue <ArrowRight className="h-5 w-5" />
//                   </button>
//                 </div>
//               )}

//               {step === 2 && (
//                 <div className="space-y-6 animate-slide-up">
//                   <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
//                     <h2 className="text-lg font-bold text-foreground mb-4">Delivery Details</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Full Name *</label>
//                         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-foreground mb-1">Phone / WhatsApp *</label>
//                         <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX"
//                           className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                       </div>
//                       {deliveryType === 'courier' && (
//                         <>
//                           <div className="sm:col-span-2">
//                             <label className="block text-sm font-semibold text-foreground mb-1">Delivery Address *</label>
//                             <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address..."
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">Pincode *</label>
//                             <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="110001"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">City *</label>
//                             <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-foreground mb-1">State *</label>
//                             <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State"
//                               className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
//                           </div>
//                         </>
//                       )}
//                       {deliveryType === 'pickup' && (
//                         <div className="sm:col-span-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
//                           <p className="text-sm text-foreground font-medium">📍 Pickup Location</p>
//                           <p className="text-sm text-muted-foreground mt-1">Shree Education and Publication Private Limited
//                             Mother's School Campus, Gaddi Maliyan, Jonsganj Road, Ajmer, Rajasthan – 305001 India</p>
//                           <p className="text-sm text-muted-foreground">📞 +917230001405</p>
//                           <p className="text-xs text-muted-foreground mt-2">Mon–Sat: 9AM–8PM</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(1)} className="flex-1 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2">
//                       <ArrowLeft className="h-4 w-4" /> Back
//                     </button>
//                     <button
//                       onClick={handleContinue}
//                       disabled={isSaving || !allItemsHaveFiles || !termsAccepted || !name.trim() || !phone.trim() || (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim()))}
//                       className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4"
//                     >
//                       {isSaving ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           Save to Cart <ArrowRight className="h-5 w-5" />
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-24 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
//                 <div className="bg-secondary p-4">
//                   <h3 className="text-white font-bold flex items-center gap-2">
//                     <Package className="h-4 w-4 text-primary" /> Order Summary
//                     {orderMode === 'bulk' && <span className="text-white/60 text-xs font-normal">({items.length} items)</span>}
//                   </h3>
//                 </div>
//                 <div className="p-4 space-y-3 text-sm max-h-[70vh] overflow-y-auto">
//                   {orderMode === 'bulk' ? (
//                     <>
//                       {items.map((item, i) => {
//                         const p = itemPrices[i];
//                         return p ? (
//                           <div key={item.id} className={`p-3 rounded-lg border transition-all duration-200 ${activeItemIndex === i ? 'border-primary bg-primary/5' : 'border-border'}`}>
//                             <button onClick={() => setActiveItemIndex(i)} className="w-full text-left">
//                               <div className="flex justify-between items-center mb-1">
//                                 <span className="font-bold text-foreground text-xs">Item {i + 1}</span>
//                                 <span className="font-bold text-primary text-sm">₹{p.grandTotal.toFixed(2)}</span>
//                               </div>
//                               <div className="text-xs text-muted-foreground space-y-0.5">
//                                 <p>{item.pages} pages × {item.copies} copies • {paperSizeLabels[item.paperSize]}</p>
//                                 <p>{paperTypeLabels[item.paperType].split(' ').slice(0, 3).join(' ')} • {item.printColor === 'bw' ? 'B&W' : 'Color'} • {item.printSide === 'double' ? 'Double' : 'Single'}</p>
//                                 <p>{bindingLabels[item.bindingType]}</p>
//                               </div>
//                             </button>
//                           </div>
//                         ) : null;
//                       })}
//                       <div className="border-t border-border pt-3 space-y-2">
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>Subtotal</span>
//                           <span>₹{totalPrintingCost.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted-foreground">
//                           <span>GST (5%)</span>
//                           <span>₹{totalGst.toFixed(2)}</span>
//                         </div>
//                         {deliveryType === 'courier' && (
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>Delivery Charge</span>
//                             <div className="text-right">
//                               <span>₹{deliveryCharge.toFixed(2)}</span>
//                               <p className="text-xs">{formatWeight(orderWeight)}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   ) : (
//                     price && (
//                       <>
//                         {[
//                           { label: 'Pages', value: `${items[0].pages} pages` },
//                           { label: 'Copies', value: `${items[0].copies} copies` },
//                           { label: 'Paper Size', value: paperSizeLabels[items[0].paperSize] },
//                           { label: 'Paper Type', value: paperTypeLabels[items[0].paperType].split(' ').slice(0, 3).join(' ') },
//                           { label: 'Print Color', value: items[0].printColor === 'bw' ? 'B&W' : 'Color' },
//                           { label: 'Printing Side', value: items[0].printSide === 'double' ? 'Double Side' : 'Single Side' },
//                           { label: 'Binding', value: bindingLabels[items[0].bindingType] },
//                           { label: 'Lamination', value: items[0].lamination === 'none' ? 'None' : items[0].lamination.charAt(0).toUpperCase() + items[0].lamination.slice(1) },
//                           { label: 'Delivery', value: deliveryType === 'courier' ? `Courier (₹${deliveryCharge})` : 'Store Pickup' },
//                           { label: 'Weight', value: formatWeight(orderWeight) },
//                         ].map((item) => (
//                           <div key={item.label} className="flex justify-between">
//                             <span className="text-muted-foreground">{item.label}</span>
//                             <span className="font-medium text-foreground text-right">{item.value}</span>
//                           </div>
//                         ))}
//                         <div className="border-t border-border pt-3 space-y-2">
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>Per Page</span>
//                             <span>₹{price.pricePerPage.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>Printing Cost</span>
//                             <span>₹{price.printingCost.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>Binding Cost</span>
//                             <span>₹{price.bindingCost.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between text-muted-foreground">
//                             <span>GST (5%)</span>
//                             <span>₹{price.gst.toFixed(2)}</span>
//                           </div>
//                         </div>
//                       </>
//                     )
//                   )}

//                   <div className="border-t border-border pt-3 flex justify-between items-center">
//                     <span className="font-bold text-foreground">Total</span>
//                     <span className="font-black text-primary text-xl">₹{totalWithDelivery.toFixed(2)}</span>
//                   </div>
//                   <div className="pt-2 text-xs text-muted-foreground text-center">
//                     Inclusive of all taxes
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }




import { useState, useRef, useEffect } from 'react';
import { API } from '@/api/api';
import { addToCart } from "@/services/orderService";
import { Link, useNavigate } from 'react-router-dom';
import { getPdfPageCount } from "@/utils/pdfUtils";
import {
  Upload, X, FileText, Image, File, AlertCircle, CheckCircle,
  ArrowRight, ArrowLeft, Calculator, Package, Plus, Trash2, Copy, Layers, Truck, MapPin
} from 'lucide-react';
import {
  calculatePrice, paperTypeLabels, bindingLabels, paperSizeLabels,
  setPricingConfig, getPricingConfig,
  type PaperSize, type PaperType, type PrintColor, type PrintSide, type BindingType
} from '@/lib/pricingData';
import { fetchPricing } from '@/services/pricingService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { uploadFile } from "@/services/uploadService";

const MAX_FILE_SIZE = 500 * 1024 * 1024;
const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png'];

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  error?: string;
  url?: string;
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
  lamination: 'none' | 'glossy' | 'matte' | 'velvate';
  instructions: string;
}

// Calculate order weight - MATCHING CART COMPONENT with correct binding types
const calculateOrderWeight = (items: OrderItem[]): number => {
  let totalWeightKg = 0;

  items.forEach(item => {
    const totalPages = item.pages * item.copies;
    
    let paperWeightPerPage = 0.002;
    
    let itemWeight = totalPages * paperWeightPerPage;
    
    if (item.bindingType === 'spiral') itemWeight += 0.050;
    else if (item.bindingType === 'perfect_glue') itemWeight += 0.080;
    else if (item.bindingType === 'hardbound') itemWeight += 0.200;
    else if (item.bindingType === 'centre_staple' || item.bindingType === 'corner_staple') itemWeight += 0.030;
    
    if (item.lamination === 'matte' || item.lamination === 'glossy') {
      itemWeight += totalPages * 0.001;
    }
    
    totalWeightKg += itemWeight;
  });

  if (totalWeightKg > 2) totalWeightKg += 0.3;
  else if (totalWeightKg > 1) totalWeightKg += 0.2;
  else totalWeightKg += 0.1;
  
  return Math.max(0.1, Math.round(totalWeightKg * 1000) / 1000);
};

// Calculate delivery charge - MATCHING CART COMPONENT
const calculateDeliveryCharge = (weightKg: number): number => {
  if (weightKg < 0.5) return 50;
  else if (weightKg >= 0.5 && weightKg < 1) return 100;
  else if (weightKg >= 1 && weightKg < 3) return 200;
  else if (weightKg >= 3 && weightKg < 5) return 230;
  else if (weightKg >= 5 && weightKg < 10) return 400;
  else if (weightKg >= 10 && weightKg < 15) return 700;
  else if (weightKg >= 15 && weightKg < 20) return 900;
  else if (weightKg >= 20 && weightKg < 40) return 1200;
  else if (weightKg >= 40 && weightKg < 80) return 1600;
  else if (weightKg >= 80) return Math.ceil(weightKg) * 10;
  return 50;
};

const formatWeight = (kg: number): string => {
  return kg >= 1 ? `${kg.toFixed(2)} kg` : `${(kg * 1000).toFixed(0)} g`;
};

// ✅ Helper function to get dynamic binding label with cost based on copies
const getDynamicBindingLabel = (bindingType: BindingType, copies: number): string => {
  const config = getPricingConfig();
  const bindingPrice = config?.bindingPrices?.[bindingType] ?? 0;
  const totalCost = bindingPrice * copies;
  
  if (bindingPrice === 0) {
    return bindingLabels[bindingType];
  }
  
  return `${bindingLabels[bindingType]} (+₹${bindingPrice} × ${copies} = ₹${totalCost})`;
};

const createNewItem = (): OrderItem => ({
  id: Math.random().toString(36).slice(2),
  files: [],
  pages: 0,
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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pricingLoaded, setPricingLoaded] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricing = await fetchPricing();
        setPricingConfig(pricing);
        setPricingLoaded(true);
      } catch (error) {
        console.error('Failed to load pricing:', error);
        toast.error('Failed to load pricing. Using default rates.');
        setPricingLoaded(true);
      }
    };
    loadPricing();
  }, []);

  const activeItem = items[activeItemIndex] || items[0];
  
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
    setActiveItemIndex(prevIndex => Math.max(0, Math.min(prevIndex, items.length - 2)));
  };

  // Calculate totals
  const itemPrices = items.map(item => {
    const config = getPricingConfig();
    return calculatePrice({
      pages: item.pages,
      copies: item.copies,
      paperSize: item.paperSize,
      paperType: item.paperType,
      printColor: item.printColor,
      printSide: item.printSide,
      bindingType: item.bindingType,
    }, config || undefined);
  });
  
  const totalPrintingCost = itemPrices.reduce((sum, p) => sum + p.totalCost, 0);
  const totalGst = totalPrintingCost * 0.05;
  
  // Calculate weight and delivery charge
  const orderWeight = calculateOrderWeight(items);
  const deliveryCharge = deliveryType === 'courier' ? calculateDeliveryCharge(orderWeight) : 0;
  
  const price = itemPrices[0];
  const totalWithDelivery = orderMode === 'single' 
    ? (price?.grandTotal || 0) + deliveryCharge 
    : totalPrintingCost + totalGst + deliveryCharge;

  const uploadFileToServer = async (file: File, itemIndex: number): Promise<void> => {
    const id = Math.random().toString(36).slice(2);
    
    const newFile: UploadedFile = { 
      file, 
      id, 
      progress: 0, 
      status: 'uploading',
      url: ''
    };
    
    setItems(prev => prev.map((item, i) => 
      i === itemIndex ? { ...item, files: [...item.files, newFile] } : item
    ));

    try {
      const fileUrl = await uploadFile(file, (progress) => {
        setItems(prev => prev.map((item, i) => 
          i === itemIndex ? { 
            ...item, 
            files: item.files.map(f => f.id === id ? { ...f, progress } : f)
          } : item
        ));
      });
      
      setItems(prev => prev.map((item, i) => 
        i === itemIndex ? { 
          ...item, 
          files: item.files.map(f => f.id === id ? { ...f, progress: 100, status: 'done', url: fileUrl } : f)
        } : item
      ));
      
      toast.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      setItems(prev => prev.map((item, i) => 
        i === itemIndex ? { 
          ...item, 
          files: item.files.map(f => f.id === id ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed' } : f)
        } : item
      ));
      toast.error(error instanceof Error ? error.message : `Failed to upload ${file.name}`);
    }
  };

  // ✅ FIXED: Auto‑fetch PDF pages with sequential processing and functional update
  const handleFiles = async (newFiles: FileList | File[]) => {
    if (!termsAccepted) {
      toast.error('Please accept Terms & Conditions before uploading files');
      return;
    }
    
    const fileArray = Array.from(newFiles);

    // Process files one by one to avoid race conditions
    for (const file of fileArray) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Max size is 500MB.`);
        continue;
      }
      
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidExtension = ALLOWED_EXTENSIONS.includes(fileExtension);
      const isValidType = ALLOWED_TYPES.includes(file.type);
      
      if (!isValidExtension && !isValidType) {
        toast.error(`${file.name} is not a supported file type.`);
        continue;
      }

      // 🔥 NEW: Auto-detect PDF pages – update pages safely using functional update
      if (fileExtension === '.pdf') {
        try {
          const pages = await getPdfPageCount(file);
          // Functional update: add detected pages to current total
          setItems(prev => prev.map((item, idx) => {
            if (idx !== activeItemIndex) return item;
            const newPages = item.pages + pages;
            return { ...item, pages: newPages };
          }));
          toast.success(`📄 ${file.name}: ${pages} pages detected (total: ${items[activeItemIndex].pages + pages})`);
        } catch (err) {
          console.error(err);
          toast.error(`Failed to read PDF pages for ${file.name}`);
        }
      }

      // Upload the file after page detection
      await uploadFileToServer(file, activeItemIndex);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (itemIndex: number, fileId: string) => {
    setItems(prev => prev.map((item, i) => 
      i === itemIndex ? { ...item, files: item.files.filter(f => f.id !== fileId) } : item
    ));
    // Optionally: recalculate total pages from remaining PDFs? Not required for now.
  };

  const allItemsHaveFiles = items.every(item => item.files.some(f => f.status === 'done'));

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') return <FileText className="h-5 w-5 text-primary" />;
    if (file.type.startsWith('image/')) return <Image className="h-5 w-5 text-primary/70" />;
    return <File className="h-5 w-5 text-muted-foreground" />;
  };

  const prepareOrderDataForCart = () => {
    const sanitizedItems = items.map(item => ({
      pages: item.pages,
      copies: item.copies,
      paperSize: item.paperSize,
      paperType: item.paperType,
      printColor: item.printColor,
      printSide: item.printSide,
      bindingType: item.bindingType,
      lamination: item.lamination,
      instructions: item.instructions,
      files: item.files
        .filter(f => f.status === 'done')
        .map(f => ({
          name: f.file.name,
          size: f.file.size,
          type: f.file.type,
          status: f.status,
          url: f.url || ""
        }))
    }));

    return {
      items: sanitizedItems,
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
      totalPrintingCost,
      totalGst,
      totalWithDelivery,
    };
  };

  const handleContinue = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill name and phone");
      return;
    }

    if (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim())) {
      toast.error("Please complete delivery address");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to save your cart");
      navigate("/login", { state: { from: "/order" } });
      return;
    }

    setIsSaving(true);
    const loadingToast = toast.loading("Adding to cart...");

    try {
      const orderData = prepareOrderDataForCart();
      console.log("📦 Sending to cart:", orderData);
      
      const response = await addToCart(orderData);
      
      toast.dismiss(loadingToast);
      
      if (response?.data?.success) {
        toast.success(`${orderData.items.length} item(s) added to cart 🛒`);
        
        // Reset form
        setName('');
        setPhone('');
        setAddress('');
        setPincode('');
        setCity('');
        setState('');
        setItems([createNewItem()]);
        setTermsAccepted(false);
        setStep(1);
      } else {
        toast.error(response?.data?.message || "Failed to add to cart");
      }
      
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to add to cart. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
              updateItem(itemIndex, { pages: 0 });
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
          value={item.copies === 1 ? '' : item.copies}
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
          {Object.entries(paperSizeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
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
        <select 
          value={item.bindingType} 
          onChange={(e) => updateItem(itemIndex, { bindingType: e.target.value as BindingType })}
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
        >
          {Object.entries(bindingLabels).map(([key, label]) => {
            const config = getPricingConfig();
            const bindingPrice = config?.bindingPrices?.[key as BindingType] ?? 0;
            const displayLabel = bindingPrice > 0 ? `${label} (+₹${bindingPrice})` : label;
            return (
              <option key={key} value={key}>
                {displayLabel}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Cover Lamination</label>
        <select value={item.lamination} onChange={(e) => updateItem(itemIndex, { lamination: e.target.value as any })}
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
          <option value="none">No Lamination</option>
          <option value="glossy">Glossy Lamination</option>
          <option value="matte">Matte Lamination</option>
          <option value="velvate">Velvate Lamination</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-foreground mb-1">Special Instructions</label>
        <textarea rows={2} value={item.instructions} onChange={(e) => updateItem(itemIndex, { instructions: e.target.value })} 
          placeholder="Any special requirements or notes..."
          className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
      </div>
    </div>
  );

  const renderFileUpload = (item: OrderItem, itemIndex: number) => (
    <div className="space-y-6">
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${termsAccepted ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'}`}>
        <div className="bg-amber-50/60 border border-amber-300 rounded-xl p-5 mb-4">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              id="terms-accept"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1.5 h-5 w-5 accent-primary rounded border-border focus:ring-primary cursor-pointer"
            />
            <label htmlFor="terms-accept" className="text-sm leading-relaxed text-foreground/90 cursor-pointer select-none">
              I agree to the{' '}
              <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                Terms & Conditions
              </Link>
              . I confirm that uploaded files do not violate copyrights, contain illegal content, or breach any laws/platform rules.
            </label>
          </div>
        </div>
      </div>

      {termsAccepted && (
        <div className="bg-green-50/60 border border-green-300 rounded-xl p-4 text-sm text-green-800 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <span>Terms & Conditions accepted — file upload is now enabled</span>
        </div>
      )}

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
        <Upload className={`h-12 w-12 mx-auto mb-4 transition-colors ${termsAccepted && isDragging && activeItemIndex === itemIndex ? 'text-primary' : 'text-muted-foreground'}`} />
        <p className="font-semibold text-lg text-foreground mb-2">
          {termsAccepted ? 'Drag & drop files here' : 'Accept Terms First'}
        </p>
        <p className="text-muted-foreground mb-3">
          {termsAccepted
            ? 'or click to browse files (PDF, DOC, DOCX, JPG, PNG • max 500MB)'
            : 'Please accept the terms & conditions above to unlock upload'}
        </p>
      </div>

      {item.files.length > 0 && (
        <div className="space-y-3 mt-6">
          <p className="text-sm font-medium text-foreground">Uploaded Files</p>
          {item.files.map((f) => (
            <div key={f.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
              {getFileIcon(f.file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{f.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(f.file.size / 1024 / 1024).toFixed(2)} MB
                  {f.url && <span className="ml-2 text-green-600">✓ Uploaded</span>}
                </p>
                {f.status === 'uploading' && (
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${f.progress}%` }} />
                  </div>
                )}
              </div>
              {f.status === 'done' && <CheckCircle className="h-5 w-5 text-green-500" />}
              {f.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
              <button onClick={() => removeFile(itemIndex, f.id)} className="p-2 hover:bg-muted rounded-full">
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

  if (!pricingLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading pricing...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <input ref={fileInputRef} type="file" className="hidden" multiple accept={ALLOWED_EXTENSIONS.join(',')}
        onChange={(e) => e.target.files && handleFiles(e.target.files)} />

      <div className="pt-20">
        <div className="bg-secondary py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Place Your Order</h1>
            <p className="text-white/60">Upload files, choose print options and proceed to payment</p>

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

            <div className="flex items-center gap-2 mt-2">
              {[
                { n: 1, label: 'Upload & Options' },
                { n: 2, label: 'Delivery Details' },
                { n: 3, label: 'Add to Cart' },
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
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <div className="space-y-6 animate-slide-up">
                  {orderMode === 'bulk' && (
                    <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" /> Order ({items.length})
                        </h2>
                        <button onClick={addItem} className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                          <Plus className="h-4 w-4" /> Add Item
                        </button>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {items.map((item, i) => (
                          <div key={item.id} className="flex items-center gap-1">
                            <button onClick={() => setActiveItemIndex(i)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                                activeItemIndex === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
                              }`}>
                              {item.files.some(f => f.status === 'done') && <CheckCircle className="h-3 w-3" />}
                              Item {i + 1}
                            </button>
                            {items.length > 1 && (
                              <div className="flex">
                                <button onClick={() => duplicateItem(i)} className="p-1 text-muted-foreground hover:text-primary transition-colors">
                                  <Copy className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Upload className="h-5 w-5 text-primary" /> Upload Files {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
                    </h2>
                    {activeItem && renderFileUpload(activeItem, activeItemIndex)}
                  </div>

                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" /> Print Preferences {orderMode === 'bulk' && <span className="text-sm font-normal text-muted-foreground">(Item {activeItemIndex + 1})</span>}
                    </h2>
                    {renderPrintPreferences(activeItem, activeItemIndex)}
                  </div>

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

                  <button onClick={() => setStep(2)} disabled={!allItemsHaveFiles || !termsAccepted}
                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    Continue <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}

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
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"
                              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-1">State *</label>
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State"
                              className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                          </div>
                        </>
                      )}
                      {deliveryType === 'pickup' && (
                        <div className="sm:col-span-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm text-foreground font-medium">📍 Pickup Location</p>
                          <p className="text-sm text-muted-foreground mt-1">Shree Education and Publication Private Limited
                            Mother's School Campus, Gaddi Maliyan, Jonsganj Road, Ajmer, Rajasthan – 305001 India</p>
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
                    <button
                      onClick={handleContinue}
                      disabled={isSaving || !allItemsHaveFiles || !termsAccepted || !name.trim() || !phone.trim() || (deliveryType === 'courier' && (!address.trim() || !pincode.trim() || !city.trim() || !state.trim()))}
                      className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          Save to Cart <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
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
                        return p ? (
                          <div key={item.id} className={`p-3 rounded-lg border transition-all duration-200 ${activeItemIndex === i ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <button onClick={() => setActiveItemIndex(i)} className="w-full text-left">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-foreground text-xs">Item {i + 1}</span>
                                <span className="font-bold text-primary text-sm">₹{p.grandTotal.toFixed(2)}</span>
                              </div>
                              <div className="text-xs text-muted-foreground space-y-0.5">
                                <p>{item.pages} pages × {item.copies} copies • {paperSizeLabels[item.paperSize]}</p>
                                <p>{paperTypeLabels[item.paperType].split(' ').slice(0, 3).join(' ')} • {item.printColor === 'bw' ? 'B&W' : 'Color'} • {item.printSide === 'double' ? 'Double' : 'Single'}</p>
                                <p>{bindingLabels[item.bindingType]}</p>
                              </div>
                            </button>
                          </div>
                        ) : null;
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
                            <span>Delivery Charge</span>
                            <div className="text-right">
                              <span>₹{deliveryCharge.toFixed(2)}</span>
                              <p className="text-xs">{formatWeight(orderWeight)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    price && (
                      <>
                        {[
                          { label: 'Pages', value: `${items[0].pages} pages` },
                          { label: 'Copies', value: `${items[0].copies} copies` },
                          { label: 'Paper Size', value: paperSizeLabels[items[0].paperSize] },
                          { label: 'Paper Type', value: paperTypeLabels[items[0].paperType].split(' ').slice(0, 3).join(' ') },
                          { label: 'Print Color', value: items[0].printColor === 'bw' ? 'B&W' : 'Color' },
                          { label: 'Printing Side', value: items[0].printSide === 'double' ? 'Double Side' : 'Single Side' },
                          { label: 'Binding', value: bindingLabels[items[0].bindingType] },
                          { label: 'Lamination', value: items[0].lamination === 'none' ? 'None' : items[0].lamination.charAt(0).toUpperCase() + items[0].lamination.slice(1) },
                          { label: 'Delivery', value: deliveryType === 'courier' ? `Courier (₹${deliveryCharge})` : 'Store Pickup' },
                          { label: 'Weight', value: formatWeight(orderWeight) },
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
                        </div>
                      </>
                    )
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