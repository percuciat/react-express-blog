import MockAdapter from 'axios-mock-adapter';
import { store, TypeStore } from 'shared/config';
import { axiosConfig } from 'shared/api';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import {
  selectPostData,
  selectPostErrors,
  selectPostLoading,
  fetchPosts,
  deletePost,
  updatePost,
  createPost,
} from './index';

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
  let _store: ReturnType<TypeStore>;

  beforeEach(() => {
    mock = new MockAdapter(axiosConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Fetch Post data', async () => {
    _store = store();
    let mockResult = {
      data: [
        {
          id: '23232',
          title: 'Fetch title',
          content: 'Fetch content',
          status: 'Not publised',
          post_category: {
            id: 1,
            category_name: 'birds',
          },
          post_author: {
            id: 1,
            author_name: 'test auth',
          },
        },
      ],
    };
    mock.onGet(`/post`, { params: {} }).reply(200, mockResult);

    await _store.dispatch(fetchPosts()).then((result) => {
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
            id: '23232',
            title: 'Fetch title',
            content: 'Fetch content',
            status: 'No published',
            category_id: 1,
            author_id: 2,
          },
        ],
      },
    });
    let mockData = {
      title: 'test',
      content: 'test content',
      status: 'No published',
      category_id: 1,
      author_id: 2,
    } as any;
    let mockResult = {
      data: {
        id: '23355',
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
      id: '23242',
      title: 'Cool',
      content: 'Body content',
      status: 'No published',
      post_category: {
        id: 1,
        category_name: 'cats',
      },
      post_author: {
        id: 1,
        author_name: 'Jacky Chan',
      },
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
            id: '23232',
            title: 'alalal',
            content: 'content',
            status: 'No published',
            post_category: {
              id: 1,
              category_name: 'cats',
            },
            post_author: {
              id: 1,
              author_name: 'Jacky Chan',
            },
          },
          { ...mockDeleted },
          {
            id: '23355',
            title: 'test',
            content: 'test content',
            status: 'No published',
            post_category: {
              id: 1,
              category_name: 'dogs',
            },
            post_author: {
              id: 1,
              author_name: 'Willy Chan',
            },
          },
        ],
      },
    });
    mock.onDelete(`/post/delete`).reply(200, mockResult);

    await _store.dispatch(deletePost(mockDeleted.id)).then((result) => {
      expect(result.type).toBe('post/DELETE_POST/fulfilled');
      expect(result.payload).not.toContain(mockDeleted);
    });
    let newStore = _store.getState().post;
    expect(newStore.posts).not.toContainEqual(mockDeleted);
  });

  it('Update Post data', async () => {
    let mockData = {
      id: '23232',
      title: 'test 2 changed',
      content: 'test content changed',
      status: 'No published',
      category_id: 2,
      author_id: 1,
    } as any;
    _store = store({
      post: {
        posts: [
          {
            id: '23237',
            title: 'test 1',
            content: 'test 1 content',
            status: 'No published',
            post_category: {
              id: 1,
              category_name: 'dogs',
            },
            post_author: {
              id: 1,
              author_name: 'Willy Chan',
            },
          },
          {
            id: '23232',
            title: 'test 2',
            content: 'test 2 content',
            status: 'No published',
            post_category: {
              id: 1,
              category_name: 'dogs',
            },
            post_author: {
              id: 1,
              author_name: 'Willy Chan',
            },
          },
        ],
      },
    });
    let mockResult = {
      data: mockData,
    };
    mock.onPut(`/post/id/:id`).reply(200, mockResult);

    await _store.dispatch(updatePost(mockData)).then((result) => {
      expect(result.type).toBe('post/UPDATE_POST/fulfilled');
      expect(result.payload).toEqual(mockResult.data);
    });
    let newStore = _store.getState().post;
    expect(newStore.posts.length).toEqual(2);
    expect(newStore.posts).toContainEqual(mockData);
  });
});
