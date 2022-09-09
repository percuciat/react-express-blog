export type Category = {
  id: number;
  category_name: string;
  author_id?: number;
  category_author?: {
    id: number;
    author_name: string;
  };
};

export type CategoryState = {
  categories: Category[];
  currentCategory: string;
  isLoading: boolean;
  errors: any;
};
