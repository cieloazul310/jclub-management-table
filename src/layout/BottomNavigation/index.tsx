import * as React from 'react';
import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { SummaryIcon, SettingsIcon, FigureIcon, ArticleIcon } from '../../icons';
import { MobileTab } from '../../types';

type BottomNavigationProps = {
  value: MobileTab;
  onChange: (event: React.ChangeEvent<unknown>, newValue: string) => void;
};

function BottomNavigation({ value, onChange }: BottomNavigationProps) {
  return (
    <MuiBottomNavigation value={value} onChange={onChange} showLabels>
      <BottomNavigationAction label="概要" value="summary" icon={<SummaryIcon />} />
      <BottomNavigationAction label="表" value="figure" icon={<FigureIcon />} />
      <BottomNavigationAction label="解説" value="article" icon={<ArticleIcon />} />
      <BottomNavigationAction label="設定" value="settings" icon={<SettingsIcon />} />
    </MuiBottomNavigation>
  );
}

export default BottomNavigation;
