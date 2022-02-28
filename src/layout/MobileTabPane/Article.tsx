import * as React from 'react';
import { Section, SectionDivider, Article } from '@cieloazul310/gatsby-theme-aoi';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc, AttributionDoc } from '../../components/docs';
import { Tab } from '../../../types';

function docTab(tab: Tab) {
  if (tab === 'pl') return <PLDoc />;
  if (tab === 'bs') return <BSDoc />;
  if (tab === 'revenue') return <RevenueDoc />;
  if (tab === 'expense') return <ExpenseDoc />;
  return <AttdDoc />;
}

type MainTabProps = {
  tab: Tab;
};

function MainTab({ tab }: MainTabProps) {
  return (
    <section>
      <Section>
        <Article maxWidth="md">
          <article>{docTab(tab)}</article>
        </Article>
      </Section>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <AttributionDoc />
        </Article>
      </Section>
    </section>
  );
}

export default MainTab;
