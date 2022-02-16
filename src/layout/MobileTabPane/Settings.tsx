import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasis, ContentBasisLarge } from '../../components/Basis';
import StateHandler from '../DrawerInner/StateHandler';
import ThemeHandler from '../DrawerInner/ThemeHandler';

function SettingsTabPane({ mobileTab }: Omit<MobileTabPaneProps, 'children' | 'value' | 'mobileOnly'>) {
  return (
    <MobileTabPane value="settings" mobileOnly mobileTab={mobileTab}>
      <ContentBasisLarge>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            設定
          </Typography>
          <ContentBasis>
            <StateHandler />
            <Divider />
            <ThemeHandler />
          </ContentBasis>
        </Container>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

export default SettingsTabPane;
