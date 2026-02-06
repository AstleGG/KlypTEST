
export type Platform = 'youtube' | 'tiktok';
export type Format = 'video' | 'audio';
export type Quality = 'low' | 'medium' | 'high' | '4k' | '1080p';

export interface MediaMetadata {
  title: string;
  author: string;
  thumbnail: string;
  duration?: string;
}

export interface DownloadState {
  status: 'idle' | 'fetching' | 'ready' | 'downloading' | 'completed' | 'error';
  progress: number;
  metadata?: MediaMetadata;
  error?: string;
}
