import React, { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import Desktop from './Desktop'; 
import MobileBlocker from './MobileBlocker';
import BootScreen from './BootScreen'; 
// ⬅️ Vercel Analytics Import
import { Analytics } from "@vercel/analytics/react"; 

const MIN_DESKTOP_WIDTH = 768; 

// Retrieve initial state from sessionStorage or use defaults
const initialLoginState = sessionStorage.getItem('isLoggedIn') === 'true';
const initialUserMode = sessionStorage.getItem('userMode');
const initialBootState = sessionStorage.getItem('isBooted') === 'true'; 

function App() {
  // Load initial states from sessionStorage
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
  
  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem('isBooted', 'true'); // Persist boot state
  };
  
  // --- Responsiveness Check ---

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MIN_DESKTOP_WIDTH);
    };

    window.addEventListener('resize', checkScreenSize);
    
    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  // --- Render Logic (All paths include Analytics) ---

  if (isMobile) {
    return (
        <>
            <Analytics /> {/* Analytics loads even if the site is blocked */}
            <MobileBlocker />
        </>
    );
  }
  
  // Show Boot Screen only if it hasn't completed yet
  if (isBooting) {
    return (
        <>
            <Analytics />
            <BootScreen onComplete={handleBootComplete} />
        </>
    );
  }

  // Final rendering path (Login or Desktop)
  return (
    <>
      <Analytics /> 
      
      {!isLoggedIn ? (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess} 
          setMode={setUserMode}
        />
      ) : (
        <Desktop userMode={userMode} />
      )}
    </>
  );
}

export default App;