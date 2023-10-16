import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from 'react-redux';

//Pages and Components
import Requests from './pages/Request/Requests';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import RequestUpdateForm from './pages/Request/RequestUpdateForm'
import Activation from './pages/Activation/Activation'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Store from './redux/store';
import { saveUser } from './redux/actions/user';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import SellerStarter from './pages/Seller/SellerStarter';
import ProjectStarter from './pages/Project/ProjectStarter';
import MyProfile from './pages/Profile/MyProfile';
import EditProfile from './pages/Profile/EditProfile';
import SellerDashboard from './pages/Seller/SellerDashboard';
import AllRequests from './pages/Request/AllRequests';
import Projects from './pages/Project/Projects';

const title = 'React';

function App() {

  const { isAuthenticated, isSeller, user } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(saveUser());
    //console.log(user)
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
              path="/admin/signup"
              element={<AdminSignup />}
            />
            <Route
              path="/admin/login"
              element={<AdminLogin />}
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
              path="/requests/all"
              element={isAuthenticated ? <AllRequests /> : <Navigate to="/" />}
            />
            <Route
              path="/requests/update/:id"
              element={
                isAuthenticated ? <RequestUpdateForm /> : <Navigate to="/" />
              }
            />
            <Route
              path='/profile'
              element={<MyProfile />}
            />
            <Route
              path='/profile/edit'
              element={<EditProfile />}
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
                isSeller ? (
                  <SellerDashboard />
                ) : (
                  <Navigate to="/project/starter" />
                )
              }
            />
            <Route
              path="/seller/projects"
              element={
                isSeller ? (
                  <Projects />
                ) : (
                  <Navigate to="//" />
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
