import {
  Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import GroupIcon from '@mui/icons-material/Group';
import cls from './Sidebar.module.scss';

export interface SidebarProps {
  width?: number;
}

export const Sidebar = (props: SidebarProps) => {
  const { width = 234 } = props;
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width,
          paddingTop: 12,
        },
      }}
      anchor="left"
    >
      <List disablePadding>
        <ListItemText
          className={cls.logo}
          primaryTypographyProps={{ color: 'secondary', variant: 'h3' }}
          primary="Logo"
        />
        <Divider />
        <List component="div" disablePadding>
          <NavLink to={RoutePath.departments}>
            {({ isActive }) => (
              <ListItemButton
                sx={{ gap: 3 }}
                selected={isActive}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Департаменты"
                />
              </ListItemButton>
            )}
          </NavLink>
        </List>
      </List>
    </Drawer>
  );
};
