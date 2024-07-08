export interface createCommentData {
  content: string,
  postId: string
}

export interface commentResponse {
  comment: {
    id: string,
    content: string,
    userId: string,
    postId: string,
    createdAt: Date
  }
}

export interface updateCommentData{
  content: string,
  userId: string
} 