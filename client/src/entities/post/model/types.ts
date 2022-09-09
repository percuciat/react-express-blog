export type Post = {
  id: string;
  title: string;
  content: string;
  category: string;
  author?: string
};

export type PostsState = {
  posts: Post[];
  isOpenModal: boolean;
  postInfoForModal: TypeLocalPostInfo;
  isLoading: boolean;
  errors: any;
};

export type TypePaginationOptions = {
  current: number;
  minIndex: number;
  maxIndex: number;
  postsOnPage: number;
};

export type TypePostListForm = {
  postInfoForModal: TypeLocalPostInfo;
  categories: Array<PostCategory>;
};
export type TypeListItem = Post;

export type TypeLocalPostInfo = {
  info: { [key: string]: any };
  titleModal: 'Delete Post' | 'Edit Post' | 'Create Post' | '';
  operation: 'delete' | 'update' | 'create' | '';
};

export type PostCategory = {
  id: string;
  category_name: string;
};

export type TypePostList = {
  posts: Post[];
  categories: Array<PostCategory>;
};

export type TypePostItemActions = {
  handler: (element) => void;
};

export type TypePostListItem = {
  postItem: any;
  /*  deletePostHandler: (a: Post) => void;
  updatePostHandler: (a: Post) => void; */
};
