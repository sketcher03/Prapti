import { useState } from 'react';
import '../css/Login_Signup.css'
//import { useSignup } from '../hooks/useSignup';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from '../../server';
//const navigate = useNavigate();

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    //const { signup, isLoading, error } = useSignup();

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, username, password, profilePic);

        //await signup(email, username, password);

        const newForm = new FormData();

        newForm.append("file", profilePic);
        newForm.append("email", email);
        newForm.append("username", username);
        newForm.append("password", password);
        
        axios.post(`${server}/user/signup`, newForm, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then((res) => {
                console.log(res);

                setEmail("");
                setUsername("");
                setPassword("");
                setProfilePic();

                alert(res.message);

                // if (res.data.success === true) {
                //     navigate("/");
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3 className="text-center">Register as a New user</h3>

            <label>Email</label>
            <input
                type="email"
                name="email"
                autoComplete='email'
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Username</label>
            <input
                type="username"
                name="username"
                autoComplete='username'
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password</label>
            <div>
                <input
                    type={ visible ? "text" : "password"}
                    name='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                {
                    visible ? (
                        <AiOutlineEye
                            className='relative -right-[415px] -top-[51px] cursor-pointer  hover:text-green-700'
                            size={20}
                            onClick={() => setVisible(false)}
                        />
                    ) : (
                        <AiOutlineEyeInvisible
                            className='relative -right-[415px] -top-[51px] cursor-pointer  hover:text-green-700'
                            size={20}
                            onClick={() => setVisible(true)}
                        />
                    )
                }
                
            </div>

            <div className= "flex items-center border-2 p-8 rounded-xl justify-between w-full">

                <label
                    htmlFor="profile-pic"
                    className="font-semibold text-gray-900 border-r-2 pr-6 py-6"
                >Profile Photo</label>

                <div className='flex items-center'>
                    <span className='h-20 w-20 rounded-full overflow-hidden'>
                        {
                            profilePic ? (
                                <img src={URL.createObjectURL(profilePic)} alt="Profile Picture"
                                className='h-full w-full object-cover rounded-full pt-0'
                                />
                            ) : (
                                <RxAvatar className="h-16 w-16 pt-0 text-gray-600 mt-2" />
                            )
                                
                        }
                    </span>
                    <label htmlFor="file-input" className="ml-6 flex items-center justify-center px-4 py-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:border-green-500  hover:bg-green-100">
                        
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

            <div className='mt-6 text-center'>

                <button disabled={false}>Sign Up</button>

                {/* {error && <div className='error'>{error}</div>} */}
                
            </div>

            <div className="mt-4 text-center">
                
                <h4>Already have an account?</h4>

                <Link to="/login" className="text-green-600 pl-4">
                    Login
                </Link>
            </div>
        </form>
    );
}
 
export default Signup;