import React from 'react';
// Import the PDF file directly so Vite processes its URL correctly
import ResumePdf from './assets/resume.pdf'; 

/**
 * Displays a short version of the resume and provides a download link.
 * @param {function} onClose - Function to close the window.
 * @param {function} onMinimize - Function to minimize the window.
 * @param {function} onMaximize - Function to maximize/restore the window.
 */
const ResumeWindow = ({ onClose, onMinimize, onMaximize }) => {
    
    // Function to handle the button click for download
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = ResumePdf;
        link.setAttribute('download', 'Kumud_Raj_Ghimire_Resume.pdf'); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="window" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            {/* Title Bar */}
            <div className="title-bar" style={{ flexShrink: 0 }}> {/* Prevent title bar from shrinking */}
                <div className="title-bar-text">Kumud_Ghimire_Resume.doc</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" onClick={onMinimize}></button> 
                    <button aria-label="Maximize" onClick={onMaximize}></button> 
                    <button aria-label="Close" onClick={onClose}></button>
                </div>
            </div>

            {/* Content Area with Scrollable Text */}
            <div 
                className="window-body" 
                style={{ 
                    flexGrow: 1, // ⬅️ FIX: This makes the content area expand vertically
                    padding: '10px', 
                    overflowY: 'auto', 
                }}
            >
                
                <h1 style={{ marginTop: '0', marginBottom: '5px', fontSize: '18px' }}>
                    <b>Kumud Raj Ghimire: Resume (Short Version)</b>
                </h1>
                <h2 style={{ fontSize: '14px', margin: '0 0 10px 0' }}>
                    Aspiring Software Engineer | B.E. CSE, BMSCE Bangalore
                </h2>

                <div className="field-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <span>📍 Nepal</span>
                    <span>✉️ ghimirekumudraj@gmail.com</span>
                    <span>💼 LinkedIn</span>
                    <span>🖥️ GitHub</span>
                </div>

                {/* Education Section */}
                <fieldset style={{ marginBottom: '10px' }}>
                    <legend>🎓 Education</legend>
                    <p style={{ margin: '5px 0' }}>
                        <b>B.E. Computer Science & Engineering</b> – BMSCE, Bangalore (2023–2027)
                        <br/>
                        <span style={{ fontSize: '11px', marginLeft: '10px' }}>
                            CGPA: <b>9.68/10</b> | Branch Topper | Full Ride COMPEX Scholar
                        </span>
                    </p>
                    <p style={{ margin: '5px 0' }}>
                        <b>SLC (PCMC)</b> – Capital College, Kathmandu (2021–2023)
                    </p>
                    <p style={{ margin: '5px 0' }}>
                        <b>SEE (Grade 10)</b> – Lalitpur Madhyamik Vidhyalaya (2021) | GPA: <b>4.0/4.0</b>
                    </p>
                </fieldset>

                {/* Skills Section */}
                <fieldset style={{ marginBottom: '15px' }}>
                    <legend>💻 Skills</legend>
                    <p style={{ margin: '5px 0' }}><b>Languages:</b> Python, Java, C, Dart (Flutter)</p>
                    <p style={{ margin: '5px 0' }}><b>Web & Mobile:</b> React.js, Flutter, FastAPI, Firebase</p>
                    <p style={{ margin: '5px 0' }}><b>Databases:</b> MySQL, MongoDB, Firestore</p>
                    <p style={{ margin: '5px 0' }}><b>Tools:</b> Git, GitHub, VS Code, Vercel, Figma, Postman</p>
                    <p style={{ margin: '5px 0' }}><b>Concepts:</b> DSA, OOP, OS, DBMS, CN, COA</p>
                </fieldset>

                {/* Achievements Section */}
                <fieldset>
                    <legend>🏆 Achievements</legend>
                    <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                        <li><b>COMPEX Scholarship</b> (Govt. of India) – Full Ride for B.E. CSE</li>
                        <li><b>BMSCE Alumni Merit Scholarship</b> – Branch Topper (CSE, 2023–24)</li>
                        <li><b>Mahatma Gandhi Scholarship</b> – Academic excellence in grades 11 & 12</li>
                        <li>Solved <b>150+ LeetCode problems, 250+ total</b> across platforms.</li>
                        <li>Maintained stellar CGPA 9.68/10, with perfect 10 SGPA in Semester I.</li>
                    </ul>
                </fieldset>

            </div>

            {/* Status Bar / Download Action */}
            <div 
                className="status-bar" 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    padding: '4px',
                    flexShrink: 0, // ⬅️ Prevent status bar from shrinking
                }}
            >
                <p className="status-bar-field" style={{ marginBottom: '4px', border: 'none' }}>✨ Full details available in PDF format.</p>
                
                {/* Download Button - Resized and Animated */}
                <button 
                    className="button download-button-animated"
                    onClick={handleDownload}
                    style={{ 
                        width: 'auto',
                        padding: '4px 12px',
                        fontWeight: 'bold',
                        height: '30px',
                        lineHeight: '20px',
                    }}
                >
                    Download Full Resume
                </button>
            </div>

            {/* Embedded CSS for Animation */}
            <style>
                {`
                /* Target the specific button class */
                .download-button-animated:active {
                    /* Standard 98.css button press effect */
                    background: #c0c0c0;
                    box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #ffffff;
                    padding: 4px 12px;
                    /* Optional: Shift text slightly right/down for a "pushed" effect */
                    transform: translate(1px, 1px);
                }
                `}
            </style>
        </div>
    );
};
export default ResumeWindow;