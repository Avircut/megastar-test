import { memo } from 'react';
import { Stack, Divider, CircularProgress } from '@mui/material';
import { PageError } from 'widgets/PageError';
import cls from './MainPage.module.scss';
import { MainPageHeader } from '../MainPageHeader/MainPageHeader';

const sidebarWidth = 234;
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
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      className={cls.pageContent}
    >
      <Stack
        className={cls.wrapper}
        direction="column"
        divider={<Divider />}
        sx={{
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          ml: { sm: `${sidebarWidth}px` },
          flexGrow: 1,
        }}
      >
        <MainPageHeader
          title="Департаменты"
        />
      </Stack>
    </Stack>
  );
});
export default DepartmentsPage;
