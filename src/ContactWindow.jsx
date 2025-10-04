import React from 'react';
// ⬅️ Added FaFacebook icon
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaFacebook } from 'react-icons/fa';

// Define your contact information (updated with Facebook link)
const CONTACT_INFO = {
    email: "ghimirekumudraj@gmail.com",
    github: "https://github.com/KumudRajGhimire",
    linkedin: "https://www.linkedin.com/in/kumudrajghimire",
    instagram: "https://www.instagram.com/justkumud",
    // ⬅️ NEW: Facebook Link
    facebook: "https://www.facebook.com/kumud.ghimire.733",
};

/**
 * Displays contact information with social media links.
 * @param {function} onClose - Function to close the window.
 * @param {function} onMinimize - Function to minimize the window.
 * @param {function} onMaximize - Function to maximize/restore the window.
 */
const ContactWindow = ({ onClose, onMinimize, onMaximize }) => (
    <div className="window" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="title-bar" style={{ flexShrink: 0 }}>
            <div className="title-bar-text">Contact Manager</div>
            <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={onMinimize}></button> 
                <button aria-label="Maximize" onClick={onMaximize}></button> 
                <button aria-label="Close" onClick={onClose}></button>
            </div>
        </div>
        
        <div className="window-body" style={{ flexGrow: 1, padding: '15px', overflowY: 'auto' }}>
            
            <h1 style={{ marginTop: 0, fontSize: '18px' }}>Get In Touch!</h1>
            
            <div className="field-row-stacked" style={{ marginBottom: '20px' }}>
                <label>Status:</label>
                <div className="status-bar" style={{ padding: '4px' }}>
                    <p className="status-bar-field">🖥️ Currently accepting new opportunities and projects.</p>
                </div>
            </div>

            <fieldset>
                <legend>Primary Contact</legend>
                <div className="field-row" style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                    {/* ⬅️ Black Icon */}
                    <FaEnvelope size={16} style={{ marginRight: '10px', color: 'black' }} />
                    <label htmlFor="emailField">Email:</label>
                    <input 
                        id="emailField" 
                        type="text" 
                        readOnly 
                        value={CONTACT_INFO.email} 
                        style={{ flexGrow: 1, marginLeft: '10px' }}
                    />
                </div>
            </fieldset>

            <fieldset style={{ marginTop: '15px' }}>
                <legend>Digital Presence</legend>
                
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {/* GitHub Link */}
                    <li style={{ margin: '10px 0' }}>
                        <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="link-style">
                            <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
                                {/* ⬅️ Black Icon */}
                                <FaGithub size={20} style={{ marginRight: '10px', color: 'black' }} />
                                GitHub Profile
                            </div>
                        </a>
                    </li>
                    
                    {/* LinkedIn Link */}
                    <li style={{ margin: '10px 0' }}>
                        <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="link-style">
                            <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
                                {/* ⬅️ Black Icon */}
                                <FaLinkedin size={20} style={{ marginRight: '10px', color: 'black' }} />
                                LinkedIn (Professional)
                            </div>
                        </a>
                    </li>
                    
                    {/* Facebook Link */}
                    <li style={{ margin: '10px 0' }}>
                        <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="link-style">
                            <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
                                {/* ⬅️ Black Icon */}
                                <FaFacebook size={20} style={{ marginRight: '10px', color: 'black' }} />
                                Facebook (Personal)
                            </div>
                        </a>
                    </li>

                    {/* Instagram Link */}
                    <li style={{ margin: '10px 0' }}>
                        <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="link-style">
                            <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
                                {/* ⬅️ Black Icon */}
                                <FaInstagram size={20} style={{ marginRight: '10px', color: 'black' }} />
                                Instagram (Personal)
                            </div>
                        </a>
                    </li>
                </ul>
            </fieldset>

        </div>
        
        <div className="status-bar" style={{ flexShrink: 0 }}>
            <p className="status-bar-field">Status: Online</p>
            <p className="status-bar-field">Last Updated: Oct 2025</p>
        </div>
    </div>
);
export default ContactWindow;