import * as React from 'react';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/Tablerow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useAppState, useDispatch } from '../../@cieloazul310/gatsby-theme-aoi-top-layout/utils/AppStateContext';
import val from '../../utils/val';
import { General, PL, BS, Revenue, Expense, AttdBrowser, Mode, Tab, SortableKeys, DatumBrowser } from '../../../types';

function useCollapsable(initialOpen: boolean): [boolean, () => void] {
  const [open, setOpen] = React.useState(initialOpen);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return [open, toggleOpen];
}

type DataTableRowProps = {
  open?: boolean;
  toggleOpen?: () => void;
  selected?: boolean;
  inset?: boolean;
  sortableKey?: SortableKeys;
  strong?: boolean;
  separator?: boolean;
  mode: Mode;
  label: React.ReactNode;
  value: number | null;
};

function DataTableRow({
  label,
  mode,
  value,
  open,
  toggleOpen,
  inset = false,
  selected = false,
  separator = false,
  strong = false,
  sortableKey,
}: DataTableRowProps) {
  const { sortKey } = useAppState();
  const current = sortKey === sortableKey;
  const dispatch = useDispatch();
  const sortable = mode === 'year' && !!sortableKey;
  const onClick = () => {
    if (mode === 'club' || !sortableKey) return;
    if (current) {
      dispatch({ type: 'TOGGLE_SORTASC' });
    } else {
      dispatch({ type: 'CHANGE_SORTKEY', sortKey: sortableKey });
    }
  };

  return (
    <TableRow
      sx={{
        bgcolor: ({ palette }) => {
          if (!selected) return undefined;
          return palette.mode === 'dark' ? 'background.paper' : 'grey.200';
        },
      }}
    >
      <TableCell padding="checkbox">
        {typeof open === 'boolean' && typeof toggleOpen === 'function' ? (
          <IconButton aria-label="expand row" size="small" onClick={toggleOpen}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        ) : null}
      </TableCell>
      <TableCell sx={{ pl: inset ? 5 : undefined }} component="th" scope="row">
        <Typography
          sx={{
            color: mode === 'year' && current ? 'secondary.main' : undefined,
            fontWeight: strong || (mode === 'year' && current) ? 'bold' : undefined,
            '&:hover': {
              textDecoration: sortable ? 'underline' : undefined,
              cursor: sortable ? 'pointer' : undefined,
            },
          }}
          variant="body2"
          onClick={onClick}
        >
          {label}
        </Typography>
      </TableCell>
      <TableCell align="right">{val(value, separator)}</TableCell>
    </TableRow>
  );
}

DataTableRow.defaultProps = {
  open: undefined,
  toggleOpen: undefined,
  selected: false,
  inset: false,
  separator: false,
  sortableKey: undefined,
  strong: false,
};

type TabTableProps<T> = {
  edge: {
    node: T & General;
  };
  mode: Mode;
};

function PLTable({ edge, mode }: TabTableProps<PL>) {
  const { node } = edge;
  const [open, toggleOpen] = useCollapsable(false);
  return (
    <TableBody>
      <DataTableRow label="営業収入" value={node.revenue} mode={mode} sortableKey="revenue" strong />
      <DataTableRow label="営業費用" value={node.expense} mode={mode} sortableKey="expense" />
      <DataTableRow label="営業利益" value={node.op_profit} mode={mode} sortableKey="op_profit" />
      <DataTableRow label="当期純利益" value={node.profit} open={open} toggleOpen={toggleOpen} selected mode={mode} sortableKey="profit" />
      {open ? (
        <>
          <DataTableRow label="営業外収入" value={node.no_rev} inset mode={mode} sortableKey="no_rev" />
          <DataTableRow label="営業外費用" value={node.no_exp} inset mode={mode} sortableKey="no_exp" />
          <DataTableRow label="経常利益" value={node.ordinary_profit} inset selected mode={mode} sortableKey="ordinary_profit" />
          <DataTableRow label="特別利益" value={node.sp_rev} inset mode={mode} sortableKey="sp_rev" />
          <DataTableRow label="特別損失" value={node.sp_exp} inset mode={mode} sortableKey="sp_exp" />
          <DataTableRow label="法人税および住民税等" value={node.tax} inset mode={mode} />
        </>
      ) : null}
      {(node.year ?? 0) > 2017 ? (
        <DataTableRow label="関連する法人の営業収益" value={node.related_revenue} mode={mode} sortableKey="related_revenue" />
      ) : null}
    </TableBody>
  );
}

function BSTable({ edge, mode }: TabTableProps<BS>) {
  const { node } = edge;
  const [assetsOpen, toggleAssetsOpen] = useCollapsable(false);
  const [liabilitiesOpen, toggleLiabilitiesOpen] = useCollapsable(false);
  const [worthOpen, toggleWorthOpen] = useCollapsable(false);

  return (
    <TableBody>
      <DataTableRow
        label="資産の部 (総資産)"
        value={node.assets}
        open={assetsOpen}
        toggleOpen={toggleAssetsOpen}
        mode={mode}
        sortableKey="assets"
      />
      {assetsOpen ? (
        <>
          <DataTableRow label="流動資産" value={node.curr_assets} inset mode={mode} />
          <DataTableRow label="固定資産等" value={node.fixed_assets} inset mode={mode} />
        </>
      ) : null}
      <DataTableRow
        label="負債の部 (総負債)"
        value={node.liabilities}
        open={liabilitiesOpen}
        toggleOpen={toggleLiabilitiesOpen}
        mode={mode}
        sortableKey="liabilities"
      />
      {liabilitiesOpen ? (
        <>
          <DataTableRow label="流動負債" value={node.curr_liabilities} inset mode={mode} />
          <DataTableRow label="固定負債" value={node.fixed_liabilities} inset mode={mode} />
        </>
      ) : null}
      <DataTableRow
        label="資本の部 (純資産)"
        value={node.net_worth}
        strong
        selected
        open={worthOpen}
        toggleOpen={toggleWorthOpen}
        mode={mode}
        sortableKey="net_worth"
      />
      <DataTableRow label="資本金" value={node.capital_stock} inset mode={mode} sortableKey="capital_stock" />
      {worthOpen ? (
        <>
          <DataTableRow label="資本剰余金" value={node.capital_surplus} inset mode={mode} />
          <DataTableRow label="利益剰余金" value={node.retained_earnings} inset mode={mode} />
        </>
      ) : null}
    </TableBody>
  );
}

function RevenueTable({ edge, mode }: TabTableProps<Revenue>) {
  const { node } = edge;
  return (
    <TableBody>
      <DataTableRow label="営業収入" value={node.revenue} strong selected mode={mode} sortableKey="revenue" />
      <DataTableRow label="スポンサー収入" value={node.sponsor} mode={mode} sortableKey="sponsor" />
      <DataTableRow label="入場料収入" value={node.ticket} mode={mode} sortableKey="ticket" />
      <DataTableRow label="Jリーグ配分金" value={node.broadcast} mode={mode} sortableKey="broadcast" />
      {(node.year ?? 0) > 2010 ? (
        <DataTableRow label="アカデミー関連収入" value={node.academy_rev} mode={mode} sortableKey="academy_rev" />
      ) : null}
      {(node.year ?? 0) > 2015 ? <DataTableRow label="物販収入" value={node.goods_rev} mode={mode} sortableKey="goods_rev" /> : null}
      <DataTableRow label="その他収入" value={node.other_revs} mode={mode} sortableKey="other_revs" />
    </TableBody>
  );
}

function ExpenseTable({ edge, mode }: TabTableProps<Expense>) {
  const { node } = edge;
  const sgaLabel = (year: number) => {
    if (year < 2011) return '一般管理費';
    if (year < 2016) return '販売費および一般管理費(物販含む)';
    return '販売費および一般管理費';
  };

  return (
    <TableBody>
      <DataTableRow label="営業費用" value={node.expense} strong selected mode={mode} sortableKey="expense" />
      <DataTableRow label="チーム人件費" value={node.salary} strong mode={mode} sortableKey="salary" />
      {(node.year ?? 0) < 2011 ? <DataTableRow label="事業費(チーム人件費を除く)" value={node.manage_exp} mode={mode} /> : null}
      {(node.year ?? 0) > 2010 ? (
        <>
          <DataTableRow label="試合関連経費" value={node.game_exp} mode={mode} sortableKey="game_exp" />
          <DataTableRow label="トップチーム運営経費" value={node.team_exp} mode={mode} sortableKey="team_exp" />
          <DataTableRow label="アカデミー運営経費" value={node.academy_exp} mode={mode} sortableKey="academy_exp" />
          <DataTableRow label="女子チーム運営経費" value={node.women_exp} mode={mode} sortableKey="women_exp" />
        </>
      ) : null}
      {(node.year ?? 0) > 2015 ? <DataTableRow label="物販関連経費" value={node.goods_exp} mode={mode} sortableKey="goods_exp" /> : null}
      <DataTableRow label={sgaLabel(node.year ?? 0)} value={node.sga} mode={mode} sortableKey="sga" />
    </TableBody>
  );
}

function AttdTable({ edge, mode }: TabTableProps<AttdBrowser>) {
  const { node } = edge;
  const [gamesOpen, toggleGamesOpen] = useCollapsable(false);
  const [attdOpen, toggleAttdOpen] = useCollapsable(false);
  return (
    <TableBody>
      <DataTableRow label="入場料収入" value={node.ticket} strong selected mode={mode} sortableKey="ticket" />
      <DataTableRow label="リーグ戦平均入場者数" value={node.average_attd} strong mode={mode} sortableKey="average_attd" separator />
      <DataTableRow label="年間ホームゲーム数" value={node.all_games} open={gamesOpen} toggleOpen={toggleGamesOpen} mode={mode} />
      {gamesOpen ? (
        <>
          <DataTableRow label="リーグ戦" value={node.league_games} inset mode={mode} />
          <DataTableRow label="リーグカップ" value={node.leaguecup_games} inset mode={mode} />
          <DataTableRow label="ACL" value={node.acl_games} inset mode={mode} />
          <DataTableRow label="プレーオフ" value={node.po_games} inset mode={mode} />
          <DataTableRow label="U-23" value={node.second_games} inset mode={mode} />
        </>
      ) : null}
      <DataTableRow
        label="年間総入場者数数"
        value={node.all_attd}
        open={attdOpen}
        toggleOpen={toggleAttdOpen}
        mode={mode}
        sortableKey="all_attd"
        separator
      />
      {attdOpen ? (
        <>
          <DataTableRow label="リーグ戦" value={node.league_attd} inset mode={mode} sortableKey="league_attd" separator />
          <DataTableRow label="リーグカップ" value={node.leaguecup_attd} inset mode={mode} separator />
          <DataTableRow label="ACL" value={node.acl_attd} inset mode={mode} separator />
          <DataTableRow label="プレーオフ" value={node.po_attd} inset mode={mode} separator />
          <DataTableRow label="U-23" value={node.second_attd} inset mode={mode} separator />
        </>
      ) : null}
      <DataTableRow label="客単価" value={node.unit_price} mode={mode} sortableKey="unit_price" />
    </TableBody>
  );
}

type ListItemTableProps = {
  edge: {
    node: DatumBrowser;
  };
  mode: Mode;
  tab: Tab;
};

function ListItemTable({ edge, mode, tab }: ListItemTableProps) {
  const tableItem = (currentTab: Tab) => {
    if (currentTab === 'pl') return <PLTable edge={edge} mode={mode} />;
    if (currentTab === 'bs') return <BSTable edge={edge} mode={mode} />;
    if (currentTab === 'revenue') return <RevenueTable edge={edge} mode={mode} />;
    if (currentTab === 'expense') return <ExpenseTable edge={edge} mode={mode} />;
    return <AttdTable edge={edge} mode={mode} />;
  };

  return (
    <TableContainer>
      <Table size="small">{tableItem(tab)}</Table>
    </TableContainer>
  );
}

export default ListItemTable;
