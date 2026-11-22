import { Metadata } from "next";
import { getMediaManifest } from "@/lib/assets";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";

export const metadata: Metadata = {
  title: "Photos & Visual Artworks",
  description:
    "Curated photography, generative AI stills, 3D conceptual renders, and character artworks by Shanmukh Veerepalli.",
};

export const dynamic = "force-dynamic";

export default function PhotosPage() {
  const manifest = getMediaManifest();

  return (
    <div className="pt-24">
      <PhotoGallery
        initialPhotos={manifest.photos}
        categories={manifest.categories.photos}
      />
    </div>
  );
}
