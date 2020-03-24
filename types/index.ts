export interface IStyle {
  color: string
  background: string
}

export interface IThemeProps {
  theme: IStyle
}

export interface IPodcastEpisode {
  _id: string
  title: string
  thumbnail: string
  description: string
  podcastId: string
  audio: string
  listennotes_url: string
}

export interface IYoutubeVideo {
  id: string
  youtubeId: string
  title: string
  description: string
  viewCount: number
  likeCount: number
}

export interface IInfluencer {
  id: string
  isLive: boolean
  slug: string
  firstName: string
  lastName: string
  website: string
  picture: string
  bio: string
}

export interface IEssay {
  id: string
  picture?: string
  title: string
  description: string
  pageUrl: string
  html: string
  author: string
  date: string
}

export interface ITweet {
  id: string
  tweetID: string
  title: string
  description: string
  type: string
  tweetUrlId: string
}
