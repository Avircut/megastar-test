import { Stack, Typography, Divider } from '@mui/material';
import { memo } from 'react';

interface ListPageHeaderProps {
  title:string;
}

export const ListPageHeader = memo(({ title }: ListPageHeaderProps) => {
  return (
    <Stack direction="row">
      <Typography variant="h3" padding={3}>{title}</Typography>
      <Divider orientation="vertical" flexItem />
    </Stack>
  );
});
