import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetails.css';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data);
    } catch (err) {
      setError('لم نتمكن من جلب بيانات العقار');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">جاري التحميل...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!property) return <div className="error-message">العقار غير موجود</div>;

  return (
    <div className="property-details">
      <div className="container">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← العودة
        </button>

        <div className="details-grid">
          {/* الصور */}
          <div className="images-section">
            {property.images && property.images.length > 0 ? (
              <>
                <div className="main-image">
                  <img
                    src={property.images[selectedImage].url}
                    alt="الصورة الرئيسية"
                  />
                </div>
                {property.images.length > 1 && (
                  <div className="thumbnail-images">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`صورة ${index + 1}`}
                        className={selectedImage === index ? 'active' : ''}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="no-image">لا توجد صور</div>
            )}
          </div>

          {/* التفاصيل */}
          <div className="info-section">
            <h1>{property.title}</h1>

            <div className="price-section">
              <h2 className="price">₪ {property.price.toLocaleString()}</h2>
              <p className="payment-method">{property.paymentMethod} - {property.deliveryTime}</p>
            </div>

            {/* المعلومات الأساسية */}
            <div className="property-info-grid">
              <div className="info-item">
                <span className="label">📍 الموقع</span>
                <span className="value">{property.area} - {property.city}</span>
              </div>
              <div className="info-item">
                <span className="label">🏷️ النوع</span>
                <span className="value">{property.type}</span>
              </div>
              <div className="info-item">
                <span className="label">🛏️ الغرف</span>
                <span className="value">{property.rooms}</span>
              </div>
              <div className="info-item">
                <span className="label">🚿 الحمامات</span>
                <span className="value">{property.bathrooms}</span>
              </div>
              <div className="info-item">
                <span className="label">📏 المساحة</span>
                <span className="value">{property.areaSize} م²</span>
              </div>
              <div className="info-item">
                <span className="label">🏗️ التشطيب</span>
                <span className="value">{property.finishing}</span>
              </div>
              <div className="info-item">
                <span className="label">🏢 التصنيف</span>
                <span className="value">{property.classification}</span>
              </div>
              <div className="info-item">
                <span className="label">📍 الدور</span>
                <span className="value">{property.floor}</span>
              </div>
            </div>

            {/* الوصف */}
            {property.description && (
              <div className="description-section">
                <h3>الوصف</h3>
                <p>{property.description}</p>
              </div>
            )}

            {/* رقم القطعة */}
            {property.plotNumber && (
              <div className="plot-section">
                <p><strong>رقم القطعة:</strong> {property.plotNumber}</p>
              </div>
            )}

            {/* الزر CTA */}
            <div className="cta-section">
              <a
                href={property.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-large"
              >
                💬 تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;