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
      },
      body2: {
        fontSize: '0.63rem',
      },
    },
    components: {
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
