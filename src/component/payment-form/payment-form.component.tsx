import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer, PaymentButton } from "./payment-form.style";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useState, FormEvent } from "react";

const PaymentForm = () => {
    const stripe=useStripe();
    const elements=useElements();
    const user=useSelector(userSelector);
    const amount=useSelector(selectCartTotal);
    const [isPaymentProcessing, setPaymentProcessing]=useState(false);

    const paymentHandler= async(e: FormEvent<HTMLFormElement>)=>{
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
    
    const cardDetails=elements.getElement(CardElement);
    if(cardDetails===null)
      return
//if you don't add this check here then card in line 40 will throw error since typescript will think this card
//can be sometime some invalid card Element or undefined therfore checking it before asigning
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
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