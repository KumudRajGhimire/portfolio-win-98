import React, { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import Desktop from './Desktop'; 
import MobileBlocker from './MobileBlocker';
import BootScreen from './BootScreen'; 

const MIN_DESKTOP_WIDTH = 768; 

// Retrieve initial state from sessionStorage or use defaults
const initialLoginState = sessionStorage.getItem('isLoggedIn') === 'true';
const initialUserMode = sessionStorage.getItem('userMode');
const initialBootState = sessionStorage.getItem('isBooted') === 'true'; // Check if boot already happened

function App() {
  // ⬅️ Load initial states from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginState);
  const [userMode, setUserMode] = useState(initialUserMode); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < MIN_DESKTOP_WIDTH);
  const [isBooting, setIsBooting] = useState(!initialBootState); // Skip boot if already set

  // --- Session Storage Handlers ---

  const handleLoginSuccess = (mode) => {
    setIsLoggedIn(true);
    setUserMode(mode);
    sessionStorage.setItem('isLoggedIn', 'true'); // Persist login state
    sessionStorage.setItem('userMode', mode);     // Persist user mode
  };
  
  // NOTE: LogOff logic remains a simple reload, which clears sessionStorage in Desktop.jsx's handleLogOff

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem('isBooted', 'true'); // Persist boot state
  };
  
  // --- Responsiveness Check (Unchanged) ---

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MIN_DESKTOP_WIDTH);
    };

    window.addEventListener('resize', checkScreenSize);
    
    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  // --- Render Logic ---

  if (isMobile) {
    return <MobileBlocker />;
  }
  
  // Show Boot Screen only if it hasn't completed yet
  if (isBooting) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  // If not logged in, show the login screen
  if (!isLoggedIn) {
    return (
      <LoginScreen 
        onLoginSuccess={handleLoginSuccess} 
        setMode={setUserMode}
      />
    );
  }

  // If logged in, show the desktop
  return (
    <Desktop userMode={userMode} />
  );
}

export default App;