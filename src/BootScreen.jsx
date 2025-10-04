import React, { useState, useEffect } from 'react';

const BootScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate a 3-second boot process
        const totalDuration = 3000;
        const intervalTime = 50; 
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep += 1;
            setProgress((currentStep / steps) * 100);

            if (currentStep >= steps) {
                clearInterval(timer);
                onComplete(); // Transition to LoginScreen
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#000000', // Black screen
            color: '#FFFFFF', // White text
            fontFamily: 'monospace',
            fontSize: '14px',
            textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
        }}>
            {/* Windows 98 Boot Logo / Text */}
            <h1 style={{ marginBottom: '20px', fontSize: '2em', fontWeight: 'normal' }}>
                W I N D O W S &nbsp; P O R T F O L I O
            </h1>

            <p>Scanning disk C: ... OK</p>
            <p>Starting operating system kernel...</p>

            <div style={{ width: '300px', height: '20px', border: '2px solid #FFFFFF', marginTop: '20px', padding: '1px' }}>
                {/* Progress Bar */}
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    transition: 'width 0.1s linear',
                }} />
            </div>
            <p style={{ marginTop: '10px' }}>Loading KumudOS... ({Math.floor(progress)}%)</p>
        </div>
    );
};

export default BootScreen;