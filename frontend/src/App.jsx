import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from 'react-redux';

//Pages and Components
import Requests from './pages/Requests';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminSignup from './pages/AdminSignup';
import RequestUpdateForm from './pages/RequestUpdateForm'
import Activation from './pages/Activation/Activation'
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Store from './redux/store';
import { saveUser } from './redux/actions/user';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import SellerStarter from './pages/Seller/SellerStarter';
import ProjectStarter from './pages/Project/ProjectStarter';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';

const title = 'React';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(saveUser());
    console.log(user)
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/AdminSignup"
              element={!isAuthenticated ? <AdminSignup /> : <Navigate to="/" />}
            />
            <Route path="/users/:id/verify/:token" element={<Activation />} />
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Home />}
            />
            <Route
              path="/requests"
              element={isAuthenticated ? <Requests /> : <Navigate to="/" />}
            />
            <Route
              path="/requests/update/:id"
              element={
                isAuthenticated ? <RequestUpdateForm /> : <Navigate to="/" />
              }
            />
            <Route
              path='/profile'
              element={<MyProfile/>}
            />
            <Route
              path='/profile/edit'
              element={<EditProfile/>}
            />
            <Route
              path="/seller/starter"
              element={
                user.role === "user" ? (
                  <SellerStarter />
                ) : (
                  <Navigate to="/project/starter" />
                )
              }
            />
            <Route
              path="/seller/dashboard"
              element={
                user.role === "seller" ? (
                  <SellerDashboard />
                ) : (
                  <Navigate to="/project/starter" />
                )
              }
            />
            <Route
              path="/project/starter"
              element={
                user.role === "user100" ? (
                  <ProjectStarter />
                ) : (
                  <Navigate to="/seller/starter" />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
