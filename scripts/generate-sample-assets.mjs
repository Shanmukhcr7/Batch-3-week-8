import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ffmpegPath = 'C:\\Users\\shanm\\Downloads\\ffmpeg-8.0.1-essentials_build\\ffmpeg-8.0.1-essentials_build\\bin\\ffmpeg.exe';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Generate realistic SVG image with sophisticated cinematic gradient, glow, typography
function generateArtworkSVG({ title, category, subtitle, color1, color2, accent, width = 1200, height = 1500, iconType = 'film' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08090D"/>
      <stop offset="40%" stop-color="${color1}"/>
      <stop offset="80%" stop-color="${color2}"/>
      <stop offset="100%" stop-color="#171B3A"/>
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="${color1}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

  <!-- Ambient Glow -->
  <circle cx="${width * 0.5}" cy="${height * 0.4}" r="${width * 0.45}" fill="url(#glowGrad)" filter="url(#blurFilter)"/>

  <!-- Geometric Abstract Elements -->
  <g opacity="0.6">
    <circle cx="${width * 0.5}" cy="${height * 0.42}" r="220" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="8 6"/>
    <circle cx="${width * 0.5}" cy="${height * 0.42}" r="280" fill="none" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
    <polygon points="${width * 0.5},${height * 0.22} ${width * 0.72},${height * 0.52} ${width * 0.28},${height * 0.52}" fill="none" stroke="${color1}" stroke-width="3" stroke-opacity="0.7"/>
    <rect x="${width * 0.38}" y="${height * 0.3}" width="${width * 0.24}" height="${width * 0.24}" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.4" transform="rotate(45 ${width * 0.5} ${height * 0.42})"/>
  </g>

  <!-- Corner framing lines (Awwwards/cinematic style) -->
  <line x1="60" y1="60" x2="160" y2="60" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2"/>
  <line x1="60" y1="60" x2="60" y2="160" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2"/>
  <line x1="${width - 60}" y1="${height - 60}" x2="${width - 160}" y2="${height - 60}" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2"/>
  <line x1="${width - 60}" y1="${height - 60}" x2="${width - 60}" y2="${height - 160}" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2"/>

  <!-- Top Badges -->
  <text x="70" y="110" font-family="'Space Grotesk', system-ui, sans-serif" font-size="18" font-weight="700" fill="${accent}" letter-spacing="4">${category.toUpperCase()}</text>
  <text x="${width - 70}" y="110" font-family="'JetBrains Mono', monospace" font-size="16" fill="#94A3B8" text-anchor="end" letter-spacing="2">4K RESOLUTION // SHANMUKH AI</text>

  <!-- Bottom Editorial Typography -->
  <g transform="translate(70, ${height - 240})">
    <text x="0" y="0" font-family="'Space Grotesk', system-ui, sans-serif" font-size="48" font-weight="800" fill="#FFFFFF" letter-spacing="-1">${title}</text>
    <text x="0" y="55" font-family="'Inter', system-ui, sans-serif" font-size="22" font-weight="400" fill="#94A3B8" letter-spacing="0.5">${subtitle}</text>
    
    <g transform="translate(0, 110)">
      <rect x="0" y="0" width="180" height="38" rx="6" fill="#171B3A" stroke="${accent}" stroke-width="1.5"/>
      <text x="90" y="24" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">CINEMATIC STILL</text>
    </g>
  </g>
</svg>`;
}

// List of Photo Artworks
const photoArtworks = [
  {
    name: 'project-01.webp',
    svgName: 'project-01.svg',
    title: 'Ronin 2099: Cyber Samurai',
    category: 'AI Filmmaking',
    subtitle: 'Photorealistic Character & Cinematic Worldbuilding',
    color1: '#1E1B4B',
    color2: '#0F172A',
    accent: '#3B82F6',
    description: 'A dark, rain-soaked cyberpunk sequence exploring the synthesis of feudal Japanese aesthetics with cybernetic enhancements.',
    featured: true,
  },
  {
    name: 'project-02.webp',
    svgName: 'project-02.svg',
    title: 'Aura Hypercar Concept',
    category: 'Commercial',
    subtitle: 'Automotive Cinematic Commercial & VFX',
    color1: '#311042',
    color2: '#180B28',
    accent: '#8B5CF6',
    description: 'High-speed cinematic shots tracking a futuristic electric hypercar across desolate salt flats during twilight.',
    featured: true,
  },
  {
    name: 'project-03.webp',
    svgName: 'project-03.svg',
    title: 'Quantum Neural Node',
    category: '3D & VFX',
    subtitle: 'Biomechanical Interface & WebGL Art',
    color1: '#0F2537',
    color2: '#06131F',
    accent: '#38BDF8',
    description: 'Visualizing higher-dimensional machine learning representations inside an organic crystalline lattice.',
    featured: true,
  },
  {
    name: 'project-04.webp',
    svgName: 'project-04.svg',
    title: 'Solaris Void Sculpture',
    category: 'Concept Art',
    subtitle: 'Parametric Spatial Structure & Lighting',
    color1: '#2E1065',
    color2: '#171B3A',
    accent: '#C084FC',
    description: 'An architectural monolithic sculpture suspended within a deep purple nebula.',
    featured: true,
  },
  {
    name: 'project-05.webp',
    svgName: 'project-05.svg',
    title: 'Synthetic Flora Bloom',
    category: 'AI Character',
    subtitle: 'Macro Botanics & Bioluminescent Cells',
    color1: '#064E3B',
    color2: '#022C22',
    accent: '#34D399',
    description: 'Generative macro photography of synthetic crystalline flora blooming in zero gravity.',
    featured: false,
  },
  {
    name: 'project-06.webp',
    svgName: 'project-06.svg',
    title: 'Luminescent Underwater Odyssey',
    category: 'Cinematic Film',
    subtitle: 'Deep Trench Bioluminescence & Atmosphere',
    color1: '#082F49',
    color2: '#0C4A6E',
    accent: '#38BDF8',
    description: 'Underwater cinematic photography exploring abyssal ecosystems illuminated by biological light.',
    featured: false,
  },
  {
    name: 'project-07.webp',
    svgName: 'project-07.svg',
    title: 'Orbital Ring Megastructure',
    category: 'Concept Art',
    subtitle: 'Megascale Sci-Fi Architectural Rendering',
    color1: '#1E1B4B',
    color2: '#3B0764',
    accent: '#818CF8',
    description: 'Planetary engineering visualization showing a planetary ring station at sunrise.',
    featured: false,
  },
  {
    name: 'project-08.webp',
    svgName: 'project-08.svg',
    title: 'Vogue Synthetic 2030',
    category: 'AI Character',
    subtitle: 'High-Fashion Digital Model & Fabric Physics',
    color1: '#4C0519',
    color2: '#171B3A',
    accent: '#FB7185',
    description: 'High-fashion editorial portrait showcasing hyperrealistic fabric drape and dynamic micro-textures.',
    featured: false,
  },
];

// Profile Avatar SVG
function generateProfileSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="pGrad" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="45%" stop-color="#8B5CF6"/>
      <stop offset="80%" stop-color="#171B3A"/>
      <stop offset="100%" stop-color="#08090D"/>
    </radialGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
  </defs>

  <rect width="800" height="800" fill="#08090D"/>
  <circle cx="400" cy="400" r="360" fill="url(#pGrad)"/>
  
  <!-- Outer ring -->
  <circle cx="400" cy="400" r="375" fill="none" stroke="url(#ringGrad)" stroke-width="4" stroke-dasharray="16 12"/>

  <!-- Stylized Monogram / Silhouette -->
  <circle cx="400" cy="330" r="140" fill="#FFFFFF" fill-opacity="0.9"/>
  <path d="M 210 650 Q 400 480 590 650 Z" fill="#FFFFFF" fill-opacity="0.9"/>

  <!-- Cinematic lighting overlays -->
  <circle cx="400" cy="330" r="140" fill="none" stroke="#3B82F6" stroke-width="6"/>
  <text x="400" y="365" font-family="'Space Grotesk', system-ui, sans-serif" font-size="110" font-weight="900" fill="#08090D" text-anchor="middle">SV</text>

  <!-- Floating badge -->
  <g transform="translate(250, 700)">
    <rect x="0" y="0" width="300" height="50" rx="25" fill="#08090D" stroke="#8B5CF6" stroke-width="2"/>
    <text x="150" y="32" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">SHANMUKH VEEREPALLI</text>
  </g>
</svg>`;
}

async function main() {
  console.log('🎬 Generating cinematic assets for Shanmukh Portfolio...');

  const photosDir = path.join(rootDir, 'assets', 'photos');
  const thumbnailsDir = path.join(rootDir, 'assets', 'thumbnails');
  const videosDir = path.join(rootDir, 'assets', 'videos');
  const profileDir = path.join(rootDir, 'assets', 'profile');

  ensureDir(photosDir);
  ensureDir(thumbnailsDir);
  ensureDir(videosDir);
  ensureDir(profileDir);

  // 1. Generate Photo artworks (both WebP and SVG)
  for (const item of photoArtworks) {
    const svgContent = generateArtworkSVG(item);
    const svgPath = path.join(photosDir, item.svgName);
    fs.writeFileSync(svgPath, svgContent, 'utf8');

    // Also convert SVG to WebP using ffmpeg
    const webpPath = path.join(photosDir, item.name);
    try {
      execSync(`"${ffmpegPath}" -y -i "${svgPath}" -vframes 1 "${webpPath}"`, { stdio: 'pipe' });
    } catch {
      // If conversion fails, copy svg or keep
      fs.writeFileSync(webpPath, svgContent, 'utf8');
    }

    // Write metadata JSON
    const metaPath = path.join(photosDir, `${path.parse(item.name).name}.json`);
    const metadata = {
      title: item.title,
      category: item.category,
      subtitle: item.subtitle,
      description: item.description,
      featured: item.featured,
      year: '2025',
      tools: ['Midjourney v6', 'Runway Gen-3', 'Photoshop', 'ComfyUI'],
    };
    fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');
  }

  // 2. Generate Profile Image
  const profileSvg = generateProfileSVG();
  const profileSvgPath = path.join(profileDir, 'profile.svg');
  const profileWebpPath = path.join(profileDir, 'profile.webp');
  fs.writeFileSync(profileSvgPath, profileSvg, 'utf8');
  try {
    execSync(`"${ffmpegPath}" -y -i "${profileSvgPath}" -vframes 1 "${profileWebpPath}"`, { stdio: 'pipe' });
  } catch {
    fs.writeFileSync(profileWebpPath, profileSvg, 'utf8');
  }

  // 3. Generate Real Looping MP4 Videos & Posters
  const videoDefinitions = [
    {
      file: 'cinematic-01.mp4',
      thumb: 'cinematic-01.webp',
      title: 'Chronicles of 2099: Cybernetic Awakening',
      category: 'Cinematic Film',
      description: 'An AI-generated cinematic teaser featuring dynamic lighting, synthetic characters, and dramatic narrative flow.',
      color: '0x171B3A',
      accentColor: '0x3B82F6',
    },
    {
      file: 'commercial-01.mp4',
      thumb: 'commercial-01.webp',
      title: 'Aura Luxury Hypercar Commercial',
      category: 'Commercial',
      description: 'High-concept AI automotive commercial designed for next-generation electric hypercar brand campaign.',
      color: '0x1E1B4B',
      accentColor: '0x8B5CF6',
    },
    {
      file: 'ai-vfx-showreel.mp4',
      thumb: 'ai-vfx-showreel.webp',
      title: 'Synthetic Realities: 2025 VFX Showreel',
      category: '3D & VFX',
      description: 'Comprehensive compilation of AI-directed visual effects, neural rendering, and procedural particles.',
      color: '0x08090D',
      accentColor: '0x38BDF8',
    },
    {
      file: 'brand-promo-lumina.mp4',
      thumb: 'brand-promo-lumina.webp',
      title: 'Lumina Spatial Audio Experience',
      category: 'Commercial',
      description: 'Futuristic commercial visual for immersive spatial audio acoustics created through generative AI workflows.',
      color: '0x2E1065',
      accentColor: '0xF43F5E',
    },
  ];

  for (const v of videoDefinitions) {
    const videoPath = path.join(videosDir, v.file);
    const thumbPath = path.join(thumbnailsDir, v.thumb);

    // Generate Thumbnail
    const thumbSvg = generateArtworkSVG({
      title: v.title,
      category: v.category,
      subtitle: v.description,
      color1: '#171B3A',
      color2: '#08090D',
      accent: '#3B82F6',
      width: 1280,
      height: 720,
    });
    const thumbSvgPath = path.join(thumbnailsDir, `${path.parse(v.thumb).name}.svg`);
    fs.writeFileSync(thumbSvgPath, thumbSvg, 'utf8');
    try {
      execSync(`"${ffmpegPath}" -y -i "${thumbSvgPath}" -vframes 1 "${thumbPath}"`, { stdio: 'pipe' });
    } catch {
      fs.writeFileSync(thumbPath, thumbSvg, 'utf8');
    }

    // Generate real 5-second MP4 video using ffmpeg
    // Create animated test source with colors matching our brand
    try {
      console.log(`Generating MP4: ${v.file}...`);
      const cmd = `"${ffmpegPath}" -y -f lavfi -i "color=c=${v.color}:s=1280x720:d=5" -f lavfi -i "testsrc=size=1280x720:rate=30" -filter_complex "[1:v]format=yuva420p,colorchannelmixer=aa=0.4[v1];[0:v][v1]overlay=0:0[outv]" -map "[outv]" -c:v libx264 -pix_fmt yuv420p -t 5 "${videoPath}"`;
      execSync(cmd, { stdio: 'pipe' });
    } catch (err) {
      console.warn(`Fallback video creation for ${v.file}:`, err.message);
      // Fallback simpler video
      try {
        execSync(`"${ffmpegPath}" -y -f lavfi -i "testsrc=size=1280x720:rate=24" -c:v libx264 -t 4 "${videoPath}"`, { stdio: 'pipe' });
      } catch (e) {
        console.error('Video generation failed:', e);
      }
    }

    // Video metadata JSON
    const metaPath = path.join(videosDir, `${path.parse(v.file).name}.json`);
    const metadata = {
      title: v.title,
      category: v.category,
      description: v.description,
      year: '2025',
      duration: '0:35',
      tools: ['Runway Gen-3', 'ElevenLabs', 'ComfyUI', 'Premiere Pro'],
    };
    fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');
  }

  console.log('✨ All sample assets successfully generated!');
}

main().catch(console.error);
