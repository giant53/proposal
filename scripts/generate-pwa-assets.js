/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs').promises;

const ICON_SIZES = [16, 32, 48, 70, 144, 150, 192, 310, 512];
const SPLASH_SCREENS = [
  { width: 320, height: 568, name: 'iphone5' },
  { width: 375, height: 667, name: 'iphone6' },
  { width: 621, height: 1104, name: 'iphoneplus' },
  { width: 375, height: 812, name: 'iphonex' },
  { width: 414, height: 896, name: 'iphonexr' },
  { width: 768, height: 1024, name: 'ipad' },
  { width: 834, height: 1112, name: 'ipadpro1' },
  { width: 834, height: 1194, name: 'ipadpro3' },
  { width: 1024, height: 1366, name: 'ipadpro2' }
];

async function ensureDirectories() {
  const dirs = ['public/icons', 'public/splash'];
  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function generatePlaceholderLogo() {
  // Create a simple SVG logo if one doesn't exist
  const logoPath = 'public/wlogo.svg';
  try {
    await fs.access(logoPath);
  } catch {
    const placeholderSvg = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="#FF4D79"/>
        <text x="50%" y="50%" font-family="Arial" font-size="80" fill="white" text-anchor="middle" dominant-baseline="middle">
          MP
        </text>
      </svg>
    `;
    await fs.writeFile(logoPath, placeholderSvg);
  }
  return logoPath;
}

async function generateIcons() {
  const logoPath = await generatePlaceholderLogo();
  const base = sharp(logoPath);
  
  for (const size of ICON_SIZES) {
    await base
      .resize(size, size, { fit: 'contain' })
      .toFile(`public/icons/favicon-${size}x${size}.png`);
    
    // Generate maskable icons for some sizes
    if (size === 192 || size === 512) {
      await base
        .resize(size, size, { fit: 'contain' })
        .toFile(`public/icons/maskable-${size}x${size}.png`);
    }
  }

  // Special cases
  await base.resize(180, 180, { fit: 'contain' }).toFile('public/icons/apple-touch-icon.png');
  await base.resize(144, 144, { fit: 'contain' }).toFile('public/icons/mstile-144x144.png');
  await base.resize(310, 150, { fit: 'contain' }).toFile('public/icons/mstile-310x150.png');
}

async function generateSplashScreens() {
  const logoPath = await generatePlaceholderLogo();
  const base = sharp(logoPath);
  
  for (const screen of SPLASH_SCREENS) {
    const { width, height, name } = screen;
    
    // Create a white background
    const background = Buffer.from(
      `<svg><rect width="${width}" height="${height}" fill="#FFFFFF"/></svg>`
    );
    
    // Calculate logo size (40% of smaller dimension)
    const logoSize = Math.floor(Math.min(width, height) * 0.4);
    
    await sharp(background)
      .composite([
        {
          input: await base.resize(logoSize, logoSize, { fit: 'contain' }).toBuffer(),
          gravity: 'center'
        }
      ])
      .toFile(`public/splash/${name}.png`);
  }
}

async function main() {
  try {
    await ensureDirectories();
    await generateIcons();
    await generateSplashScreens();
    console.log('✅ Generated all PWA assets successfully');
  } catch (error) {
    console.error('❌ Error generating PWA assets:', error);
    process.exit(1);
  }
}

main();
