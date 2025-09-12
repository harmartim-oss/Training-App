/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PricingTier } from '../../types';

interface StripePaymentProps {
    selectedTier: PricingTier;
    customerEmail: string;
    onPaymentSuccess: () => void;
    onBack: () => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({ 
    selectedTier, 
    customerEmail, 
    onPaymentSuccess, 
    onBack 
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#1A1D23',
                '::placeholder': {
                    color: '#ADB5BD',
                },
                iconColor: '#007BFF',
            },
            invalid: {
                color: '#DC3545',
                iconColor: '#DC3545',
            },
        },
        hidePostalCode: false,
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setPaymentError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setPaymentError('Payment form not loaded properly. Please refresh and try again.');
            setIsProcessing(false);
            return;
        }

        try {
            // Create payment method
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    email: customerEmail,
                },
            });

            if (paymentMethodError) {
                setPaymentError(paymentMethodError.message || 'Payment failed. Please try again.');
                setIsProcessing(false);
                return;
            }

            // NOTE: In a real implementation, you would:
            // 1. Send payment method to your backend
            // 2. Create a payment intent on your server
            // 3. Confirm the payment
            // For now, we'll simulate a successful payment after a delay

            setTimeout(() => {
                console.log('Payment processed successfully (simulated)', {
                    paymentMethod: paymentMethod.id,
                    amount: selectedTier.price * 100, // Stripe uses cents
                    currency: selectedTier.currency.toLowerCase(),
                    customerEmail,
                });
                
                setIsProcessing(false);
                onPaymentSuccess();
            }, 2000);

        } catch (error) {
            console.error('Payment error:', error);
            setPaymentError('An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-surface-elevated border border-border p-6 rounded-lg">
                <h3 className="text-lg font-semibold font-mono text-text-primary mb-4 uppercase">Payment Information</h3>
                
                {/* Order Summary */}
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        {selectedTier.name}
                        {selectedTier.isPopular && <span className="text-xs bg-primary text-white px-2 py-1 rounded">POPULAR</span>}
                    </h4>
                    <div className="text-sm text-text-secondary mb-2">
                        ${selectedTier.price} {selectedTier.currency}/{selectedTier.billing}
                    </div>
                    <div className="text-xs text-text-muted">
                        Customer: {customerEmail}
                    </div>
                </div>

                {/* Stripe Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold font-mono text-text-secondary mb-2 uppercase tracking-wider">
                            Card Information
                        </label>
                        <div className="p-4 border border-border rounded-lg bg-white">
                            <CardElement options={cardElementOptions} />
                        </div>
                    </div>

                    {paymentError && (
                        <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg text-sm">
                            {paymentError}
                        </div>
                    )}

                    {/* Enhanced Development Notice */}
                    <div className="bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-warning text-lg">⚠️</span>
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold text-warning mb-1">Development Mode</div>
                                <p className="text-text-secondary leading-relaxed mb-2">
                                    This is a placeholder payment form for demonstration purposes. Use the test card number below with any future expiry date and CVC.
                                </p>
                                <div className="bg-warning/20 text-warning px-3 py-2 rounded font-mono text-xs">
                                    Card: 4242 4242 4242 4242 | Exp: 12/34 | CVC: 123
                                </div>
                                <p className="text-xs text-text-muted mt-2">
                                    ✅ No actual payment will be processed
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="text-text-secondary hover:text-primary transition-colors"
                            disabled={isProcessing}
                        >
                            ← Back to Details
                        </button>
                        <button
                            type="submit"
                            disabled={!stripe || isProcessing}
                            className="btn-primary px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <span className="inline-block animate-spin mr-2">⚪</span>
                                    Processing Payment...
                                </>
                            ) : (
                                `Pay $${selectedTier.price} ${selectedTier.currency} →`
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded text-center">
                <p className="text-xs text-text-secondary">
                    🔒 Your payment information is secured by Stripe's industry-leading encryption and never stored on our servers.
                </p>
            </div>
        </div>
    );
};

export default StripePayment;