import React from 'react'
import ApprovalIcon from "@mui/icons-material/Approval";
import SellIcon from "@mui/icons-material/Sell";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AboutBg from "../../images/AboutBg.png";

const ClientHowTo = () => {

  const howToData = [
    {
      icon: <ApprovalIcon />,
      title: "Post a Request and Hire a Professional",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      icon: <SellIcon />,
      title: "Browse Projects and Buy as per your needs",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et  Maecenas orci et sagittis duis elementum interdum facilisi",
    },
    {
      icon: <VerifiedUserIcon />,
      title: "Reliable Customer and Security Throughout",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum em ipsum dolor sit rtyrtyrtu",
    },
  ];
  return (
    <div className="how-to-section">
      <div className="how-to-bg">
        <img src={AboutBg} alt="" />
      </div>
      <div className="how-to-top">
        <p className="primary-subheading">For Client</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="how-to-bottom">
        {howToData.map((data) => (
          <div className="how-to-info" key={data.title}>
            <div className="info-img">{data.icon}</div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientHowTo