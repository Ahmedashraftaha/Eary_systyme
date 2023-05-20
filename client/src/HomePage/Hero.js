import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <h1>Hearing system</h1>
          <p>now you can cheack Hearing problem and get solution for it</p>

          <Link to="/login" className="cta-btn">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
