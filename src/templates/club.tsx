import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { ClubTemplateQuery, SitePageContext } from '../../graphql-types';
import TemplateLayout from '../layout/TemplateLayout';

function ClubTemplate({ data, pageContext }: PageProps<ClubTemplateQuery, SitePageContext>) {
  const { clubsYaml } = data;
  return (
    <TemplateLayout
      mode="club"
      title={`${clubsYaml?.name}の経営情報`}
      headerTitle={`${clubsYaml?.name}`}
      description={`${clubsYaml?.fullname}の年度別経営情報一覧。損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに時系列表示。`}
      data={data}
      pageContext={pageContext}
    />
  );
}

export default ClubTemplate;

export const query = graphql`
  query ClubTemplate($slug: String!) {
    clubsYaml(slug: { eq: $slug }) {
      id
      short_name
      name
      fullname
      category
      slug
      company
      hometown
      area
      settlement
      relatedCompanies
    }
    allDataset(filter: { slug: { eq: $slug } }, sort: { fields: year }) {
      edges {
        node {
          academy_exp
          academy_rev
          acl_attd
          acl_games
          all_attd
          all_games
          broadcast
          assets
          capital_stock
          capital_surplus
          category
          curr_assets
          curr_liabilities
          elevation
          expense
          fixed_assets
          fixed_liabilities
          fullname
          game_exp
          general_exp
          goods_exp
          goods_rev
          id
          league_attd
          league_games
          leaguecup_attd
          leaguecup_games
          liabilities
          license
          manage_exp
          name
          net_worth
          no_exp
          no_rev
          op_profit
          ordinary_profit
          other_revs
          po_attd
          po_games
          points
          ppg
          profit
          profit_before_tax
          related_revenue
          rank
          retained_earnings
          revenue
          salary
          second_attd
          second_games
          sga
          slug
          sp_exp
          sp_rev
          sponsor
          tax
          team_exp
          ticket
          women_exp
          year
        }
      }
    }
  }
`;
