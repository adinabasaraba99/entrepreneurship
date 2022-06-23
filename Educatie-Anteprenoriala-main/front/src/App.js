import { BrowserRouter as Router, 
                          Routes, 
                          Route, } from 'react-router-dom';
import './App.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/landing/Home"
import Course from './components/courses/Course';
import Profil from './components/profil/Profil';
import Recomantation from './components/recomandation/Recomantation';
import Favorites from './components/favorites/Favorites';
import Search from './components/search/Search';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/courses' element={<Course/>} />
          <Route path='/profil' element={<Profil/>} />
          <Route path='/indicatii' element={<Recomantation/>} />
          <Route path='/favorites' element={<Favorites/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
