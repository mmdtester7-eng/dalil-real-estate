import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>عن دليل</h3>
            <p>منصة عقارية موثوقة تربط بين البائعين والمشترين</p>
          </div>
          <div className="footer-section">
            <h3>روابط مهمة</h3>
            <ul>
              <li><a href="/">الرئيسية</a></li>
              <li><a href="/properties">العقارات</a></li>
              <li><a href="/">عن النا</a></li>
              <li><a href="/">التواصل</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>تواصل معنا</h3>
            <p>الهاتف: 01234567890</p>
            <p>البريد: info@dalil.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 دليل - جميع ال��قوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;