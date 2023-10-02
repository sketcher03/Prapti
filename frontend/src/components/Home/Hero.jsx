import React from "react";
import BannerBg from "../../images/BannerBg.png";
import BannerImg from '../../images/BannerImg.png'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-banner">
      <div className="hero-banner-img">
        <img src={BannerBg} alt="banner-image" />
      </div>
      <div className="hero-text">
        <h1 className="primary-heading">
          We Bring the Right Freelancers To Your Doorstep 
        </h1>
        <p className="primary-text">
          Here you will find the people you always wanted to find in an much easier way.
        </p>
        <Link to="/signup">
          <button className="secondary-button">
            Get Started Now! <FiArrowRight />{" "}
          </button>
        </Link>
      </div>
      <div className="hero-image">
        <img src={BannerImg} alt="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
