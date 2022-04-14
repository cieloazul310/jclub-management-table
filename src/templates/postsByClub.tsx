import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { Jumbotron, Section, SectionDivider, Article, PanelLink, ListItemLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import { AdInSectionDividerOne } from '../components/Ads';
import Layout from '../layout';
import { ClubBrowser, MdxPost } from '../../types';

type PostsByClubPageData = {
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'title' | 'date' | 'slug'>;
    }[];
  };
  club: Pick<ClubBrowser, 'name' | 'href'>;
};
type PageContext = {
  club: string;
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  basePath: string;
  totalCount: number;
};
/*
// previous,
            // next,
            club: node.short_name,
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            basePath,
            totalCount,
*/

function PostsByClubTemplate({ data }: PageProps<PostsByClubPageData, PageContext>) {
  const { allMdxPost, club } = data;

  return (
    <Layout title={`${club.name}の記事一覧`}>
      <Jumbotron maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom>
          {club.name}の記事一覧
        </Typography>
        <Typography>{allMdxPost.edges.length} posts</Typography>
      </Jumbotron>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <List>
            {allMdxPost.edges.map(({ node }, index) => (
              <ListItemLink
                key={node.slug}
                primaryText={node.title}
                secondaryText={node.date}
                to={node.slug}
                divider={index !== allMdxPost.edges.length - 1}
              />
            ))}
          </List>
        </Article>
      </Section>
      <SectionDivider />
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink to={club.href} disableBorder disableMargin>
            {club.name}の経営情報一覧
          </PanelLink>
        </Container>
      </Section>
      <SectionDivider />
      {/*
          <Section>
          <PageNavigationContainer>
            <PageNavigationItem to={previous?.to ?? '#'} disabled={!previous}>
              <Typography variant="body2">{previous?.title}</Typography>
            </PageNavigationItem>
            <PageNavigationItem to={next?.to ?? '#'} disabled={!next} next>
              <Typography variant="body2">{next?.title}</Typography>
            </PageNavigationItem>
          </PageNavigationContainer>
        </Section>
      */}
    </Layout>
  );
}

export default PostsByClubTemplate;

export const query = graphql`
  query PostsByClub($slug: String!, $skip: Int!, $limit: Int!) {
    allMdxPost(
      filter: { club: { slug: { eq: $slug } } }
      sort: { fields: [date, lastmod], order: [DESC, DESC] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          date(formatString: "YYYY年MM月DD日")
          slug
        }
      }
    }
    club(slug: { eq: $slug }) {
      name
      href
    }
  }
`;
