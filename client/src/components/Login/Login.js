import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLoginActions } from "../../Redux/Actions/userActions";
import Loader from "../Loader/Loader";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.userLogin);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginActions(username, password));
  };

  useEffect(() => {
    if (Object.keys(userInfo ? userInfo : {}).length > 0) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="row m-auto ">
          <form
            className="row g-3  m-auto p-5 shadow form"
            onSubmit={handleSubmit}
          >
            {loading && <Loader />}
            {error && (
              <h2 className="p-3 bg-danger text-center text-light"> {error}</h2>
            )}
            {Object.keys(userInfo ? userInfo : {}).length > 0 && (
              <h2 className="p-3 bg-primary text-center text-light">
                Login Successfull
              </h2>
            )}
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label fs-5">
                USERNAME
              </label>
              <input
                type="text"
                className="form-control p-3 rounded-0 fs-4"
                id="inputEmail4"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary p-3 rounded-0 fs-5 px-5"
              >
                Login
              </button>
              <p className="fs-5 my-3">
                Create a new account ?
                <Link to={`/signin?redirect=${redirect}`}> SignUp</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
