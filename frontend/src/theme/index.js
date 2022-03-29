import { colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const getTheme = (dark) => ({
  palette: {
    background: {
      dark: dark ? '#121212' : '#F5F5F5',
      default: dark ? '#121212' : '#F5F5F5',
      paper: dark ? '#1f1f1f' : 'white',
      deep: dark ? 'black' : 'white',
    },
    primary: {
      main: dark ? '#f2f2f2' : '#121212',
      deep: dark ? '#ffffff' : '#000000',
      honey: dark ? '#feb100' : '#feb100',
    },
    secondary: {
      main: colors.brown[900]
    },
    type: dark ? 'dark' : 'light',
  },
  colors,
  shadows,
  typography,
  dark,
});

export default getTheme;
