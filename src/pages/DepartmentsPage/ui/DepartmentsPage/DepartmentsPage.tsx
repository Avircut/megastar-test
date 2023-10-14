import { memo } from 'react';
import { Stack, Divider, CircularProgress } from '@mui/material';
import { PageError } from 'widgets/PageError';
import { ListPage } from 'widgets/ListPage/ui/ListPage/ListPage';
import cls from './MainPage.module.scss';

const DepartmentsPage = memo(() => {
  // const { data: outlays, isLoading, error } = useFetchList();
  const isLoading = false;
  const error = false;
  const departments = [];
  if (isLoading) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }
  if (error) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <PageError />
      </Stack>
    );
  }
  return (
    <ListPage title="Департаменты" />
  );
});
export default DepartmentsPage;
