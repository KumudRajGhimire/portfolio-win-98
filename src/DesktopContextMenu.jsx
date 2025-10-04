import React, { useState } from 'react'; // ⬅️ Import useState

const DesktopContextMenu = ({ x, y, onClose, onSetWallpaper, WALLPAPERS }) => {
  // ⬅️ NEW: State to manage the visibility of the "Properties" submenu
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Map WALLPAPERS object keys for use in the menu
  const THEMES = Object.keys(WALLPAPERS).map(key => ({
    name: key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' '),
    value: key,
  }));

  const handlePropertiesClick = (e) => {
    e.stopPropagation(); // Prevent the desktop's global handleClick from closing the menu immediately
    setIsSubMenuOpen(prev => !prev); // Toggle the visibility
  };
  
  // Function to handle selection and close everything
  const handleWallpaperSelect = (themeValue, e) => {
    e.stopPropagation(); 
    onSetWallpaper(themeValue); // Calls the function in Desktop.jsx
    onClose(); // Closes the main context menu
  };


  return (
    <div 
      className="window"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 100, 
        width: '200px',
        padding: '0',
      }}
      // Clicking the main menu container still stops propagation to the desktop
      onClick={(e) => e.stopPropagation()} 
    >
        <ul style={{ 
            listStyle: 'none', 
            padding: '2px', 
            margin: '0',
            backgroundColor: 'silver',
        }}>
            <li className="start-menu-item" onClick={onClose}>
                View
            </li>
            <li className="start-menu-item" onClick={onClose}>
                Sort By
            </li>
            <li className="start-menu-item" onClick={onClose}>
                Refresh
            </li>
            
            <hr style={{ borderTop: '1px solid white', borderBottom: '1px solid gray', margin: '4px 0' }} />

            {/* WALLPAPER OPTIONS / PROPERTIES */}
            <li 
                className={`start-menu-item has-submenu ${isSubMenuOpen ? 'active' : ''}`}
                onClick={handlePropertiesClick} // ⬅️ Managed by click now, not hover
            >
                Wallpapers
                
                {/* Submenu for Wallpapers */}
                {/* ⬅️ Controlled by state, visible if isSubMenuOpen is true */}
                {isSubMenuOpen && (
                    <ul className="window wallpaper-submenu" style={{ 
                        position: 'absolute', 
                        left: '190px', 
                        top: '110px', 
                        zIndex: 101, 
                        width: '150px',
                        padding: '0', 
                    }}>
                        <li className="start-menu-item" style={{fontWeight: 'bold'}} onClick={(e) => e.stopPropagation()}>
                            Wallpaper
                        </li>
                        <hr style={{ borderTop: '1px solid white', borderBottom: '1px solid gray', margin: '4px 0' }} />
                        {THEMES.map(theme => (
                            <li 
                                key={theme.name}
                                className="start-menu-item"
                                // ⬅️ Call new handler to select and close
                                onClick={(e) => handleWallpaperSelect(theme.value, e)}
                            >
                                {theme.name}
                            </li>
                        ))}
                    </ul>
                )}
            </li>
            
            <hr style={{ borderTop: '1px solid white', borderBottom: '1px solid gray', margin: '4px 0' }} />

            <li className="start-menu-item" onClick={onClose}>
                New
            </li>
        </ul>
        <style>
        {`
        .start-menu-item {
            display: flex;
            align-items: center;
            padding: 4px 5px;
            cursor: pointer;
            line-height: 20px;
        }
        .start-menu-item:hover,
        .start-menu-item.active { /* 'active' class used for click state */
            background-color: #000080;
            color: white;
        }
        .start-menu-item.has-submenu {
            position: relative;
        }
        /* ⬅️ REMOVED HOVER CSS: Submenu visibility is now managed by React state */
        `}
      </style>
    </div>
  );
};

export default DesktopContextMenu;