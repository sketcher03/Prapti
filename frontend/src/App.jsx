import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages and Components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

const title = 'React';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />        
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/login"
              element={<Login/>}
            />
            <Route
              path="/signup"
              element={<Signup/>}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
