//import { useEffect, useState } from 'react';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Header from './Header.jsx';
import ApplicationNavbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Home from './pages/Home.jsx'
import About from './pages/About';
import Help from './pages/Help';
import Contact from './pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css'; /* For bootstrap */

function App()
{
    return (
    <Router>
        <div>
                <ApplicationNavbar></ApplicationNavbar>                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="help" element={<Help />} />
                    <Route path="contact" element={<Contact />} />
                </Routes>
                <Footer></Footer>
            
        </div>
    </Router>
    );  
}

export default App;