import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { userSignUpAction } from "../../Redux/Actions/userActions";

const SingIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignUp = useSelector((state) => state.userSignup);
  const { userInfo, loading, error } = userSignUp;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length <= 4) {
      setMessage("Username must be at least 5 characters");
    } else if (password.length <= 5) {
      setMessage("Password must be at least 6 characters");
    } else {
      dispatch(userSignUpAction(username, email, password));
      setMessage("");
    }
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
            {message && (
              <h2 className="p-3 bg-danger text-center text-light">
                {message}
              </h2>
            )}

            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label fs-5">
                USERNAME
              </label>
              <input
                type="text"
                className="form-control p-3 rounded-0 fs-4"
                id="inputEmail"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputEmail1" className="form-label fs-5">
                EMAIL
              </label>
              <input
                type="email"
                className="form-control p-3 rounded-0 fs-4"
                id="inputEmail1"
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
                required
                className="form-control p-3 rounded-0 fs-4"
                id="inputPassword4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary p-3 rounded-0 fs-5 px-5 w-100"
              >
                Sign in
              </button>
              <p className="fs-5 my-3">
                Have already an account?
                <Link to={`/login?redirect=${redirect}`}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingIn;
