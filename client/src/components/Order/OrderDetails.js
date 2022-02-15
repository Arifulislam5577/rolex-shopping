import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, OrderUpdate } from "../../Redux/Actions/orderActions";
import Loader from "../Loader/Loader";
import StripeCheckout from "react-stripe-checkout";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { success, loading: updateLoading } = useSelector(
    (state) => state.orderUpdate
  );

  const {
    shippingAddress,
    orderItems,
    orderCalculation,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order ? order : {};

  const [Stripetoken, setStripetoken] = useState(null);

  const onToken = (token) => {
    setStripetoken(token);
  };

  const updatePayment = (dataId, paymentStatus, email_address) => {
    const paymentResult = {
      id: dataId,
      status: paymentStatus,
      email_address,
    };

    Object.keys(paymentResult).length > 0 &&
      dispatch(OrderUpdate(id, paymentResult));
  };

  const makeRequest = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/payment",
        {
          tokenId: Stripetoken.id,
          amount: orderCalculation?.totalPrice,
        }
      );

      data && updatePayment(data.id, data.status, data.billing_details.name);
    } catch (error) {
      console.log(error);
    }
  };
  Stripetoken && makeRequest();

  useEffect(() => {
    dispatch(getOrder(id));

    if (success) {
      navigate("/profile");
    }
  }, [dispatch, id, success, navigate]);

  return (
    <section className="py-5 orderDetails">
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8">
            {(loading || updateLoading) && <Loader />}
            {error && (
              <h2 className="p-3 bg-danger text-center text-light">{error}</h2>
            )}
            {(!loading || !updateLoading) && (
              <div className="row mb-5">
                <div className="p-4 border border-1">
                  <table className="table table-borderless caption-top">
                    <caption>
                      <h2 className="text-uppercase text-primary  border-bottom pb-3">
                        Shipping Information
                      </h2>
                    </caption>
                    <tbody>
                      <tr>
                        <th>
                          <h3 className="text-uppercase">Address </h3>
                        </th>

                        <td>
                          <h3 className="text-uppercase">
                            {shippingAddress?.address}
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <h3 className="text-uppercase">Phone </h3>
                        </th>

                        <td>
                          <h3 className="text-uppercase">
                            {shippingAddress?.phone}
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <h3 className="text-uppercase">City </h3>
                        </th>

                        <td>
                          <h3 className="text-uppercase">
                            {shippingAddress?.city}
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <h3 className="text-uppercase">Country </h3>
                        </th>

                        <td>
                          <h3 className="text-uppercase">
                            {shippingAddress?.country}
                          </h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border border-1 mt-4">
                  <table className="table table-borderless caption-top">
                    <caption>
                      <h2 className="text-uppercase text-primary  border-bottom pb-3">
                        order Information
                      </h2>
                    </caption>
                    <tbody>
                      <tr>
                        <th>
                          <h3 className="text-uppercase">Paid Status</h3>
                        </th>

                        <td>
                          <h3 className="text-uppercase">
                            {isPaid
                              ? `paid at ${new Date(
                                  paidAt
                                ).toLocaleDateString()} ${new Date(
                                  paidAt
                                ).toLocaleTimeString()}`
                              : "unpaid"}
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <h3 className="text-uppercase">Delivered</h3>
                        </th>

                        <td>
                          <h3 className="text-uppercase">
                            {isDelivered
                              ? `Delivered at ${new Date(
                                  deliveredAt
                                ).toLocaleDateString()} ${new Date(
                                  deliveredAt
                                ).toLocaleTimeString()}`
                              : "processing"}
                          </h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border border-1 mt-4">
                  <h2 className="text-uppercase text-primary  border-bottom pb-3">
                    product Information
                  </h2>

                  <table className="table table-borderless">
                    <tbody>
                      {orderItems?.map((product) => {
                        const { title, price, qty, url, _id } = product;
                        return (
                          <tr
                            style={{ verticalAlign: "middle" }}
                            className="mb-4"
                            key={_id}
                          >
                            <td>
                              <img
                                src={url}
                                alt={title}
                                style={{
                                  width: "8rem",
                                  height: "8rem",
                                  objectFit: "contain",
                                }}
                              />
                            </td>
                            <td>
                              <h2 className="text-uppercase text-primary">
                                {title}
                              </h2>
                            </td>
                            <td>
                              <h2 className="text-uppercase text-primary">
                                ${price}
                              </h2>
                            </td>
                            <td>
                              <h2 className="text-uppercase text-primary">
                                {qty} x ${price} = ${qty * price}
                              </h2>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          {!loading && (
            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
              <div className="cart-details p-5 shadow ">
                <h2 className="text-uppercase p-4 bg-primary text-light text-center fw-bold">
                  order Details
                </h2>

                <div className="items my-3 d-flex align-items-center justify-content-between">
                  <h4 className="text-uppercase text-secondary ">
                    Total Items
                  </h4>
                  <h4 className="text-uppercase text-secondary ">
                    {orderCalculation?.totalItems}
                  </h4>
                </div>
                <hr />

                <div className="items my-3 d-flex align-items-center justify-content-between">
                  <h4 className="text-uppercase text-secondary ">
                    items Price
                  </h4>
                  <h4 className="text-uppercase text-secondary ">
                    ${orderCalculation?.itemsPrice}
                  </h4>
                </div>
                <hr />
                <div className="items my-3 d-flex align-items-center justify-content-between">
                  <h4 className="text-uppercase text-secondary "> Tax Price</h4>
                  <h4 className="text-uppercase text-secondary ">
                    ${orderCalculation?.taxPrice}
                  </h4>
                </div>
                <hr />
                <div className="items my-3 d-flex align-items-center justify-content-between">
                  <h4 className="text-uppercase text-secondary ">Shipping</h4>
                  <h4 className="text-uppercase text-secondary ">
                    ${orderCalculation?.shippingPrice}
                  </h4>
                </div>
                <hr />
                <div className="items my-3 d-flex align-items-center justify-content-between">
                  <h4 className="text-uppercase text-secondary ">
                    Total Price
                  </h4>
                  <h4 className="text-uppercase text-secondary ">
                    ${orderCalculation?.totalPrice}
                  </h4>
                </div>

                <div className="price my-3 d-flex align-items-center justify-content-between">
                  <StripeCheckout
                    name="E-SHOP"
                    image="https://image.freepik.com/free-vector/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.jpg?w=740"
                    description={`You total is $${orderCalculation?.totalPrice}`}
                    amount={orderCalculation?.totalPrice * 100}
                    token={onToken}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                  >
                    <button className="btn-primary text-light text-uppercase btn-lg-rounded-0 p-4 fs-4 fw-bold px-5 w-100 border border-0">
                      Pay Now
                    </button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
