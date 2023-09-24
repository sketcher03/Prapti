import { useState } from 'react';
import '../css/Login_Signup.css'
import { useLogin } from '../hooks/useLogin';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(email, password);

        await login(email, password);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3 className="text-center">Login to your account</h3>

            <label htmlFor='email'>Email</label>
            <input
                type="email"
                name="email"
                autoComplete='email'
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label htmlFor='password'>Password</label>
            <div>
                <input
                    type={ visible ? "text" : "password"}
                    name='password'
                    autoComplete='current-password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                <button disabled={isLoading}>Log In</button>

                {error && <div className='error'>{ error }</div>}
            </div>
            <div className= "mt-4 text-center">
                <h4>Not have any account?</h4>
                <Link to="/signup" className="text-green-600 pl-4">
                    Sign Up
                </Link>
            </div>

            
        </form>
    );
}
 
export default Login;