import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Signing out…</h1>
        <p>You are being redirected to the login page.</p>
      </div>
    </main>
  );
}

export default LogoutPage;
