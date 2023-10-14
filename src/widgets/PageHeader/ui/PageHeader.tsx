import {
  Stack, Typography, Button, TextField, InputAdornment, IconButton,
} from '@mui/material';
import { memo } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Breadcrumbs } from 'widgets/Breadcrumbs/ui/Breadcrumbs';
import cls from './PageHeader.module.scss';

interface PageHeaderProps {
  title:string;
  searchCallback?: () => void;
}

export const PageHeader = memo((props: PageHeaderProps) => {
  const { title, searchCallback } = props;
  return (
    <Stack spacing={6}>
      <Breadcrumbs />
      <Typography variant="h3">{title}</Typography>
      <Stack direction="row" spacing={4} className={cls.controls}>
        <Button variant="contained" className={cls.btn}>
          <AddIcon />
          Создать
        </Button>
        {searchCallback
                && (
                <TextField
                  placeholder="Поиск по Имени, номеру или Email"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary" onClick={searchCallback}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                )}

      </Stack>
    </Stack>
  );
});
