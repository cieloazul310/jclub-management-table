import * as React from 'react';
import Figure from '../../components/figure';
import { Mode, Tab, DatumBrowser } from '../../../types';

type FigureTabProps = {
  tab: Tab;
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
  onChangeTabIndex: (index: number) => void;
};

function FigureTab({ tab, edges, mode, onChangeTabIndex }: FigureTabProps) {
  return (
    <section>
      <Figure edges={edges} mode={mode} tab={tab} onChangeTabIndex={onChangeTabIndex} />
    </section>
  );
}

export default FigureTab;
