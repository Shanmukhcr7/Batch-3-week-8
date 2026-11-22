import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Root assets folder ONLY
const rootAssetsDir = path.join(rootDir, 'assets');
const publicManifestFile = path.join(rootDir, 'public', 'assets-manifest.json');
const srcManifestFile = path.join(rootDir, 'src', 'data', 'assets-manifest.json');

// Supported extensions
const IMAGE_EXTENSIONS = new Set(['.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function filenameToTitle(filename) {
  const nameWithoutExt = path.parse(filename).name;
  return nameWithoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function inferCategory(relPath, filename) {
  const lower = (relPath + ' ' + filename).toLowerCase();
  if (lower.includes('commercial') || lower.includes('ad')) return 'Commercial';
  if (lower.includes('cinematic') || lower.includes('film')) return 'Cinematic Film';
  if (lower.includes('3d') || lower.includes('vfx') || lower.includes('render')) return '3D & VFX';
  if (lower.includes('character') || lower.includes('portrait') || lower.includes('devil') || lower.includes('ron')) return 'AI Character & Portrait';
  if (lower.includes('concept') || lower.includes('environment')) return 'Concept Art';
  if (/\b(web|app|software|dev|fullstack)\b/.test(lower)) return 'Web & App';
  return 'AI Artwork';
}

function scanDirectory(baseDir, currentSubdir = '') {
  const dirPath = path.join(baseDir, currentSubdir);
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let rawFiles = [];

  for (const entry of entries) {
    const relItemPath = path.join(currentSubdir, entry.name).replace(/\\/g, '/');
    const fullItemPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      rawFiles = rawFiles.concat(scanDirectory(baseDir, relItemPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      const isImage = IMAGE_EXTENSIONS.has(ext);
      const isVideo = VIDEO_EXTENSIONS.has(ext);

      if (isImage || isVideo) {
        const title = filenameToTitle(entry.name);
        const category = inferCategory(relItemPath, entry.name);
        const stats = fs.statSync(fullItemPath);

        const baseName = path.parse(entry.name).name;
        const jsonPath = path.join(dirPath, `${baseName}.json`);
        let customMeta = {};
        if (fs.existsSync(jsonPath)) {
          try {
            customMeta = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          } catch (e) {
            console.warn(`Error parsing metadata JSON for ${entry.name}:`, e.message);
          }
        }

        rawFiles.push({
          id: relItemPath.replace(/[\/\.\s\(\)]/g, '-').toLowerCase(),
          baseKey: `${currentSubdir}/${baseName}`.toLowerCase(),
          filename: entry.name,
          ext,
          title: customMeta.title || title,
          description: customMeta.description || `Cinematic production piece created by Shanmukh Veerepalli.`,
          category: customMeta.category || category,
          tags: customMeta.tags || [category, isVideo ? 'Video' : 'Visual Art', 'Shanmukh AI'],
          type: isVideo ? 'video' : 'photo',
          path: `/assets/${encodeURI(relItemPath)}`,
          size: stats.size,
          updatedAt: stats.mtime.toISOString(),
          aspectRatio: customMeta.aspectRatio || (isVideo ? '16/9' : '4/5'),
          featured: Boolean(customMeta.featured),
          ...customMeta,
        });
      }
    }
  }

  // Deduplicate by baseKey: Prefer .webp, .png, .jpg, .avif over .svg
  const extPriority = { '.webp': 1, '.avif': 2, '.png': 3, '.jpg': 4, '.jpeg': 5, '.svg': 6, '.mp4': 1, '.webm': 2, '.mov': 3 };
  const dedupMap = new Map();

  for (const file of rawFiles) {
    const existing = dedupMap.get(file.baseKey);
    if (!existing) {
      dedupMap.set(file.baseKey, file);
    } else {
      const existingPri = extPriority[existing.ext] || 99;
      const currentPri = extPriority[file.ext] || 99;
      if (currentPri < existingPri) {
        dedupMap.set(file.baseKey, file);
      }
    }
  }

  return Array.from(dedupMap.values());
}

export function buildManifest() {
  console.log('⚡ Scanning root assets/ directory for Shanmukh Portfolio...');

  const subdirs = ['photos', 'videos', 'thumbnails', 'projects', 'profile'];
  for (const sub of subdirs) {
    ensureDir(path.join(rootAssetsDir, sub));
  }

  // Scan ONLY root assets directory
  const allMedia = scanDirectory(rootAssetsDir);

  const photos = allMedia
    .filter((m) => m.type === 'photo' && !m.path.includes('/thumbnails/') && !m.path.includes('/profile/'))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const videos = allMedia
    .filter((m) => m.type === 'video')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const thumbnails = allMedia.filter((m) => m.path.includes('/thumbnails/'));
  const profilePics = allMedia.filter((m) => m.path.includes('/profile/'));

  for (const video of videos) {
    const baseName = path.parse(video.filename).name;
    const matchedThumb = thumbnails.find((t) => path.parse(t.filename).name.toLowerCase() === baseName.toLowerCase());
    if (matchedThumb) {
      video.thumbnail = matchedThumb.path;
    } else {
      video.thumbnail = video.path;
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalPhotos: photos.length,
    totalVideos: videos.length,
    profilePhoto: profilePics[0]?.path || '/assets/profile/profile.webp',
    photos,
    videos,
    categories: {
      photos: Array.from(new Set(photos.map((p) => p.category))),
      videos: Array.from(new Set(videos.map((v) => v.category))),
    },
  };

  ensureDir(path.dirname(publicManifestFile));
  ensureDir(path.dirname(srcManifestFile));

  fs.writeFileSync(publicManifestFile, JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(srcManifestFile, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`✅ Asset Discovery Complete (Root assets/ only)!`);
  console.log(`   - Unique Photos found: ${photos.length}`);
  console.log(`   - Unique Videos found: ${videos.length}`);
  return manifest;
}

buildManifest();
