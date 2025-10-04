// src/TaskbarClock.jsx
import React, { useState, useEffect } from 'react';

const TaskbarClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update the time every second
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    // Format the time as HH:MM AM/PM
    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div style={{ padding: '0 8px', lineHeight: '24px', fontSize: '11px' }}>
            {formattedTime}
        </div>
    );
};

export default TaskbarClock;