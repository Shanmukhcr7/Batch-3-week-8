import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".json": "application/json",
};

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const rawPath = params.path ? params.path.join("/") : "";
    const decodedPath = decodeURIComponent(rawPath);
    
    // Resolve absolute path inside root assets/ directory
    const rootAssetsDir = path.join(process.cwd(), "assets");
    const filePath = path.resolve(rootAssetsDir, decodedPath);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(rootAssetsDir)) {
      return new NextResponse("Access Denied", { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Asset Not Found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return new NextResponse("Not a file", { status: 400 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    // Handle Video Streaming with HTTP Range requests (206 Partial Content)
    const range = request.headers.get("range");

    if (range && (ext === ".mp4" || ext === ".webm" || ext === ".mov")) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunkSize = end - start + 1;

      const fileStream = fs.createReadStream(filePath, { start, end });

      // Convert Node readable stream to Web Stream for Next.js Response
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Standard static file response (images, svgs, json, whole media)
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error serving asset:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
