import { Node } from 'gatsby';

export type Mode = 'club' | 'year';
export type Tab = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';

export type Categories = 'J1' | 'J2' | 'J3';

export type Club = {
  id: string;
  slug: string;
  name: string;
  fullname: string;
  short_name: string;
  company: string;
  category: Categories;
  hometown: string;
  area: string;
  settlement: string | null;
  relatedCompanies?: string[];
};
export type ClubNode = Node & Club;

export type Year = {
  id: string;
  year: number;
  categories: Categories[];
};
export type YearNode = Node & Year;

export type General = {
  id: string;
  name: string;
  fullname: string;
  year: number;
  category: string;
  license: string | null;
};
export type SeasonResult = {
  rank: number;
  points: number;
  ppg: number;
  elevation: '昇格' | '降格' | null;
};
export type PL = {
  revenue: number;
  expense: number;
  op_profit: number;
  no_rev: number | null;
  no_exp: number | null;
  ordinary_profit: number;
  sp_rev: number | null;
  sp_exp: number | null;
  profit_before_tax: number | null;
  tax: number | null;
  profit: number;
  related_revenue: number | null;
};
export type BS = {
  curr_assets: number | null;
  fixed_assets: number | null;
  assets: number | null;
  curr_liabilities: number | null;
  fixed_liabilities: number | null;
  liabilities: number | null;
  net_worth: number | null;
  capital_stock: number | null;
  capital_surplus: number | null;
  retained_earnings: number | null;
  profit: number;
};
export type Revenue = {
  revenue: number;
  sponsor: number | null;
  ticket: number | null;
  broadcast: number;
  academy_rev: number | null;
  goods_rev: number | null;
  other_revs: number | null;
  related_revenue: number | null;
};
export type Expense = {
  expense: number | null;
  salary: number | null;
  manage_exp: number | null;
  general_exp: number | null;
  game_exp: number | null;
  team_exp: number | null;
  academy_exp: number | null;
  women_exp: number | null;
  goods_exp: number | null;
  sga: number | null;
};
export type Attd = {
  league_attd: number;
  league_games: number;
  leaguecup_attd: number | null;
  leaguecup_games: number | null;
  po_attd: number | null;
  po_games: number | null;
  acl_attd: number | null;
  acl_games: number | null;
  second_attd: number | null;
  second_games: number | null;
  all_attd: number;
  all_games: number;
};
export type Datum = General & SeasonResult & PL & BS & Revenue & Expense & Attd;
export type DatumBrowser = Datum & { average_attd: number; unit_price: number | null };
export type DatumNode = Node & Datum;

export type SortableKeys = Exclude<keyof DatumBrowser, keyof General | 'elevation'>;
