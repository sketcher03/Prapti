import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Popper } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages and Components
import Requests from './pages/Request/Requests';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminSignup from './pages/Admin/AdminSignup';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashBoard from './pages/Admin/AdminDashBoard';
import RequestUpdateForm from './pages/Request/RequestUpdateForm'
import Activation from './pages/Activation/Activation'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Store from './redux/store';
import { saveUser, setMode } from './redux/actions/user';
import { saveAdmin } from './redux/actions/admin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import SellerStarter from './pages/Seller/SellerStarter';
import ProjectStarter from './pages/Project/ProjectStarter';
import MyProfile from './pages/Profile/MyProfile';
import EditProfile from './pages/Profile/EditProfile';
import SellerDashboard from './pages/Seller/SellerDashboard';
import AllRequests from './pages/Request/AllRequests';
import Projects from './pages/Project/Projects';
import AllProjects from './pages/Project/AllProjects';
import SingleProject from './pages/Project/SingleProject';
import Inbox from './pages/Chat/Inbox';
import HelpPage from './pages/Help/HelpPage';
import Guide from './pages/Help/Guide';
import FAQs from './pages/Help/FAQs';
import Complaint from './pages/Help/complaint';
import Feedback from './pages/Help/Feedback';
import CreateComplaint from './pages/Help/CreateComplaint';
import BuyerOrders from './pages/Order/BuyerOrders';
import SellerOrders from './pages/Order/SellerOrders';

const title = 'React';

function App() {

  const { isAuthenticated, isSeller, user, mode } = useSelector((state) => state.user);
  const { isAdminAuthenticated, admin } = useSelector((state) => state.admin);

  useEffect(() => {
    Store.dispatch(saveUser());
    Store.dispatch(saveAdmin());

    if (isAuthenticated) {
      toast.success("User Authenticated")
    }

    if (isAdminAuthenticated) {
      toast.success("Admin Authenticated")
    }

    Store.dispatch(setMode(user.role))
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
              element={!isAdminAuthenticated ? <AdminSignup /> : <Navigate to="/admin/dashboard" />}
            />
            <Route
              path="/admin/login"
              element={!isAdminAuthenticated ? <AdminLogin /> : <Navigate to="/admin/dashboard" />}
            />
            <Route path="/users/:id/verify/:token" element={<Activation />} />
            <Route
              path="/"
              element={(!isAuthenticated && !isAdminAuthenticated) ? <Home /> : (isAuthenticated ? <Dashboard /> : <Navigate to="/admin/dashboard" />)}
            />
            <Route
              path="/inbox"
              element={<Inbox />}
            />
            <Route
              path="/requests"
              element={isAuthenticated ? <Requests /> : <Navigate to="/" />}
            />
            <Route
              path="/requests/all"
              element={(isAuthenticated || isAdminAuthenticated) ? <AllRequests /> : <Navigate to="/" />}
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
              path='/admin/dashboard'
              element={< AdminDashBoard />}
            />

            <Route
              path="/seller/starter"
              element={<SellerStarter />}
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
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/projects"
              element={
                (mode === "buyer" || isAdminAuthenticated) ? (
                  <AllProjects />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/project/:id"
              element={<SingleProject />}
            />
            <Route
              path="/project/starter"
              element={
                (mode === "seller" && isSeller) ? (
                  <ProjectStarter />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/help"
              element={<HelpPage />}
            />
            <Route
              path='/complaint'
              element={<Complaint />}
            />
            <Route
              path='/feedback'
              element={<Feedback />}
            />
            <Route
              path='/faq'
              element={<FAQs />}
            />
            <Route
              path='/guide'
              element={<Guide />}
            />
            <Route
              path='/complaint/create'
              element={<CreateComplaint />}
            />
            <Route
              path="/orders/buyer"
              element={<BuyerOrders/>}
            />
            <Route
              path="/orders/seller"
              element={<SellerOrders/>}
            />
          </Routes>
        </div>
        <Footer />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
