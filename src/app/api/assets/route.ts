import { NextResponse } from 'next/server';
import { getMediaManifest } from '@/lib/assets';

export const dynamic = 'force-dynamic';

export async function GET() {
  const manifest = getMediaManifest();
  return NextResponse.json(manifest);
}
