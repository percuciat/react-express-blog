import React from 'react';
import { render } from '@testing-library/react';
import { App } from './app/App';
import { HomePage } from './pages';
import { _testRender } from './shared/lib/';

describe('start App', () => {
  it('render App', async () => {
    const { container } = _testRender(<App />, {
      route: '/',
      initialState: {},
    });
    expect(container.querySelector('.wrapperGlobal')).toHaveClass('wrapperGlobal');
    const wrapperHomePage = render(<HomePage />);
    expect(wrapperHomePage.getAllByText('Home')).toBeTruthy();
  });
});
