import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useNeighbor from '../../utils/useNeighbor';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

type AppBarNavigationProps = {
  previous?: SitePageContextPrevious | null;
  next?: SitePageContextNext | null;
};

function AppBarNavigation({ previous, next }: AppBarNavigationProps) {
  const prev = useNeighbor(previous);
  const nxt = useNeighbor(next);
  return (
    <div>
      <Tooltip title={prev?.title ?? ''}>
        <span>
          <IconButton disabled={!prev} color="inherit" component={GatsbyLink} to={prev?.to ?? '#'}>
            <ArrowBackIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={nxt?.title ?? ''}>
        <span>
          <IconButton disabled={!nxt} color="inherit" component={GatsbyLink} to={nxt?.to ?? '#'}>
            <ArrowForwardIcon />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

AppBarNavigation.defaultProps = {
  previous: undefined,
  next: undefined,
};

export default AppBarNavigation;
