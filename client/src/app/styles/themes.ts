enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}

interface IVariables {
  media: {
    extraLarge: string;
    large: string;
    medium: string;
    small: string;
  };

  sizes: {
    header: { height: number };
    container: number;
    footer: { height: number };
    modal: { width: number };
  };

  durations: {
    ms300: number;
  };

  order: {
    header: number;
    modal: number;
  };
}

interface ITheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    hover: string;

    bg: string;
    font: string;
  };
}

interface IThemeLight extends ITheme {
  type: ThemeEnum.light;
}

interface IThemeDark extends ITheme {
  type: ThemeEnum.dark;
}

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
