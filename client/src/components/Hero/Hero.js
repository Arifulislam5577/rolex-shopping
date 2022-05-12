import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const Hero = () => {
  return (
    <header className="hero py-5">
      <div className="container">
        <div className="content gap-5">
          <Fade left cascade>
            <div className="social-media">
              <ul>
                <li>
                  <a href="/facebook">Facebook</a>
                </li>
                <li>
                  <a href="/twitter">Twitter</a>
                </li>
                <li>
                  <a href="/instagram">Instagram</a>
                </li>
              </ul>
            </div>
          </Fade>
          <Fade left cascade>
            <div className="hero-text">
              <h1>NEW WATCH COLLECTIONS B720</h1>
              <p className="text-secondary">
                Latest arrival of the new imported watches of the B720 series,
                with a modern and resistant design.
              </p>
              <h3 className="fw-bold text-primary mb-5">$1245</h3>

              <button type="button" className="hero-btn discover">
                Discover
              </button>
              <Link to="/shop">
                <button type="button" className="hero-btn shopnow">
                  Shop Now
                </button>
              </Link>
            </div>
          </Fade>
          <Fade right>
            <div className="hero-image">
              <img
                src="https://res.cloudinary.com/arif5577/image/upload/v1643377241/Shopping-cart/home_jtitnq.png"
                alt="watch"
              />
            </div>
          </Fade>
        </div>
      </div>
    </header>
  );
};

export default Hero;
