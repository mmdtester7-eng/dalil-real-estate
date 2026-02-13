.property-list {
  padding: 30px 0;
  min-height: 600px;
}

.property-list h1 {
  margin-bottom: 30px;
  color: #2c3e50;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.filters input,
.filters select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: #2196F3;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.no-results {
  text-align: center;
  color: #999;
  font-size: 18px;
  padding: 40px;
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }
}