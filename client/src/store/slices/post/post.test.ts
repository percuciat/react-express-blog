import MockAdapter from 'axios-mock-adapter';
import { store, TStore } from 'store';
import { axiosCommon } from 'api';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { fetchPosts, deletePost, updatePost, createPost } from 'store/slices/post/actions';
import { selectPostData, selectPostErrors, selectPostLoading } from 'store/slices/post';

describe('post Selectors', () => {
  let state = store().getState();
  test('init selectPostData', () => {
    expect(selectPostData(state)).toEqual([]);
  });
  test('init selectPostErrors', () => {
    expect(selectPostErrors(state)).toEqual({});
  });
  test('init selectPostLoading', () => {
    expect(selectPostLoading(state)).toBe(false);
  });
});

describe('post Actions', () => {
  /*  let action: AsyncThunkAction<void, any, {}>;
  let dispatch: Dispatch;
  let arg: any; */

  let mock: MockAdapter;
  let _store: ReturnType<TStore>;

  beforeEach(() => {
    mock = new MockAdapter(axiosCommon);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Fetch Post data', async () => {
    _store = store();
    let mockResult = {
      data: [
        {
          _id: 23232,
          title: 'Fetch title',
          content: 'Fetch content',
          category: 'birds',
        },
      ],
    };
    mock.onGet(`/post`, { params: { category: '' } }).reply(200, mockResult);

    await _store.dispatch(fetchPosts({ category: '' })).then((result) => {
      expect(result.type).toBe('post/FETCH_POSTS/fulfilled');
      expect(result.payload).toEqual(mockResult.data);
    });
    let newStore = _store.getState().post;
    expect(newStore.posts).toEqual(mockResult.data);
  });

  it('Create Post data', async () => {
    _store = store({
      post: {
        posts: [
          {
            _id: 23232,
            title: 'Fetch title',
            content: 'Fetch content',
            category: 'birds',
          },
        ],
      },
    });
    let mockData = { title: 'test', content: 'test content', category: 'birds' };
    let mockResult = {
      data: {
        _id: 23355,
        ...mockData,
      },
    };

    mock.onPost(`/post/create`).reply(200, mockResult);
    await _store.dispatch(createPost(mockData)).then((result) => {
      expect(result.type).toBe('post/CREATE_POST/fulfilled');
      expect(result.payload).toEqual(mockResult.data);
    });
    let newStore = _store.getState().post;
    expect(newStore.posts).toContainEqual(mockResult.data);
  });

  it('Delete Post data', async () => {
    let mockDeleted = {
      _id: 23242,
      title: 'Cool',
      content: 'Body content',
      category: 'birds',
    };
    let mockResult = {
      data: {
        ...mockDeleted,
      },
    };

    _store = store({
      post: {
        posts: [
          {
            _id: 23232,
            title: 'alalal',
            content: 'content',
            category: 'birds',
          },
          { ...mockDeleted },
          { _id: 23355, title: 'test', content: 'test content', category: 'birds' },
        ],
      },
    });
    mock.onDelete(`/post/delete`).reply(200, mockResult);

    await _store.dispatch(deletePost(mockDeleted)).then((result) => {
      expect(result.type).toBe('post/DELETE_POST/fulfilled');
      expect(result.payload).not.toContain(mockDeleted);
    });
    let newStore = _store.getState().post;
    expect(newStore.posts).not.toContainEqual(mockDeleted);
  });

  it('Update Post data', async () => {
    let mockData = {
      _id: 23232,
      title: 'test 2 changed',
      content: 'test content changed',
      category: 'birds',
    };
    _store = store({
      post: {
        posts: [
          { _id: 23237, title: 'test 1', content: 'test 1 content', category: 'birds' },
          { _id: 23232, title: 'test 2', content: 'test 2 content', category: 'birds' },
        ],
      },
    });
    let mockResult = {
      data: mockData,
    };
    mock.onPut(`/post/update`).reply(200, mockResult);

    await _store.dispatch(updatePost(mockData)).then((result) => {
      expect(result.type).toBe('post/UPDATE_POST/fulfilled');
      expect(result.payload).toEqual(mockResult.data);
    });
    let newStore = _store.getState().post;
    expect(newStore.posts.length).toEqual(2);
    expect(newStore.posts).toContainEqual(mockData);
  });
});
