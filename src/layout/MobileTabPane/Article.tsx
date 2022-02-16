import * as React from 'react';
import Container from '@mui/material/Container';
import SwipeableViews from 'react-swipeable-views';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasisLarge, ContentBasis } from '../../components/Basis';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc, AttributionDoc } from '../../components/docs';
import { AdInArticle } from '../../components/Ads';
import { Tab, tabs } from '../../types';

function docTab(tab: Tab) {
  if (tab === 'pl') return <PLDoc />;
  if (tab === 'bs') return <BSDoc />;
  if (tab === 'revenue') return <RevenueDoc />;
  if (tab === 'expense') return <ExpenseDoc />;
  return <AttdDoc />;
}

type MainTabProps = {
  tab: Tab;
  onChangeTabIndex: (index: number) => void;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function MainTab({ tab, onChangeTabIndex, mobileOnly, mobileTab }: MainTabProps) {
  return (
    <MobileTabPane value="article" mobileOnly={mobileOnly} mobileTab={mobileTab}>
      <ContentBasisLarge>
        <SwipeableViews resistance index={tabs.indexOf(tab)} onChangeIndex={onChangeTabIndex}>
          {tabs.map((t) => (
            <div key={t} role="tabpanel" hidden={t !== tab}>
              {t === tab ? (
                <ContentBasis>
                  <Container maxWidth="md">
                    <article>
                      <section>
                        <ContentBasisLarge>
                          <article>{docTab(tab)}</article>
                        </ContentBasisLarge>
                      </section>
                      <section>
                        <ContentBasisLarge>
                          <AttributionDoc />
                        </ContentBasisLarge>
                      </section>
                    </article>
                  </Container>
                </ContentBasis>
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <ContentBasisLarge>
          <AdInArticle />
        </ContentBasisLarge>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

export default MainTab;
