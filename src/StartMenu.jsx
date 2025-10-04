import React, { useState } from 'react'; // ⬅️ Re-introduced useState

// ⬅️ Import local icon files from the assets folder
import ProjectsIcon from './assets/file.png';
import AboutIcon from './assets/about.png';
import ContactIcon from './assets/mail.png';
import LogOffIcon from './assets/shut_down.png';
import programIcon from './assets/program.png';
import paintIcon from './assets/paint.png'; 

/**
 * The Windows 98 Start Menu flyout.
 * @param {function} onMenuItemClick - Function called when a menu item is selected (e.g., to open a window).
 * @param {function} onLogOff - Function to handle logging the user out.
 */
const StartMenu = ({ onMenuItemClick, onLogOff }) => {
    // ⬅️ NEW: State to control the visibility of the Programs submenu
    const [isProgramsSubmenuOpen, setIsProgramsSubmenuOpen] = useState(false);

    // Handler for clicking the Programs list item
    const handleProgramsClick = (e) => {
        e.stopPropagation(); // Prevent the main Start Menu from closing itself
        setIsProgramsSubmenuOpen(prev => !prev); // Toggle the submenu open/closed
    };

    // Handler for clicking a game link (Minesweeper/Paint)
    const handleGameClick = (windowName, e) => {
        e.stopPropagation(); 
        onMenuItemClick(windowName); // Opens the window (handled by Desktop.jsx)
        // Note: The main Start Menu will close itself because onMenuItemClick
        // typically triggers the same action as clicking the Start button again.
    };

  return (
    <div className="window" style={{
      position: 'absolute',
      bottom: '30px', 
      left: '0',
      width: '250px',
      zIndex: 99, 
      padding: '0',
      display: 'flex',
      flexDirection: 'row',
      boxShadow: '4px 4px black',
    }}>
      {/* Blue Sidebar (Classic 98 Look) */}
      <div style={{
        width: '30px',
        backgroundColor: '#7f7f7f', 
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '10px',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        textShadow: '1px 1px #000',
        lineHeight: '30px'
      }}>
        Kumud's Portfolio
      </div>

      {/* Menu Items */}
      <ul style={{ 
        listStyle: 'none', 
        padding: '2px', 
        margin: '0',
        width: '100%', 
        backgroundColor: 'silver',
      }}>
        
        {/* ⬅️ PROGRAMS SUBMENU ITEM - CLICK CONTROLLED */}
        <li 
            className={`start-menu-item has-submenu ${isProgramsSubmenuOpen ? 'active' : ''}`} // Add 'active' class when open
            onClick={handleProgramsClick} // ⬅️ Open/Close on click
        > 
            <img src={programIcon} alt="Programs" style={{ width: 20, marginRight: 5 }} /> 
            Programs
            
            {/* ⬅️ Submenu List - Conditionally rendered based on state */}
            {isProgramsSubmenuOpen && (
                <ul className="window programs-submenu" style={{ 
                    position: 'absolute', 
                    left: '240px', 
                    top: '0', 
                    zIndex: 101, 
                    width: '200px',
                    padding: '0', 
                }}>
                    <li className="start-menu-item" style={{fontWeight: 'bold'}} onClick={(e) => e.stopPropagation()}>
                        Accessories
                    </li>
                    <hr style={{ borderTop: '1px solid white', borderBottom: '1px solid gray', margin: '4px 0' }} />
                    
                    {/* Minesweeper Link */}
                    <li 
                        className="start-menu-item"
                        onClick={(e) => handleGameClick('minesweeper', e)}
                    >
                        <img src="https://win98icons.alexmeub.com/icons/png/minesweeper-0.png" alt="Minesweeper" style={{ width: 20, marginRight: 5 }} />
                        Minesweeper
                    </li>
                    {/* Paint Link */}
                    <li 
                        className="start-menu-item"
                        onClick={(e) => handleGameClick('paint', e)}
                    >
                        <img src={paintIcon} alt="Paint" style={{ width: 20, marginRight: 5 }} />
                        Paint
                    </li>
                </ul>
            )}
        </li>
        
        {/* Other Top-Level Items (Unchanged) */}
        <li className="start-menu-item" onClick={() => onMenuItemClick('projects')}>
            <img src={ProjectsIcon} alt="Projects" style={{ width: 20, marginRight: 5 }} /> 
            My Projects
        </li>
        <li className="start-menu-item" onClick={() => onMenuItemClick('about')}>
            <img src={AboutIcon} alt="About" style={{ width: 20, marginRight: 5 }} />
            About Me
        </li>
        <li className="start-menu-item" onClick={() => onMenuItemClick('contact')}>
            <img src={ContactIcon} alt="Contact" style={{ width: 20, marginRight: 5 }} />
            Contact
        </li>
        
        {/* Separator */}
        <hr style={{ borderTop: '1px solid white', borderBottom: '1px solid gray', margin: '4px 0' }} />

        {/* Log Off: Use local import */}
        <li className="start-menu-item" onClick={onLogOff}>
            <img src={LogOffIcon} alt="Log Off" style={{ width: 20, marginRight: 5 }} />
            Log Off...
        </li>
      </ul>

      {/* ⬅️ UPDATED CSS: Use the 'active' class for styling when open */}
      <style>
        {`
        .start-menu-item {
            display: flex;
            align-items: center;
            padding: 4px 5px;
            cursor: pointer;
            line-height: 20px;
            position: relative; 
        }
        /* Standard hover color */
        .start-menu-item:hover {
            background-color: #000080; 
            color: white;
        }
        /* Keep item highlighted blue when the submenu is open (like a click-lock) */
        .start-menu-item.active {
            background-color: #000080; 
            color: white;
            /* Invert the active item's icon */
        }
        .start-menu-item.active img {
            filter: invert(100%);
        }
        
        .start-menu-item img {
            filter: invert(0); 
        }
        .start-menu-item:hover img {
            filter: invert(100%); 
        }
        
        /* Submenu Styling */
        .start-menu-item.has-submenu > ul {
            box-shadow: 2px 2px #0a0a0a; 
        }
        /* Since visibility is handled by JSX, we just need the structural CSS */
        `}
      </style>
    </div>
  );
};

export default StartMenu;