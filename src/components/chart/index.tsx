import * as React from 'react';
import { BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import Chart from '../chart/CustomChart';
import Title from '../chart/CustomTitle';
import YearAxisLabel from '../chart/YearAxisLabel';
import { useAppState } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { DatumBrowser } from '../../../types';

type ClubChartProps = {
  edges: {
    node: Pick<DatumBrowser, 'year' | 'revenue'>;
  }[];
};

function ClubChart({ edges }: ClubChartProps) {
  const { tab } = useAppState();
  return (
    <Chart height={360} data={edges.map(({ node }) => ({ ...node, year: node.year.toString() }))}>
      <ArgumentAxis labelComponent={YearAxisLabel} />
      <ValueAxis />
      <BarSeries valueField={tab === 'attd' ? 'average_attd' : 'revenue'} argumentField="year" />
      <Title text={tab === 'attd' ? '平均入場者数推移' : '営業収入推移'} />
    </Chart>
  );
}

export default ClubChart;
