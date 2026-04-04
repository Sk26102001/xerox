// import { useState, useCallback } from 'react';
// import { paymentService } from '../services/paymentService';

// declare global {
//     interface Window {
//         Razorpay: any;
//     }
// }

// export interface RazorpayOptions {
//     key: string;
//     amount: number;
//     currency: string;
//     name: string;
//     description?: string;
//     image?: string;
//     order_id: string;
//     handler: (response: RazorpaySuccessResponse) => void;
//     prefill?: {
//         name?: string;
//         email?: string;
//         contact?: string;
//     };
//     notes?: Record<string, string>;
//     theme?: {
//         color?: string;
//         hide_topbar?: boolean;
//     };
//     modal?: {
//         ondismiss?: () => void;
//         escape?: boolean;
//         backdropclose?: boolean;
//         handleback?: boolean;
//     };
//     retry?: {
//         enabled?: boolean;
//         max_count?: number;
//     };
// }

// export interface RazorpaySuccessResponse {
//     razorpay_payment_id: string;
//     razorpay_order_id: string;
//     razorpay_signature: string;
// }

// export interface RazorpayErrorResponse {
//     code: string;
//     description: string;
//     source: string;
//     step: string;
//     reason: string;
//     metadata: any;
// }

// interface UseRazorpayProps {
//     onSuccess?: (response: RazorpaySuccessResponse) => void;
//     onError?: (error: RazorpayErrorResponse | any) => void;
//     onModalClose?: () => void;
// }

// export const useRazorpay = ({ onSuccess, onError, onModalClose }: UseRazorpayProps = {}) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//     const loadScript = useCallback(async () => {
//         if (isScriptLoaded) return true;
//         const loaded = await paymentService.loadRazorpayScript();
//         setIsScriptLoaded(loaded);
//         return loaded;
//     }, [isScriptLoaded]);

//     const initiatePayment = useCallback(async (
//         orderData: {
//             key: string;
//             orderId: string;
//             amount: number;
//             currency: string;
//             amountInRupees?: number;
//         },
//         prefillData?: {
//             name?: string;
//             email?: string;
//             contact?: string;
//         }
//     ) => {
//         try {
//             setIsLoading(true);

//             const scriptLoaded = await loadScript();
//             if (!scriptLoaded) {
//                 throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
//             }

// const options: RazorpayOptions = {
//     key: orderData.key,
//     amount: orderData.amount,
//     currency: orderData.currency,
//     name: 'Print Shop',
//     description: `Payment for Order #${orderData.orderId.slice(-8)}`,

//     image: "https://cdn.razorpay.com/logos/razorpay-logo.png", // ✅ FIX

//     order_id: orderData.orderId,

//     handler: (response) => {
//         onSuccess?.(response);
//     },

//     prefill: {
//         name: prefillData?.name || "",
//         email: prefillData?.email || "",
//         contact: prefillData?.contact || "",
//     },

//     theme: {
//         color: '#667eea',
//     }
// };

//             const razorpay = new window.Razorpay(options);
            
//             // Handle payment failure
//             razorpay.on('payment.failed', (response: RazorpayErrorResponse) => {
//                 console.error('Payment failed:', response);
//                 onError?.(response);
//             });

//             razorpay.open();

//         } catch (error) {
//             console.error('Error initiating payment:', error);
//             onError?.(error);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [loadScript, onSuccess, onError, onModalClose]);

//     return {
//         initiatePayment,
//         isLoading,
//         isScriptLoaded,
//         loadScript
//     };
// };




import { useState, useCallback } from 'react';
import { paymentService } from '../services/paymentService';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
        hide_topbar?: boolean;
    };
    modal?: {
        ondismiss?: () => void;
        escape?: boolean;
        backdropclose?: boolean;
        handleback?: boolean;
    };
    retry?: {
        enabled?: boolean;
        max_count?: number;
    };
}

export interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface RazorpayErrorResponse {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: any;
}

// interface UseRazorpayProps {
//     onSuccess?: (response: RazorpaySuccessResponse) => void;
//     onError?: (error: RazorpayErrorResponse | any) => void;
//     onModalClose?: () => void;
// }

interface UseRazorpayProps {
    onSuccess?: (response: RazorpaySuccessResponse, orderId?: string) => void;  // ← Add orderId parameter
    onError?: (error: RazorpayErrorResponse | any) => void;
    onModalClose?: () => void;
}

// ✅ UPDATED ORDER DATA TYPE
interface InitiatePaymentData {
    key: string;
    orderId: string;           // Mongo DB Order ID (for your system)
    razorpayOrderId: string;   // ✅ Razorpay Order ID (VERY IMPORTANT)
    amount: number;
    currency: string;
    amountInRupees?: number;
}

export const useRazorpay = ({ onSuccess, onError, onModalClose }: UseRazorpayProps = {}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    // Load Razorpay Script
    const loadScript = useCallback(async () => {
        if (isScriptLoaded) return true;

        const loaded = await paymentService.loadRazorpayScript();
        setIsScriptLoaded(loaded);

        return loaded;
    }, [isScriptLoaded]);

    // Initiate Payment
    const initiatePayment = useCallback(async (
        orderData: InitiatePaymentData,
        prefillData?: {
            name?: string;
            email?: string;
            contact?: string;
        }
    ) => {
        try {
            setIsLoading(true);

            const scriptLoaded = await loadScript();

            if (!scriptLoaded) {
                throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
            }

            // ✅ MAIN FIX IS HERE
            const options: RazorpayOptions = {
                key: orderData.key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Print Shop',

                // Mongo ID used only for display
                description: `Payment for Order #${orderData.orderId.slice(-8)}`,

                // image: "https://cdn.razorpay.com/logos/razorpay-logo.png",

                // ✅ VERY IMPORTANT FIX
                order_id: orderData.razorpayOrderId,

            handler: (response) => {
    console.log("Payment Success:", response);
    onSuccess?.(response, orderData.orderId);  // ✅ Pass orderId here!
},

                prefill: {
                    name: prefillData?.name || "",
                    email: prefillData?.email || "",
                    contact: prefillData?.contact || "",
                },

                theme: {
                    color: '#667eea',
                },

                modal: {
                    ondismiss: () => {
                        console.log("Payment modal closed");
                        onModalClose?.();
                    }
                }
            };

            const razorpay = new window.Razorpay(options);

            // Handle payment failure
            razorpay.on('payment.failed', (response: RazorpayErrorResponse) => {
                console.error('Payment failed:', response);
                onError?.(response);
            });

            razorpay.open();

        } catch (error) {
            console.error('Error initiating payment:', error);
            onError?.(error);
        } finally {
            setIsLoading(false);
        }
    }, [loadScript, onSuccess, onError, onModalClose]);

    return {
        initiatePayment,
        isLoading,
        isScriptLoaded,
        loadScript
    };
};