// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Mail, Phone, Eye, CheckCircle, XCircle, AlertCircle,
//   ChevronLeft, ChevronRight, RefreshCw, Filter, MessageSquare
// } from 'lucide-react';

// interface Contact {
//   _id: string;
//   name: string;
//   phone: string;
//   email: string | null;
//   subject: string;
//   subjectLabel: string;
//   message: string;
//   status: 'pending' | 'replied' | 'spam';
//   createdAt: string;
//   updatedAt: string;
//   ipAddress?: string;
//   userAgent?: string;
// }

// interface PaginationData {
//   page: number;
//   limit: number;
//   total: number;
//   pages: number;
// }

// interface ApiResponse {
//   success: boolean;
//   data: Contact[];
//   pagination: PaginationData;
// }

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export default function AdminContact() {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState<PaginationData>({
//     page: 1,
//     limit: 20,
//     total: 0,
//     pages: 0
//   });
//   const [statusFilter, setStatusFilter] = useState<string>('');
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchContacts = async (page = 1, status = statusFilter) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params: any = { page, limit: 20 };
//       if (status && status !== 'all') params.status = status;
      
//       const response = await axios.get<ApiResponse>(`${API_URL}/contact`, { params });
      
//       setContacts(response.data.data);
//       setPagination(response.data.pagination);
//     } catch (err: any) {
//       console.error('Error fetching contacts:', err);
//       setError(err.response?.data?.message || 'Failed to load contacts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchContacts(1, statusFilter);
//   }, [statusFilter]);

//   const handlePageChange = (newPage: number) => {
//     fetchContacts(newPage, statusFilter);
//   };

//   const handleStatusChange = async (contactId: string, newStatus: string) => {
//     setUpdatingStatus(contactId);
//     try {
//       await axios.patch(`${API_URL}/contact/${contactId}/status`, { status: newStatus });
//       fetchContacts(pagination.page, statusFilter);
//       if (selectedContact?._id === contactId) {
//         setSelectedContact({ ...selectedContact, status: newStatus as any });
//       }
//     } catch (err: any) {
//       console.error('Error updating status:', err);
//       alert('Failed to update status');
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const viewDetails = (contact: Contact) => {
//     setSelectedContact(contact);
//     setModalOpen(true);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3" /> Pending</span>;
//       case 'replied':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-3 w-3" /> Replied</span>;
//       case 'spam':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-3 w-3" /> Spam</span>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
//             <p className="text-gray-500 mt-1">Manage inquiries from customers</p>
//           </div>
//           <button
//             onClick={() => fetchContacts(pagination.page, statusFilter)}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             <RefreshCw className="h-4 w-4" /> Refresh
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow mb-6 p-4 flex flex-wrap gap-4 items-center">
//           <div className="flex items-center gap-2">
//             <Filter className="h-5 w-5 text-gray-400" />
//             <span className="text-sm font-medium text-gray-700">Filter by status:</span>
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
//           >
//             <option value="">All</option>
//             <option value="pending">Pending</option>
//             <option value="replied">Replied</option>
//             <option value="spam">Spam</option>
//           </select>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
//             {error}
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : contacts.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//               <p>No contact submissions found.</p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Contact</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Preview</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {contacts.map((contact) => (
//                       <tr key={contact._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {formatDate(contact.createdAt)}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="text-sm font-medium text-gray-900">{contact.name}</div>
//                           <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
//                             <Phone className="h-3 w-3" /> {contact.phone}
//                           </div>
//                           {contact.email && (
//                             <div className="text-sm text-gray-500 flex items-center gap-1">
//                               <Mail className="h-3 w-3" /> {contact.email}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{contact.subjectLabel}</div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
//                             {contact.message.substring(0, 100)}...
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getStatusBadge(contact.status)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => viewDetails(contact)}
//                               className="text-primary hover:text-primary/80 p-1"
//                               title="View Details"
//                             >
//                               <Eye className="h-5 w-5" />
//                             </button>
//                             {contact.status !== 'replied' && (
//                               <button
//                                 onClick={() => handleStatusChange(contact._id, 'replied')}
//                                 disabled={updatingStatus === contact._id}
//                                 className="text-green-600 hover:text-green-800 p-1 disabled:opacity-50"
//                                 title="Mark as Replied"
//                               >
//                                 <CheckCircle className="h-5 w-5" />
//                               </button>
//                             )}
//                             {contact.status !== 'spam' && (
//                               <button
//                                 onClick={() => handleStatusChange(contact._id, 'spam')}
//                                 disabled={updatingStatus === contact._id}
//                                 className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
//                                 title="Mark as Spam"
//                               >
//                                 <XCircle className="h-5 w-5" />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {pagination.pages > 1 && (
//                 <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//                   <div className="text-sm text-gray-500">
//                     Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handlePageChange(pagination.page - 1)}
//                       disabled={pagination.page === 1}
//                       className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                     >
//                       <ChevronLeft className="h-4 w-4" />
//                     </button>
//                     <span className="px-3 py-1 text-sm">Page {pagination.page} of {pagination.pages}</span>
//                     <button
//                       onClick={() => handlePageChange(pagination.page + 1)}
//                       disabled={pagination.page === pagination.pages}
//                       className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                     >
//                       <ChevronRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Details Modal */}
//       {modalOpen && selectedContact && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
//               <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
//                   <p className="text-gray-900">{selectedContact.name}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
//                   <p className="text-gray-900">{selectedContact.phone}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
//                   <p className="text-gray-900">{selectedContact.email || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Subject</label>
//                   <p className="text-gray-900">{selectedContact.subjectLabel}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
//                   <div>{getStatusBadge(selectedContact.status)}</div>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Submitted On</label>
//                   <p className="text-gray-900">{formatDate(selectedContact.createdAt)}</p>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
//                 <div className="mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-800">
//                   {selectedContact.message}
//                 </div>
//               </div>
//               {selectedContact.ipAddress && (
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">IP Address</label>
//                   <p className="text-gray-900 text-sm">{selectedContact.ipAddress}</p>
//                 </div>
//               )}
//               <div className="flex justify-end gap-3 pt-4 border-t">
//                 <select
//                   value={selectedContact.status}
//                   onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
//                   className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="replied">Replied</option>
//                   <option value="spam">Spam</option>
//                 </select>
//                 <a
//                   href={`mailto:${selectedContact.email || ''}`}
//                   className={`inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 ${!selectedContact.email ? 'opacity-50 pointer-events-none' : ''}`}
//                 >
//                   <Mail className="h-4 w-4" /> Reply via Email
//                 </a>
//                 <a
//                   href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 >
//                   <Phone className="h-4 w-4" /> WhatsApp
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Mail, Phone, Eye, CheckCircle, XCircle, AlertCircle, Trash2,
//   ChevronLeft, ChevronRight, RefreshCw, Filter, MessageSquare
// } from 'lucide-react';

// interface Contact {
//   _id: string;
//   name: string;
//   phone: string;
//   email: string | null;
//   subject: string;
//   subjectLabel: string;
//   message: string;
//   status: 'pending' | 'replied' | 'spam';
//   createdAt: string;
//   updatedAt: string;
//   ipAddress?: string;
//   userAgent?: string;
// }

// interface PaginationData {
//   page: number;
//   limit: number;
//   total: number;
//   pages: number;
// }

// interface ApiResponse {
//   success: boolean;
//   data: Contact[];
//   pagination: PaginationData;
// }

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export default function AdminContact() {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState<PaginationData>({
//     page: 1,
//     limit: 20,
//     total: 0,
//     pages: 0
//   });
//   const [statusFilter, setStatusFilter] = useState<string>('');
//   const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchContacts = async (page = 1, status = statusFilter) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params: any = { page, limit: 20 };
//       if (status && status !== 'all') params.status = status;
      
//       const response = await axios.get<ApiResponse>(`${API_URL}/contact`, { params });
      
//       setContacts(response.data.data);
//       setPagination(response.data.pagination);
//     } catch (err: any) {
//       console.error('Error fetching contacts:', err);
//       setError(err.response?.data?.message || 'Failed to load contacts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchContacts(1, statusFilter);
//   }, [statusFilter]);

//   const handlePageChange = (newPage: number) => {
//     fetchContacts(newPage, statusFilter);
//   };

//   const handleStatusChange = async (contactId: string, newStatus: string) => {
//     setUpdatingStatus(contactId);
//     try {
//       await axios.patch(`${API_URL}/contact/${contactId}/status`, { status: newStatus });
//       fetchContacts(pagination.page, statusFilter);
//       if (selectedContact?._id === contactId) {
//         setSelectedContact({ ...selectedContact, status: newStatus as any });
//       }
//     } catch (err: any) {
//       console.error('Error updating status:', err);
//       alert('Failed to update status');
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const handleDelete = async (contactId: string) => {
//     if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) return;
    
//     setDeletingId(contactId);
//     try {
//       await axios.delete(`${API_URL}/contact/${contactId}`);
//       // Refresh current page
//       fetchContacts(pagination.page, statusFilter);
//       // Close modal if the deleted contact was open
//       if (selectedContact?._id === contactId) {
//         setModalOpen(false);
//         setSelectedContact(null);
//       }
//     } catch (err: any) {
//       console.error('Error deleting contact:', err);
//       alert(err.response?.data?.message || 'Failed to delete message');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const viewDetails = (contact: Contact) => {
//     setSelectedContact(contact);
//     setModalOpen(true);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3" /> Pending</span>;
//       case 'replied':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-3 w-3" /> Replied</span>;
//       case 'spam':
//         return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-3 w-3" /> Spam</span>;
//       default:
//         return null;
//     }
//   };

//   // Build email reply URL with pre-filled subject and body
// const getEmailReplyUrl = (contact: Contact) => {
//   if (!contact.email) return '#';

//   const subject = encodeURIComponent(
//     `Re: ${contact.subjectLabel} from ${contact.name}`
//   );

//   const body = encodeURIComponent(
//     `Dear ${contact.name},\n\n` +
//     `Thank you for your message regarding "${contact.subjectLabel}".\n\n` +
//     `Your message:\n${contact.message}\n\n` +
//     `---\n\n` +
//     `We will get back to you shortly.\n\n` +
//     `Best regards,\nShree Publication Team`
//   );

//   return `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${subject}&body=${body}`;
// };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
//             <p className="text-gray-500 mt-1">Manage inquiries from customers</p>
//           </div>
//           <button
//             onClick={() => fetchContacts(pagination.page, statusFilter)}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             <RefreshCw className="h-4 w-4" /> Refresh
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow mb-6 p-4 flex flex-wrap gap-4 items-center">
//           <div className="flex items-center gap-2">
//             <Filter className="h-5 w-5 text-gray-400" />
//             <span className="text-sm font-medium text-gray-700">Filter by status:</span>
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
//           >
//             <option value="">All</option>
//             <option value="pending">Pending</option>
//             <option value="replied">Replied</option>
//             <option value="spam">Spam</option>
//           </select>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
//             {error}
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : contacts.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//               <p>No contact submissions found.</p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Contact</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Preview</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {contacts.map((contact) => (
//                       <tr key={contact._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {formatDate(contact.createdAt)}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="text-sm font-medium text-gray-900">{contact.name}</div>
//                           <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
//                             <Phone className="h-3 w-3" /> {contact.phone}
//                           </div>
//                           {contact.email && (
//                             <div className="text-sm text-gray-500 flex items-center gap-1">
//                               <Mail className="h-3 w-3" /> {contact.email}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{contact.subjectLabel}</div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
//                             {contact.message.substring(0, 100)}...
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getStatusBadge(contact.status)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => viewDetails(contact)}
//                               className="text-primary hover:text-primary/80 p-1"
//                               title="View Details"
//                             >
//                               <Eye className="h-5 w-5" />
//                             </button>
//                             {contact.status !== 'replied' && (
//                               <button
//                                 onClick={() => handleStatusChange(contact._id, 'replied')}
//                                 disabled={updatingStatus === contact._id}
//                                 className="text-green-600 hover:text-green-800 p-1 disabled:opacity-50"
//                                 title="Mark as Replied"
//                               >
//                                 <CheckCircle className="h-5 w-5" />
//                               </button>
//                             )}
//                             {contact.status !== 'spam' && (
//                               <button
//                                 onClick={() => handleStatusChange(contact._id, 'spam')}
//                                 disabled={updatingStatus === contact._id}
//                                 className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
//                                 title="Mark as Spam"
//                               >
//                                 <XCircle className="h-5 w-5" />
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleDelete(contact._id)}
//                               disabled={deletingId === contact._id}
//                               className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
//                               title="Delete Message"
//                             >
//                               <Trash2 className="h-5 w-5" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {pagination.pages > 1 && (
//                 <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//                   <div className="text-sm text-gray-500">
//                     Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handlePageChange(pagination.page - 1)}
//                       disabled={pagination.page === 1}
//                       className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                     >
//                       <ChevronLeft className="h-4 w-4" />
//                     </button>
//                     <span className="px-3 py-1 text-sm">Page {pagination.page} of {pagination.pages}</span>
//                     <button
//                       onClick={() => handlePageChange(pagination.page + 1)}
//                       disabled={pagination.page === pagination.pages}
//                       className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                     >
//                       <ChevronRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Details Modal */}
//       {modalOpen && selectedContact && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
//               <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
//                 <XCircle className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
//                   <p className="text-gray-900">{selectedContact.name}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
//                   <p className="text-gray-900">{selectedContact.phone}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
//                   <p className="text-gray-900">{selectedContact.email || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Subject</label>
//                   <p className="text-gray-900">{selectedContact.subjectLabel}</p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
//                   <div>{getStatusBadge(selectedContact.status)}</div>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">Submitted On</label>
//                   <p className="text-gray-900">{formatDate(selectedContact.createdAt)}</p>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
//                 <div className="mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-800">
//                   {selectedContact.message}
//                 </div>
//               </div>
//               {selectedContact.ipAddress && (
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase">IP Address</label>
//                   <p className="text-gray-900 text-sm">{selectedContact.ipAddress}</p>
//                 </div>
//               )}
//               <div className="flex justify-end gap-3 pt-4 border-t">
//                 <select
//                   value={selectedContact.status}
//                   onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
//                   className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="replied">Replied</option>
//                   <option value="spam">Spam</option>
//                 </select>
//                 <a
//   href={getEmailReplyUrl(selectedContact)}
//   target="_blank"
//   rel="noopener noreferrer"
//   className={`inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 ${
//     !selectedContact.email ? 'opacity-50 pointer-events-none' : ''
//   }`}
// >
//   <Mail className="h-4 w-4" /> Reply via Gmail
// </a>
//                 <a
//                   href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 >
//                   <Phone className="h-4 w-4" /> WhatsApp
//                 </a>
//                 <button
//                   onClick={() => handleDelete(selectedContact._id)}
//                   disabled={deletingId === selectedContact._id}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
//                 >
//                   <Trash2 className="h-4 w-4" /> Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Mail, Phone, Eye, CheckCircle, XCircle, AlertCircle, Trash2,
  ChevronLeft, ChevronRight, RefreshCw, Filter, MessageSquare, BookOpen
} from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string;
  subjectLabel: string;
  message: string;
  status: 'pending' | 'replied' | 'spam';
  inquiryType?: 'general' | 'book_publishing'; // new field
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ApiResponse {
  success: boolean;
  data: Contact[];
  pagination: PaginationData;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminContact() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [inquiryFilter, setInquiryFilter] = useState<string>(''); // new filter
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async (page = 1, status = statusFilter, inquiry = inquiryFilter) => {
    setLoading(true);
    setError(null);
    try {
      const params: any = { page, limit: 20 };
      if (status && status !== 'all') params.status = status;
      if (inquiry && inquiry !== 'all') params.inquiryType = inquiry;
      
      const response = await axios.get<ApiResponse>(`${API_URL}/contact`, { params });
      
      setContacts(response.data.data);
      setPagination(response.data.pagination);
    } catch (err: any) {
      console.error('Error fetching contacts:', err);
      setError(err.response?.data?.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(1, statusFilter, inquiryFilter);
  }, [statusFilter, inquiryFilter]);

  const handlePageChange = (newPage: number) => {
    fetchContacts(newPage, statusFilter, inquiryFilter);
  };

  const handleStatusChange = async (contactId: string, newStatus: string) => {
    setUpdatingStatus(contactId);
    try {
      await axios.patch(`${API_URL}/contact/${contactId}/status`, { status: newStatus });
      fetchContacts(pagination.page, statusFilter, inquiryFilter);
      if (selectedContact?._id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus as any });
      }
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) return;
    
    setDeletingId(contactId);
    try {
      await axios.delete(`${API_URL}/contact/${contactId}`);
      fetchContacts(pagination.page, statusFilter, inquiryFilter);
      if (selectedContact?._id === contactId) {
        setModalOpen(false);
        setSelectedContact(null);
      }
    } catch (err: any) {
      console.error('Error deleting contact:', err);
      alert(err.response?.data?.message || 'Failed to delete message');
    } finally {
      setDeletingId(null);
    }
  };

  const viewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3" /> Pending</span>;
      case 'replied':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-3 w-3" /> Replied</span>;
      case 'spam':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-3 w-3" /> Spam</span>;
      default:
        return null;
    }
  };

  const getInquiryBadge = (type?: string) => {
    if (!type || type === 'general') {
      return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><MessageSquare className="h-3 w-3" /> General</span>;
    }
    return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><BookOpen className="h-3 w-3" /> Book Publishing</span>;
  };

  // Build email reply URL with pre-filled subject and body
  const getEmailReplyUrl = (contact: Contact) => {
    if (!contact.email) return '#';

    const subject = encodeURIComponent(
      `Re: ${contact.subjectLabel} from ${contact.name}`
    );

    const body = encodeURIComponent(
      `Dear ${contact.name},\n\n` +
      `Thank you for your ${contact.inquiryType === 'book_publishing' ? 'book publishing inquiry' : 'message'} regarding "${contact.subjectLabel}".\n\n` +
      `Your message:\n${contact.message}\n\n` +
      `---\n\n` +
      `We will get back to you shortly.\n\n` +
      `Best regards,\nShree Publication Team`
    );

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${subject}&body=${body}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
            <p className="text-gray-500 mt-1">Manage inquiries from customers</p>
          </div>
          <button
            onClick={() => fetchContacts(pagination.page, statusFilter, inquiryFilter)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="spam">Spam</option>
          </select>
          <select
            value={inquiryFilter}
            onChange={(e) => setInquiryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
          >
            <option value="">All Inquiry Types</option>
            <option value="general">General</option>
            <option value="book_publishing">Book Publishing</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No contact submissions found.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Preview</th> */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                            <Phone className="h-3 w-3" /> {contact.phone}
                          </div>
                          {contact.email && (
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {contact.email}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getInquiryBadge(contact.inquiryType)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{contact.subjectLabel}</div>
                        </td>
                        {/* <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                            {contact.message.substring(0, 100)}...
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(contact.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewDetails(contact)}
                              className="text-primary hover:text-primary/80 p-1"
                              title="View Details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            {contact.status !== 'replied' && (
                              <button
                                onClick={() => handleStatusChange(contact._id, 'replied')}
                                disabled={updatingStatus === contact._id}
                                className="text-green-600 hover:text-green-800 p-1 disabled:opacity-50"
                                title="Mark as Replied"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                            )}
                            {contact.status !== 'spam' && (
                              <button
                                onClick={() => handleStatusChange(contact._id, 'spam')}
                                disabled={updatingStatus === contact._id}
                                className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                                title="Mark as Spam"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(contact._id)}
                              disabled={deletingId === contact._id}
                              className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                              title="Delete Message"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination.pages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-1 text-sm">Page {pagination.page} of {pagination.pages}</span>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {modalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <p className="text-gray-900">{selectedContact.email || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Inquiry Type</label>
                  <div>{getInquiryBadge(selectedContact.inquiryType)}</div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Subject</label>
                  <p className="text-gray-900">{selectedContact.subjectLabel}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                  <div>{getStatusBadge(selectedContact.status)}</div>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Submitted On</label>
                  <p className="text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-800">
                  {selectedContact.message}
                </div>
              </div>
              {selectedContact.ipAddress && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">IP Address</label>
                  <p className="text-gray-900 text-sm">{selectedContact.ipAddress}</p>
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4 border-t flex-wrap">
                <select
                  value={selectedContact.status}
                  onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="replied">Replied</option>
                  <option value="spam">Spam</option>
                </select>
                <a
                  href={getEmailReplyUrl(selectedContact)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 ${
                    !selectedContact.email ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <Mail className="h-4 w-4" /> Reply via Gmail
                </a>
                <a
                  href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Phone className="h-4 w-4" /> WhatsApp
                </a>
                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  disabled={deletingId === selectedContact._id}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}