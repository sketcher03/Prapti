import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";
import axios from 'axios';

const Activation = () => {

    const { url } = useParams;
    const [error, setError] = useState(false);

    useEffect(() => {
        if (url) {
            const activationEmail = async () => {

                try {
                    const res = await axios.post(`${server}/activation`, {
                        url
                    });

                    console.log(res.data.message);
                }
                catch (error) {
                    console.log(error.response.data.message);
                    setError(true);
                }
            }

            activationEmail();
        }
    }, [url])

    return ( 
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            {
                error ? (
                    <p>Your Token has Expired</p>
                ) : (
                    <p>Your Account has been created Successfully</p>
                )
            }
        </div>
     );
}
 
export default Activation;