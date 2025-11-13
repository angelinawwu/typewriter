const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${savings}% smaller)`);
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
  }
}

async function convertAllImages() {
  const typewriterDir = path.join(__dirname, 'src/assets/typewriter1');
  const paperFile = path.join(__dirname, 'src/assets/paper1.png');
  
  // Get all PNG files in typewriter1 directory
  const pngFiles = fs.readdirSync(typewriterDir)
    .filter(file => file.endsWith('.png'))
    .map(file => path.join(typewriterDir, file));
  
  // Add paper1.png
  pngFiles.push(paperFile);
  
  console.log(`Converting ${pngFiles.length} PNG files to WebP...\n`);
  
  // Convert all files
  for (const pngFile of pngFiles) {
    const webpFile = pngFile.replace('.png', '.webp');
    await convertToWebP(pngFile, webpFile);
  }
  
  console.log(`\n✅ Conversion complete!`);
}

convertAllImages().catch(console.error);

