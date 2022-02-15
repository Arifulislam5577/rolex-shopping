import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { shippingInfoActions } from "../../Redux/Actions/productActions";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector(
    (state) => state.addToCartProducts
  );
  const [address, setAddress] = useState(
    shippingInfo ? shippingInfo.address : ""
  );
  const [city, setCity] = useState(shippingInfo ? shippingInfo.city : "");
  const [phone, setPhone] = useState(shippingInfo ? shippingInfo.phone : "");
  const [country, setCountry] = useState(
    shippingInfo ? shippingInfo.country : ""
  );

  const countryDetail = Object.values(countries);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(shippingInfoActions({ address, city, phone, country }));
    navigate("/order");
  };
  useEffect(() => {
    if (!cartItems.length) {
      navigate("/");
    }
  }, [cartItems.length, navigate]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="row m-auto ">
          <form
            className="row g-3  m-auto p-5 shadow form"
            onSubmit={handleSubmit}
          >
            <div className="col-md-12">
              <label
                htmlFor="address"
                className="form-label fs-5 text-uppercase"
              >
                address
              </label>
              <input
                type="text"
                className="form-control p-3 rounded-0 fs-4"
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="phone" className="form-label fs-5 text-uppercase">
                phone number
              </label>
              <input
                type="text"
                className="form-control p-3 rounded-0 fs-4"
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="city" className="form-label fs-5 text-uppercase">
                city
              </label>
              <input
                type="text"
                required
                className="form-control p-3 rounded-0 fs-4"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label
                htmlFor="country"
                className="form-label fs-5 text-uppercase"
              >
                country
              </label>
              <select
                className="form-select form-control p-3 rounded-0 fs-4"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryDetail.map((co) => (
                  <option value={co.name} key={co.name}>
                    {co.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary p-3 rounded-0 fs-5 px-5 w-100"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
