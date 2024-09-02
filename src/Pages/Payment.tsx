
import { UseUserPaymentConfig } from "../hooks/Useconfigpayment";
import { UseUserPaymentIntent } from "../hooks/Useintent";
import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

const Payment = () => {
    const { data: PublishableKey } = UseUserPaymentConfig();
    const { mutate, data, error, isPending } = UseUserPaymentIntent();
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        mutate(); // Trigger the mutation to fetch the client secret
    }, [mutate]);

    useEffect(() => {
        if (PublishableKey?.publishablekey) {
            const stripeInstance = loadStripe(PublishableKey?.publishablekey);
            setStripePromise(stripeInstance); // Set the stripe promise to state
        }
    }, [PublishableKey]);

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            
            {stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret: data?.SecretKey }}>
                    <Checkout />
                </Elements>
            )}
        </>
    );
};

export default Payment;
