import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleBuyer = () => {
    setUserType('buyer');
  };

  const handleSeller = () => {
    setUserType('seller');
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>🏢 منصة دليل للعقارات</h1>
          <p className="tagline">وضوح الصورة… أمانة المشورة</p>

          {!userType ? (
            <div className="user-type-selection">
              <p>من أنت؟</p>
              <div className="buttons">
                <button className="btn btn-primary" onClick={handleBuyer}>
                  🔍 أنا مشتري
                  <small>وفر وقتك… وخلي دليل يوصلك لأفضل اختيار</small>
                </button>
                <button className="btn btn-secondary" onClick={handleSeller}>
                  📢 أنا بائع
                  <small>اسبق السوق بخطوة… واعرض وحدتك مع دليل</small>
                </button>
              </div>
            </div>
          ) : userType === 'buyer' ? (
            <div className="buyer-landing">
              <h2>ابحث عن العقار المناسب</h2>
              <button className="btn btn-primary" onClick={() => navigate('/properties')}>
                🔍 ابدأ البحث الآن
              </button>
            </div>
          ) : (
            <div className="seller-landing">
              <h2>اعرض عقارك الآن</h2>
              <button className="btn btn-secondary" onClick={() => navigate('/create-property')}>
                📢 رفع إعلان جديد
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="features">
        <div className="container">
          <h2>لماذا دليل؟</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>⚡ سريعة جداً</h3>
              <p>البحث والفلترة بسرعة البرق</p>
            </div>
            <div className="feature">
              <h3>🔒 آمنة</h3>
              <p>بيانات محمية والتواصل آمن</p>
            </div>
            <div className="feature">
              <h3>📱 سهلة الاستخدام</h3>
              <p>واجهة بسيطة وسهلة على الجميع</p>
            </div>
            <div className="feature">
              <h3>🏆 موثوقة</h3>
              <p>موثوقة من آلاف المستخدمين</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;