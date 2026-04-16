

// import React, { useState } from 'react';
// import { paymentService } from '../services/paymentService';
// import { useRazorpay } from '../hooks/useRazorpay';

// interface RazorpayButtonProps {
//     orderId: string;
//     amount: number;
//     onSuccess?: (paymentId: string, orderId: string) => void;
//     onError?: (error: any) => void;
//     onPaymentInitiated?: () => void; // ✅ ADD THIS
//     buttonText?: string;
//     className?: string;
//     disabled?: boolean;
//     userDetails?: {
//         name?: string;
//         email?: string;
//         phone?: string;
//     };
// }

// export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
//     orderId,
//     amount,
//     onSuccess,
//     onError,
//     onPaymentInitiated, // ✅ ADD THIS
//     buttonText = 'Pay Now',
//     className = '',
//     disabled = false,
//     userDetails
// }) => {
//     const [loading, setLoading] = useState(false);

//     const { initiatePayment, isLoading: razorpayLoading } = useRazorpay({
//         onSuccess: async (response) => {
//             try {
//                 // Verify payment on backend
//                 const verification = await paymentService.verifyPayment({
//                     razorpay_order_id: response.razorpay_order_id,
//                     razorpay_payment_id: response.razorpay_payment_id,
//                     razorpay_signature: response.razorpay_signature,
//                     orderId: orderId
//                 });

//                 if (verification.success) {
//                     onSuccess?.(verification.paymentId || '', orderId);
//                 } else {
//                     onError?.(verification);
//                 }
//             } catch (error) {
//                 console.error('Verification error:', error);
//                 onError?.(error);
//             } finally {
//                 setLoading(false);
//             }
//         },
//         onError: (error) => {
//             console.error('Payment error:', error);
//             onError?.(error);
//             setLoading(false);
//         },
//         onModalClose: () => {
//             setLoading(false);
//         }
//     });

//     const handlePayment = async () => {
//         try {
//             setLoading(true);

//             // Create order in backend
//             const orderData = await paymentService.createOrder({ orderId });
            
//             if (!orderData.success) {
//                 throw new Error(orderData.message || 'Failed to create order');
//             }
//             console.log("ORDER DATA FROM BACKEND:", orderData);

//             // ✅ NOTIFY PARENT THAT PAYMENT IS BEING INITIATED
//             onPaymentInitiated?.();

//             // Get user details from props or localStorage
//             const userPrefill = userDetails || {
//                 name: localStorage.getItem('userName') || '',
//                 email: localStorage.getItem('userEmail') || '',
//                 phone: localStorage.getItem('userPhone') || ''
//             };

//             // Initiate Razorpay payment
//             await initiatePayment(orderData, userPrefill);
            
//         } catch (error) {
//             console.error('Failed to initiate payment:', error);
//             onError?.(error);
//             setLoading(false);
//         }
//     };

//     const isLoading = loading || razorpayLoading;

//     return (
//         <button
//             onClick={handlePayment}
//             disabled={disabled || isLoading}
//             className={`relative w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
//         >
//             {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Processing...</span>
//                 </div>
//             ) : (
//                 <span>{buttonText}</span>
//             )}
//         </button>
//     );
// };



// import React, { useState } from 'react';
// import { paymentService } from '../services/paymentService';
// import { useRazorpay } from '../hooks/useRazorpay';

// interface RazorpayButtonProps {
//     orderId: string;
//     amount: number;

//     // ✅ FIXED: send full response instead of only paymentId
//     onSuccess?: (response: any, orderId: string) => void;

//     onError?: (error: any) => void;
//     onPaymentInitiated?: () => void;

//     buttonText?: string;
//     className?: string;
//     disabled?: boolean;

//     userDetails?: {
//         name?: string;
//         email?: string;
//         phone?: string;
//     };
// }

// export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
//     orderId,
//     amount,
//     onSuccess,
//     onError,
//     onPaymentInitiated,
//     buttonText = 'Pay Now',
//     className = '',
//     disabled = false,
//     userDetails
// }) => {
//     const [loading, setLoading] = useState(false);

//     const { initiatePayment, isLoading: razorpayLoading } = useRazorpay({

//         // ✅ IMPORTANT: DO NOT VERIFY HERE
//         onSuccess: async (response) => {
//             try {
//                 console.log("✅ Razorpay Success Response:", response);

//                 // 👉 Just pass response to parent (PaymentPage will verify)
//                 onSuccess?.(response, orderId);

//             } catch (error) {
//                 console.error('❌ Razorpay success handling error:', error);
//                 onError?.(error);
//             } finally {
//                 setLoading(false);
//             }
//         },

//         onError: (error) => {
//             console.error('❌ Payment error:', error);
//             onError?.(error);
//             setLoading(false);
//         },

//         onModalClose: () => {
//             setLoading(false);
//         }
//     });

//     const handlePayment = async () => {
//         try {
//             setLoading(true);

//             // ✅ Step 1: Create Razorpay order from backend
//             const orderData = await paymentService.createOrder({ orderId });

//             if (!orderData.success) {
//                 throw new Error(orderData.message || 'Failed to create order');
//             }

//             console.log("📦 ORDER DATA FROM BACKEND:", orderData);

//             // ✅ Notify parent (start polling etc.)
//             onPaymentInitiated?.();

//             // ✅ Prefill user details
//             const userPrefill = userDetails || {
//                 name: localStorage.getItem('userName') || '',
//                 email: localStorage.getItem('userEmail') || '',
//                 phone: localStorage.getItem('userPhone') || ''
//             };

//             // ✅ Step 2: Open Razorpay
//             await initiatePayment(orderData, userPrefill);

//         } catch (error) {
//             console.error('❌ Failed to initiate payment:', error);
//             onError?.(error);
//             setLoading(false);
//         }
//     };

//     const isLoading = loading || razorpayLoading;

//     return (
//         <button
//             onClick={handlePayment}
//             disabled={disabled || isLoading}
//             className={`relative w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
//         >
//             {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                     <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                         ></circle>
//                         <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 
//                             0 0 5.373 0 12h4zm2 5.291A7.962 
//                             7.962 0 014 12H0c0 3.042 1.135 
//                             5.824 3 7.938l3-2.647z"
//                         ></path>
//                     </svg>
//                     <span>Processing...</span>
//                 </div>
//             ) : (
//                 <span>{buttonText}</span>
//             )}
//         </button>
//     );
// };





// // components/RazorpayButton.tsx
// import React, { useState } from 'react';
// import { paymentService } from '../services/paymentService';
// import { useRazorpay } from '../hooks/useRazorpay';

// interface RazorpayButtonProps {
//     orderId: string;
//     amount: number;  // This should be the discounted amount
//     onSuccess?: (response: any, orderId: string) => void;
//     onError?: (error: any) => void;
//     onPaymentInitiated?: () => void;
//     buttonText?: string;
//     className?: string;
//     disabled?: boolean;
//     userDetails?: {
//         name?: string;
//         email?: string;
//         phone?: string;
//     };
// }

// export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
//     orderId,
//     amount,  // ← This is the discounted amount from PaymentPage
//     onSuccess,
//     onError,
//     onPaymentInitiated,
//     buttonText = 'Pay Now',
//     className = '',
//     disabled = false,
//     userDetails
// }) => {
//     const [loading, setLoading] = useState(false);

//     console.log('RazorpayButton received amount:', amount);  // Debug log

// const { initiatePayment, isLoading: razorpayLoading } = useRazorpay({
//     onSuccess: async (response, razorpayOrderId) => {  // ← Add second parameter
//         try {
//             console.log("✅ Razorpay Success Response:", response);
//             console.log("Amount paid:", amount);
//             console.log("Order ID from hook:", razorpayOrderId);
            
//             // Call parent's onSuccess with both response and orderId
//             onSuccess?.(response, orderId);  // ← Pass the stored orderId
//         } catch (error) {
//             console.error('❌ Razorpay success handling error:', error);
//             onError?.(error);
//         } finally {
//             setLoading(false);
//         }
//     },
//         onError: (error) => {
//             console.error('❌ Payment error:', error);
//             onError?.(error);
//             setLoading(false);
//         },
//         onModalClose: () => {
//             setLoading(false);
//         }
//     });

//     const handlePayment = async () => {
//         try {
//             setLoading(true);
//             console.log("Initiating payment for amount:", amount);  // Debug log

//             // ✅ Create Razorpay order from backend with the discounted amount
//             const orderData = await paymentService.createOrder({ 
//                 orderId,
//                 amount  // ← Pass the discounted amount to the backend
//             });

//             if (!orderData.success) {
//                 throw new Error(orderData.message || 'Failed to create order');
//             }

//             console.log("📦 ORDER DATA FROM BACKEND:", orderData);

//             onPaymentInitiated?.();

//             const userPrefill = userDetails || {
//                 name: localStorage.getItem('userName') || '',
//                 email: localStorage.getItem('userEmail') || '',
//                 phone: localStorage.getItem('userPhone') || ''
//             };

//             await initiatePayment(orderData, userPrefill);

//         } catch (error) {
//             console.error('❌ Failed to initiate payment:', error);
//             onError?.(error);
//             setLoading(false);
//         }
//     };

//     const isLoading = loading || razorpayLoading;

//     return (
//         <button
//             onClick={handlePayment}
//             disabled={disabled || isLoading || amount <= 0}
//             className={`relative w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
//         >
//             {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                     <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                         ></circle>
//                         <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 
//                             0 0 5.373 0 12h4zm2 5.291A7.962 
//                             7.962 0 014 12H0c0 3.042 1.135 
//                             5.824 3 7.938l3-2.647z"
//                         ></path>
//                     </svg>
//                     <span>Processing...</span>
//                 </div>
//             ) : (
//                 <span>{buttonText}</span>
//             )}
//         </button>
//     );
// };







// components/RazorpayButton.tsx
import React, { useState } from 'react';
import { paymentService } from '../services/paymentService';
import { useRazorpay } from '../hooks/useRazorpay';
import { toast } from 'sonner';

interface RazorpayButtonProps {
    orderId: string;
    amount: number;  // This should be the discounted amount
    onSuccess?: (response: any, orderId: string) => void;
    onError?: (error: any) => void;
    onPaymentInitiated?: () => void;
    buttonText?: string;
    className?: string;
    disabled?: boolean;
    userDetails?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}

export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
    orderId,
    amount,  // ← This is the discounted amount from PaymentPage
    onSuccess,
    onError,
    onPaymentInitiated,
    buttonText = 'Pay Now',
    className = '',
    disabled = false,
    userDetails
}) => {
    const [loading, setLoading] = useState(false);

    console.log('RazorpayButton received amount:', amount);
    console.log('RazorpayButton received orderId:', orderId);

    const { initiatePayment, isLoading: razorpayLoading } = useRazorpay({
        onSuccess: async (response, razorpayOrderId) => {
            console.log("✅ Razorpay Success Response:", response);
            console.log("Razorpay Order ID from webhook:", razorpayOrderId);
            console.log("Our Order ID:", orderId);
            console.log("Amount paid:", amount);
            
            try {
                // Call parent's onSuccess with both response and orderId
                // Make sure to pass the correct orderId (our order ID, not Razorpay's)
                if (onSuccess) {
                    await onSuccess(response, orderId);
                }
            } catch (error) {
                console.error('❌ Razorpay success handling error:', error);
                toast.error('Payment verification failed. Please contact support.');
                if (onError) onError(error);
            } finally {
                setLoading(false);
            }
        },
        onError: (error) => {
            console.error('❌ Payment error:', error);
            toast.error(error.message || 'Payment failed. Please try again.');
            if (onError) onError(error);
            setLoading(false);
        },
        onModalClose: () => {
            console.log('Payment modal closed');
            setLoading(false);
        }
    });

    const handlePayment = async () => {
        if (!orderId) {
            console.error('No orderId provided');
            toast.error('Order ID missing. Please refresh and try again.');
            return;
        }

        if (amount <= 0) {
            console.error('Invalid amount:', amount);
            toast.error('Invalid payment amount. Please contact support.');
            return;
        }

        try {
            setLoading(true);
            console.log("=== INITIATING PAYMENT ===");
            console.log("Order ID:", orderId);
            console.log("Amount to pay:", amount);

            // ✅ Create Razorpay order from backend with the discounted amount
            const orderData = await paymentService.createOrder({ 
                orderId,
                amount: amount  // ← Pass the discounted amount
            });

            console.log("📦 ORDER DATA FROM BACKEND:", orderData);

            if (!orderData.success) {
                throw new Error(orderData.message || 'Failed to create payment order');
            }

            if (!orderData.razorpayOrderId) {
                throw new Error('No Razorpay order ID received');
            }

            // Notify parent that payment has been initiated
            if (onPaymentInitiated) {
                onPaymentInitiated();
            }

            const userPrefill = userDetails || {
                name: localStorage.getItem('userName') || '',
                email: localStorage.getItem('userEmail') || '',
                phone: localStorage.getItem('userPhone') || ''
            };

            // Open Razorpay checkout
            await initiatePayment(orderData, userPrefill);

        } catch (error: any) {
            console.error('❌ Failed to initiate payment:', error);
            toast.error(error.message || 'Failed to initialize payment. Please try again.');
            if (onError) onError(error);
            setLoading(false);
        }
    };

    const isLoading = loading || razorpayLoading;

    return (
        <button
            onClick={handlePayment}
            disabled={disabled || isLoading || amount <= 0 || !orderId}
            className={`relative w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 
                            0 0 5.373 0 12h4zm2 5.291A7.962 
                            7.962 0 014 12H0c0 3.042 1.135 
                            5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span>Processing...</span>
                </div>
            ) : (
                <span>{buttonText}</span>
            )}
        </button>
    );
};