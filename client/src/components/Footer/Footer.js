/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light py-5 border border-top-2 shadow-lg">
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6 col-md-6 col-lg-4">
            <h3 className="text-uppercase fw-bold text-primary">Rolex</h3>
            <p className="fs-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              odio, in quo debitis repudiandae quas laboriosam deserunt enim
              ullam, molestias quod sequi.
            </p>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-4">
            <h4 className="text-uppercase fw-bold">Quick Links</h4>
            <ul className="p-0">
              <li style={{ borderBottom: "1px solid #ccc" }}>
                <a href="/shop" className="text-dark mt-3 mb-2 fs-5 d-block">
                  Shop
                </a>
              </li>

              <li style={{ borderBottom: "1px solid #ccc" }}>
                <a href="/shop" className="text-dark mt-3 mb-2 fs-5 d-block">
                  Our Blog
                </a>
              </li>

              <li style={{ borderBottom: "1px solid #ccc" }}>
                <a href="/shop" className="text-dark mt-3 mb-2 fs-5 d-block">
                  Our Offer
                </a>
              </li>

              <li style={{ borderBottom: "1px solid #ccc" }}>
                <a href="/shop" className="text-dark mt-3 mb-2 fs-5 d-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <h4 className="text-uppercase fw-bold text-uppercase">
              Subscribe our newsletter
            </h4>

            <form className="mt-4">
              <div className="mb-3">
                <input
                  className="form-control rounded-0 p-3"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control rounded-0 p-3"
                  placeholder="Enter Your Email"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary rounded-0 p-3 px-5 text-light fw-bold fs-5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <p className="border border-top-1 p-3 mt-5 text-center w-100">
          {new Date().getFullYear()}|| All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
