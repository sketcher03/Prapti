import { useState } from 'react';
import '../css/Login_Signup.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { server } from '../../server';
import axios from 'axios';

const AdminLogin = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(email, password);

        try {
            //empty fields errors
            if (data.email === "" || data.password === "") {
                setError("One or Few fields are Empty");
                throw Error();
            }

            const url = `${server}/auth/admin/login`;

            console.log(data)
            
            axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then((res) => {
                    console.log("Login Successful")
                    //console.log(JSON.stringify(res.data));
                     console.log(res.data.admin)
                    /*
                    setData({ 
                        email: "",
                        password: "",
                    });
                    */
                    
                    //window.location = "/Admin_Dashboard";
                })
                .catch((err) => {
                    setError(err.response.data.message);
                });;
        }
        catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500)
            {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <form className="AdminLogin" onSubmit={handleSubmit}>
            <h3 className="text-center">Login to your account</h3>

            <label htmlFor='email'>Email</label>
            <input
                type="email"
                name="email"
                autoComplete='email'
                required
                onChange={handleChange}
                value={data.email}
            />

            <label htmlFor='password'>Password</label>
            <div>
                <input
                    type={ visible ? "text" : "password"}
                    name='password'
                    autoComplete='current-password'
                    required
                    onChange={handleChange}
                    value={data.password}
                />
                {
                    visible ? (
                        <AiOutlineEye
                            className='relative -right-[420px] -top-[51px] cursor-pointer'
                            size={20}
                            onClick={() => setVisible(false)}
                        />
                    ) : (
                        <AiOutlineEyeInvisible
                            className='relative -right-[420px] -top-[51px] cursor-pointer'
                            size={20}
                            onClick={() => setVisible(true)}
                        />
                    )
                }
                
            </div>

            <div className= "flex items-center justify-between">
                <div className= "flex items-center">
                    <input
                        type="checkbox"
                        name="remember-me"
                        id="remember-me"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-4 pb-2 block text-sm text-gray-900"
                    >
                        Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <a
                        href=".forgot-password"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Forgot your password?
                    </a>
                </div>
            </div>
            <div className='mt-1 text-center'>
                <button disabled={false}>Log In</button>

                {error && <div className='error'>{ error }</div>}
            </div>
            <div className= "mt-4 text-center">
                <h4>Not have any account?</h4>
                <Link to="/admin/signup" className="text-green-600 pl-4">
                    Sign Up
                </Link>
            </div>

            
        </form>
    );
}
 
export default AdminLogin;