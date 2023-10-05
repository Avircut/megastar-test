import { StoryFn } from '@storybook/react';
import {
  CssBaseline, StyledEngineProvider, Theme, ThemeProvider,
} from '@mui/material';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  </StyledEngineProvider>

);
