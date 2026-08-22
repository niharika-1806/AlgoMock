import "./Hero.css";
import heroImage from "../../assets/illustrations/hero.svg";
import { useState } from "react";
function Hero() { 
  return (
    <section className="hero">

      <div className="hero-left">
        <div className="hero-badge">
          🚀 AI- Powered Placement Preparation
        </div>

        <h1>
          Crack Your Next Coding Interview 🚀
        </h1>

        <p>
          AI-powered code reviews and mock interviews
          designed to help you prepare for top tech companies.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Review My Code
          </button>

          <button className="secondary-btn">
            AI Mock Interview
          </button>

        </div>
      </div>

      <div className="hero-right">

        <div className="hero-image">

          <img src={heroImage} alt="Developer Illustration" />

        </div>

      </div>

    </section>
  );
}

export default Hero;