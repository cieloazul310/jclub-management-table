import * as React from 'react';
import Box from '@mui/material/Box';
// import { makeStyles, createStyles, Theme } from '@mui/core/styles';
import { Chart, ChartProps } from '@devexpress/dx-react-chart-material-ui';
/*
interface StylesProps {
  height?: number;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2, 1),
      height: ({ height }) => height ?? 300,
    },
    chart: {
      flexGrow: 1,
      maxWidth: theme.breakpoints.width('sm'),
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      boxSizing: 'border-box',
    },
  })
);
*/

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
