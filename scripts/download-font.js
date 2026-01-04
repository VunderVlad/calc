// Script to download Noto Sans font for PDF generation
const https = require('https');
const fs = require('fs');
const path = require('path');

const fontUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf';
const outputDir = path.join(process.cwd(), 'public', 'fonts');
const outputPath = path.join(outputDir, 'NotoSans-Regular.ttf');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Downloading Noto Sans font...');
console.log(`From: ${fontUrl}`);
console.log(`To: ${outputPath}`);

const file = fs.createWriteStream(outputPath);

https.get(fontUrl, (response) => {
  if (response.statusCode === 200) {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      const stats = fs.statSync(outputPath);
      console.log(`✓ Font downloaded successfully! (${(stats.size / 1024).toFixed(2)} KB)`);
      console.log(`Font saved to: ${outputPath}`);
    });
  } else if (response.statusCode === 301 || response.statusCode === 302) {
    // Handle redirect
    console.log('Following redirect...');
    https.get(response.headers.location, (redirectResponse) => {
      redirectResponse.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(outputPath);
        console.log(`✓ Font downloaded successfully! (${(stats.size / 1024).toFixed(2)} KB)`);
        console.log(`Font saved to: ${outputPath}`);
      });
    });
  } else {
    console.error(`Failed to download font. Status: ${response.statusCode}`);
    fs.unlinkSync(outputPath);
    process.exit(1);
  }
}).on('error', (err) => {
  console.error('Error downloading font:', err.message);
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }
  process.exit(1);
});

