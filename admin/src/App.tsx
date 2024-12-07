import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import CreateMoviePage from "./pages/createmovie";
import CreateScreenPage from "./pages/createScreen";
import AddCelebrities from "./pages/addcelebrity";
import Schedule from "./pages/schedule";
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
                    <Route path="pages/auth/login" element={<Login />} />
                    <Route path="pages/auth/signup" element={<Signup />} />
                    <Route path="/pages/movie/createmovie" element={<CreateMoviePage />} />
                    <Route path="/pages/screen" element={<CreateScreenPage />} />
                    <Route path="/pages/schedule" element={<Schedule />} />
                    <Route path="/pages/movie/addceleb" element={<AddCelebrities />} />
                </Routes>
            </Router>
        </div>
  )
}

export default App
