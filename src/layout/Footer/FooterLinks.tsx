import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AppLink } from '../../components/AppLink';
import { useJ1Clubs, useJ2Clubs, useJ3Clubs, useAllYears, Clubs } from '../../utils/graphql-hooks';

type CategoryLinksProps = {
  title: string;
  clubs: Clubs;
};

function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  return (
    <div>
      <Typography variant="subtitle1" component="p" gutterBottom>
        {title}
      </Typography>
      <Typography sx={{ p: 0, m: 0 }} component="ul">
        {clubs.map(({ node }, index) => (
          <Typography
            sx={{ p: 0, mr: 1, my: 0, ml: 0, display: 'inline-block' }}
            key={node.short_name ?? index}
            variant="body2"
            component="li"
          >
            <AppLink to={`/club/${node.slug}`} color="inherit">
              {node.short_name}
            </AppLink>
          </Typography>
        ))}
      </Typography>
    </div>
  );
}

function YearsLinks() {
  const years = useAllYears();

  return (
    <div>
      <Typography variant="subtitle1" component="p" gutterBottom>
        年度別
      </Typography>
      <Typography sx={{ p: 0, m: 0 }} component="ul">
        {years.map(({ year, id }, index) => (
          <Typography sx={{ p: 0, mr: 1, my: 0, ml: 0, display: 'inline-block' }} key={id ?? index} variant="body2" component="li">
            <AppLink to={`/year/${year}`} color="inherit">
              {year}
            </AppLink>
          </Typography>
        ))}
      </Typography>
    </div>
  );
}

function FooterLinks() {
  const j1clubs = useJ1Clubs();
  const j2clubs = useJ2Clubs();
  const j3clubs = useJ3Clubs();
  return (
    <Grid container spacing={2} component="nav">
      <Grid item xs={12} sm={3}>
        <CategoryLinks title="J1" clubs={j1clubs} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CategoryLinks title="J2" clubs={j2clubs} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CategoryLinks title="J3" clubs={j3clubs} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <YearsLinks />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="subtitle1" component="p" gutterBottom>
          <AppLink to="/series" color="inherit">
            項目別表示
          </AppLink>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="subtitle1" component="p" gutterBottom>
          <AppLink to="/download" color="inherit">
            データダウンロード
          </AppLink>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FooterLinks;
