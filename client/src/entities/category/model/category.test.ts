import MockAdapter from 'axios-mock-adapter';
import { store, TypeStore } from 'shared/config/store';
import { axiosConfig } from 'shared/api';
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  setCurrentCategory,
  selectCategoryData,
  selectCategoryErrors,
  selectCurrentCategory,
  selectIsLoading,
} from '../index';

describe('category Selectors', () => {
  let state = store().getState();

  test('init selectCategoryData', () => {
    expect(selectCategoryData(state)).toEqual([]);
  });
  test('init selectCurrentCategory', () => {
    expect(selectCurrentCategory(state)).toEqual('');
  });
  test('init selectCategoryErrors', () => {
    expect(selectCategoryErrors(state)).toEqual({});
  });
  test('init selectIsLoading', () => {
    expect(selectIsLoading(state)).toBe(false);
  });
});

describe('category Actions', () => {
  let mock: MockAdapter;
  let _store: ReturnType<TypeStore>;

  beforeEach(() => {
    mock = new MockAdapter(axiosConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Fetch Category data', async () => {
    _store = store();
    let mockResult = {
      data: [
        {
          id: 1,
          category_name: 'birds',
          category_author: {
            id: 1,
            author_name: 'Peter David',
          },
        },
        {
          id: 2,
          category_name: 'vehicles',
          category_author: {
            id: 2,
            author_name: 'Test 2',
          },
        },
      ],
    };
    mock.onGet(`/post/category`).reply(200, mockResult);

    await _store.dispatch(fetchCategories()).then((result) => {
      expect(result.type).toBe('category/FETCH_CATEGORIES/fulfilled');
      expect(result.payload).toEqual(mockResult.data);
    });
    let newStore = _store.getState().category;
    expect(newStore.categories).toEqual(mockResult.data);
  });

  it('Create Category data', async () => {
    _store = store({
      category: {
        categories: [
          {
            id: 1,
            category_name: 'birds',
            category_author: {
              id: 2,
              author_name: 'Test 2',
            },
          },
          {
            id: 2,
            category_name: 'vehicles',
            category_author: {
              id: 2,
              author_name: 'Test 2',
            },
          },
        ],
      },
    });
    let mockResult = {
      data: {
        id: 3,
        category_name: 'cats',
        category_author: {
          id: 3,
          author_name: 'Test 3',
        },
      },
    };
    let mockCategory = { category_name: 'cats', author_id: 3 };
    mock.onPost(`/post/category`).reply(200, mockResult);

    await _store.dispatch(createCategory(mockCategory)).then((result) => {
      expect(result.type).toBe('category/CREATE_CATEGORY/fulfilled');
      expect(result.payload).toEqual(mockResult.data);
    });
    let newStore = _store.getState().category;
    expect(newStore.categories).toContainEqual(mockResult.data);
  });

  it('Delete Category data', async () => {
    _store = store({
      category: {
        categories: [
          {
            id: 1,
            category_name: 'birds',
            category_author: {
              id: 2,
              author_name: 'Test 2',
            },
          },
          {
            id: 2,
            category_name: 'vehicles',
            category_author: {
              id: 2,
              author_name: 'Test 2',
            },
          },
          {
            id: 3,
            category_name: 'cats',
            category_author: {
              id: 3,
              author_name: 'Test 3',
            },
          },
        ],
      },
    });
    let mockResult = {
      data: 1,
    };
    let mockCategory = 3;
    mock.onDelete(`/post/category/id/:id`).reply(200, mockResult);

    await _store.dispatch(deleteCategory(mockCategory)).then((result) => {
      expect(result.type).toBe('category/DELETE_CATEGORY/fulfilled');
      expect(result.payload).toEqual(mockResult.data);
    });
    let newStore = _store.getState().category;
    expect(newStore.categories).not.toContainEqual(mockResult.data);
  });

  it('SetCurrentCategory Category data', async () => {
    _store = store({
      category: {
        currentCategory: 'birds',
      },
    });

    let mockCategory = 'vehicles';

    _store.dispatch(setCurrentCategory(mockCategory));
    let newStore = _store.getState().category;
    expect(newStore.currentCategory).toEqual(mockCategory);
  });
});
