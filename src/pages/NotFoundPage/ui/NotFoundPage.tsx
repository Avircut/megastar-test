import { memo } from 'react';
import { Stack } from '@mui/material';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = memo(() => {
  return (
    <Stack className={cls.NotFoundPage}>
      404 - Страница не найдена
    </Stack>
  );
});
