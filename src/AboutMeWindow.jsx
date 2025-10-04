import React from 'react';

const AboutMeWindow = ({ onClose, onMinimize, onMaximize }) => (
    <div className="window" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Title Bar */}
        <div className="title-bar">
            <div className="title-bar-text">About Kumud Raj Ghimire (System Information)</div>
            <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={onMinimize}></button> 
                <button aria-label="Maximize" onClick={onMaximize}></button> 
                <button aria-label="Close" onClick={onClose}></button>
            </div>
        </div>
        
        {/* Window Body with Scrollable Content */}
        <div 
            className="window-body" 
            style={{ 
                flexGrow: 1, 
                padding: '10px', 
                overflowY: 'auto', // ⬅️ FIX: Enables vertical scrolling
                lineHeight: '1.4' // Improves readability
            }}
        >
            {/* --- About Me Content --- */}
            
            <h1 style={{ marginTop: '0', borderBottom: '1px solid #7f7f7f', paddingBottom: '5px' }}>
                Kumud Raj Ghimire:
            </h1>

            <p>I’m <b>Kumud Raj Ghimire</b>, and excellence isn’t just a goal for me — it’s my standard.</p>

            <fieldset>
                <legend>Academic Dominance</legend>
                <p>
                    Currently pursuing <b>Computer Science and Engineering at BMS College of Engineering, Bangalore</b>, I hold a CGPA of <b>9.68/10</b>, with back-to-back perfect 10 and 9.95 GPAs in my first two semesters. Academic brilliance has always been my trademark — from securing a <b>Full Ride COMPEX Scholarship</b> from the Government of India, to being awarded the <b>Mahatma Gandhi Scholarship</b> for topping in high school, and the <b>BMSCE Alumni Merit Scholarship</b> for topping my CSE branch.
                </p>
            </fieldset>

            <fieldset>
                <legend>Technical Arsenal & Problem Solving</legend>
                <p>
                    But I don’t just ace exams — I build. My technical arsenal covers <b>Python, Java, C, Dart, Flutter, React.js, FastAPI, Firebase, MySQL, MongoDB</b>, and more. I’ve solved <b>170+ LeetCode problems</b> and <b>300+ coding problems</b> across platforms, sharpening my problem-solving edge.
                </p>
            </fieldset>

            <fieldset>
                <legend>My Philosophy</legend>
                <p>
                    I thrive at the intersection of discipline, innovation, and ambition. While most people talk about balancing academics and projects, I simply dominate both. I’ve led multiple high-impact apps and platforms, scaling them to hundreds and even thousands of users, because mediocrity has no place in my vocabulary.
                </p>
                <p>
                    Fluent in English, Nepali, and Hindi, I bring not just technical skills but also global adaptability. I’m not here to follow trends — <b>I’m here to set them.</b>
                </p>
            </fieldset>

            <p style={{ textAlign: 'right', marginTop: '20px', fontWeight: 'bold' }}>
                In short: I don’t compete to participate. I compete to win. 🏆
            </p>
        </div>
    </div>
);
export default AboutMeWindow;