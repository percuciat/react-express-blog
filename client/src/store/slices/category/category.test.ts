import MockAdapter from 'axios-mock-adapter';
import { store, TStore } from 'store';
import { axiosCommon } from 'api';
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  setCurrentCategory,
} from 'store/slices/category/actions';
import {
  selectCategoryData,
  selectCategoryErrors,
  selectCurrentCategory,
  selectIsLoading,
} from 'store/slices/category';

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
  let _store: ReturnType<TStore>;

  beforeEach(() => {
    mock = new MockAdapter(axiosCommon);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Fetch Category data', async () => {
    _store = store();
    let mockResult = {
      data: [
        {
          _id: 23232,
          name: 'birds',
        },
        {
          _id: 23732,
          name: 'vehicles',
        },
      ],
    };
    mock.onGet(`/category`).reply(200, mockResult);

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
            _id: 23232,
            name: 'birds',
          },
          {
            _id: 23732,
            name: 'vehicles',
          },
        ],
      },
    });
    let mockResult = {
      data: {
        _id: 21232,
        name: 'cats',
      },
    };
    let mockCategory = { category: 'cats' };
    mock.onPost(`/category/create`).reply(200, mockResult);

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
            _id: 23232,
            name: 'birds',
          },
          {
            _id: 23732,
            name: 'vehicles',
          },
          {
            _id: 21232,
            name: 'cats',
          },
        ],
      },
    });
    let mockResult = {
      data: {
        _id: 23232,
        name: 'birds',
      },
    };
    let mockCategory = { _id: 23232 };
    mock.onDelete(`/category/delete`).reply(200, mockResult);

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
