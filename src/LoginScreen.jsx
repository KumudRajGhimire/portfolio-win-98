import React, { useState } from 'react';
// We are using a mock password for now, Firebase logic will replace this later
const MOCK_PASSWORD = 'supersecretkumudpass';

/**
 * The Windows 98-style Login Screen component.
 * @param {function} onLoginSuccess - Callback to transition to the desktop view.
 * @param {function} setMode - Function to set the user mode ('visitor' or 'admin').
 */
const LoginScreen = ({ onLoginSuccess, setMode }) => {
  const [username, setUsername] = useState('Visitor');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'Visitor') {
      // Visitor Mode: Instant login
      // ⬅️ Pass the mode to handleLoginSuccess
      onLoginSuccess('visitor'); 
    } else if (username === 'Kumud') {
      // Kumud Mode: Check password
      if (password === MOCK_PASSWORD) {
        // ⬅️ Pass the mode to handleLoginSuccess
        onLoginSuccess('admin'); 
      } else {
        setError('The password you typed is incorrect. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    } else {
      setError('Invalid username selected.');
    }
  };

  const isVisitor = username === 'Visitor';

  return (
    <div className="login-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#008080',
    }}>
      <div className="window" style={{ width: 350 }}>
        <div className="title-bar">
          <div className="title-bar-text">Welcome to Windows</div>
        </div>
        <div className="window-body">
          <form onSubmit={handleLogin} style={{ padding: '20px' }}>
            <p style={{ textAlign: 'center', marginBottom: '20px' }}>
              Enter your username and password to log on.
            </p>

            <div className="field-row">
              <label htmlFor="username">User name:</label>
              <select 
                id="username" 
                value={username} 
                onChange={(e) => {
                    setUsername(e.target.value);
                    setPassword(''); // Clear password when switching users
                }}
                style={{ width: '100%' }}
              >
                <option value="Visitor">Visitor</option>
                <option value="Kumud">Kumud</option>
              </select>
            </div>

            <div className="field-row">
              <label htmlFor="password">Password:</label>
              <input 
                id="password" 
                type="password" 
                value={password}
                disabled={isVisitor}
                // ⬅️ FIX: Dynamic placeholder text
                placeholder={isVisitor ? '(not required)' : ''} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            {error && (
              <div className="window error-message" style={{ width: '90%', margin: '10px auto', border: 'none' }}>
                <div className="title-bar">
                  <div className="title-bar-text">Login Error</div>
                  <div className="title-bar-controls">
                    <button aria-label="Close" onClick={() => setError('')}></button>
                  </div>
                </div>
                <div className="window-body" style={{ padding: '10px' }}>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
              <button type="submit" style={{ marginRight: '8px' }}>OK</button>
              <button type="button" onClick={() => console.log('Cancel clicked')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;