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
  id: string
  postId: string
} 

export interface getAllComments {
  comments: Array<{
    id: string,
    content: string,
    userId: string,
    postId: string,
    createdAt: Date,
    author: {
      firstName: string
    }
  }>
}