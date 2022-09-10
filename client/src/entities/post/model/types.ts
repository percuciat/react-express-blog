import { TypePost, TypeCategory } from 'shared/api';

type TypePostBase = Pick<TypePost, 'id' | 'title' | 'content' | 'status'>;

export type TypePostState = {
  posts: TypePost[] | any[];
  isOpenModal: boolean;
  postInfoForModal: TypeLocalPostInfo;
  isLoading: boolean;
  errors: any;
};

export type TypePostResponse = TypePost;

export type TypePaginationOptions = {
  current: number;
  minIndex: number;
  maxIndex: number;
  postsOnPage: number;
};

/* export type TypePostFormData =
  | TypePostBase
  | {
      category_id: number;
      author_id: number;
    }; */

type ModifyPostBase = Partial<TypePostBase['id']>;

export interface TypePostFormData extends Omit<TypePostBase, 'id'> {
  id?: ModifyPostBase;
  category_id: number;
  author_id: number;
}

export type TypePostListForm =
  | Pick<TypePostState, 'postInfoForModal'>
  | {
      categories: Array<TypeCategory>;
    };

// props
export type TypeListItem = TypePost;
export type TypePostList = {
  posts: Array<TypePost>;
  categories: Array<TypeCategory>;
};
export type TypeLocalPostInfo = {
  info: { [key: string]: any };
  titleModal: 'Delete Post' | 'Edit Post' | 'Create Post' | '';
  operation: 'delete' | 'update' | 'create' | '';
};
