import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/project.css";
import "../../css/PopupForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { server } from "../../../server";
import Store from "../../redux/store";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RxAvatar } from "react-icons/rx";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import '../../css/Login_Signup.css';

const SellerStarterForm = () => {
  const { user } = useSelector((state) => state.user);
    //console.log(user);
    
    const category = ["Photography", "Graphic Design", "Traditional Painting", "Printing Art", "Repairs", "Crafting", "Programming", "Banking"];

  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [image, setImage] = useState();

  const [data, setData] = useState({
    name: "",
    display_name: "",
    description: "",
    phoneNumber: "",
    email: "",
    username: "",
    deliverabilities: [
      {
        features: [],
      },
    ],
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };


  const handleRemoveDeliverability = (i) => {
    const list = [...data.deliverabilities];
    list.splice(i, 1);

    setData({ ...data, deliverabilities: list });
  };

  const handleAddDeliverability = () => {
    setData({
      ...data,
      deliverabilities: [...data.deliverabilities, {features: [] }],
    });
  };

  const handleFeatureChange = (e, i, featureIndex) => {
    const { value } = e.target;
    const list = [...data.deliverabilities];
    list[i].features[featureIndex] = value;

    setData({ ...data, deliverabilities: list });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    console.log("submit clicked");
  };
  

  return (
    <div className="project-container">
      <form className="create-project" onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center"}}>
          Create your First Project <br />{" "}
          <span>Let's create something you excel at</span>
        </h3>

        <div>
          <label>Give your Project a Title</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="I will paint a wall for you. . ."
            value={data.name}
          />
        </div>

        <label>Select some categories you project fall into</label>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={category}
          filterSelectedOptions
          ChipProps={{
            sx: {
              fontFamily: "poppins",
              minHeight: "40px",
              padding: "10px 5px",
              "& .MuiChip-label": {
                paddingTop: "18px",
              },
            },
          }}
          sx={{
            fontFamily: "poppins",
            margin: "15px 0px",
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Painting, Photography, etc" />
          )}
        />

        <label>Project Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Tell us more about yourself"
        ></textarea>


      <label>Give your Deliverabilities</label>
      <div>
        {data.deliverabilities.map((item, i) => (
          <div
            key={i}
            style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "15px", 
           }}
         >
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "300px", marginRight: "15px" }}>
                <label>Deliverability {i + 1}</label>
                <input
                  type="text"
                  name="talent"
                  onChange={(e) => handleFeatureChange(e, i)}
                  placeholder="Ex - Photography"
                  value={item.talent}
                />
              </div>
            </div>

            <div>
              {data.deliverabilities.length - 1 === i && !(data.deliverabilities.length === 3) && (
                <button className="projectbtn3" onClick={handleAddDeliverability}>
                  <AddIcon />
                </button>
              )}
              {data.deliverabilities.length !== 1 && (
                <button className="projectbtn3" onClick={() => handleRemoveDeliverability(i)}>
                  <DeleteForeverIcon />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "190px",
            margin: "30px 0px",
          }}
        >


          <div style={{ width: "360px" }}>
            <label>Your Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={data.email}
            />

            <label>Your Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderWidth: "2px",
              padding: "30px",
              borderRadius: "0.75rem",
              justifyContent: "space-between",
              width: "430px",
            }}
          >
            <label
              htmlFor="profile-pic"
              style={{
                fontWeight: "600",
                color: "grey",
                borderRightWidth: "2px",
                paddingRight: "16px",
                paddingTop: "24px",
                paddingBottom: "24px",
              }}
            >
              Profile Photo
            </label>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  height: "5.5rem",
                  width: "5.5rem",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  marginLeft: "24px",
                }}
              >
                {profilePic ? (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="Profile Picture"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "9999px",
                      paddingTop: "0px",
                    }}
                  />
                ) : (
                  <RxAvatar className="h-16 w-16 pt-0 text-gray-600 mt-2" />
                )}
              </span>
              <label
                htmlFor="file-input"
                style={{
                  marginLeft: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  padding: "20px",
                  paddingTop: "45px",
                  border: "1px solid grey",
                  borderRadius: "6px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: "500",
                  color: "grey",
                  backgroundColor: "white",
                }}
              >
                <span>Upload a file</span>

                <input
                  type="file"
                  name="profilePic"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>


        <div className="createreq-bottom">
          <button className="projectbtn1">Save Information</button>
          <Link to="/" className="projectbtn2">
            Cancel <CloseIcon />
          </Link>
        </div>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SellerStarterForm;