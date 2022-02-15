import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCartAction,
  removeFromCart,
} from "../../Redux/Actions/productActions";

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.addToCartProducts);

  const increaseQty = (id, qty) => {
    const newqty = qty + 1;
    dispatch(addToCartAction(id, newqty));
  };

  const decreaseQty = (id, qty) => {
    const newqty = qty - 1;
    dispatch(addToCartAction(id, newqty));
  };

  const handleCheck = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="my-3">
      <div className="d-flex flex-column  cart-items">
        <header className="cart-header p-3 bg-light ">
          <h2 className="text-center text-uppercase">My Cart </h2>
        </header>
        <div className="cart-body overflow-auto flex-shrink-1 ">
          <div className="row m-auto">
            {cartItems.length > 0 ? (
              cartItems.map((product) => {
                const { title, price, qty, url, _id, stock } = product;

                return (
                  <div className="col-10 my-3" key={_id}>
                    <div className="card-box d-flex">
                      <div
                        className="card-img border border-1 bg-light"
                        style={{
                          width: "8rem",
                          padding: "1.5rem",
                          objectFit: "contain",
                        }}
                      >
                        <img src={url} alt={title} />
                      </div>
                      <div className="card-details ms-5">
                        <h3 className="card-title  text-primary text-capitalize">
                          {title}
                        </h3>
                        <h4 className="text-uppercase text-primary mt-3 mb-3">
                          ${price}
                        </h4>
                        <div className="quantity d-flex align-items-center justify-content-between gap-5">
                          <div className="quantity-box d-flex align-items-center justify-content-between gap-3">
                            <button
                              className="btn btn-outline-light"
                              onClick={() => increaseQty(_id, qty)}
                              disabled={qty === stock}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="#000000"
                                viewBox="0 0 256 256"
                              >
                                <rect
                                  width="256"
                                  height="256"
                                  fill="none"
                                ></rect>
                                <line
                                  x1="40"
                                  y1="128"
                                  x2="216"
                                  y2="128"
                                  fill="none"
                                  stroke="#000000"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="8"
                                ></line>
                                <line
                                  x1="128"
                                  y1="40"
                                  x2="128"
                                  y2="216"
                                  fill="none"
                                  stroke="#000000"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="8"
                                ></line>
                              </svg>
                            </button>
                            <span className=" fs-5">{qty}</span>
                            <button
                              className="btn btn-outline-light rounded-0"
                              onClick={() => decreaseQty(_id, qty)}
                              disabled={qty === 1}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="#000000"
                                viewBox="0 0 256 256"
                              >
                                <rect
                                  width="256"
                                  height="256"
                                  fill="none"
                                ></rect>
                                <line
                                  x1="40"
                                  y1="128"
                                  x2="216"
                                  y2="128"
                                  fill="none"
                                  stroke="#000000"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="8"
                                ></line>
                              </svg>
                            </button>
                          </div>
                          <div className="remove-_item">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#000000"
                              viewBox="0 0 256 256"
                              style={{ cursor: "pointer" }}
                              onClick={() => dispatch(removeFromCart(_id))}
                            >
                              <rect width="256" height="256" fill="none"></rect>
                              <line
                                x1="216"
                                y1="56"
                                x2="40"
                                y2="56"
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                              ></line>
                              <line
                                x1="104"
                                y1="104"
                                x2="104"
                                y2="168"
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                              ></line>
                              <line
                                x1="152"
                                y1="104"
                                x2="152"
                                y2="168"
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                              ></line>
                              <path
                                d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                              ></path>
                              <path
                                d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                fill="none"
                                stroke="#000000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="py-3 text-center text-uppercase">Cart is Empty</h1>
            )}
          </div>
        </div>
        <footer className="cart-footer footer mt-auto bg-light p-4 fixed-bottom position-absolute overflow-hidden ">
          <div className="d-flex align-items-center justify-content-between">
            <div className="calc">
              <h4 className="text-uppercase fw-bold">
                {cartItems.reduce((acc, item) => acc + item.qty * 1, 0)} Items
              </h4>
              <h4 className="text-uppercase fw-bold">
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.qty * 1,
                  0
                )}
              </h4>
            </div>
            <div className="next">
              <button
                className="btn btn-primary text-light fw-bold rounded-0 btn-lg p-3 px-5"
                disabled={cartItems.length === 0}
                onClick={handleCheck}
              >
                Checkout
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CartItems;
