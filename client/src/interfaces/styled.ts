export enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}

export interface IVariables {
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

export interface ITheme {
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

export interface IThemeLight extends ITheme {
  type: ThemeEnum.light;
}

export interface IThemeDark extends ITheme {
  type: ThemeEnum.dark;
}
