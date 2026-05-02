import { useEffect, useRef } from "react";
import Hls from "hls.js";

type HlsVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Native video attributes — sensible defaults for hero/background use */
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  ariaLabel?: string;
};

/**
 * Plays an HLS (.m3u8) source via hls.js, falling back to native
 * playback on browsers with built-in HLS (Safari/iOS).
 */
export default function HlsVideo({
  src,
  poster,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  preload = "auto",
  ariaLabel,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: Hls | null = null;
    const isHls = src.endsWith(".m3u8") || src.includes(".m3u8?");

    if (!isHls) {
      video.src = src;
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari / iOS — native HLS
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      // Last-resort fallback — direct assignment
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
        hls = null;
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={preload}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
