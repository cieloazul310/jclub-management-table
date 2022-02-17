import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasisLarge, ContentBasis } from '../../components/Basis';
import ClubInfo from '../../components/ClubInfo';
import YearInfo from '../../components/YearInfo';
import PageNavigation from '../../components/PageNavigation';
import { CategoryLink, YearsLink } from '../../components/links';

import { Mode } from '../../../types';
// import { ClubTemplateQuery, YearTemplateQuery, SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

function isClubData(data: ClubTemplateQuery | YearTemplateQuery): data is ClubTemplateQuery {
  return 'clubsYaml' in data;
}

type SummaryTabProps = {
  mode: Mode;
  data: ClubTemplateQuery | YearTemplateQuery;
  previous?: SitePageContextPrevious | null;
  next?: SitePageContextNext | null;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function SummaryTabPane({ mode, data, previous, next, mobileOnly, mobileTab }: SummaryTabProps) {
  return (
    <MobileTabPane value="summary" mobileOnly={mobileOnly} mobileTab={mobileTab}>
      <ContentBasisLarge>
        <Container maxWidth="md">
          <ContentBasis>
            <Typography variant="h3" component="h2" gutterBottom>
              概要
            </Typography>
            {mode === 'club' ? <ClubInfo data={data} /> : <YearInfo data={data} />}
          </ContentBasis>
          <ContentBasis>
            {mode === 'club' && isClubData(data) ? <CategoryLink category={data.clubsYaml?.category ?? ''} /> : <YearsLink />}
          </ContentBasis>
          <ContentBasis>
            <PageNavigation previous={previous} next={next} />
          </ContentBasis>
        </Container>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

SummaryTabPane.defaultProps = {
  next: undefined,
  previous: undefined,
};

export default SummaryTabPane;
