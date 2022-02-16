export type SortKey =
  | 'rank'
  | 'revenue'
  | 'sponsor'
  | 'ticket'
  | 'broadcast'
  | 'academy_rev'
  | 'goods_rev'
  | 'other_revs'
  | 'expense'
  | 'salary'
  | 'game_exp'
  | 'team_exp'
  | 'academy_exp'
  | 'women_exp'
  | 'goods_exp'
  | 'sga'
  | 'no_rev'
  | 'no_exp'
  | 'sp_rev'
  | 'sp_exp'
  | 'op_profit'
  | 'ordinary_profit'
  | 'profit'
  | 'related_revenue'
  | 'assets'
  | 'liabilities'
  | 'capital_stock'
  | 'net_worth'
  | 'league_attd'
  | 'average_attd'
  | 'unit_price'
  | 'all_attd';

export type FilterCategory = 'J1' | 'J2' | 'J3' | 'others';

export interface AppState {
  sortKey: SortKey;
  sortAsc: boolean;
  filterCategories: FilterCategory[];
  displayFullAttd: boolean;
  listMode: boolean;
}

export const initialAppState: AppState = {
  sortKey: 'revenue',
  sortAsc: false,
  filterCategories: ['J1', 'J2', 'J3', 'others'],
  displayFullAttd: false,
  listMode: false,
};

export function useInitialAppState(isMobile: boolean): AppState {
  return {
    ...initialAppState,
    listMode: isMobile,
  };
}

export type Action =
  | { type: 'TOGGLE_FULL_ATTD' }
  | { type: 'CHANGE_SORTKEY'; sortKey: SortKey }
  | { type: 'TOGGLE_SORTASC' }
  | { type: 'TOGGLE_FILTERCATEGORY'; category: FilterCategory }
  | { type: 'TOGGLE_LISTMODE' }
  | { type: 'RESET' };

export default function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_FULL_ATTD':
      return {
        ...state,
        displayFullAttd: !state.displayFullAttd,
      };
    case 'CHANGE_SORTKEY':
      return {
        ...state,
        sortKey: action.sortKey,
        sortAsc: action.sortKey === 'rank',
      };
    case 'TOGGLE_SORTASC':
      return {
        ...state,
        sortAsc: !state.sortAsc,
      };
    case 'TOGGLE_FILTERCATEGORY':
      return {
        ...state,
        filterCategories: state.filterCategories.includes(action.category)
          ? state.filterCategories.filter((category) => category !== action.category)
          : [...state.filterCategories, action.category],
      };
    case 'TOGGLE_LISTMODE':
      return {
        ...state,
        listMode: !state.listMode,
      };
    case 'RESET': {
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      return {
        ...initialAppState,
        listMode: isMobile,
      };
    }
    default:
      throw new Error();
  }
}
