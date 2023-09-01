import { useEffect, useState } from 'react';
import '../css/Login_Signup.css'

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, username, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Username</label>
            <input
                type="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button>Sign Up</button>
        </form>
    );
}
 
export default Signup;