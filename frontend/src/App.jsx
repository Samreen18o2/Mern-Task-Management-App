import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

const { Header, Content } = Layout;

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    message.success('Login successful!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    message.success('Logged out successfully!');
  };

  if (user) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ color: 'white', margin: 0 }}>Task Manager</h2>
          <div style={{ color: 'white' }}>
            {user.email} |{' '}
            <span style={{ cursor: 'pointer' }} onClick={handleLogout}>
              Logout
            </span>
          </div>
        </Header>
        <Content style={{ padding: '20px' }}>
          <Dashboard />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Content style={{ maxWidth: 400, width: '100%', padding: '20px' }}>
        {currentView === 'login' ? (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('signup')}
          />
        ) : (
          <Signup
            onSignup={handleLogin}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </Content>
    </Layout>
  );
}

export default App;
