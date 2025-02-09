// src/ipc/imageProcessing.cjs
const path = require('path');
const fs = require('fs/promises');
const util = require('util');
const { exec } = require('child_process');
const execPromise = util.promisify(exec);

const processImages = async (filePaths) => {
  try {
    for (const filePath of filePaths) {
      const directory = path.dirname(filePath);
      const filename = path.basename(filePath);
      const outputDir = path.join(directory, 'HalfPic');
      
      // Create HalfPic directory if it doesn't exist
      await fs.mkdir(outputDir, { recursive: true });
      
      const outputPath = path.join(outputDir, filename);
      // Copy file first
      await fs.copyFile(filePath, outputPath);
      
      // Get original dimensions
      const { stdout } = await execPromise(`sips -g pixelHeight -g pixelWidth "${filePath}"`);
      const heightMatch = stdout.match(/pixelHeight: (\d+)/);
      const widthMatch = stdout.match(/pixelWidth: (\d+)/);
      
      if (!heightMatch || !widthMatch) {
        throw new Error('Could not get image dimensions');
      }

      const originalHeight = parseInt(heightMatch[1]);
      const originalWidth = parseInt(widthMatch[1]);
      const newHeight = Math.floor(originalHeight / 2);
      const newWidth = Math.floor(originalWidth / 2);
      
      // Use sips to resize the copy to the calculated dimensions
      await execPromise(`sips --resampleHeightWidth ${newHeight} ${newWidth} "${outputPath}"`);
    }
    return { success: true };
  } catch (error) {
    console.error('Image processing error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { processImages };