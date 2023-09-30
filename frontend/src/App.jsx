import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import { server } from '../server';

//Pages and Components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activation from './pages/Activation/Activation'
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import axios from 'axios';

const title = 'React';

function App() {
  //const { user } = useAuthContext();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const url = `${server}/auth/saveuser`;

    axios.get(url, {withCredentials: true})
      .then((res) => {
        console.log(res.data);

        //setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);
  
  //const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />        
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home/> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/" />}
            />
            <Route
              path="/users/:id/verify/:token"
              element={<Activation />}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
