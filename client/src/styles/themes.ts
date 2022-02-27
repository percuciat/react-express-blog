import { IThemeDark, IThemeLight, IVariables, ThemeEnum } from 'interfaces/styled';

export const variables: IVariables = {
  media: {
    extraLarge: '(max-width: 1140px)',
    large: '(max-width: 960px)',
    medium: '(max-width: 720px)',
    small: '(max-width: 540px)',
  },

  sizes: {
    header: { height: 56 },
    container: 1140,
    footer: { height: 128 },
    modal: { width: 540 },
  },

  durations: {
    ms300: 300,
  },

  order: {
    header: 50,
    modal: 100,
  },
};

export const lightTheme: IThemeLight = {
  type: ThemeEnum.light,
  colors: {
    primary: '#7986cb',
    secondary: '#2b2b2b',
    success: '#4caf50',
    danger: '#f44336 ',
    hover: '#40a9ff',

    bg: '#E5E4E8',
    font: '#19191B',
  },
};

export const darkTheme: IThemeDark = {
  type: ThemeEnum.dark,
  colors: {
    primary: '#7986cb',
    secondary: '#2b2b2b',
    success: '#4caf50',
    danger: '#f44336 ',
    hover: '#40a9ff',

    bg: 'red',
    font: 'green',
  },
};
