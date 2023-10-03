import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useClosestMedia } from 'shared/lib/hooks/useMediaQuery/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useCallback, useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface SidebarProps {
  width?: number;
  open?: boolean;
  onSidebarClose?: () => void;
}

interface projectItem {
  id: number;
  title: string;
  isActive?: boolean;
}
const mockProjects: projectItem[] = [
  {
    id: 1,
    title: 'По проекту',
  },
  {
    id: 2,
    title: 'Объекты',
  },
  {
    id: 3,
    title: 'РД',
  },
  {
    id: 4,
    title: 'МТО',
  },
  {
    id: 5,
    title: 'СМР',
    isActive: true,
  },
  {
    id: 6,
    title: 'График',
  },
  {
    id: 7,
    title: 'МиМ',
  },
  {
    id: 8,
    title: 'Рабочие',
  },
  {
    id: 9,
    title: 'Капвложения',
  },
  {
    id: 10,
    title: 'Бюджет',
  },
  {
    id: 11,
    title: 'Финансирование',
  },
  {
    id: 12,
    title: 'Панорамы',
  },
  {
    id: 13,
    title: 'Камеры',
  },
  {
    id: 14,
    title: 'Поручения',
  },
  {
    id: 15,
    title: 'Контрагенты',
  },
];

export const MainPageSidebar = (props: SidebarProps) => {
  const { width = 234, open, onSidebarClose } = props;
  const [projectItems, setProjectItems] = useState(mockProjects);
  const [projectOpen, setProjectOpen] = useState(true);
  const media = useClosestMedia();
  const isMobile = media === '0px';
  const onProjectOpen = () => {
    setProjectOpen((prev) => !prev);
  };
  const setActiveItem = useCallback(
    (current) => {
      const items = projectItems.map((item) => ({ ...item, isActive: false }));
      const index = items.findIndex((item) => item.id === current.id);
      items[index] = { ...current, isActive: true };
      setProjectItems(items);
    },
    [projectItems],
  );
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width,
          paddingTop: 12,
        },
      }}
      open={open}
    >
      {isMobile && (
        <IconButton onClick={onSidebarClose}>
          <CloseIcon />
        </IconButton>
      )}
      <List disablePadding>
        <ListItemButton onClick={onProjectOpen}>
          <ListItemText
            primaryTypographyProps={{ color: 'secondary', variant: 'button' }}
            primary="Название проекта"
            secondary="Аббревиатура"
          />
          {projectOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider />
        <Collapse in={projectOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {projectItems.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{ gap: 3 }}
                onClick={() => setActiveItem(item)}
                selected={item.isActive}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'button' }}
                  primary={item.title}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};
