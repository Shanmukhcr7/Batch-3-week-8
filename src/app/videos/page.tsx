import { Metadata } from "next";
import { getMediaManifest } from "@/lib/assets";
import { VideoGallery } from "@/components/video/VideoGallery";

export const metadata: Metadata = {
  title: "Videos & Cinematic Commercials",
  description:
    "Explore AI-generated commercials, cinematic teasers, 3D visual effects, and narrative films by Shanmukh Veerepalli.",
};

export const dynamic = "force-dynamic";

export default function VideosPage() {
  const manifest = getMediaManifest();

  return (
    <div className="pt-24">
      <VideoGallery
        initialVideos={manifest.videos}
        categories={manifest.categories.videos}
      />
    </div>
  );
}
