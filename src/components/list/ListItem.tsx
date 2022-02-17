import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import CategoryAvatar from '../CategoryAvatar';
import ListItemTable from './ListItemTable';
import { useAppState, useDispatch } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import { useSortedValue } from '../../utils/useStateEdges';
import { DatumBrowser, Mode, Tab } from '../../../types';

type ListItemProps = {
  edge: {
    node: DatumBrowser;
  };
  mode: Mode;
  tab: Tab;
  index: number;
};

function ListItem({ edge, mode, tab, index }: ListItemProps) {
  const value = useSortedValue(edge);
  const { sortKey } = useAppState();
  const dispatch = useDispatch();
  const { node } = edge;

  const rankSort = () => {
    if (mode !== 'year') return;
    dispatch(sortKey !== 'rank' ? { type: 'CHANGE_SORTKEY', sortKey: 'rank' } : { type: 'TOGGLE_SORTASC' });
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', padding: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Box>
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 1,
            cursor: mode === 'year' ? 'pointer' : undefined,
          }}
          onClick={rankSort}
        >
          <CategoryAvatar category={node.category ?? ''} />
          <Typography variant="body2" color={mode === 'year' && sortKey === 'rank' ? 'secondary' : 'inherit'}>
            {node.rank}位
          </Typography>
          {node.elevation ? <Typography variant="caption">{node.elevation}</Typography> : null}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', py: 1, px: 2 }}>
          <Typography component="h3">
            <AppLink to={mode === 'year' ? `/club/${node.slug}/` : `/year/${node.year}/`} color="inherit">
              <strong>{mode === 'club' ? `${node.year}年` : `${index + 1}. ${node.name}`}</strong>
            </AppLink>
          </Typography>
          {mode === 'year' ? (
            <Typography fontSize="h5.fontSize" fontWeight="bold">
              {value}
            </Typography>
          ) : null}
        </Box>
        <Box>
          <ListItemTable edge={edge} mode={mode} tab={tab} />
        </Box>
      </Box>
    </Box>
  );
}

export default ListItem;
