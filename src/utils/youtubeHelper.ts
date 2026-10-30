/**
 * YouTube Utility for In-Website Embed and Zero-Redirect Playback
 * Supports standard URLs, short URLs, live streams, channel streams, and embed URLs.
 */

export interface ParsedYouTube {
  type: 'video' | 'channel';
  id: string;
}

/**
 * Extracts a YouTube Video ID or channel stream ID from any YouTube URL.
 */
export function extractYouTubeId(urlOrId: string): ParsedYouTube | null {
  if (!urlOrId) return null;
  const clean = urlOrId.trim();

  // 1. Channel live stream: channel=UC...
  const channelMatch = clean.match(/channel=([a-zA-Z0-9_-]+)/);
  if (channelMatch) {
    return { type: 'channel', id: channelMatch[1] };
  }

  // 2. Already an 11-char YouTube ID (e.g. HFsWD539TxQ)
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return { type: 'video', id: clean };
  }

  // 3. Short URL: https://youtu.be/VIDEO_ID
  const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) {
    return { type: 'video', id: shortMatch[1] };
  }

  // 4. Standard URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) {
    return { type: 'video', id: watchMatch[1] };
  }

  // 5. Live stream URL: https://www.youtube.com/live/VIDEO_ID
  const liveMatch = clean.match(/\/live\/([a-zA-Z0-9_-]{11})/);
  if (liveMatch) {
    return { type: 'video', id: liveMatch[1] };
  }

  // 6. Embed URL: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = clean.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) {
    return { type: 'video', id: embedMatch[1] };
  }

  // 7. General regex fallback for any 11-char pattern after / or =
  const generalMatch = clean.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[&?]|$)/);
  if (generalMatch) {
    return { type: 'video', id: generalMatch[1] };
  }

  return null;
}

/**
 * Generates an in-website YouTube embed URL configured for no-redirect, in-app playback.
 */
export function getYouTubeEmbedUrl(urlOrId: string, autoplay = true): string {
  if (!urlOrId) return '';
  const parsed = extractYouTubeId(urlOrId);

  const autoParam = autoplay ? '1' : '0';

  if (!parsed) {
    // If it's already an embed URL, append autoplay parameters
    if (urlOrId.includes('/embed/')) {
      const glue = urlOrId.includes('?') ? '&' : '?';
      return `${urlOrId}${glue}autoplay=${autoParam}&rel=0&modestbranding=1&playsinline=1`;
    }
    return urlOrId;
  }

  if (parsed.type === 'channel') {
    return `https://www.youtube-nocookie.com/embed/live_stream?channel=${parsed.id}&autoplay=${autoParam}&rel=0&playsinline=1`;
  }

  return `https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=${autoParam}&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`;
}

/**
 * Generates high-definition thumbnail image URL for YouTube videos.
 */
export function getYouTubeThumbnailUrl(urlOrId: string): string {
  const parsed = extractYouTubeId(urlOrId);
  if (parsed && parsed.type === 'video') {
    return `https://img.youtube.com/vi/${parsed.id}/hqdefault.jpg`;
  }
  return '';
}
