const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

exports.getByCategory = (req, res) => {
    fs.readdir(imagesDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            res.status(500).send('Error reading products directory.');
            return;
        }

        const categories = {};

        files.forEach(file => {
            if (file.isDirectory()) {
                const categoryName = file.name;
                const categoryDir = path.join(imagesDir, categoryName);
                
                fs.readdir(categoryDir, (err, productFiles) => {
                    if (err) {
                        console.error(`Error reading category directory ${categoryName}:`, err);
                        // Decide how to handle errors per directory - skip or report?
                        // For now, just log and continue.
                        return;
                    }
                    // Filter out hidden files like .DS_Store
                    categories[categoryName] = productFiles.filter(fileName => !fileName.startsWith('.'));

                    // Check if all directories have been processed
                    // This is a simple way, might need refinement for large number of directories
                    if (Object.keys(categories).length === files.filter(f => f.isDirectory()).length) {
                         res.json(categories);
                    }
                });
            }
        });

         // Handle case where there are no directories
         if (files.filter(f => f.isDirectory()).length === 0) {
             res.json({});
         }
    });
}; 