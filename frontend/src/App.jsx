//imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App