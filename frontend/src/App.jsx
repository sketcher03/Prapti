import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

//Pages and Components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activation from './pages/Activation'
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

const title = 'React';

function App() {
  const { user } = useAuthContext();

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
              path="/activation/:url"
              element={!user ? <Activation/> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
