import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  addToCartAction,
  allProductAction,
} from "../../Redux/Actions/productActions";
import Loader from "../Loader/Loader";

const Shop = () => {
  const dispatch = useDispatch();
  const {
    error,
    loading,
    products,
    totalProducts,
    result,
    resultPerPage,
    colors,
  } = useSelector((state) => state.allProduct);
  const { cartItems } = useSelector((state) => state.addToCartProducts);
  const { color } = useParams();
  const [keyword, setKeyword] = useState("");

  const [pageNum, setPageNum] = useState(1);
  const [price, setPrice] = useState(2000);
  const pages = Math.ceil(totalProducts / resultPerPage);

  useEffect(() => {
    dispatch(allProductAction(keyword, pageNum, price, color));
  }, [dispatch, keyword, pageNum, price, color]);

  return (
    <section className="shop py-5 h-100">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-3 px-3 h-100">
            <form className="mb-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control rounded-0 p-3 bg-light fs-4"
                  placeholder="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="input-group-text bg-light rounded-0"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <circle
                      cx="116"
                      cy="116"
                      r="84"
                      fill="none"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="8"
                    ></circle>
                    <line
                      x1="175.4"
                      y1="175.4"
                      x2="224"
                      y2="224"
                      fill="none"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="8"
                    ></line>
                  </svg>
                </button>
              </div>
            </form>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <span className="fs-4">$0</span>
              <input
                type="range"
                className="form-range w-75"
                id="customRange1"
                min="0"
                max="2000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="fs-4">${price}</span>
            </div>

            <div className="mb-5">
              <h3 className="text-uppercase">Colors</h3>
              <hr />
              <ul className="p-0 m-0">
                {colors?.map((color, i) => (
                  <li key={i} className="my-3">
                    <Link
                      to={`/shop/colors/${color}`}
                      className="fs-4 text-uppercase text-dark"
                    >
                      {color}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-9 product-area">
            <motion.div
              layout
              className="row row-cols-2 row-cols-md-2 row-cols-lg-3 g-5"
            >
              {error ? (
                <h1>Product not found</h1>
              ) : loading ? (
                <Loader />
              ) : result ? (
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
                          <h3 className="text-primary fw-bold">
                            ${product.price}
                          </h3>
                          <p
                            className={`cart  ${
                              cartItems.find((pd) => pd._id === product._id)
                                ? "bg-primary"
                                : "bg-secondary"
                            } `}
                            onClick={() =>
                              dispatch(addToCartAction(product._id))
                            }
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
              ) : (
                <div className="notfound w-100">
                  <h1 className="text-center p-3 bg-primary text-light text-uppercase ms-5 w-100">
                    No Product Found
                  </h1>
                </div>
              )}
            </motion.div>

            {!loading && result !== 0 && (
              <div className=" py-5">
                <div
                  className="btn-group rounded-0"
                  role="group"
                  aria-label="First group"
                >
                  {!isNaN(pages) &&
                    [...Array(pages).keys()].map((page) => {
                      return (
                        <button
                          type="button"
                          className={`btn ${
                            pageNum === page + 1
                              ? "bg-secondary text-light"
                              : "btn-outline-secondary"
                          } px-5 p-3 rounded-0 fs-4`}
                          key={page + 1}
                          onClick={() => setPageNum(page + 1)}
                        >
                          {page + 1}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
