export type RootVideo = {
  api: ApiData
}

export type ApiData = {
  service: string
  status: string
  message: string
  id: string
  title: boolean
  description: boolean
  previewUrl: string
  imagePreviewUrl: string
  permanentLink: string
  userInfo: UserInfo
  userStats: UserStats
  mediaStats: MediaStats
  mediaItems: MediaItem[]
}

export type UserInfo = {
  name: string
  userCategory: boolean
  userBio: boolean
  username: boolean
  userId: string
  userAvatar: string
  userPhone: boolean
  userEmail: boolean
  externalUrl: boolean
  isVerified: boolean
}

export type UserStats = {
  mediaCount: boolean
  followersCount: boolean
  followingCount: boolean
  likesCount: boolean
}

export type MediaStats = {
  likesCount: string
  commentsCount: number
  favouritesCount: boolean
  sharesCount: number
  viewsCount: string
  downloadsCount: boolean
}

export type MediaItem = {
  type: string
  name: string
  mediaId: string
  mediaUrl: string
  mediaPreviewUrl: any
  mediaThumbnail: string
  mediaRes: any
  mediaQuality: string
  mediaDuration: string
  mediaExtension: string
  mediaFileSize: string
  mediaTask: string
}
