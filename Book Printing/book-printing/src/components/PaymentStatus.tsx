import React from 'react';

interface PaymentStatusProps {
    status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded' | null;
    amount?: number;
    paymentId?: string;
    orderNumber?: string;
    onRetry?: () => void;
    onContactSupport?: () => void;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({
    status,
    amount,
    paymentId,
    orderNumber,
    onRetry,
    onContactSupport
}) => {
    if (!status) return null;

    const getStatusConfig = () => {
        switch (status) {
            case 'paid':
                return {
                    icon: '✅',
                    title: 'Payment Successful!',
                    color: 'text-green-800',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    message: 'Your payment has been successfully processed.'
                };
            case 'failed':
                return {
                    icon: '❌',
                    title: 'Payment Failed',
                    color: 'text-red-800',
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200',
                    message: 'We couldn\'t process your payment. Please try again.'
                };
            case 'refunded':
                return {
                    icon: '🔄',
                    title: 'Payment Refunded',
                    color: 'text-yellow-800',
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-yellow-200',
                    message: 'Your payment has been refunded.'
                };
            case 'created':
            case 'attempted':
                return {
                    icon: '⏳',
                    title: 'Payment Pending',
                    color: 'text-blue-800',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    message: 'Your payment is being processed.'
                };
            default:
                return {
                    icon: 'ℹ️',
                    title: 'Payment Status',
                    color: 'text-gray-800',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-200',
                    message: 'Unable to determine payment status.'
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-6`}>
            <div className="flex items-start space-x-4">
                <div className="text-3xl">{config.icon}</div>
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${config.color} mb-2`}>
                        {config.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{config.message}</p>
                    
                    {(amount || paymentId || orderNumber) && (
                        <div className="space-y-2 text-sm">
                            {amount && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="font-medium">₹{amount.toFixed(2)}</span>
                                </div>
                            )}
                            {paymentId && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Payment ID:</span>
                                    <span className="font-mono text-xs">{paymentId}</span>
                                </div>
                            )}
                            {orderNumber && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Order Number:</span>
                                    <span className="font-medium">{orderNumber}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {(status === 'failed' && onRetry) && (
                        <button
                            onClick={onRetry}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Try Again
                        </button>
                    )}

                    {(status === 'failed' && onContactSupport) && (
                        <button
                            onClick={onContactSupport}
                            className="mt-4 ml-3 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Contact Support
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};