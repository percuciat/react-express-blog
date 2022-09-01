import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'styles/themes';

const App = () => {
  const isAuth = false;
  // const isAuth = localStorage.getItem('refreshToken');
  let components = useRoutes(routes(isAuth));
  return (
    <div className="wrapperGlobal">
      <ThemeProvider theme={lightTheme}>{components}</ThemeProvider>
    </div>
  );
};

export default App;
