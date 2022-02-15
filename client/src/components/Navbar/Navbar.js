/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userLogOutAction } from "../../Redux/Actions/userActions";
import CartItems from "../Cart/CartItems";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [navbarBg, setNavbarbg] = useState(false);
  const { cartItems } = useSelector((state) => state.addToCartProducts);

  const userLogIn = useSelector((state) => state.userLogin);
  const { userInfo } = userLogIn;

  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 0) {
      setNavbarbg(true);
    } else {
      setNavbarbg(false);
    }
  });

  const handleLogOut = () => {
    dispatch(userLogOutAction());
    navigate("/");
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light sticky-top ${
          navbarBg && "bg-light shadow-sm"
        }`}
      >
        <div className="container">
          <Link
            className="navbar-brand text-uppercase fw-bold text-decoration-none"
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <circle
                cx="128"
                cy="128"
                r="72"
                fill="none"
                stroke="#ffb566"
                strokeMiterlimit="10"
                strokeWidth="16"
              ></circle>
              <polyline
                points="128 88 128 128 168 128"
                fill="none"
                stroke="#ffb566"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></polyline>
              <path
                d="M88,68.1l6.8-37.5a8,8,0,0,1,7.9-6.6h50.6a8,8,0,0,1,7.9,6.6L168,68.1"
                fill="none"
                stroke="#ffb566"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
              <path
                d="M88,187.9l6.8,37.5a8,8,0,0,0,7.9,6.6h50.6a8,8,0,0,0,7.9-6.6l6.8-37.5"
                fill="none"
                stroke="#ffb566"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
            </svg>
            Rolex
          </Link>

          <ul className="navbar ms-auto d-flex mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                to="/cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <path
                    d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                  <circle
                    cx="80"
                    cy="204"
                    r="20"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></circle>
                  <circle
                    cx="184"
                    cy="204"
                    r="20"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></circle>
                  <path
                    d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                </svg>
                <sup className="bg-primary text-light totalCartitems">
                  {cartItems.reduce((acc, item) => acc + item.qty * 1, 0)}
                </sup>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <path
                    d="M48,139.6V208a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V139.6"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                  <path
                    d="M54,40H202a8.1,8.1,0,0,1,7.7,5.8L224,96H32L46.3,45.8A8.1,8.1,0,0,1,54,40Z"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                  <path
                    d="M96,96v16a32,32,0,0,1-64,0V96"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                  <path
                    d="M160,96v16a32,32,0,0,1-64,0V96"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                  <path
                    d="M224,96v16a32,32,0,0,1-64,0V96"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                  ></path>
                </svg>
              </NavLink>
            </li>
            <li className="nav-item">
              {userInfo ? (
                <div className="dropdown ">
                  <button
                    className="btn btn-outline-primary p-2 px-4 dropdown-toggle text-uppercase rounded-0"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.username}
                  </button>
                  <ul
                    className="dropdown-menu bg-light m-0 p-0"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        className="dropdown-item fs-5 p-2 bg-outline-primary"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    {userInfo.isAdmin && (
                      <li>
                        <Link
                          className="dropdown-item fs-5 p-2 bg-outline-primary"
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        className="dropdown-item fs-5 p-2 text-danger"
                        onClick={handleLogOut}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <NavLink to="/login" className="nav-link ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <circle
                      cx="128"
                      cy="96"
                      r="64"
                      fill="none"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="8"
                    ></circle>
                    <path
                      d="M31,216a112,112,0,0,1,194,0"
                      fill="none"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="8"
                    ></path>
                  </svg>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-end p-3"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <CartItems />
      </div>
    </>
  );
};

export default Navbar;
