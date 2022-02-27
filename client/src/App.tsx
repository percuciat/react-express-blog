import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'styles/themes';

function App() {
  let components = useRoutes(routes);
  return (
    <div className="wrapperGlobal">
      <ThemeProvider theme={lightTheme}>{components}</ThemeProvider>
    </div>
  );
}

export default App;
