'use client';
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { PaymentElement, useElements, useStripe, AddressElement } from "@stripe/react-stripe-js";
import { formatPrice } from "@/utils/formatPrice";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckOutFormProps {
    clientSecret: string;
    handleSetPaymentSuccess: (value: boolean) => void
}
const CheckoutForm: React.FC<CheckOutFormProps> = ({
    clientSecret,
    handleSetPaymentSuccess
}) => {

    const { cartTotalAmount, clearCart, handleSetPaymentIntent } = useCart()
    const stripe = useStripe();
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false);
    const formattedPrice = formatPrice(cartTotalAmount)

    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            return;
        }

        handleSetPaymentSuccess(false);

    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await stripe.confirmPayment({
                elements,
                redirect: 'if_required',
            });

            if (result.error) {
                // Handle Stripe API errors
                console.error('Payment error:', result.error);
                toast.error(result.error.message || "Payment failed");
            } else {
                // Payment succeeded
                toast.success("Payment successful!");
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
                clearCart();
            }
        } catch (error) {
            // Handle network/unexpected errors
            console.error('Error confirming payment:', error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your details to complete checkout" />
            </div>
            <h2 className="font-semibold mb-2">Address Information</h2>
            <AddressElement
                options={{
                    mode: 'shipping',
                    allowedCountries: ['US', "KE"], // Adjust as needed
                }}
            />
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="py-4 text-center text-slate-700 text-xl font-bold"> Total: {formattedPrice}</div>
            <Button
                label={isLoading ? "Processing" : "Pay Now"}
                disabled={isLoading || !stripe || !elements}
                onClick={() => { }}
            />
        </form>
    );
}

export default CheckoutForm;