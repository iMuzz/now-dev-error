export interface IInfluencer {
  id: string
  slug: string
  fullName: string
  firstName: string
  lastName: string
  website?: string
  picture: string
  shortBio: string
  isLive: boolean
  podcastCount: number
  videoCount: number
  tweetCount: number
  essayCount: number
  podcasts: Array<string>
}

export interface IYoutubeVideo {
  id: string
  youtubeId: string
  title: string
  description: string
}
