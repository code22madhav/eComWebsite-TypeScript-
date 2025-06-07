import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer, PaymentButton } from "./payment-form.style";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useState } from "react";

const PaymentForm = () => {
    const stripe=useStripe();
    const elements=useElements();
    const user=useSelector(userSelector);
    const amount=useSelector(selectCartTotal);
    const [isPaymentProcessing, setPaymentProcessing]=useState(false);

    const paymentHandler= async(e)=>{
        setPaymentProcessing(true);
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const response= await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100}),
        }).then((res)=>res.json());
    
    const clientSecret = response.paymentIntent.client_secret;
    // console.log(clientSecret);

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user ? user.displayName : 'Guest',
        },
      },
    });
    setPaymentProcessing(false);
    if(paymentResult.error){
        alert('payment failed');
    }else if(paymentResult.paymentIntent.status==='succeeded'){
        alert('success');
    }

    }
  return (
    <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
        <div>Credit Card Payment: </div>
            <CardElement/>
            <PaymentButton isLoading={isPaymentProcessing} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
        </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
