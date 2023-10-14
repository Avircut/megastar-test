import { createTheme, responsiveFontSizes } from '@mui/material';

export const darkTheme = responsiveFontSizes(
  createTheme({
    spacing: 4,
    typography: {
      button: {
        textTransform: 'none',
        lineHeight: 1.1,
        fontWeight: '400',
      },
      h3: {
        fontSize: '2.3rem',
        fontWeight: 700,
      },
      body2: {
        fontSize: '0.63rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: () => ({
            paddingTop: 14,
            paddingBottom: 14,
            minWidth: 140,
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
    },
  }),
);
