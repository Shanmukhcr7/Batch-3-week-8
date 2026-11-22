# Assets Directory — Shanmukh Veerepalli Portfolio

This directory powers the **Automatic Asset Discovery System** of the portfolio.

## Structure

```
assets/
│
├── photos/             # Drop your photography, AI art, concepts, and stills here
│   ├── cyber-samurai.webp
│   ├── neon-city.jpg
│   └── README.md
│
├── videos/             # Drop your MP4/WEBM/MOV video clips & commercials here
│   ├── commercial-nike-ai.mp4
│   ├── cinematic-odyssey.mp4
│   └── README.md
│
├── thumbnails/         # (Optional) Custom video posters matching the video's basename
│   ├── commercial-nike-ai.webp
│   └── README.md
│
├── projects/           # Deep-dive project folders (optional thumbnail and preview)
│   ├── project-01/
│   │   ├── thumbnail.webp
│   │   ├── preview.mp4
│   │   └── README.md
│   └── README.md
│
└── profile/            # Your profile photo (profile.webp or profile.jpg)
    ├── profile.webp
    └── README.md
```

## How It Works

1. Drop any image (`.webp`, `.jpg`, `.jpeg`, `.png`, `.avif`, `.svg`) into `assets/photos/`.
2. Drop any video (`.mp4`, `.webm`, `.mov`) into `assets/videos/`.
3. When running in development (`npm run dev`) or building for production (`npm run build`), the asset scanner will:
   - Synchronize files into the web-accessible directory.
   - Automatically format titles from filenames (e.g. `ai_cinematic_ad.mp4` -> "AI Cinematic Ad").
   - Categorize by filename keywords.
   - Generate `assets-manifest.json`.
4. You can also manually refresh the manifest anytime by running:
   ```bash
   npm run scan
   ```

## Optional Metadata JSON
To supply custom titles, tags, or descriptions for a specific file, create an adjacent `.json` file with the same name:
e.g. for `cyber-samurai.webp`, create `cyber-samurai.json`:
```json
{
  "title": "Ronin 2099: Cyber Samurai",
  "category": "Character Design",
  "description": "Photorealistic AI character render designed with custom LoRA and dynamic cinematic lighting.",
  "featured": true
}
```
If no JSON exists, titles and categories are automatically generated from the filename!
