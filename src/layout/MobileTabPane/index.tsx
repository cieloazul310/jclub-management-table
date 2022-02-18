import * as React from 'react';
import Box from '@mui/material/Box';
import useIsMobile from '../../utils/useIsMobile';
import { MobileTab } from '../../types';

export type MobileTabPaneProps = {
  mobileOnly?: boolean;
  value: MobileTab;
  mobileTab: MobileTab;
  children: React.ReactNode;
};

function MobileTabPane({ value, mobileTab, children, mobileOnly = false }: MobileTabPaneProps) {
  const isMobile = useIsMobile();
  return !mobileOnly || isMobile ? (
    <Box sx={{ flexGrow: 1, pb: { xs: '86px', sm: 0 } }} role="tabpanel" hidden={isMobile && value !== mobileTab}>
      <section>{!isMobile || value === mobileTab ? children : null}</section>
    </Box>
  ) : null;
}

export default MobileTabPane;
