import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCartAction,
  hotProductAction,
} from "../../Redux/Actions/productActions";
import Loader from "../Loader/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.hotProducts
  );
  const { cartItems } = useSelector((state) => state.addToCartProducts);

  useEffect(() => {
    dispatch(hotProductAction());
  }, [dispatch]);
  return (
    <section className="my-5 Products ">
      <div className="container">
        <div className="text-center py-5">
          <h2 className="text-uppercase section-heading">Products</h2>
        </div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-5">
          {error ? (
            <h1>Product not found</h1>
          ) : loading ? (
            <Loader />
          ) : (
            products.map((product) => {
              return (
                <div className="col" key={product._id}>
                  <div className="card h-100 p-5 rounded-0 border border-0">
                    <span className="fw-bold text-uppercase text-light bg-primary">
                      {product.base}
                    </span>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.url}
                        className="card-img-top"
                        alt={product.title}
                      />
                    </Link>
                    <div className="card-body text-center">
                      <h3 className="text-uppercase">
                        <Link
                          to={`/product/${product._id}`}
                          className="text-decoration-none"
                        >
                          {product.title}
                        </Link>
                      </h3>
                      <h3 className="text-primary fw-bold">${product.price}</h3>
                      <p
                        className={`cart  ${
                          cartItems.find((pd) => pd._id === product._id)
                            ? "bg-primary"
                            : "bg-secondary"
                        } `}
                        onClick={() => dispatch(addToCartAction(product._id))}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#fff"
                          viewBox="0 0 256 256"
                        >
                          <rect width="256" height="256" fill="none"></rect>
                          <path
                            d="M208.8,72H47.2a8.1,8.1,0,0,0-8,7.1L25,207.1a8,8,0,0,0,7.9,8.9H223.1a8,8,0,0,0,7.9-8.9l-14.2-128A8.1,8.1,0,0,0,208.8,72Z"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                          ></path>
                          <path
                            d="M88,104V72a40,40,0,0,1,80,0v32"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                          ></path>
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
