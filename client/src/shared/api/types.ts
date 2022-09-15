// export type TypePostStatus = 'No published' | 'Published';

export enum TypePostStatus {
  'No published' = 'No published',
  'Published' = 'Published',
}

export type TypePost = {
  readonly id: string;
  title: string;
  content: string;
  createdAt: string;
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
