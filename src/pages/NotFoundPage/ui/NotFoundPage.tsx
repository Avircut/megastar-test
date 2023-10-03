import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Stack } from '@mui/material';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = memo(({ className } : NotFoundPageProps) => {
  return (
    <Stack className={classNames(cls.NotFoundPage)}>
      404 - Страница не найдена
    </Stack>
  );
});
