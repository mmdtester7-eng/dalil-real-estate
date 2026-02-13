import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import './PropertyList.css';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    area: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(`/api/properties?${params}`);
      setProperties(response.data);
    } catch (err) {
      console.error('خطأ في جلب الإعلانات:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="property-list">
      <div className="container">
        <h1>قائمة العقارات</h1>

        <div className="filters">
          <input
            type="text"
            name="city"
            placeholder="المدينة"
            value={filters.city}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="area"
            placeholder="المنطقة"
            value={filters.area}
            onChange={handleFilterChange}
          />
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">نوع العقار</option>
            <option value="شقة">شقة</option>
            <option value="فيلا">فيلا</option>
            <option value="أرض">أرض</option>
            <option value="قصر">قصر</option>
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="السعر الأدنى"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="السعر الأقصى"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>

        <div className="properties-grid">
          {properties.length > 0 ? (
            properties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p className="no-results">لا توجد عقارات تطابق بحثك</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyList;