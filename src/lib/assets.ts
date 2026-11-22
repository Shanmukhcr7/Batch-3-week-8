import fs from 'fs';
import path from 'path';
import { AssetManifest, MediaItem } from '@/types';

const IMAGE_EXTENSIONS = new Set(['.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);

function filenameToTitle(filename: string): string {
  const nameWithoutExt = path.parse(filename).name;
  return nameWithoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function inferCategory(relPath: string, filename: string): string {
  const lower = (relPath + ' ' + filename).toLowerCase();
  if (lower.includes('commercial') || lower.includes('ad')) return 'Commercial';
  if (lower.includes('cinematic') || lower.includes('film')) return 'Cinematic Film';
  if (lower.includes('3d') || lower.includes('vfx') || lower.includes('render')) return '3D & VFX';
  if (lower.includes('character') || lower.includes('portrait') || lower.includes('devil') || lower.includes('ron')) return 'AI Character & Portrait';
  if (lower.includes('concept') || lower.includes('environment')) return 'Concept Art';
  if (/\b(web|app|software|dev|fullstack)\b/.test(lower)) return 'Web & App';
  return 'AI Artwork';
}

function scanSubdir(baseDir: string, currentSubdir: string = ''): (MediaItem & { ext: string; baseKey: string })[] {
  const dirPath = path.join(baseDir, currentSubdir);
  if (!fs.existsSync(dirPath)) return [];

  let items: (MediaItem & { ext: string; baseKey: string })[] = [];
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const relItemPath = path.join(currentSubdir, entry.name).replace(/\\/g, '/');
      const fullItemPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        items = items.concat(scanSubdir(baseDir, relItemPath));
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        const isImage = IMAGE_EXTENSIONS.has(ext);
        const isVideo = VIDEO_EXTENSIONS.has(ext);

        if (isImage || isVideo) {
          const stats = fs.statSync(fullItemPath);
          const title = filenameToTitle(entry.name);
          const category = inferCategory(relItemPath, entry.name);

          const baseName = path.parse(entry.name).name;
          const jsonPath = path.join(dirPath, `${baseName}.json`);
          let customMeta: Partial<MediaItem> = {};
          if (fs.existsSync(jsonPath)) {
            try {
              customMeta = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            } catch {}
          }

          items.push({
            id: relItemPath.replace(/[\/\.\s\(\)]/g, '-').toLowerCase(),
            baseKey: `${currentSubdir}/${baseName}`.toLowerCase(),
            filename: entry.name,
            ext,
            title: customMeta.title || title,
            description: customMeta.description || 'Cinematic production piece created by Shanmukh Veerepalli.',
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
  } catch (err) {
    console.error('Error scanning root assets directory:', err);
  }

  return items;
}

export function getMediaManifest(): AssetManifest {
  try {
    const rootAssetsDir = path.join(process.cwd(), 'assets');
    
    if (fs.existsSync(rootAssetsDir)) {
      const rawMedia = scanSubdir(rootAssetsDir);

      const extPriority: Record<string, number> = { '.webp': 1, '.avif': 2, '.png': 3, '.jpg': 4, '.jpeg': 5, '.svg': 6, '.mp4': 1, '.webm': 2, '.mov': 3 };
      const dedupMap = new Map<string, MediaItem>();

      for (const file of rawMedia) {
        const existing = dedupMap.get(file.baseKey) as (MediaItem & { ext: string }) | undefined;
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

      const allMedia = Array.from(dedupMap.values());

      const photos = allMedia
        .filter((m) => m.type === 'photo' && !m.path.includes('/thumbnails/') && !m.path.includes('/profile/'))
        .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());

      const videos = allMedia
        .filter((m) => m.type === 'video')
        .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());

      const thumbnails = allMedia.filter((m) => m.path.includes('/thumbnails/'));
      const profilePics = allMedia.filter((m) => m.path.includes('/profile/'));

      for (const video of videos) {
        const baseName = path.parse(video.filename).name;
        const matched = thumbnails.find((t) => path.parse(t.filename).name.toLowerCase() === baseName.toLowerCase());
        if (matched) {
          video.thumbnail = matched.path;
        } else {
          video.thumbnail = video.path;
        }
      }

      return {
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
    }
  } catch (e) {
    console.warn('Fallback to bundled manifest:', e);
  }

  try {
    const manifestPath = path.join(process.cwd(), 'src', 'data', 'assets-manifest.json');
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }
  } catch {}

  return {
    generatedAt: new Date().toISOString(),
    totalPhotos: 0,
    totalVideos: 0,
    profilePhoto: '/assets/profile/profile.webp',
    photos: [],
    videos: [],
    categories: { photos: [], videos: [] },
  };
}
