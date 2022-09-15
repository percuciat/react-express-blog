import { TypeCategory } from 'shared/api';

type TypeCategoryBase = Pick<TypeCategory, 'id' | 'category_name'>;

export type TypeCategoryResponse = TypeCategory;

export type TypeCategoryFormCreate =
  | TypeCategoryBase
  | {
      author_id: number;
    };

export type TypeCategoryState = {
  categories: TypeCategoryResponse[] | any[];
  currentCategory: string;
  isOpenModal: boolean;
  categoryInfoForModal: TypeCategoryInfoForModal;
  isLoading: boolean;
  errors: any;
};

export type TypeCategoryInfoForModal = {
  info: { [key: string]: any };
  titleModal: 'Delete category' | 'Restore category' | 'Create category' | '';
  operation: 'delete' | 'restore' | 'create' | '';
};
