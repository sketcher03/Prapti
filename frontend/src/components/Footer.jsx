import '../css/Navbar_Footer.css';
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Footer = () => {

    const navigate = useNavigate();

    const handleAdmin = () => {
      navigate("/admin/login");
    }

    //const { isAuthenticated } = useSelector((state) => state.user);

    return (
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <div className="footer-logo-container">
            <img src={Logo} alt="" />
          </div>
          <div className="footer-icons">
            <BsTwitter />
            <SiLinkedin />
            <BsYoutube />
            <FaFacebookF />
          </div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Sell on Prapti</span>
            <span>Buying on Prapti</span>
            <span>Guides</span>
            <span>Forum</span>
          </div>
          <div className="footer-section-columns">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
            <span>Intellectual Property Claims</span>
            <span>Careers</span>
            <span>News</span>
          </div>

          <Tooltip title="Admin Panel" placement='top'>
            <button className="roundbtn" onClick={handleAdmin}>
              <AdminPanelSettingsIcon />
            </button>
          </Tooltip>
        </div>
      </div>
    );
}
 
export default Footer;