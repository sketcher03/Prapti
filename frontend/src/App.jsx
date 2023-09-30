import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from 'react-redux';

//Pages and Components
import Requests from './pages/Requests';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activation from './pages/Activation/Activation'
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Store from './redux/store';
import { saveUser } from './redux/actions/user';
import Dashboard from './pages/Dashboard';

const title = 'React';

function App() {

  useEffect(() => {
    Store.dispatch(saveUser());
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />        
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard/> : <Navigate to="/login" />}
            />
            <Route
              path="/requests"
              element={isAuthenticated ? <Requests/> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login/> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isAuthenticated ? <Signup/> : <Navigate to="/" />}
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
