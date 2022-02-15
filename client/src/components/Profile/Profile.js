import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDetailsActions,
  userUpdateActions,
} from "../../Redux/Actions/userActions";
import { getUserOrder } from "../../Redux/Actions/orderActions";

import Loader from "../Loader/Loader";
const Profile = () => {
  const userLogIn = useSelector((state) => state.userLogin);
  const { userInfo } = userLogIn;
  const userDetails = useSelector((state) => state.userDetails);
  const userOrder = useSelector((state) => state.userOrder);

  const { order, error: orderError, loading: orderLoading } = userOrder;
  const { user, loading, error } = userDetails;
  const { sucess, loading: isLoading } = useSelector(
    (state) => state.userUpdate
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password Does Not Match");
    } else if (password === confirmPassword && password.length <= 5) {
      setMessage("Password must be at least 6 characters");
    } else if (username.length <= 4) {
      setMessage("Username must be at least 4 characters");
    } else {
      dispatch(userUpdateActions(userInfo._id, username, email, password));
      setMessage("");
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(userDetailsActions(userInfo._id));
    } else {
      setUsername(user.username);
      setEmail(user.email);
    }
    dispatch(getUserOrder());
  }, [dispatch, userInfo._id, user]);

  return (
    <section className="profile py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-4">
            <div className="p-5 shadow">
              <h1 className=" bg-primary p-3  text-light mb-4 text-uppercase">
                Your Info
              </h1>
              <form className=" row g-3" onSubmit={handleSubmit}>
                {loading && <Loader />}
                {isLoading && <Loader />}
                {error && (
                  <h2 className="p-3 bg-danger text-center text-light">
                    {error}
                  </h2>
                )}
                {message && (
                  <h2 className="p-3 bg-danger text-center text-light">
                    {message}
                  </h2>
                )}
                {sucess && (
                  <h2 className="p-3 bg-primary text-center text-light">
                    Update Success
                  </h2>
                )}
                <div className="col-md-12">
                  <label htmlFor="inputEmail1" className="form-label fs-5">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    className="form-control p-3 rounded-0 fs-4"
                    id="inputEmail1"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label fs-5">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="form-control p-3 rounded-0 fs-4"
                    id="inputEmail4"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label fs-5">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    className="form-control p-3 rounded-0 fs-4"
                    id="inputPassword4"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPassword" className="form-label fs-5">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    className="form-control p-3 rounded-0 fs-4"
                    id="inputPassword"
                    required
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary p-3 rounded-0 fs-5 px-5 w-100"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-8">
            <h1 className=" bg-primary p-3  text-light mb-4 text-uppercase">
              order Info
            </h1>
            {orderLoading ? (
              <Loader />
            ) : orderError ? (
              <h1 className=" bg-danger p-3  text-light mb-4 text-uppercase">
                {orderError}
              </h1>
            ) : (
              <>
                <table className="table table-borderless table-hover table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Total Items</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Paid Status</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.length === 0 ? (
                      <h1 className=" bg-light p-3  text-primary mt-4 text-uppercase">
                        No Order Available
                      </h1>
                    ) : (
                      order?.map((orderItems) => {
                        const { _id, orderCalculation, isDelivered, isPaid } =
                          orderItems;
                        return (
                          <tr
                            key={_id}
                            style={{
                              fontSize: "1.4rem",
                              verticalAlign: "middle",
                            }}
                          >
                            <td>#{_id}</td>
                            <td>{orderCalculation?.totalItems}</td>
                            <td>${orderCalculation?.totalPrice}</td>
                            <td>{isPaid ? "Paid" : "Unpaid"}</td>
                            <td>{isDelivered ? "Delivered" : "Pending"}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
