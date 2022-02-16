import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import FooterLinks from './FooterLinks';
import Copyrights from './Copyrights';
// import { ContentBasis } from '../../components/Basis';
// import { AdInFooter } from '../../components/Ads';

function Footer() {
  return (
    <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'grey.200' }}>
      <Container maxWidth="lg">
        {/*
        <ContentBasis>
          <FooterLinks />
        </ContentBasis>
        <ContentBasis>
          <AdInFooter />
        </ContentBasis>
        <ContentBasis>
        */}
        <Copyrights />
        {/*
        </ContentBasis>
        */}
      </Container>
    </Box>
  );
}

export default Footer;
