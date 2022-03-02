import * as React from 'react';
import Box from '@mui/material/Box';
import { Chart, ChartProps } from '@devexpress/dx-react-chart-material-ui';

function ChartComponent({ children }: Chart.RootProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: 'sm',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
}

function CustomChart(props: Omit<ChartProps, 'rootComponent'> & Chart.RootProps) {
  const { data, width, height, rotated } = props;

  const { children } = props;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 1, height: height ?? 300 }}>
      <Chart rootComponent={ChartComponent} data={data} width={width} height={height} rotated={rotated}>
        {children}
      </Chart>
    </Box>
  );
}

export default CustomChart;
