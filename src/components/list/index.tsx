import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { makeStyles, createStyles } from '@mui/core/styles';
import ListItem from './ListItem';
// import { ContentBasisLarge } from '../Basis';
// import { AdInListFooter } from '../Ads';
import useStateEdges from '../../utils/useStateEdges';
import useIsMobile from '../../utils/useIsMobile';
import { DatumBrowser, Mode, Tab } from '../../../types';

type FinancialListProps = {
  edges: {
    node: DatumBrowser;
  }[];
  mode: Mode;
  tab: Tab;
};
/*
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);
*/
function FinancialList({ edges, mode, tab }: FinancialListProps) {
  // const classes = useStyles();
  const stateEdges = useStateEdges(edges, mode);
  // const isMobile = useIsMobile();
  return (
    <Box flexGrow={1}>
      <Container maxWidth="sm" disableGutters>
        {stateEdges.map((edge, index) => (
          <ListItem key={edge.node.id} edge={edge} mode={mode} tab={tab} index={index} />
        ))}
        {/*
        isMobile ? (
          <ContentBasisLarge>
            <AdInListFooter />
          </ContentBasisLarge>
        ) : null
        */}
      </Container>
    </Box>
  );
}

export default FinancialList;
