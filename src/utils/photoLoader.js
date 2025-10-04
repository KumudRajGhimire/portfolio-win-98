// src/utils/photoLoader.js

/**
 * Dynamically imports all images from the specified folder.
 * Vite's import.meta.glob is used here to get a map of modules.
 * @returns {Array<{name: string, url: string}>} A list of photo objects.
 */
export const loadPhotos = () => {
    // This imports all files inside the src/assets/photos folder
    // The key is the relative path, the value is a function that loads the module.
    const modules = import.meta.glob('../assets/photos/*.{png,jpg,jpeg,gif,webp}', { eager: true });
    
    const photos = Object.entries(modules).map(([path, module]) => {
        // Extract the filename (e.g., "certificate_js.jpg")
        const nameMatch = path.match(/[^/]*$/);
        const name = nameMatch ? nameMatch[0] : 'Unknown File';

        // 'module.default' contains the resolved public URL for the image
        return {
            name: name,
            url: module.default,
        };
    });

    return photos;
};