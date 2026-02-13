.home {
  width: 100%;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.tagline {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.9;
}

.user-type-selection p {
  font-size: 24px;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.buttons .btn {
  padding: 20px 30px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.buttons small {
  font-size: 12px;
  opacity: 0.8;
}

.features {
  padding: 60px 20px;
  background-color: #f5f5f5;
}

.features h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.feature h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.feature p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }

  .tagline {
    font-size: 16px;
  }

  .buttons {
    flex-direction: column;
  }

  .buttons .btn {
    width: 100%;
  }
}