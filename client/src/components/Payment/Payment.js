import React, { useEffect, useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";

const Payment = () => {
  const { cartItems } = useSelector((state) => state.addToCartProducts);
  const numburFormat = (num) => {
    return ((num * 100) / 100).toFixed(2);
  };

  const itemsPrice = numburFormat(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const taxPrice = numburFormat(itemsPrice * 0.05);
  const shippingPrice = numburFormat(itemsPrice > 500 ? 0 : 25);
  const totalPrice = numburFormat(
    itemsPrice * 1 + taxPrice * 1 + shippingPrice * 1
  );

  const [Stripetoken, setStripetoken] = useState(null);

  const onToken = (token) => {
    setStripetoken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/payment",
          {
            tokenId: Stripetoken.id,
            amount: totalPrice,
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    Stripetoken && makeRequest();
  });
  return (
    <div>
      <div className="price my-3 d-flex align-items-center justify-content-between">
        <StripeCheckout
          name="E-SHOP"
          image="https://image.freepik.com/free-vector/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.jpg?w=740"
          description={`You total is $${totalPrice}`}
          amount={totalPrice * 100}
          token={onToken}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn-primary text-light text-uppercase btn-lg-rounded-0 p-4 fs-4 fw-bold px-5 w-100 border border-0">
            Pay Now
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default Payment;
