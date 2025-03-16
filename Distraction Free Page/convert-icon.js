const sharp = require('sharp');
const fs = require('fs');

const svgBuffer = fs.readFileSync('./images/icon.svg');

sharp(svgBuffer)
  .resize(48, 48)
  .png()
  .toFile('./images/icon48.png')
  .then(() => {
    console.log('Icon converted successfully!');
  })
  .catch(err => {
    console.error('Error converting icon:', err);
  }); 