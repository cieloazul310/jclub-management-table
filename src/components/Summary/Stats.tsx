import * as React from 'react';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { H4 } from '@cieloazul310/gatsby-theme-aoi';
import { YearBrowser, Tab, Category, YearStats } from '../../../types';

type StatsItemProps = {
  tab: Tab;
  category: Category;
  stats: YearStats;
  prevStats: YearStats | null;
};

function StatsItem({ category, tab, stats, prevStats }: StatsItemProps) {
  return (
    <Box>
      <H4>
        {category} {stats.totalCount}クラブ
      </H4>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell component="th">営業収入平均</TableCell>
            <TableCell align="right">{(stats.revenue.average / 100).toFixed(2)}億円</TableCell>
            <TableCell align="right">{(stats.revenue.average / 100).toFixed(2)}億円</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">営業収入最大</TableCell>
            <TableCell align="right">{(stats.revenue.max / 100).toFixed(2)}億円</TableCell>
            <TableCell align="right">{(stats.revenue.max / 100).toFixed(2)}億円</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">営業収入最少</TableCell>
            <TableCell align="right">{(stats.revenue.min / 100).toFixed(2)}億円</TableCell>
            <TableCell align="right">{(stats.revenue.min / 100).toFixed(2)}億円</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">営業収入合計</TableCell>
            <TableCell align="right">{(stats.revenue.sum / 100).toFixed(2)}億円</TableCell>
            <TableCell align="right">{(stats.revenue.sum / 100).toFixed(2)}億円</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Box>
  );
}

type StatsProps = {
  tab: Tab;
  year: Omit<YearBrowser, 'data'>;
  prevYear: Pick<YearBrowser, 'stats'> | null;
};

function Stats({ tab, year, prevYear }: StatsProps) {
  const { categories } = year;
  return (
    <Box>
      <Tabs sx={{ display: { xs: 'block', sm: 'none' } }}>
        {categories.map((category) => (
          <MuiTab label={category} />
        ))}
      </Tabs>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StatsItem tab={tab} stats={year.stats.J1} prevStats={prevYear?.stats.J1 ?? null} category="J1" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatsItem tab={tab} stats={year.stats.J2} prevStats={prevYear?.stats.J2 ?? null} category="J2" />
        </Grid>
        {year.stats.J3 ? (
          <Grid item xs={12} sm={6}>
            <StatsItem tab={tab} stats={year.stats.J3} prevStats={prevYear?.stats.J3 ?? null} category="J3" />
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}

export default Stats;
