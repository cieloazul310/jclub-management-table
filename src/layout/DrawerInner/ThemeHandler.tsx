import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { ListItemToggleDarkMode, ListItemToggleUseSystemTheme } from '@cieloazul310/gatsby-theme-aoi';

function ThemeHandler() {
  return (
    <List subheader={<ListSubheader>画面</ListSubheader>}>
      <ListItemToggleDarkMode label="ダークモード" />
      <ListItemToggleUseSystemTheme label="OSの設定を使用" />
    </List>
  );
}

export default ThemeHandler;
