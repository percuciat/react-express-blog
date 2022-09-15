import { createGlobalStyle, css } from 'styled-components';
import { variables } from './themes';

import BoldTtf from 'shared/assets/fonts/sen_bold.ttf';
import ExtraBoldTtf from 'shared/assets/fonts/sen_extrabold.ttf';
import RegularEot from 'shared/assets/fonts/sen-v7-latin-regular.eot';
import RegularWoff2 from 'shared/assets/fonts/sen-v7-latin-regular.woff2';

export const globalFonts = css`
  @font-face {
    font-family: 'Sen';
    font-style: normal;
    font-weight: 400;
    src: url(${RegularWoff2}) format('woff2');
    src: local('Sen'), url(${RegularEot}) format('embedded-opentype');
  }
  @font-face {
    font-family: 'Sen';
    font-weight: 500;
    font-style: normal;
    src: local('Sen'), url(${BoldTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Sen';
    font-weight: 700;
    font-style: normal;
    src: local('Sen'), url(${ExtraBoldTtf}) format('ttf');
  }
`;

/* sen-regular - latin */

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap');
  @import '~antd/dist/antd.css';

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
    display: flex;
  flex-direction: column;
  height: 100vh;
  }
`;
