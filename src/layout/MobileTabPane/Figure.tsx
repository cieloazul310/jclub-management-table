import * as React from 'react';
import MobileTabPane, { MobileTabPaneProps } from './index';
import Figure from '../../components/figure';
import { Mode, Tab, DatumBrowser } from '../../../types';

type FigureTabProps = {
  tab: Tab;
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
  onChangeTabIndex: (index: number) => void;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function FigureTab({ tab, edges, mode, onChangeTabIndex, mobileOnly, mobileTab }: FigureTabProps) {
  return (
    <MobileTabPane value="figure" mobileOnly={mobileOnly} mobileTab={mobileTab}>
      <Figure edges={edges} mode={mode} tab={tab} onChangeTabIndex={onChangeTabIndex} />
    </MobileTabPane>
  );
}

export default FigureTab;
