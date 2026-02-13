.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  padding: 20px;
}

.auth-container {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.auth-container h2 {
  margin-bottom: 30px;
  text-align: center;
  color: #2c3e50;
}

.auth-container form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-container input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.auth-container input:focus {
  outline: none;
  border-color: #2196F3;
}

.auth-container button {
  padding: 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-container button:hover {
  background-color: #1976D2;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
}

.auth-container p {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.auth-container a {
  color: #2196F3;
  text-decoration: none;
}

.auth-container a:hover {
  text-decoration: underline;
}