import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import praptiLogo from '../images/logo.png';
import '../css/Navbar_Footer.css'
import { useSelector } from 'react-redux';
import Store from "../redux/store";
import { logoutUser } from "../redux/actions/user";
import { server } from "../../server";

//MUI imports
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
  const { isAuthenticated, isSeller, user } = useSelector((state) => state.user);
  //console.log(isSeller);

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [mode, setMode] = useState("buyer");
  const [modeText, setModeText] = useState("Seller Dashboard");

  useEffect(() => {
    //console.log(user.profilePic);
    setImage(user.profilePic);

    if (!isSeller) {
      setModeText("Become A Seller")
    }
  }, [user]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMode = () => {

    if (!isSeller) {
      if (user.role === "user") {
        navigate("/seller/starter");
        console.log("user recognised");
      }

      if (user.role === "user100") {
        navigate("/project/starter");
        console.log("user100 recognised");
      }
    }
    else {
      if (mode === "buyer") {
        setMode("seller");
        setModeText("Seller Dashboard");
      }
      else {
        setMode("buyer");
        setModeText("Buyer Dashboard");
      }
    }

    console.log(mode);
    setActive(0);
    navigate("/");
  };

  const handleProfile = () => {
    setActive(0);
    navigate("/profile")
  };

  const handleRefresh = () => {
    setActive(0);
  };

  const handleLogout = () => {
    //console.log("logout");
    Store.dispatch(logoutUser());
  };

  const Menus = mode === "seller" ? [
    {
      name: "Dashboard",
      icon: "home-outline",
      path: `/`,
      dis: "translate-x-4",
    },
    {
      name: `Categories`,
      icon: "shapes-outline",
      path: `/projects`,
      dis: "translate-x-[110px]",
    },
    {
      name: "Requests",
      icon: "create-outline",
      path: `/requests`,
      dis: "translate-x-[208px]",
    },
    {
      name: "My Orders",
      icon: "layers-outline",
      path: "/",
      dis: "translate-x-[305px]",
    },
    {
      name: "Inbox",
      icon: "chatbox-ellipses-outline",
      path: "/inbox",
      dis: "translate-x-[400px]",
    },
    {
      name: "Help",
      icon: "help-circle-outline",
      path: "/help",
      dis: "translate-x-[496px]",
    },
  ] : [
    {
      name: "Dashboard",
      icon: "home-outline",
      path: `/seller/dashboard`,
      dis: "translate-x-4",
    },
    {
      name: `My Projects`,
      icon: "shapes-outline",
      path: `/seller/projects`,
      dis: "translate-x-[110px]",
    },
    {
      name: "Requests",
      icon: "create-outline",
      path: `/requests/all`,
      dis: "translate-x-[208px]",
    },
    {
      name: "My Orders",
      icon: "layers-outline",
      path: "/",
      dis: "translate-x-[305px]",
    },
    {
      name: "Inbox",
      icon: "chatbox-ellipses-outline",
      path: "/inbox",
      dis: "translate-x-[400px]",
    },
    {
      name: "Help",
      icon: "help-circle-outline",
      path: "/help",
      dis: "translate-x-[496px]",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="container">
      <Link to="/" onClick={handleRefresh}>
        <h1>
          <img src={praptiLogo} alt="Prapti" />
        </h1>
      </Link>

      {isAuthenticated && (
        <div className="nav-menu">
          <div className="bg-green-100 max-h-32 px-10 rounded-2xl mt-12">
            <ul className="flex relative items-center">
              <span
                className={`bg-lime-500 duration-500 ${Menus[active].dis} border-[6px] border-white h-16 w-16 absolute 
                            -bottom-7 rounded-full scale-125`}
              >
                <span
                  className="w-4 h-4 bg-transparent absolute top-[14px] -left-[21.1px] rotate-90 rounded-tr-[10px]
                                shadow-myShadow1"
                ></span>

                <span
                  className="w-4 h-4 bg-transparent absolute top-[14px] -right-[21.1px] -rotate-90 rounded-tl-[11px]
                                shadow-myShadow2"
                ></span>
              </span>

              {Menus.map((menu, i) => (
                <li key={i} className="w-24 translate-y-1 text-center">
                  <Link
                    to={menu.path}
                    className="flex flex-col text-center mt-4 mb-5"
                    onClick={() => setActive(i)}
                  >
                    <span
                      className={`text-base text-green-600 font-semibold ${
                        active === i
                          ? "translate-y-[10px] duration-700 opacity-100 "
                          : "opacity-0 translate-y-10"
                      }`}
                    >
                      {menu.name}
                    </span>
                    <span
                      className={`text-3xl font-[800] cursor-pointer mb-4 duration-500 ${
                        i === active && "text-green-100 translate-y-12"
                      }`}
                    >
                      <ion-icon name={menu.icon}></ion-icon>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "Poppins",
                fontWeight: "600",
                border: "2px solid green",
                padding: "12px 20px",
                borderRadius: "10px",
              }}
            >
              Hello {user.username}!
            </Typography>
            <Tooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {(image !== null) ? (
                  <Avatar sx={{ width: 50, height: 50 }}>
                    <img
                      className="profile-pic"
                      src={`${server}/${image}`}
                      alt="Profile Picture"
                    />
                  </Avatar>
                ) : (
                  <Avatar sx={{ width: 50, height: 50 }}>A</Avatar>
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                borderRadius: "15px",
                backgroundColor: "hsl(120, 100%, 97%)",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                  borderRadius: "10px",
                  backgroundColor: "green",
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 24,
                  width: 10,
                  height: 10,
                  bgcolor: "hsl(120, 100%, 97%)",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div className="account-menu">
              <MenuItem onClick={handleProfile}>
                <Avatar />
                My Profile
              </MenuItem>
              <Divider sx={{ maxWidth: "200px", margin: "auto" }} />
              <MenuItem onClick={handleMode}>
                <ListItemIcon>
                  <StorefrontIcon fontSize="small" />
                </ListItemIcon>
                {modeText}
              </MenuItem>
              <Divider sx={{ maxWidth: "200px", margin: "auto" }} />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider sx={{ maxWidth: "200px", margin: "auto" }} />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          </Menu>
        </div>
        // <div>
        //   <span className="mr-5 text-green-600">{user.username}</span>
        //   <button onClick={handleLogout}>Log out</button>
        // </div>
      )}

      {!isAuthenticated && (
        <div className="text-l font-[700] mr-6 cursor-pointer align-center">
          <Link className="login-link" to="/login">
            Login
            {/* <span
                            className="text-3xl font-[800] mr-6 cursor-pointer px-2 align-center"
                        >
                            <ion-icon className="nav-login" name="log-in-outline"></ion-icon>
                        </span> */}
          </Link>
          <Link className="ml-8 signup-btn" to="/signup">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
export default Navbar;