import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import '../../css/Activation.css';
import success from "../../images/success.png";

const Activation = () => {

    const [validURL, setValidURL] = useState(true);
    const [message, setMessage] = useState("");
    const param = useParams();

    useEffect(() => {
        const activationEmail = async () => {

            try {
                const url = `http://localhost:4000/api/user/${param.id}/verify/${param.token}`
            
                axios.get(url)
                    .then((response) => {
                        console.log(response.data);
                        setMessage(response.data.message);
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                        setMessage(err.response.data.message);
                    });
            }
            catch(err) {
                setValidURL(false);
            }
            
        };

        activationEmail();

    }, [])

    return ( 
        <div>
            {validURL ? (
                <div className="ver-container">
                    <img src={success} alt="success-image" className="success_img" />
                    <h1 className="ver-message">{message}</h1>
					<Link to="/login">
						<button className="green_btn">Login</button>
					</Link>
                </div>
            ) : (
                <div className="ver-container">
                    <h1>404 Not Found</h1>
                </div>
            )}
        </div>
     );
}
 
export default Activation;