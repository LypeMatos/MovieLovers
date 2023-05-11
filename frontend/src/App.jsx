//imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import MovieDetails from "./Pages/MovieDetails";

//provider
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";

//components


function App() {
  return (
    <Router>
      <AuthProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieDetails/>}/>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;