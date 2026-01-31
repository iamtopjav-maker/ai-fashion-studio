
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface ModelPersona {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  ERROR = 'ERROR'
}

export type Language = 'VN' | 'EN';
