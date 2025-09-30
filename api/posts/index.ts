import type {
  Post,
  PostsResponse,
  CreatePostPayload,
  CreatePostResponse,
  DeletePostResponse,
  ApiResponse,
} from '~/api/posts/types'

/**
 * 新增文章
 */
export const createPost = async (payload: CreatePostPayload) => {
  const { $api } = useNuxtApp()
  const res = await $api.post<CreatePostResponse>('/posts', payload)
  return { data: res.data, status: res.status }
}

/**
 * 刪除文章
 */
export const deletePost = async (id: number) => {
  const { $api } = useNuxtApp()
  const res = await $api.delete<DeletePostResponse>(`/posts/${id}`)
  return { data: res.data, status: res.status }
}

/**
 *  取得文章列表
 */
export const getPosts = async ({
  page = 1,
  perPage = 10,
}): Promise<PostsResponse> => {
  const { $api } = useNuxtApp()
  const res = await $api.get('/posts', {
    params: {
      page,
      per_page: perPage,
    },
  })

  return res.data.data
}

/**
 * 取得單一文章
 */
export const getPost = async (id: number): Promise<ApiResponse<Post>> => {
  const { $api } = useNuxtApp()
  const res = await $api.get(`/posts/${id}`)
  return {
    data: res.data.data,
    status: res.status,
  }
}

/**
 * 更新文章
 */
export const updatePost = async (id: number, payload: Partial<Post>) => {
  const { $api } = useNuxtApp()
  const res = await $api.patch<Post>(`/posts/${id}`, payload)
  return { data: res.data, status: res.status }
}
