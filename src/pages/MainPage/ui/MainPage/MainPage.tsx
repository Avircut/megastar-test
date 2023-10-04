import { memo, useState } from 'react';
import { OutlayList, useFetchList } from 'entities/Outlay';
import { Stack, Divider, CircularProgress } from '@mui/material';
import { PageError } from 'widgets/PageError';
import { MainPageSidebar } from '../MainPageSidebar/MainPageSidebar';
import cls from './MainPage.module.scss';
import { MainPageHeader } from '../MainPageHeader/MainPageHeader';

const sidebarWidth = 234;
const MainPage = memo(() => {
  const { data: outlays, isLoading, error } = useFetchList();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (isLoading) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }
  if (error || !outlays) {
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
      <MainPageSidebar
        width={sidebarWidth}
        open={isSidebarOpen}
        onSidebarClose={() => setIsSidebarOpen(false)}
      />
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
          onSidebarOpen={() => setIsSidebarOpen(true)}
          title="Строительно-монтажные работы"
        />
        <OutlayList items={outlays} />
      </Stack>
    </Stack>
  );
});
export default MainPage;
