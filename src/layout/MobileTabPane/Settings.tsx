import * as React from 'react';
import Divider from '@mui/material/Divider';
import { Section, Article, ArticleTitle } from '@cieloazul310/gatsby-theme-aoi';
import MobileTabPane, { MobileTabPaneProps } from './index';
import StateHandler from '../DrawerInner/StateHandler';
import ThemeHandler from '../DrawerInner/ThemeHandler';

function SettingsTabPane({ mobileTab }: Omit<MobileTabPaneProps, 'children' | 'value' | 'mobileOnly'>) {
  return (
    <MobileTabPane value="settings" mobileOnly mobileTab={mobileTab}>
      <Section>
        <Article maxWidth="md">
          <ArticleTitle>設定</ArticleTitle>
          <StateHandler />
          <Divider />
          <ThemeHandler />
        </Article>
      </Section>
    </MobileTabPane>
  );
}

export default SettingsTabPane;
