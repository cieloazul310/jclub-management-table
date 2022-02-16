import * as React from 'react';
import MobileTabPane, { MobileTabPaneProps } from './index';
import Figure from '../../components/figure';
import { Mode, Tab } from '../../types';
import { ClubTemplateQuery, YearTemplateQuery } from '../../../graphql-types';

type FigureTabProps = {
  tab: Tab;
  data: ClubTemplateQuery | YearTemplateQuery;
  mode: Mode;
  onChangeTabIndex: (index: number) => void;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function FigureTab({ tab, data, mode, onChangeTabIndex, mobileOnly, mobileTab }: FigureTabProps) {
  return (
    <MobileTabPane value="figure" mobileOnly={mobileOnly} mobileTab={mobileTab}>
      <Figure edges={data.allDataset.edges} mode={mode} tab={tab} onChangeTabIndex={onChangeTabIndex} />
    </MobileTabPane>
  );
}

export default FigureTab;
