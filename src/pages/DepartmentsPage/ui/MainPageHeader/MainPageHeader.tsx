import { Stack, Typography, Divider } from '@mui/material';
import { FC } from 'react';

interface MainPageHeaderProps {
  title: string;
}

export const MainPageHeader: FC<MainPageHeaderProps> = ({ title }) => {
  return (
    <Stack direction="row">
      <Typography variant="h3" padding={3}>{title}</Typography>
      <Divider orientation="vertical" flexItem />
    </Stack>
  );
};
