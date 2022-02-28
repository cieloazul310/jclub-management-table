import * as React from 'react';
import { DatumBrowser, SortableKeys, Category } from '../../types';

export interface StatItem {
  club: DatumBrowser;
  value: number;
}

export interface Stat {
  key: string;
  totalCount: number;
  sum: {
    value: number;
    prev: number | null;
  };
  average: {
    value: number;
    prev: number | null;
  };
  median: {
    value: number;
    prev: number | null;
  };
  max: {
    club: DatumBrowser;
    value: number;
    prev: number | null;
  };
  min: {
    club: DatumBrowser;
    value: number;
    prev: number | null;
  };
}

function getStat(edges: { node: DatumBrowser }[], key: SortableKeys) {
  const sorted = edges.sort((a, b) => (a.node[key] ?? 0) - (b.node[key] ?? 0));
  const totalCount = edges.length;
  const sum = edges.reduce((accum, curr) => accum + (curr.node[key] ?? 0), 0);
  const average = sum / totalCount;
  const median =
    totalCount % 2 === 0
      ? Math.round(((sorted[totalCount / 2 - 1].node[key] ?? 0) + (sorted[totalCount / 2].node[key] ?? 0)) / 2)
      : Math.round(sorted[Math.floor(totalCount / 2)].node[key] ?? 0);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  return { totalCount, sum, average, median, min, max };
}

function useStat(edges: { node: DatumBrowser }[], category: Category, key: SortableKeys): Stat {
  return React.useMemo(() => {
    const filtered = edges.filter(({ node }) => node.category === category).sort((a, b) => (a.node[key] ?? 0) - (b.node[key] ?? 0));
    const prevs = edges
      .filter(({ node }) => node.previousData?.category === category)
      .sort((a, b) => (a.node[key] ?? 0) - (b.node[key] ?? 0));

    const { totalCount, sum, average, median, min, max } = getStat(filtered, key);
    const prevStat = prevs.length ? getStat(prevs, key) : null;

    return {
      key,
      totalCount,
      sum: {
        value: sum,
        prev: prevStat?.sum ?? null,
      },
      average: {
        value: average,
        prev: prevStat?.average ?? null,
      },
      median: {
        value: median,
        prev: prevStat?.median ?? null,
      },
      min: {
        club: min.node,
        value: min.node[key] ?? 0,
        prev: prevStat?.min.node[key] ?? null,
      },
      max: {
        club: max.node,
        value: max.node[key] ?? 0,
        prev: prevStat?.max.node[key] ?? null,
      },
    };
  }, [edges, key, category]);
}

export default useStat;
