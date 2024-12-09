
import { UseUserPaymentConfig } from "../hooks/Useconfigpayment";
import { UseUserPaymentIntent } from "../hooks/Useintent";
import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import E_SewaPaymentButton from "../Components/Payment_Button";

const Payment = () => {
    const { data: PublishableKey } = UseUserPaymentConfig();
    const { mutate, data, error, isPending } = UseUserPaymentIntent();
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        mutate(); 
    }, [mutate]);

    useEffect(() => {
        if (PublishableKey?.publishablekey) {
            const stripeInstance = loadStripe(PublishableKey?.publishablekey);
            setStripePromise(stripeInstance); 
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


            <div className="flex w-full justify-center items-center mb-3">
            <E_SewaPaymentButton/>
            </div>

        </>
    );
};

export default Payment;
