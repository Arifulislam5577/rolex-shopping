import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToCartAction,
  singleProductAction,
} from "../../Redux/Actions/productActions";
import Loader from "../Loader/Loader";

const ProductDetials = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(singleProductAction(id));
  }, [dispatch, id]);

  const [qty, setQty] = useState(1);

  const handleAddProduct = () => {
    dispatch(addToCartAction(id, qty));
  };
  return (
    <section className="product-detail py-5">
      <div className="container">
        <div className="row">
          {error && <h1>Product Not Found</h1>}
          {loading && <Loader />}
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <img
              src={product?.url}
              alt={product?.title}
              style={{ height: "50rem", objectFit: "contain" }}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <h4 className="text-uppercase fw-bold">{product?.title}</h4>
            <hr />
            <h4 className="text-uppercase fw-bold">
              Price : ${product?.price}
            </h4>
            <hr />
            <h4 className="text-uppercase fw-bold">
              Rating : {product?.rating} of ({product?.countReview})
            </h4>
            <hr />
            <h4 className="text-uppercase fw-bold">
              Status : {product?.stock ? "In stock" : "out of stock"}
            </h4>
            <hr />
            <div className="d-flex align-items-center gap-5">
              <div className="quantity d-flex align-items-center justify-content-between">
                <button
                  className="btn-secondary btn-sm text-light border border-0 p-2"
                  onClick={() => setQty(qty + 1)}
                  disabled={qty === product?.stock}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                    width="16"
                    height="16"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <line
                      x1="40"
                      y1="128"
                      x2="216"
                      y2="128"
                      fill="none"
                      stroke="#ffffff"
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
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="8"
                    ></line>
                  </svg>
                </button>
                <span className="m-3 fw-bold fs-5">{qty}</span>
                <button
                  className="btn-secondary btn-sm text-light border border-0 p-2"
                  onClick={() => setQty(qty - 1)}
                  disabled={qty === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <line
                      x1="40"
                      y1="128"
                      x2="216"
                      y2="128"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="8"
                    ></line>
                  </svg>
                </button>
              </div>
              <button
                className="btn btn-secondary btn-lg rounded-0 p-3 px-5 text-uppercase"
                disabled={product?.stock === 0}
                onClick={handleAddProduct}
              >
                Add to cart
              </button>
            </div>
            <hr />
            <table className="table">
              <tbody>
                {product?.description?.map((desc) => {
                  const { title, value } = desc;
                  return (
                    <tr key={desc._id} style={{ fontSize: "1.4rem" }}>
                      <td className="text-capitalize">{title}</td>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetials;
