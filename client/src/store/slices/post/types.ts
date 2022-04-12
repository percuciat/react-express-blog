export type Post = {
  _id: number;
  title: string;
  content: string;
  category: string;
};

export type PostsState = {
  posts: Post[];
  isLoading: boolean;
  errors: any;
};
