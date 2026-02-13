import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newArea, setNewArea] = useState({ name: '', city: '', description: '', totalPlots: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'properties') {
        const response = await axios.get('/api/admin/properties', { headers });
        setProperties(response.data);
      } else if (activeTab === 'statistics') {
        const response = await axios.get('/api/admin/statistics', { headers });
        setStatistics(response.data);
      } else if (activeTab === 'areas') {
        const response = await axios.get('/api/areas', { headers });
        setAreas(response.data);
      }
    } catch (err) {
      console.error('خطأ:', err);
    } finally {
      setLoading(false);
    }
  };

  const approveProperty = async (id) => {
    try {
      await axios.put(`/api/admin/properties/${id}/approve`, {}, { headers });
      loadData();
    } catch (err) {
      console.error('خطأ:', err);
    }
  };

  const rejectProperty = async (id) => {
    try {
      await axios.put(`/api/admin/properties/${id}/reject`, {}, { headers });
      loadData();
    } catch (err) {
      console.error('خطأ:', err);
    }
  };

  const addArea = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/areas', newArea, { headers });
      setNewArea({ name: '', city: '', description: '', totalPlots: '' });
      loadData();
    } catch (err) {
      console.error('خطأ:', err);
    }
  };

  const deleteArea = async (id) => {
    if (window.confirm('هل تريد حذف هذه المنطقة؟')) {
      try {
        await axios.delete(`/api/areas/${id}`, { headers });
        loadData();
      } catch (err) {
        console.error('خطأ:', err);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>📊 لوحة تحكم الأدمن</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            الإعلانات
          </button>
          <button
            className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            الإحصائيات
          </button>
          <button
            className={`tab ${activeTab === 'areas' ? 'active' : ''}`}
            onClick={() => setActiveTab('areas')}
          >
            المناطق
          </button>
        </div>

        {loading ? (
          <div className="loading">جاري التحميل...</div>
        ) : (
          <>
            {/* الإعلانات */}
            {activeTab === 'properties' && (
              <div className="tab-content">
                <h2>إدارة الإعلانات</h2>
                <table className="properties-table">
                  <thead>
                    <tr>
                      <th>العنوان</th>
                      <th>المنطقة</th>
                      <th>السعر</th>
                      <th>الحالة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(prop => (
                      <tr key={prop._id}>
                        <td>{prop.title}</td>
                        <td>{prop.area}</td>
                        <td>₪ {prop.price.toLocaleString()}</td>
                        <td>
                          <span className={`status ${prop.status}`}>
                            {prop.status === 'published' ? 'منشور' :
                             prop.status === 'pending' ? 'قيد المراجعة' : 'مؤرشف'}
                          </span>
                        </td>
                        <td>
                          {prop.status === 'pending' && (
                            <>
                              <button
                                className="btn-small btn-approve"
                                onClick={() => approveProperty(prop._id)}
                              >
                                ✓ موافقة
                              </button>
                              <button
                                className="btn-small btn-reject"
                                onClick={() => rejectProperty(prop._id)}
                              >
                                ✕ رفض
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* الإحصائيات */}
            {activeTab === 'statistics' && statistics && (
              <div className="tab-content">
                <h2>الإحصائيات</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>إجمالي الإعلانات</h3>
                    <p className="stat-number">{statistics.totalProperties}</p>
                  </div>
                  <div className="stat-card">
                    <h3>الإعلانات المنشورة</h3>
                    <p className="stat-number">{statistics.publishedProperties}</p>
                  </div>
                  <div className="stat-card">
                    <h3>إجمالي المستخدمين</h3>
                    <p className="stat-number">{statistics.totalUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>متوسط الأسعار</h3>
                    <p className="stat-number">
                      ₪ {Math.round(statistics.averagePrice).toLocaleString()}
                    </p>
                  </div>
                </div>

                <h3>أكثر المناطق طلباً</h3>
                <ul className="stats-list">
                  {statistics.topAreas.map((area, index) => (
                    <li key={index}>{area._id}: {area.count} إعلان</li>
                  ))}
                </ul>

                <h3>أكثر أنواع العقارات</h3>
                <ul className="stats-list">
                  {statistics.topTypes.map((type, index) => (
                    <li key={index}>{type._id}: {type.count} إعلان</li>
                  ))}
                </ul>
              </div>
            )}

            {/* المناطق */}
            {activeTab === 'areas' && (
              <div className="tab-content">
                <h2>إدارة المناطق</h2>

                <div className="add-area-form">
                  <h3>إضافة منطقة جديدة</h3>
                  <form onSubmit={addArea}>
                    <input
                      type="text"
                      placeholder="اسم المنطقة"
                      value={newArea.name}
                      onChange={(e) => setNewArea({ ...newArea, name: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="المدينة"
                      value={newArea.city}
                      onChange={(e) => setNewArea({ ...newArea, city: e.target.value })}
                      required
                    />
                    <textarea
                      placeholder="الوصف"
                      value={newArea.description}
                      onChange={(e) => setNewArea({ ...newArea, description: e.target.value })}
                      rows="3"
                    />
                    <input
                      type="number"
                      placeholder="عدد القطع"
                      value={newArea.totalPlots}
                      onChange={(e) => setNewArea({ ...newArea, totalPlots: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">إضافة</button>
                  </form>
                </div>

                <h3>المناطق الحالية</h3>
                <table className="areas-table">
                  <thead>
                    <tr>
                      <th>اسم المنطقة</th>
                      <th>المدينة</th>
                      <th>عدد القطع</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areas.map(area => (
                      <tr key={area._id}>
                        <td>{area.name}</td>
                        <td>{area.city}</td>
                        <td>{area.totalPlots}</td>
                        <td>
                          <button
                            className="btn-small btn-delete"
                            onClick={() => deleteArea(area._id)}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;