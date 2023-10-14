import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/seller.css";
import "../../css/PopupForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { server } from "../../../server";
import Store from "../../redux/store";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { editUser } from '../../redux/actions/user';
import Avatar from "@mui/material/Avatar";

const SellerStarterForm = () => {

  const { user } = useSelector((state) => state.user);
  //console.log(user);

  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [role, setRole] = useState("user");

  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    display_name: "",
    description: "",
    phoneNumber: "",
    email: "",
    username: "",
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const [talents, setTalents] = useState([
    {
      talent: "",
      talent_description: "",
    },
  ]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleTalentChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...talents];
    list[i][name] = value;

    setTalents(list);
  };

  const handleRemove = (i) => {
    const list = [...talents];
    list.splice(i, 1);

    setTalents(list);
  };

  const handleAddMore = () => {
    setTalents([...talents, { talent: "", talent_description: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    const id = user._id;

    const updateUser = new FormData();

    console.log(data, talents, profilePic);

    if (profilePic) {
      updateUser.append("file", profilePic);
    }
    
    if (!profilePic) {
      updateUser.append("filename", image);
    }

    if (data.name === "" || data.description === "" || data.display_name === "" || data.phoneNumber === "" || talents.length === 0) {
      setRole("user");
    }
    else {
      setRole("user100");
    }

    if (data.email === "" || data.username === "") {
      setError("Email and Username can't be empty");
    }
    
    updateUser.append("email", data.email);
    updateUser.append("username", data.username);
    updateUser.append("name", data.name);
    updateUser.append("display_name", data.display_name);
    updateUser.append("description", data.description);
    updateUser.append("phoneNumber", data.phoneNumber);
    updateUser.append("talents", JSON.stringify(talents));
    updateUser.append("role", role);

    console.log(updateUser);
    
    Store.dispatch(
      editUser(updateUser, id, setData, setError, setImage, setTalents, profilePic)
    );

    console.log("submit clicked");
  };

  useEffect(() => {
      
    setData({
      name: user.name || "",
      display_name: user.display_name || "",
      description: user.description || "",
      phoneNumber: user.phoneNumber || "",
      email: user.email,
      username: user.username,
    });
    
  
    if (user.talents)
    {
      setTalents(user.talents);
    }

    if(user.talents.length === 0) {
      setTalents([
        {
          talent: "",
          talent_description: "",
        },
      ]);
    }

    setImage(user.profilePic);

  }, [user]);

  const ImageControl = () => {
    if (profilePic) {
      return (
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
      )
    }
    if (image !== null) {
      return (
        <img
          style={{
            width: "120%",
            height: "120%",
            objectFit: "cover",
            paddingBottom: "10px",
          }}
          src={`${server}/${image}`}
          alt="Profile Picture"
        />
      )
    }
    else {
      return (
        <Avatar sx={{ width: 50, height: 50 }}>A</Avatar>
      )
    }
  }

  return (
    <div className="seller-container">
      <form className="update-user" onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>
          Update Your Information <br />{" "}
          <span>
            A 100% completed profile has a higher chance to get recognized and
            trusted
          </span>
        </h3>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "420px" }}>
            <label>Your Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="John Doe"
              value={data.name}
            />
          </div>
          <div style={{ width: "360px" }}>
            <label>Your Display Name</label>
            <input
              type="text"
              name="display_name"
              onChange={handleChange}
              placeholder="This will appear on your seller profile"
              value={data.display_name}
            />
          </div>
        </div>

        <label>Your Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Tell us more about yourself "
        ></textarea>

        <label>Your Phone Number</label>
        <input
          type="Number"
          name="phoneNumber"
          onChange={handleChange}
          value={data.phoneNumber}
          placeholder="+8801 --- --- ---"
        />

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
              required
            />

            <label>Your Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
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
                <ImageControl/>
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

        <label style={{ margin: "15px -3px" }}>
          List your Talents with a Brief Description{" "}
          <span>(maximum three)</span>
        </label>
        {talents.map((x, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                border: "1.5px solid #c0c0c0",
                borderRadius: "10px",
                padding: "2%",
                paddingTop: "20px",
                marginBottom: "30px",
              }}
            >
              <div style={{ width: "300px" }}>
                <label>Talent</label>
                <input
                  type="text"
                  name="talent"
                  onChange={(e) => handleTalentChange(e, i)}
                  placeholder="Ex - Photography"
                  value={talents[i].talent}
                />
              </div>
              <div style={{ width: "400px" }}>
                <label>Talent Description</label>
                <textarea
                  name="talent_description"
                  onChange={(e) => handleTalentChange(e, i)}
                  placeholder="Ex - Photography"
                  value={talents[i].talent_description}
                ></textarea>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0px",
                  marginTop: "17px",
                }}
              >
                {talents.length - 1 === i && !(talents.length === 3) && (
                  <button className="sellerbtn3" onClick={handleAddMore}>
                    <AddIcon />
                  </button>
                )}
                {talents.length !== 1 && (
                  <button
                    className="sellerbtn3"
                    onClick={() => handleRemove(i)}
                  >
                    <DeleteForeverIcon />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className="createreq-bottom">
          <button className="sellerbtn1">Save Information</button>
          <Link to="/profile" className="sellerbtn2">
            Cancel <CloseIcon />
          </Link>
        </div>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default SellerStarterForm