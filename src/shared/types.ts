export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

export type FeedbackType = 'like' | 'dislike' | null;
export type FeedbackActionType = 'like' | 'dislike';

export interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount?: string;
  favoriteCount: string;
  commentCount: string;
  feedback?: FeedbackType;
}

export interface YouTubeChannel {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics?: Statistics;
  channelInfo?: YouTubeChannel;
}

export interface YouTubeVideoResponse {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: Snippet;
  statistics?: Statistics;
  channelInfo?: YouTubeChannel;
}

export interface YouTubeDetailsVideoResponse {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface YouTubeVideoListResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: YouTubeVideoResponse[];
}

export interface YouTubeVideoDetailsResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: YouTubeDetailsVideoResponse[];
}
export interface Feedback {
  movie: YouTubeVideo;
  feedback: FeedbackType;
}

export interface YouTubeChannelResponse {
  items: YouTubeChannel[];
}

export type PasswordStrenght = {
  passwordStrenght: {
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialCharacter: boolean;
    hasMinimumLength: boolean;
  };
};
