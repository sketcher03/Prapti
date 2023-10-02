import React from 'react';
import AboutBg from "../../images/AboutBg.png";
import AboutImg from "../../images/AboutImg.png";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-bg">
        <img src={AboutBg} alt="" />
      </div>
      <div className="about-img">
        <img src={AboutImg} alt="" />
      </div>
      <div className="about-text">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          It is extremely important to dream higher and higher.
        </h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <p className="primary-text">
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p>
        <div className="about-btn">
          <button className="secondary-button">Become a Seller</button>
        </div>
      </div>
    </div>
  );
}

export default About