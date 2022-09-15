import { TypePost, TypeApiError } from 'shared/api';

type TypePostBase = Pick<TypePost, 'id' | 'title' | 'content' | 'status'>;
export type TypePaginationOptions = {
  current: number;
  minIndex: number;
  maxIndex: number;
  postsOnPage: number;
};
export type TypePostState = {
  posts: TypePost[] | any[];
  isOpenModal: boolean;
  postInfoForModal: TypeLocalPostInfo;
  pagination: TypePaginationOptions;
  notification: TypePostNotification;
  isLoading: boolean;
  errors: TypeApiError | null | undefined;
};

export type TypePostResponse = TypePost;
// TODO: typed to enum
export type TypePostNotification = null | {
  type: string;
  message: string;
};
type ModifyPostBase = Partial<TypePostBase['id']>;

export interface TypePostFormData extends Omit<TypePostBase, 'id'> {
  id?: ModifyPostBase;
  updatedby?: string;
  category_id: number;
  author_id: number;
}

export type TypePostItem = TypePost;

export type TypeLocalPostInfo = {
  info: { [key: string]: any };
  titleModal: 'Delete Post' | 'Edit Post' | 'Create Post' | '';
  operation: 'delete' | 'update' | 'create' | '';
};
