import React, { useState } from 'react';
import { loadPhotos } from './utils/photoLoader';

const photos = loadPhotos();

/**
 * Displays a gallery of photos/certificates.
 */
const PhotoGalleryWindow = ({ onClose, onMinimize, onMaximize }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <div className="window" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="title-bar" style={{ flexShrink: 0 }}>
                <div className="title-bar-text">My Photos & Certificates</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" onClick={onMinimize}></button> 
                    <button aria-label="Maximize" onClick={onMaximize}></button> 
                    <button aria-label="Close" onClick={onClose}></button>
                </div>
            </div>
            
            <div className="window-body" style={{ flexGrow: 1, padding: '10px', overflowY: 'auto' }}>
                
                <p style={{ marginTop: 0, marginBottom: '10px' }}>Select an item to view details:</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'flex-start' }}>
                    {photos.length === 0 ? (
                        <p>No photos found in the assets directory. Please add images to <code>src/assets/photos/</code></p>
                    ) : (
                        photos.map((photo) => (
                            <button 
                                key={photo.name}
                                className="desktop-icon" // Reuse desktop icon style for folder items
                                onClick={() => setSelectedPhoto(photo)}
                                style={{ width: '100px', height: '100px', padding: '5px', borderRadius: '0' }}
                            >
                                {/* Simple icon placeholder for the file */}
                                <img 
                                    src="https://win98icons.alexmeub.com/icons/png/paint_file-1.png"
                                    alt={photo.name}
                                    style={{ width: '48px', height: '48px' }} 
                                />
                                <span style={{ fontSize: '10px', wordBreak: 'break-all' }}>
                                    {photo.name.substring(0, 15)}...
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Photo Viewer Modal */}
            {selectedPhoto && (
                <PhotoViewer photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
            )}

            <div className="status-bar" style={{ flexShrink: 0 }}>
                <p className="status-bar-field">{photos.length} items found.</p>
            </div>
        </div>
    );
};

// --------------------------------------------------------
// Photo Viewer Sub-Component (Mimics Image Preview Window)
// --------------------------------------------------------
const PhotoViewer = ({ photo, onClose }) => (
    <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 102,
    }}>
        <div className="window" style={{ width: '450px', maxWidth: '90vw', maxHeight: '80vh' }}>
            <div className="title-bar">
                <div className="title-bar-text">Image Preview: {photo.name}</div>
                <div className="title-bar-controls">
                    <button aria-label="Close" onClick={onClose}></button>
                </div>
            </div>
            <div className="window-body" style={{ padding: '5px', overflow: 'hidden' }}>
                <img 
                    src={photo.url} 
                    alt={photo.name}
                    style={{ 
                        maxWidth: '100%', 
                        maxHeight: 'calc(80vh - 100px)', // Adjust max height relative to window
                        display: 'block', 
                        margin: '0 auto' 
                    }} 
                />
            </div>
        </div>
    </div>
);

export default PhotoGalleryWindow;