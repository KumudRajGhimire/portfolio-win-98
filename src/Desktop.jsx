import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import ProjectsWindow from './ProjectsWindow';
import AboutMeWindow from './AboutMeWindow';
import ContactWindow from './ContactWindow';
import ResumeWindow from './ResumeWindow';
import StartMenu from './StartMenu';
import DesktopContextMenu from './DesktopContextMenu';
import TaskbarClock from './TaskbarClock';
import PhotoGalleryWindow from './PhotoGalleryWindow'; 
import PhotosIcon from './assets/file.png';
import MinesweeperWindow from './MinesweeperWindow';
import PaintWindow from './PaintWindow';
import PaintIcon from './assets/paint.png';

// ⬅️ YOUR SPECIFIED LOCAL ICON IMPORTS
import ProjectsIcon from './assets/file.png';
import AboutIcon from './assets/about.png';
import ContactIcon from './assets/mail.png';
import ResumeIcon from './assets/resume.png';
import StartFlagIcon from './assets/start.png';

// UTILITY FUNCTION for dynamically resolving local assets in Vite
const getWallpaperUrl = (filename) => {
    // Note: The path './assets/wallpapers/' is relative to this Desktop.jsx file
    return new URL(`./assets/wallpapers/${filename}`, import.meta.url).href;
}

// ⬅️ FIX: DEFAULT now points to 'default.jpg'
const WALLPAPERS = {
    DEFAULT: 'default.jpg', 
    TEAL: 'win98_bliss.jpg', 
    IRONMAN: 'space.jpeg', 
    LAKE: 'lake.jpg',
};

const Desktop = ({ userMode }) => {
  const desktopRef = useRef(null); 

  // State for window management (unchanged)
  const [windowState, setWindowState] = useState({
    projects: { isOpen: false, isMinimized: false, isMaximized: false },
    about: { isOpen: false, isMinimized: false, isMaximized: false },
    contact: { isOpen: false, isMinimized: false, isMaximized: false },
    resume: { isOpen: false, isMinimized: false, isMaximized: false },
    photos: { isOpen: false, isMinimized: false, isMaximized: false },
    minesweeper: { isOpen: false, isMinimized: false, isMaximized: false },
    paint: { isOpen: false, isMinimized: false, isMaximized: false },
  });

  // State for Start Menu (unchanged)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  // State for the current wallpaper and context menu
  const [currentWallpaperKey, setCurrentWallpaperKey] = useState('DEFAULT'); // Starts on 'DEFAULT' key
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  // --- Window Management Functions (Unchanged) ---

  const toggleWindow = (name) => {
    setWindowState(prev => ({ 
      ...prev, 
      [name]: { 
        ...prev[name], 
        isOpen: !prev[name].isOpen,
        isMinimized: prev[name].isOpen ? prev[name].isMinimized : false, 
      } 
    }));
    if (isStartMenuOpen) setIsStartMenuOpen(false);
  };

  const closeWindow = (name) => {
    setWindowState(prev => ({ 
      ...prev, 
      [name]: { isOpen: false, isMinimized: false, isMaximized: false } 
    }));
  };

  const minimizeWindow = (name) => {
    setWindowState(prev => ({ 
      ...prev, 
      [name]: { ...prev[name], isMinimized: true } 
    }));
    setIsStartMenuOpen(false);
  };

  const restoreWindow = (name) => {
    setWindowState(prev => ({ 
      ...prev, 
      [name]: { ...prev[name], isMinimized: false } 
    }));
  };
  
  const toggleMaximize = (name) => {
    setWindowState(prev => ({ 
      ...prev, 
      [name]: { ...prev[name], isMaximized: !prev[name].isMaximized, isMinimized: false } 
    }));
  };

  // --- OS/Desktop Functions (Unchanged) ---

  const toggleStartMenu = () => {
    setIsStartMenuOpen(prev => !prev);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleLogOff = () => {
    sessionStorage.removeItem('isLoggedIn'); 
    sessionStorage.removeItem('userMode');
    window.location.reload(); 
  };
  
  const handleSetWallpaper = (themeKey) => {
    setCurrentWallpaperKey(themeKey);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); 
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
    setIsStartMenuOpen(false);
  };

  const handleClick = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
    if (isStartMenuOpen) {
      setIsStartMenuOpen(false);
    }
  };
  
  // ⬅️ UPDATED: Simplifies logic since all are images now (except if color is explicitly added later)
  const getBackgroundStyle = () => {
    const value = WALLPAPERS[currentWallpaperKey];
    
    // Check if the value is a color code (starts with #)
    if (value.startsWith('#')) {
        return { backgroundColor: value, backgroundImage: 'none' };
    }
    
    // It's a file name, resolve the image path
    const imageUrl = getWallpaperUrl(value);
    
    return { 
        backgroundColor: '#008080', // Use teal as base color for transparency
        backgroundImage: `url(${imageUrl})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
    };
  };

  // --- Rendering Helpers (Unchanged) ---
  
  const DesktopIcon = ({ name, iconUrl, onClick }) => (
    <button className="desktop-icon" onClick={onClick}>
      <img src={iconUrl} alt={name} style={{ width: '32px', height: '32px' }} />
      <span>{name}</span>
    </button>
  );

  const getMaximizedProps = () => {
    if (!desktopRef.current) return {};
    const desktopWidth = desktopRef.current.offsetWidth;
    const desktopHeight = desktopRef.current.offsetHeight - 30;

    return { x: 0, y: 0, width: desktopWidth, height: desktopHeight };
  }

  const renderWindow = (name, WindowComponent, defaultRnd) => {
    const state = windowState[name];
    if (!state.isOpen || state.isMinimized) return null;

    const rndProps = state.isMaximized ? getMaximizedProps() : defaultRnd;
    
    // Pass control functions to the window component
    const ComponentProps = { 
        onClose: () => closeWindow(name), 
        onMinimize: () => minimizeWindow(name), 
        onMaximize: () => toggleMaximize(name) 
    };
    if (name === 'projects') ComponentProps.userMode = userMode;

    return (
        <Rnd 
            key={name}
            default={defaultRnd}
            minWidth={defaultRnd.minWidth || 300}
            minHeight={defaultRnd.minHeight || 200}
            bounds="parent" 
            dragHandleClassName="title-bar"
            {...(state.isMaximized ? { 
                position: { x: rndProps.x, y: rndProps.y }, 
                size: { width: rndProps.width, height: rndProps.height },
                disableDragging: true, 
                enableResizing: false,
            } : { 
                disableDragging: false,
                enableResizing: true,
            })}
        >
          <WindowComponent {...ComponentProps} />
        </Rnd>
    );
  };
  
  // Define default properties for each Rnd instance
  const defaultRnds = {
    projects: { x: 50, y: 50, width: 700, height: 500, minWidth: 710, minHeight: 450 },
    about: { x: 150, y: 100, width: 500, height: 350, minWidth: 300, minHeight: 200 },
    contact: { x: 200, y: 150, width: 450, height: 350, minWidth: 350, minHeight: 250 },
    resume: { x: 250, y: 50, width: 500, height: 400, minWidth: 400, minHeight: 300 },
    photos: { x: 100, y: 30, width: 650, height: 550, minWidth: 450, minHeight: 350 },
    minesweeper: { x: 100, y: 100, width: 330, height: 430, minWidth: 330, minHeight: 430 },
     paint: { x: 50, y: 50, width: 700, height: 600, minWidth: 600, minHeight: 500 },
  };


  return (
    <div 
        ref={desktopRef} 
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        style={{
          width: '100vw',
          height: '100vh',
          ...getBackgroundStyle(), // ⬅️ Apply the calculated background style
          position: 'relative',
        }}
    >
      
      {/* 1. Desktop Icons */}
      <div style={{ padding: '10px' }}>
        <DesktopIcon name="My Projects" iconUrl={ProjectsIcon} onClick={() => toggleWindow('projects')} />
        <DesktopIcon name="About Me" iconUrl={AboutIcon} onClick={() => toggleWindow('about')} />
        <DesktopIcon name="Contact" iconUrl={ContactIcon} onClick={() => toggleWindow('contact')} />
        <DesktopIcon name="Resume" iconUrl={ResumeIcon} onClick={() => toggleWindow('resume')} />
        <DesktopIcon name="My Photos" iconUrl={PhotosIcon} onClick={() => toggleWindow('photos')} />
        <DesktopIcon name="Minesweeper" iconUrl={"https://win98icons.alexmeub.com/icons/png/minesweeper-0.png"} onClick={() => toggleWindow('minesweeper')} />
        <DesktopIcon name="Paint" iconUrl={PaintIcon} onClick={() => toggleWindow('paint')}/>
      </div>

      {/* 2. Start Menu */}
      {isStartMenuOpen && (
          <StartMenu 
              onMenuItemClick={toggleWindow}
              onLogOff={handleLogOff}
          />
      )}

      {/* 3. Right-Click Context Menu */}
      {contextMenu.visible && (
            <DesktopContextMenu 
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={() => setContextMenu({ ...contextMenu, visible: false })}
                onSetWallpaper={handleSetWallpaper}
                WALLPAPERS={WALLPAPERS}
            />
        )}


      {/* 4. Window Renderers */}
      {renderWindow('projects', ProjectsWindow, defaultRnds.projects)}
      {renderWindow('about', AboutMeWindow, defaultRnds.about)}
      {renderWindow('contact', ContactWindow, defaultRnds.contact)}
      {renderWindow('resume', ResumeWindow, defaultRnds.resume)}
      {renderWindow('photos', PhotoGalleryWindow, defaultRnds.photos)}
      {renderWindow('minesweeper', MinesweeperWindow, defaultRnds.minesweeper)}
      {renderWindow('paint', PaintWindow, defaultRnds.paint)}


      {/* 5. Taskbar */}
      <div className="taskbar" style={{ justifyContent: 'space-between' }}>
        
        {/* Left Side: Start Button and Open Windows */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
                className={`start-menu-button ${isStartMenuOpen ? 'active' : ''}`} 
                onClick={toggleStartMenu}
            >
                <img src={StartFlagIcon} alt="Start" style={{ width: '20px', height: '20px' }}/>
                Start
            </button>
            {/* Taskbar buttons for open windows */}
            {Object.entries(windowState).map(([name, state]) => 
                state.isOpen && (
                    <button 
                        key={name} 
                        className={`taskbar-button ${!state.isMinimized ? 'active' : ''}`}
                        onClick={() => state.isMinimized ? restoreWindow(name) : minimizeWindow(name)}
                        onContextMenu={(e) => {
                            e.preventDefault(); 
                            closeWindow(name);
                        }}
                        style={{ marginLeft: 5 }}
                    >
                        {name.charAt(0).toUpperCase() + name.slice(1)} Window
                    </button>
                )
            )}
        </div>

        {/* Right Side: System Tray (Network and Clock) */}
        <div className="status-bar" style={{ 
            borderTop: 'none', 
            borderBottom: 'none', 
            height: '100%', 
            padding: '0 4px', 
            display: 'flex', 
            alignItems: 'center',
            // Authentic 98.css system tray look
            borderLeft: '2px solid #7f7f7f',
            borderTop: '2px solid #fff',
            borderRight: '2px solid #fff',
            borderBottom: '2px solid #7f7f7f',
        }}>
            {/* Network Icon */}
            <img 
                src="https://win98icons.alexmeub.com/icons/png/modem-1.png" 
                alt="Network" 
                title="You are connected to the portfolio network."
                style={{ width: '16px', height: '16px', margin: '0 4px' }}
            />
            
            {/* Clock */}
            <TaskbarClock />
        </div>
      </div>
    </div>
  );
};

export default Desktop;