import { AppRouter } from 'app/providers/router';
import { Suspense } from 'react';
import { Stack } from '@mui/material';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar';

const App = () => {
  return (
    <Suspense fallback="">
      <Stack className="wrapper">
        <Sidebar open />
        <div className="content-page">
          <AppRouter />
        </div>
      </Stack>

    </Suspense>

  );
};
export default App;
