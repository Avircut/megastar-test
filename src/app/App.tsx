import { AppRouter } from 'app/providers/router';
import { Suspense } from 'react';
import { Stack } from '@mui/material';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar';

const App = () => {
  return (
    <Suspense fallback="">
      <Stack className="wrapper">
        <Sidebar open />
        <AppRouter />
      </Stack>
    </Suspense>

  );
};
export default App;
