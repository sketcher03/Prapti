import React from "react";
import "../css/profile.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from '@mui/material/Badge';
import Rating from '@mui/material/Rating';
import Divider from "@mui/material/Divider";

import { useSelector } from "react-redux";
import { server } from "../../server";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'

const MyProfile = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [image, setImage] = useState();
    const [talents, setTalents] = useState([
        {
            talent: "",
            talent_description: "",
        }
    ]);

    const [billingAddresses, setBillingAddresses] = useState([
        {
            country: "",
            city: "",
            address: "",
            postCode: 0
        }
    ]);

    useEffect(() => {
        console.log(user.talents);
        setImage(user.profilePic);

        if (user.talents) {
            setTalents(user.talents);
        }

        setBillingAddresses(user.billingAddresses);

    }, [user]);

    return (
        <div className="profile-container">
            {/* <h1>Profile Information</h1> */}
            <Badge badgeContent={user.verified ? "Verified" : "Not Verified"} color={user.verified ? "success" : "error"}>
                <Avatar
                    sx={{ width: "200px", height: "200px", marginBottom: "30px" }}
                    alt="Profile Picture"
                    src={`${server}/${image}`}
                />
            </Badge>
            
            <h1 style={{ margin: "0px" }}>{user.display_name}</h1>
            <h6 style={{ color: "grey", marginBottom: "15px" }}>@{user.username}</h6>

            {/* rating */}
            <Rating
                sx={{
                    marginBottom: "20px"
                }}
                name="rating"
                value={0}
                precision={0.1}
                readOnly
                size="large"
            />

            <button className="profilebtn1" style={{marginTop: "0px"}}>See Public View</button>

            <Accordion
                sx={{
                    fontFamily: "Poppins",
                    width: "800px",
                    backgroundColor: "hsl(120, 100%, 98%)",
                    boxShadow: "none",
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: "5px 30px"}}>
                    <Typography>Personal Details</Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    <div>
                        <h2>Full Name</h2>
                        <h2>Email Address</h2>
                        <h2>Phone Number</h2>
                        <h2>Joined</h2>
                    </div>
                    <div style={{ marginRight: "50px", textAlign: "right" }}>
                        <h3>{ user.name }</h3>
                        <h3>{ user.email }</h3>
                        <h3>{ user.phoneNumber }</h3> 
                        <h3>{ format(new Date(user.createdAt), 'MM/dd/yyyy') }</h3> 
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    fontFamily: "Poppins",
                    width: "800px",
                    backgroundColor: "hsl(120, 100%, 98%)",
                    boxShadow: "none",
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: "5px 30px"}}>
                    <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                    {
                        user.description ? (
                            <div>
                                <h2>Description</h2>
                                <p>{user.description}</p>
                            </div>
                        ): (
                            <h2>You have not added a description yet</h2>
                        )
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    fontFamily: "Poppins",
                    width: "800px",
                    backgroundColor: "hsl(120, 100%, 98%)",
                    boxShadow: "none",
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: "5px 30px"}}>
                    <Typography>Talents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="accordion-details">
                        <h2>Talent</h2>
                        <h2 style={{ marginRight: "50px", textAlign: "right" }} >Description</h2>
                    </div>
                    
                    {talents?.map((x, i) => {
                        return (
                            <div key={i} className="accordion-details">
                                <div style={{ marginRight: "50px"}}>
                                    <h3>{talents[i].talent}</h3>
                                </div>
                                <div style={{ marginRight: "50px", textAlign: "right", maxWidth: "450px" }}>
                                    <p>{talents[i].talent_description}</p>
                                    <Divider sx={{ margin: "24px auto", width: "100%" }} />
                                </div>
                            </div>
                        );
                    })}
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    fontFamily: "Poppins",
                    width: "800px",
                    backgroundColor: "hsl(120, 100%, 98%)",
                    boxShadow: "none",
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{padding: "5px 30px"}}>
                    <Typography>Billing Addresses</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    
                    {billingAddresses?.map((x, i) => {
                        return (
                            <div key={i} className="accordion-details">
                                <div style={{ marginRight: "50px" }} >
                                    <h2>Address</h2>
                                    <h2>City</h2>
                                    <h2>Country</h2>
                                    <h2>Post Code</h2>
                                </div>
                                <div style={{ marginRight: "50px", textAlign: "right", maxWidth: "450px" }}>
                                    <h3>{billingAddresses[i].address}</h3>
                                    <h3>{billingAddresses[i].city}</h3>
                                    <h3>{billingAddresses[i].country}</h3>
                                    <h3>{billingAddresses[i].postCode}</h3>
                                </div>
                            </div>
                        );
                    })}
                </AccordionDetails>
            </Accordion>
            

            <div>
                <button className="profilebtn1" onClick={() => {navigate("/profile/edit"); }}>Edit Information</button>
                <button className="profilebtn1">Reset Password</button>
                <button className="profilebtn2">Delete Account</button>
            </div>
        </div>
    );
};

export default MyProfile;