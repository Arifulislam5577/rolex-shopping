import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderCreate } from "../../Redux/Actions/orderActions";
import Loader from "../Loader/Loader";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector(
    (state) => state.addToCartProducts
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { order, success, error, loading } = useSelector(
    (state) => state.createOrder
  );
  const numburFormat = (num) => {
    return ((num * 100) / 100).toFixed(2);
  };
  const totalItems = numburFormat(
    cartItems.reduce((acc, item) => acc + item.qty * 1, 0)
  );
  const itemsPrice = numburFormat(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const taxPrice = numburFormat(itemsPrice * 0.05);

  const shippingPrice = numburFormat(itemsPrice > 500 ? 0 : 25);

  const totalPrice = numburFormat(
    itemsPrice * 1 + taxPrice * 1 + shippingPrice * 1
  );

  const orderCalculation = {
    totalItems: parseFloat(totalItems),
    itemsPrice: parseFloat(itemsPrice),
    taxPrice: parseFloat(taxPrice),
    shippingPrice: parseFloat(shippingPrice),
    totalPrice: parseFloat(totalPrice),
  };

  const handleSumbit = () => {
    dispatch(
      orderCreate({
        orderItems: cartItems,
        shippingAddress: shippingInfo,
        orderCalculation,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    if (!itemsPrice || !cartItems.length) {
      navigate("/");
    }
  }, [navigate, order, success, itemsPrice, cartItems]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8">
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
                          {shippingInfo.address}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <h3 className="text-uppercase">Phone </h3>
                      </th>

                      <td>
                        <h3 className="text-uppercase">{shippingInfo.phone}</h3>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <h3 className="text-uppercase">City </h3>
                      </th>

                      <td>
                        <h3 className="text-uppercase">{shippingInfo.city}</h3>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <h3 className="text-uppercase">Country </h3>
                      </th>

                      <td>
                        <h3 className="text-uppercase">
                          {shippingInfo.country}
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
                      user Information
                    </h2>
                  </caption>
                  <tbody>
                    <tr>
                      <th>
                        <h3 className="text-uppercase">username</h3>
                      </th>

                      <td>
                        <h3 className="text-uppercase">{userInfo.username}</h3>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <h3 className="text-uppercase">EMAIL ADDRESS</h3>
                      </th>

                      <td>
                        <h3 className="">{userInfo.email}</h3>
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
                        <h3 className="text-uppercase">Paid</h3>
                      </th>

                      <td>
                        <h3 className="text-uppercase">unpaid</h3>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <h3 className="text-uppercase">Delivered</h3>
                      </th>

                      <td>
                        <h3 className="text-uppercase">pending</h3>
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
                    {cartItems.map((product) => {
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
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div className="cart-details p-5 shadow ">
              <h2 className="text-uppercase p-4 bg-primary text-light text-center fw-bold">
                order Summary
              </h2>
              {loading && <Loader />}
              {error && (
                <h4 className="p-3 bg-danger text-center text-light">
                  {error}
                </h4>
              )}
              <div className="items my-3 d-flex align-items-center justify-content-between">
                <h4 className="text-uppercase text-secondary ">Total Items</h4>
                <h4 className="text-uppercase text-secondary ">{totalItems}</h4>
              </div>
              <hr />

              <div className="items my-3 d-flex align-items-center justify-content-between">
                <h4 className="text-uppercase text-secondary "> items Price</h4>
                <h4 className="text-uppercase text-secondary ">
                  ${itemsPrice}
                </h4>
              </div>
              <hr />
              <div className="items my-3 d-flex align-items-center justify-content-between">
                <h4 className="text-uppercase text-secondary "> Tax Price</h4>
                <h4 className="text-uppercase text-secondary ">${taxPrice}</h4>
              </div>
              <hr />
              <div className="items my-3 d-flex align-items-center justify-content-between">
                <h4 className="text-uppercase text-secondary ">Shipping</h4>
                <h4 className="text-uppercase text-secondary ">
                  ${shippingPrice}
                </h4>
              </div>
              <hr />
              <div className="items my-3 d-flex align-items-center justify-content-between">
                <h4 className="text-uppercase text-secondary ">Total Price</h4>
                <h4 className="text-uppercase text-secondary ">
                  ${totalPrice}
                </h4>
              </div>

              <div className="price my-3 d-flex align-items-center justify-content-between">
                <button
                  className="btn-primary text-light text-uppercase btn-lg-rounded-0 p-4 fs-4 fw-bold px-5 w-100 border border-0"
                  disabled={cartItems.length === 0}
                  onClick={handleSumbit}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
