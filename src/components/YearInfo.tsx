import * as React from 'react';
import Grid from '@mui/material/Grid';
import { H3, H4, Ul, Li } from '@cieloazul310/gatsby-theme-aoi';
import Stats from './Summary/Stats';
// import useStat from '../utils/useStat';
import { DatumBrowser, YearBrowser } from '../../types';
/*
type CategoryInfoProps = {
  edges: {
    node: DatumBrowser;
  }[];
  category: string | null;
};

function CategoryInfo({ edges, category }: CategoryInfoProps) {
  const stat = useStat(
    edges.filter(({ node }) => node.category === category),
    'revenue',
    'name'
  );
  return category && stat ? (
    <Grid item xs={12} sm={4}>
      <H4>
        {category} {stat.n}クラブ
      </H4>
      <Ul>
        <Li>総営業収入: {(stat.sum / 100).toFixed(2)}億円</Li>
        <Li>営業収入平均: {(stat.average / 100).toFixed(2)}億円</Li>
        <Li>
          営業収入最大: {(stat.max.value / 100).toFixed(2)}億円【{stat.max.id}】
        </Li>
        <Li>
          営業収入最小: {(stat.min.value / 100).toFixed(2)}億円【{stat.min.id}】
        </Li>
      </Ul>
    </Grid>
  ) : null;
}
*/
type YearInfoProps = {
  edges: {
    node: DatumBrowser;
  }[];
  year: Omit<YearBrowser, 'data'>;
  prevYear: Pick<YearBrowser, 'stats'> | null;
};

function YearInfo({ edges, year, prevYear }: YearInfoProps) {
  return (
    <>
      <H3>{year.year}年</H3>
      <Stats tab="pl" year={year} prevYear={prevYear} />
      {/*
        <Grid container>
        {year.categories.map((category, index) => (
          <CategoryInfo key={category ?? index} edges={edges} category={category} />
        ))}
      </Grid>
      */}
    </>
  );
}

export default YearInfo;
