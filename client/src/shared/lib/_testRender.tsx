import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'store';

type T_testRender = {
  component: React.ReactNode;
  options: {
    route: string;
    initialState?: {
      [key: string]: any;
    };
  };
};

export const _testRender = (
  component: T_testRender['component'],
  options: T_testRender['options']
) => {
  const _store = store(options?.initialState);
  return render(
    <Provider store={_store}>
      <MemoryRouter initialEntries={[options.route]}>{component}</MemoryRouter>
    </Provider>
  );
};
