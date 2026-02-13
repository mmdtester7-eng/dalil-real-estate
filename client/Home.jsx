import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <h1>🏢 دليل</h1>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/">الرئيسية</Link></li>
          <li><Link to="/properties">العقارات</Link></li>
          
          {user ? (
            <>
              <li><Link to="/create-property">رفع إعلان</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/admin">لوحة التحكم</Link></li>
              )}
              <li><button onClick={handleLogout} className="logout-btn">تسجيل الخروج</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">دخول</Link></li>
              <li><Link to="/register">تسجيل</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;