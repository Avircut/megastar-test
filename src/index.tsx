import { render } from 'react-dom';
import App from 'app/App';
import 'app/styles/index.scss';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from 'app/providers/theme/theme';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from 'app/providers/router';

render(
  <RouterProvider router={AppRouter} />,
  document.getElementById('root'),
);
