import { TypeCategory } from 'shared/api';

type TypeCategoryBase = Pick<TypeCategory, 'id' | 'category_name'>;

export type TypeCategoryResponse = TypeCategory;

export type TypeCategoryRequest =
  | TypeCategoryBase
  | {
      author_id: number;
    };

export type TypeCategoryState = {
  categories: TypeCategoryResponse[] | any[];
  currentCategory: string;
  isLoading: boolean;
  errors: any;
};
