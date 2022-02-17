import * as React from 'react';
import Typography from '@mui/material/Typography';
import { AppLink, ExternalLink, useSiteMetadata } from '@cieloazul310/gatsby-theme-aoi';

function Copyrights() {
  const { title } = useSiteMetadata();
  return (
    <>
      <Typography variant="body1" align="center" gutterBottom>
        <AppLink to="/" color="inherit">
          {title}
        </AppLink>
      </Typography>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} cieloazul310 All rights reserved. Built with
        {` `}
        <ExternalLink color="inherit" href="https://www.gatsbyjs.org">
          Gatsby
        </ExternalLink>
      </Typography>
    </>
  );
}

export default Copyrights;
