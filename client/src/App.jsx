import React, { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProductPage from './components/features/product/ProductPage';
import HeroSection from './components/features/home/HeroSection';
import Login from './components/features/login/Login';
import Register from './components/features/login/Register';
import Logout from './components/features/login/Logout';
import Navbar from './components/features/home/Navbar';
import Footer from './components/features/home/Footer';
import About from './components/features/about/About';
import FeedbackPage from './components/features/feedback/FeedbackPage'

const ScrollToTop = () => {
  const { pathname } = useLocation(); // קבל את הנתיב הנוכחי

  useEffect(() => {
    window.scrollTo(0, 0); // גלול לראש העמוד (top: 0, left: 0)
  }, [pathname]); // הפעל מחדש כל פעם שהנתיב משתנה

  return null; // קומפוננטה זו לא מרנדרת כלום
};

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  return (
    <>
      <Router>
        <Navbar
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
        />



        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/home" element={<HeroSection />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<ProductPage onOpenLogin={handleOpenLogin}/>} />
          <Route path='/feedback' element={<FeedbackPage />}/>
        </Routes>
        <ScrollToTop />




        <Footer />
        

        <Login open={openLogin} handleClose={handleCloseLogin} />
        <Register open={openRegister} handleClose={handleCloseRegister} onOpenLogin={handleOpenLogin} />
      </Router>
    </>
  )
}

export default App
