import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useNeighbor from '../../utils/useNeighbor';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

type DrawerNavigationProps = {
  next?: SitePageContextNext | null;
  previous?: SitePageContextPrevious | null;
};

function DrawerNavigation({ next, previous }: DrawerNavigationProps) {
  const nxt = useNeighbor(next);
  const prev = useNeighbor(previous);
  return next || previous ? (
    <List>
      {prev ? (
        <ListItem button dense component={GatsbyLink} to={prev.to}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary={prev.title} />
        </ListItem>
      ) : null}
      {nxt ? (
        <ListItem button dense component={GatsbyLink} to={nxt.to}>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary={nxt.title} />
        </ListItem>
      ) : null}
    </List>
  ) : null;
}

DrawerNavigation.defaultProps = {
  next: undefined,
  previous: undefined,
};

export default DrawerNavigation;
