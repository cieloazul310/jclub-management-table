import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { useThemeContextState, useToggleDark, useToggleUseSystem } from '@cieloazul310/gatsby-theme-aoi';

function ThemeHandler() {
  const { mode } = useTheme().palette;
  const { darkMode, useSystemTheme } = useThemeContextState();
  const toggleDark = useToggleDark();
  const toggleUseSystem = useToggleUseSystem();

  return (
    <List subheader={<ListSubheader>画面</ListSubheader>}>
      <ListItem disabled={useSystemTheme}>
        <ListItemIcon>{darkMode ? <Brightness2Icon /> : <Brightness5Icon />}</ListItemIcon>
        <ListItemText primary="ダークモード" />
        <ListItemSecondaryAction>
          <Switch disabled={useSystemTheme} edge="end" checked={darkMode} onChange={toggleDark} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {mode === 'dark' ? (
            <Brightness2Icon color={useSystemTheme ? 'inherit' : 'disabled'} />
          ) : (
            <Brightness5Icon color={useSystemTheme ? 'inherit' : 'disabled'} />
          )}
        </ListItemIcon>
        <ListItemText primary="OSの設定を使用" />
        <ListItemSecondaryAction>
          <Switch checked={useSystemTheme} edge="end" onChange={toggleUseSystem} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default ThemeHandler;
