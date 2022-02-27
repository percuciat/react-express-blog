import { createGlobalStyle } from 'styled-components';
import { variables } from './themes';

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Sen', sans-serif;
  }

  li, ul {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  li {
    list-style: none;
  }
  .wrapperGlobal {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
`;
