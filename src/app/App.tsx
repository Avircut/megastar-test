import { ReactNode, Suspense } from 'react';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { StoreProvider } from './providers/StoreProvider';
import { darkTheme } from './providers/theme/theme';

interface AppProps {
  children:ReactNode
}
const App = ({ children }:AppProps) => {
  return (
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Suspense fallback="">
            <Stack className="wrapper" direction="row">
              <Sidebar />
              {children}
            </Stack>
          </Suspense>
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  );
};
export default App;
