// export type TypePostStatus = 'No published' | 'Published';

enum TypePostStatus {
  'No published',
  'Published',
}

export type TypePost = {
  readonly id: string;
  title: string;
  content: string;
  status: TypePostStatus;
  post_category: TypeCategory;
  post_author: TypeAuthor;
};

export type TypeCategory = {
  readonly id: number;
  category_name: string;
  category_author: TypeAuthor;
};

type TypeAuthor = {
  readonly id: number;
  author_name: string;
};
