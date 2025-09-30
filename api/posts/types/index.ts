export interface Post {
  id: number
  title: string
  slug?: string
  meta_description?: string
  content: string
  author: string
  is_enabled: number
  is_pinned: number
  og_image: string
  status: string
}

export interface CreatePostPayload {
  title: string
  slug: string
  metaDescription: string
  content: string
}

export interface CreatePostResponse {
  data: Post
  status: number
}

export interface DeletePostResponse {
  message: string
  status: number
}

export interface PostsResponse {
  data: Post[]
  total: number
  current_page: number
  per_page: number
  status: number
}

export interface ApiResponse<T> {
  data: T
  status: number
}
