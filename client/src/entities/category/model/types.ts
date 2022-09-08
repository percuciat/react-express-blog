export type Category = {
  _id: number;
  name: string;
};

export type CategoryState = {
  categories: Category[];
  currentCategory: string;
  isLoading: boolean;
  errors: any;
};
