import { Stack, Divider } from '@mui/material';
import { memo } from 'react';
import { ListPageHeader } from '../ListPageHeader/ListPageHeader';
import cls from './ListPage.module.scss';

interface ListPageProps {
  data?: any[];
  title: string;
}

export const ListPage = memo(({ data, title }: ListPageProps) => {
  return (
    <Stack
      className={cls.wrapper}
      direction="column"
      divider={<Divider />}
      sx={{
        flexGrow: 1,
      }}
    >
      <ListPageHeader
        title={title}
      />
    </Stack>
  );
});
