import React from 'react';
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const TalentHowTo = () => {
  return (
    <div className="talent-prompt">
      <p className="primary-subheading">For Talents</p>
      <h1 className="primary-heading">Want to shine as a Freelancer?</h1>
      <h1 className="primary-text">Let Us Help You</h1>
      <Link to="/signup">
        <button className="secondary-button">
          Join now as a Seller! <FiArrowRight />{" "}
        </button>
      </Link>
    </div>
  );
}

export default TalentHowTo