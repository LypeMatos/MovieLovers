//imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';

//pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MovieDetails from "./Pages/MovieDetails";

//provider
//import { AuthContext } from "./context/AuthProvider";

//components
import Header from "./components/Header";
//import { useContext } from "react";

function App() {

  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;