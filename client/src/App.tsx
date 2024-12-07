import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Moviepage from "./pages/Moviespage";
import Buytickets from "./pages/Buytickets";
import Screens from "./pages/Screens";
import Profile from "./pages/profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <Router>
            <Navbar />
            <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/:city/movies/:movieid" element={<Moviepage />} />
                    <Route path="/:city/movies/:movieid/buytickets" element={<Buytickets />} />
                    <Route path="/:city/movies/:movieid/buytickets/:screenid" element={<Screens />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
