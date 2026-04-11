// import axios from 'axios';

// // For Vite - use import.meta.env
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const apiClient = axios.create({
//     baseURL: API_URL,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add token to requests
// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem('token');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

// export interface CreateOrderRequest {
//     orderId: string;
// }

// export interface CreateOrderResponse {
//     success: boolean;
//     orderId: string;
//      razorpayOrderId: string;  // Razorpay ID
//     amount: number;
//     currency: string;
//     key: string;
//     amountInRupees?: number;
//     message?: string;
// }

// export interface VerifyPaymentRequest {
//     razorpay_order_id: string;
//     razorpay_payment_id: string;
//     razorpay_signature: string;
//     orderId: string;
// }

// export interface VerifyPaymentResponse {
//     success: boolean;
//     message: string;
//     paymentId?: string;
//     orderId?: string;
// }

// // Add this interface for payment status
// export interface PaymentStatusResponse {
//     success: boolean;
//     payment: {
//         status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded';
//         amount: number;
//         currency: string;
//         razorpayOrderId: string;
//         razorpayPaymentId?: string;
//         createdAt: string;
//         orderDetails: {
//             _id: string;
//             orderNumber: string;
//             totalAmount: number;
//         };
//     };
// }

// export const paymentService = {
//     async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
//         const response = await apiClient.post('/payment/create-order', data);
//         return response.data;
//     },

//     async verifyPayment(data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
//         const response = await apiClient.post('/payment/verify-payment', data);
//         return response.data;
//     },

//     // async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
//     //     const response = await apiClient.get(`/payment/status/${orderId}`);
//     //     return response.data;
//     // },

//     async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse | null> {
//     try {
//         const response = await apiClient.get(`/payment/status/${orderId}`);
//         return response.data;
//     } catch (error: any) {
//         // ✅ HANDLE 404 HERE (BEST PLACE)
//         if (error.response?.status === 404) {
//             // console.log("No payment found yet (normal case)");
//             return null; // 👈 IMPORTANT
//         }
//         throw error; // real error
//     }
// },

//     async loadRazorpayScript(): Promise<boolean> {
//         return new Promise((resolve) => {
//             if (window.hasOwnProperty('Razorpay')) {
//                 resolve(true);
//                 return;
//             }

//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.async = true;
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     }
// };



// services/paymentService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api';

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export interface CreateOrderRequest {
    orderId: string;
    amount?: number;  // ← Add amount parameter
}

export interface CreateOrderResponse {
    success: boolean;
    orderId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    key: string;
    amountInRupees?: number;
    message?: string;
}

export interface VerifyPaymentRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderId: string;
    finalAmount?: number;
    totalDiscount?: number;
    discountsApplied?: any;
}

export interface VerifyPaymentResponse {
    success: boolean;
    message: string;
    paymentId?: string;
    orderId?: string;
    finalAmount?: number;
    discountAmount?: number;
}

export interface PaymentStatusResponse {
    success: boolean;
    payment: {
        status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded';
        amount: number;
        currency: string;
        razorpayOrderId: string;
        razorpayPaymentId?: string;
        createdAt: string;
        orderDetails: {
            _id: string;
            orderNumber: string;
            totalAmount: number;
            finalAmount?: number;
            discountAmount?: number;
        };
    };
}

export const paymentService = {
    async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
        // Pass the amount to the backend
        const response = await apiClient.post('/payment/create-order', {
            orderId: data.orderId,
            amount: data.amount  // ← Send the discounted amount
        });
        return response.data;
    },

    async verifyPayment(data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
        const response = await apiClient.post('/payment/verify-payment', {
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            finalAmount: data.finalAmount,
            totalDiscount: data.totalDiscount,
            discountsApplied: data.discountsApplied
        });
        return response.data;
    },

    async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse | null> {
        try {
            const response = await apiClient.get(`/payment/status/${orderId}`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    },

    async loadRazorpayScript(): Promise<boolean> {
        return new Promise((resolve) => {
            if (window.hasOwnProperty('Razorpay')) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }
};