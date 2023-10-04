import { createTheme, responsiveFontSizes } from '@mui/material';
import { grey } from '@mui/material/colors';

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: grey[900],
      },
      primary: {
        main: grey[50],
        dark: grey[300],
      },
      secondary: {
        main: grey[400],
      },
      info: {
        main: '#7890B2',
      },
      error: {
        main: '#DF4444',
      },
    },
    spacing: 4,
    typography: {
      button: {
        textTransform: 'none',
        lineHeight: 1.1,
        fontWeight: '400',
      },
      h3: {
        fontSize: '1.12rem',
      },
      body2: {
        fontSize: '0.63rem',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            zIndex: theme.zIndex.drawer + 1,
            background: theme.palette.background.default,
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            background: theme.palette.background.default,
          }),
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: () => ({
            minWidth: 24,
          }),
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: () => ({
            margin: 0,
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontSize: theme.typography.button.fontSize,
          }),
        },
      },
    },
  }),
);
