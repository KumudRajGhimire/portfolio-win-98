import React, { useState } from 'react';
import { mockProjects } from './mockData/projects';

// Import Icons for Project types
const getIconUrl = (type) => {
    switch (type) {
        case 'Mobile App': return 'https://win98icons.alexmeub.com/icons/png/overlay_share_cool-4.png';
        case 'Web Platform': return 'https://win98icons.alexmeub.com/icons/png/world-1.png';
        case 'Web Utility': return 'https://win98icons.alexmeub.com/icons/png/laptop_infrared_2-5.png';
        case 'Web Portfolio': return 'https://win98icons.alexmeub.com/icons/png/globe_map-0.png';
        default: return 'https://win98icons.alexmeub.com/icons/png/directory_closed_cool-3.png';
    }
};

/**
 * Displays the list of portfolio projects in an Explorer-style view.
 */
const ProjectsWindow = ({ onClose, onMinimize, onMaximize, userMode }) => {
  const projects = mockProjects; 
  const isVisitor = userMode === 'visitor';
  
  const [selectedProject, setSelectedProject] = useState(projects[0] || null);

  
  return (
    <div className="window" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Bar */}
      <div className="title-bar" style={{ flexShrink: 0 }}>
        <div className="title-bar-text">My Projects Explorer</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize}></button>  
          <button aria-label="Maximize" onClick={onMaximize}></button>  
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>

      {/* Main Content Area: Explorer Layout */}
      <div className="window-body" style={{ flexGrow: 1, padding: 0, display: 'flex' }}>
        
        {/* 1. Left Pane: Folder Tree (Minimalist) */}
        <div className="tree-view" style={{ 
            width: '180px', 
            borderRight: '1px solid #7f7f7f', 
            background: 'white', 
            padding: '4px',
            overflowY: 'auto',
            flexShrink: 0
        }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>📂 Kumud's Work</p>
            <ul style={{ listStyle: 'none', padding: 0, marginLeft: '10px' }}>
                <li style={{ padding: '2px 0' }}><b style={{marginRight: '5px'}}>+</b> Projects</li>
                <li style={{ padding: '2px 0', marginLeft: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {selectedProject ? `└─ ${selectedProject.title}` : 'Select Project'}
                </li>
            </ul>
        </div>

        {/* 2. Right Pane: Project List/Details */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Top Toolbar-like area for selection */}
            <div className="status-bar" style={{ minHeight: 0, borderTop: 'none', borderBottom: '1px solid #7f7f7f' }}>
                <p className="status-bar-field" style={{ flexGrow: 1 }}>
                    Status: Read-Only Mode
                </p>
                <p className="status-bar-field">
                    {projects.length} Items
                </p>
            </div>

            {/* Project List: Scrollable Icon View */}
            <div style={{ 
                flexShrink: 0,
                height: '110px', 
                overflowX: 'auto', 
                overflowY: 'hidden',
                padding: '8px 4px', 
                whiteSpace: 'nowrap', 
                borderBottom: '1px solid #c0c0c0'
            }}>
                {projects.map((project) => (
                    <button 
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`project-icon-item ${selectedProject?.id === project.id ? 'active-icon' : ''}`}
                        style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100px',
                            height: '100%',
                            padding: '4px', 
                            // ⬅️ FIX: Explicitly set margin to 0
                            margin: '0', 
                            border: 'none', 
                            backgroundColor: 'transparent',
                            color: 'black',
                            cursor: 'pointer',
                        }}
                    >
                        <img 
                            src={getIconUrl(project.type)} 
                            alt={project.title} 
                            style={{ width: '32px', height: '32px', marginBottom: '4px' }}
                        />
                        <span style={{ 
                            fontSize: '11px', 
                            whiteSpace: 'normal', 
                            wordBreak: 'break-word',
                            textAlign: 'center',
                        }}>
                            {project.title}
                        </span>
                    </button>
                ))}
                {/* Embedded CSS for selection style */}
                <style>
                    {`
                    /* General icon styling to look like desktop icons but smaller/flatter */
                    .project-icon-item {
                        margin: 0 4px; /* Apply consistent margin here */
                    }
                    .project-icon-item:hover {
                        background-color: #c0c0c0;
                    }
                    /* Blue highlight for the selected icon */
                    .active-icon {
                        background-color: #000080 !important;
                        outline: 1px dashed white;
                        outline-offset: -2px;
                        color: white !important;
                    }
                    .active-icon span {
                        color: white;
                    }
                    `}
                </style>
            </div>

            {/* Project Details: Scrollable Sunken Panel */}
            <div style={{ flexGrow: 1, padding: '10px' }}>
                {selectedProject ? (
                    <fieldset style={{ height: '100%' }}>
                        <legend style={{ fontWeight: 'bold' }}>{selectedProject.title} Details</legend>
                        <div style={{ height: 'calc(100% - 16px)', display: 'flex', flexDirection: 'column' }}>
                            
                            {/* Description Area */}
                            <div className="window" style={{ flexGrow: 1, padding: '8px', overflowY: 'auto', marginBottom: '8px' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', borderBottom: '1px solid #7f7f7f', paddingBottom: '5px' }}>Description:</p>
                                <p style={{ margin: '5px 0' }}>{selectedProject.description}</p>
                            </div>

                            {/* Tech Stack and Links */}
                            <div style={{ flexShrink: 0 }}>
                                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Technologies:</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {selectedProject.techStack.map(tech => (
                                        <span key={tech} className="button" style={{ padding: '2px 8px', fontSize: '10px' }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button 
                                        className="button"
                                        onClick={() => window.open(selectedProject.link, '_blank')}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Open Source / Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                ) : (
                    <p>Select a project icon above to view details.</p>
                )}
            </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar" style={{ flexShrink: 0 }}>
          <p className="status-bar-field">Ready</p>
      </div>
    </div>
  );
};

export default ProjectsWindow;