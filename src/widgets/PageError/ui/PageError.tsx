import { Typography, Button } from '@mui/material';
import cls from './PageError.module.scss';

export const PageError = () => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
    <div className={cls.PageError}>
      <Typography>Something went wrong</Typography>
      <Button variant="text" onClick={reloadPage}>
        Reload Page
      </Button>
    </div>
  );
};
