export type MediaType = 'photo' | 'video';

export interface MediaItem {
  id: string;
  filename: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: string;
  tags?: string[];
  type: MediaType;
  path: string;
  thumbnail?: string;
  size?: number;
  updatedAt?: string;
  aspectRatio?: string;
  featured?: boolean;
  client?: string;
  year?: string;
  tools?: string[];
}

export interface AssetManifest {
  generatedAt: string;
  totalPhotos: number;
  totalVideos: number;
  profilePhoto: string;
  photos: MediaItem[];
  videos: MediaItem[];
  categories: {
    photos: string[];
    videos: string[];
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  videoPreview?: string;
  tools: string[];
  year: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  link?: string;
}

export interface ExpertiseItem {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  tags: string[];
  highlightColor?: string;
}

export interface TechItem {
  name: string;
  category: 'Development' | 'AI & Generative Tech' | 'Creative Production' | 'Tools';
  proficiency: number;
  icon?: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
  featured?: boolean;
}
