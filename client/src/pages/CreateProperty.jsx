import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateProperty.css';

function CreateProperty({ user }) {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState(['6 أكتوبر', 'الجيزة', 'القاهرة']);
  const [selectedCity, setSelectedCity] = useState('6 أكتوبر');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '6 أكتوبر',
    area: '',
    plotNumber: '',
    type: 'شقة',
    rooms: 1,
    bathrooms: 1,
    floor: '1',
    areaSize: '',
    finishing: 'تشطيب',
    classification: 'سكني',
    price: '',
    paymentMethod: 'كاش',
    deliveryTime: 'فوري',
    whatsappPhone: '',
    ownerName: '',
    ownerPhone: ''
  });

  // جلب المناطق عند تغيير المدينة
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchAreas();
  }, [selectedCity, user, navigate]);

  const fetchAreas = async () => {
    try {
      const response = await axios.get(`/api/areas/city/${selectedCity}`);
      setAreas(response.data);
    } catch (err) {
      console.error('خطأ في جلب المناطق:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setFormData(prev => ({ ...prev, city: e.target.value, area: '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      setError('لا يمكنك رفع أكثر من 10 صور');
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // التحقق من المدخلات
      if (!formData.title || !formData.area || !formData.price) {
        setError('يرجى ملء جميع الحقول المطلوبة');
        setLoading(false);
        return;
      }

      // إنشاء الإعلان
      const token = localStorage.getItem('token');
      const propertyResponse = await axios.post(
        '/api/properties',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const propertyId = propertyResponse.data.property.id;

      // رفع الصور
      if (images.length > 0) {
        const formDataImages = new FormData();
        images.forEach(image => {
          formDataImages.append('images', image);
        });

        await axios.post(
          `/api/properties/${propertyId}/images`,
          formDataImages,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      navigate(`/properties/${propertyId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في رفع الإعلان');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-property">
      <div className="container">
        <h1>📢 رفع إعلان جديد</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="property-form">
          {/* البيانات الأساسية */}
          <fieldset>
            <legend>📝 البيانات الأساسية</legend>

            <div className="form-group">
              <label>عنوان الإعلان *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="مثال: شقة 3 غرف في التوسعات الشمالية"
                required
              />
            </div>

            <div className="form-group">
              <label>الوصف</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="اكتب وصفاً مفصلاً للعقار"
                rows="4"
              />
            </div>
          </fieldset>

          {/* الموقع */}
          <fieldset>
            <legend>📍 الموقع</legend>

            <div className="form-row">
              <div className="form-group">
                <label>المدينة *</label>
                <select
                  name="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  required
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>المنطقة *</label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">اختر المنطقة</option>
                  {areas.map(area => (
                    <option key={area._id} value={area.name}>{area.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>رقم القطعة</label>
                <input
                  type="text"
                  name="plotNumber"
                  value={formData.plotNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          {/* تفاصيل العقار */}
          <fieldset>
            <legend>🏠 تفاصيل العقار</legend>

            <div className="form-row">
              <div className="form-group">
                <label>نوع العقار *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="شقة">شقة</option>
                  <option value="فيلا">فيلا</option>
                  <option value="قصر">قصر</option>
                  <option value="أرض">أرض</option>
                  <option value="دوبلكس">دوبلكس</option>
                  <option value="تاون هاوس">تاون هاوس</option>
                  <option value="بنتهاوس">بنتهاوس</option>
                  <option value="عمارة">عمارة</option>
                </select>
              </div>

              <div className="form-group">
                <label>عدد الغرف (1-13)</label>
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleInputChange}
                  min="1"
                  max="13"
                />
              </div>

              <div className="form-group">
                <label>عدد الحمامات (1-10)</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>الدور</label>
                <select name="floor" value={formData.floor} onChange={handleInputChange}>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                  <option value="أرضي">أرضي</option>
                  <option value="بيزمينت">بيزمينت</option>
                  <option value="روف">روف</option>
                </select>
              </div>

              <div className="form-group">
                <label>المساحة (بالمتر المربع) *</label>
                <input
                  type="number"
                  name="areaSize"
                  value={formData.areaSize}
                  onChange={handleInputChange}
                  placeholder="120"
                  required
                />
              </div>

              <div className="form-group">
                <label>التشطيب</label>
                <select name="finishing" value={formData.finishing} onChange={handleInputChange}>
                  <option value="تشطيب">تشطيب</option>
                  <option value="نصف تشطيب">نصف تشطيب</option>
                  <option value="طوب أحمر">طوب أحمر</option>
                  <option value="خرساني">خرساني</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>التصنيف</label>
                <select name="classification" value={formData.classification} onChange={handleInputChange}>
                  <option value="سكني">سكني</option>
                  <option value="إداري">إداري</option>
                  <option value="صناعي">صناعي</option>
                  <option value="طبي">طبي</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* السعر والدفع */}
          <fieldset>
            <legend>💰 السعر والدفع</legend>

            <div className="form-row">
              <div className="form-group">
                <label>السعر *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="1500000"
                  required
                />
              </div>

              <div className="form-group">
                <label>طريقة الدفع</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                  <option value="كاش">كاش</option>
                  <option value="تسهيلات">تسهيلات</option>
                </select>
              </div>

              <div className="form-group">
                <label>الاستلام</label>
                <select name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange}>
                  <option value="فوري">فوري</option>
                  <option value="أقل من سنة">أقل من سنة</option>
                  <option value="سنة">سنة</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* البيانات الشخصية (مخفية عن المستخدمين) */}
          <fieldset>
            <legend>👤 البيانات الشخصية (مخفية عن المستخدمين)</legend>

            <div className="form-row">
              <div className="form-group">
                <label>اسم المالك *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="أحمد محمد"
                  required
                />
              </div>

              <div className="form-group">
                <label>رقم هاتف المالك *</label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleInputChange}
                  placeholder="201001234567"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>رقم واتساب *</label>
                <input
                  type="tel"
                  name="whatsappPhone"
                  value={formData.whatsappPhone}
                  onChange={handleInputChange}
                  placeholder="201001234567"
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* الصور */}
          <fieldset>
            <legend>🖼️ الصور</legend>

            <div className="form-group">
              <label>رفع الصور (بدون أرقام هواتف في الأسماء)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              <small>يمكنك رفع حتى 10 صور</small>
            </div>

            {images.length > 0 && (
              <div className="images-preview">
                <h4>الصور المختارة ({images.length}):</h4>
                <div className="images-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={URL.createObjectURL(image)} alt={`صورة ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'جاري الرفع...' : 'نشر الإعلان'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProperty;