import { useState, useCallback } from 'react';
import { paymentService } from '../services/paymentService';
import { PaymentStatusResponse } from '../services/paymentService';

interface UsePaymentState {
    isLoading: boolean;
    isProcessing: boolean;
    paymentStatus: PaymentStatusResponse['payment']['status'] | null;
    error: string | null;
    paymentDetails: PaymentStatusResponse['payment'] | null;
}

const initialState: UsePaymentState = {
    isLoading: false,
    isProcessing: false,
    paymentStatus: null,
    error: null,
    paymentDetails: null
};

export const usePayment = () => {
    const [state, setState] = useState<UsePaymentState>(initialState);

    // const getPaymentStatus = useCallback(async (orderId: string) => {
    //     try {
    //         setState(prev => ({ ...prev, isLoading: true, error: null }));
    //         const response = await paymentService.getPaymentStatus(orderId);
            
    //         if (response.success) {
    //             setState(prev => ({
    //                 ...prev,
    //                 paymentStatus: response.payment.status,
    //                 paymentDetails: response.payment,
    //                 isLoading: false
    //             }));
    //         }
            
    //         return response;
    //     } catch (error: any) {
    //         setState(prev => ({
    //             ...prev,
    //             error: error.message || 'Failed to fetch payment status',
    //             isLoading: false
    //         }));
    //         throw error;
    //     }
    // }, []);

    const getPaymentStatus = useCallback(async (orderId: string) => {
    try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await paymentService.getPaymentStatus(orderId);

if (!response) {
    // 👇 means no payment yet
    setState(prev => ({
        ...prev,
        paymentStatus: null,
        paymentDetails: null,
        isLoading: false
    }));
    return;
}

if (response.success) {
    setState(prev => ({
        ...prev,
        paymentStatus: response.payment.status,
        paymentDetails: response.payment,
        isLoading: false
    }));
}

        return response;

    } catch (error: any) {
        // ✅ FIX: Ignore 404 (means payment not created yet)
        if (error.response?.status === 404) {
            setState(prev => ({
                ...prev,
                paymentStatus: null,
                paymentDetails: null,
                isLoading: false
            }));
            return;
        }

        setState(prev => ({
            ...prev,
            error: error.message || 'Failed to fetch payment status',
            isLoading: false
        }));

        throw error;
    }
}, []);

    const resetPaymentState = useCallback(() => {
        setState(initialState);
    }, []);

    return {
        ...state,
        getPaymentStatus,
        resetPaymentState
    };
};