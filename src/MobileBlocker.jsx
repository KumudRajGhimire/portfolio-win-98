import React from 'react';

const MobileBlocker = () => {
  
  // The alert remains as a way to acknowledge the message, but the primary function
  // is blocking the rest of the UI until the viewport size increases.
  const handleOK = () => {
    alert("Please re-open the site on a desktop or switch to landscape mode to continue.");
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
      zIndex: 1000, // Ensure it's on top of everything
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="window" style={{ width: 380, zIndex: 1001 }}>
        <div className="title-bar">
          {/* ⬅️ Changed Title: Less severe */}
          <div className="title-bar-text">Display Compatibility Warning</div>
          <div className="title-bar-controls">
            {/* No close button to enforce the minimum size requirement */}
          </div>
        </div>
        <div className="window-body" style={{ padding: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* ⬅️ Changed Icon: Now uses a Warning/Exclamation icon */}
            <img 
              src="https://win98icons.alexmeub.com/icons/png/msg_warning-0.png" 
              alt="Warning" 
              style={{ width: '32px', height: '32px', marginRight: '15px', flexShrink: 0 }} 
            />
            
            <p style={{ margin: 0 }}>
              {/* ⬅️ Changed Message: Focuses on UI compatibility */}
              This application is optimized for <b>desktop viewing</b> to preserve the authentic Windows 98 user interface.
            </p>
          </div>
          
          <p style={{ marginTop: '15px' }}>
            To Proceed: Please switch to a <b>Laptop/Desktop</b> or change to <b>desktop mode</b> (minimum width 768px).
          </p>

          <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
            <button onClick={handleOK} style={{ marginRight: '8px', fontWeight: 'bold' }}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBlocker;