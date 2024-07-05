export interface createBlogData {
  title: string,
  content: string
}

export interface updateBlogData {
  title?: string,
  content: string
}

export interface blogResponse {
  blog: {
    id: string
    title: string,
    content: string
    published: boolean
    authorId: string
    createdAt: Date
  };
}

export interface getBlogResponse {
  blog: {
    id: string
    title: string,
    content: string
    createdAt: Date
    author: {
      firstName: string
    }
  } 
}


export interface getBulkBlogResponse {
  blogs: {
    id: string
    title: string,
    content: string
    createdAt: Date
    author: {
      firstName: string
    };
  }[]; 
}

