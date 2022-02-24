import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PLCardValues, BSCardValues, RevenueCardValues, ExpenseCardValues, AttdCardValues } from './CardValues';

import { DatumBrowser, Tab, Mode, General, SeasonResult } from '../../../types';

function cardTitle(tab: Tab) {
  if (tab === 'pl') return '損益計算書 (P/L)';
  if (tab === 'bs') return '貸借対照表 (B/S)';
  if (tab === 'revenue') return '営業収入';
  if (tab === 'expense') return '営業費用';
  return '入場者数';
}

type CardItemProps<T extends Mode> = {
  edge: {
    node: Omit<DatumBrowser, 'previousData'>;
  };
  previous: Omit<DatumBrowser, 'previousData' | keyof General | keyof SeasonResult> | null;
  tab: Tab;
  mode: T;
  index: number;
  length: number;
};

function CardItem<T extends Mode>({ edge, previous, tab, mode, index, length }: CardItemProps<T>) {
  function cardValues() {
    if (tab === 'pl') return <PLCardValues edge={edge} previous={previous} mode={mode} />;
    if (tab === 'bs') return <BSCardValues edge={edge} previous={previous} mode={mode} />;
    if (tab === 'revenue') return <RevenueCardValues edge={edge} previous={previous} mode={mode} />;
    if (tab === 'expense') return <ExpenseCardValues edge={edge} previous={previous} mode={mode} />;
    return <AttdCardValues edge={edge} previous={previous} mode={mode} />;
  }
  return (
    <MuiCard sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: 14 }} gutterBottom display="flex">
          <Typography component="span" flexGrow={1} color="text.secondary">
            {edge.node.year}年 {edge.node.category} {edge.node.rank}位
            {edge.node.elevation ? (
              <Typography component="span" ml={1} color={edge.node.elevation === '昇格' ? 'success.main' : 'error.main'}>
                {edge.node.elevation}
              </Typography>
            ) : null}
          </Typography>
          {mode === 'year' ? (
            <Typography component="span">
              {(index + 1).toString()}/{length}
            </Typography>
          ) : null}
        </Typography>
        <Typography variant="h5" component="div">
          {edge.node.fullname}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {cardTitle(tab)}
        </Typography>
        <Typography component="ul" p={0} sx={{ flexGrow: 1, overflow: 'auto', flexShrink: 1, minHeihgt: 0 }}>
          {cardValues()}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}

export default CardItem;
