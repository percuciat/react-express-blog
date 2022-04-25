import { Post } from 'store/slices/post/types';

export type TPaginationOptions = {
  current: number;
  minIndex: number;
  maxIndex: number;
  postsOnPage: number;
};

export type TListElem = Post;
/*  
    | TListElem
    | {
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        loading: boolean;
      } */

export type TLocalPostInfo = {
  info: { [key: string]: any };
  titleModal: 'Delete Post' | 'Edit Post' | 'Create Post' | '';
  operation: 'delete' | 'update' | 'create' | '';
};

export type TPostListProps = {
  setShowModal: (a: boolean) => void;
  setLocalPostInfo: (a: TLocalPostInfo) => void;
};

export type TPostListItemProps = {
  elementList: any;
  deletePostHandler: (a: Post) => void;
  updatePostHandler: (a: Post) => void;
};
