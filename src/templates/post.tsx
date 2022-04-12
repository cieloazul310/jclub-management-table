import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Jumbotron, Section, SectionDivider, Article, PanelLink } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem, muiComponents } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Diff from '../components/Diff';
import Layout from '../layout';
import { ClubBrowser, MdxPost } from '../../types';

type PageData = {
  mdxPost: Pick<MdxPost, 'body' | 'title' | 'lastmod' | 'date' | 'excerpt'> & {
    club: Pick<ClubBrowser, 'short_name' | 'name' | 'href'> | null;
  };
  previous: { to: string; title: string } | null;
  next: { to: string; title: string } | null;
};
type PageContext = {
  slug: string;
  previous: string | null;
  next: string | null;
};

function PostLayout({ data, ...props }: PageProps<PageData, PageContext>) {
  console.log(props);
  const { mdxPost, previous, next } = data;

  return (
    <Layout title={mdxPost.title} headerTitle="記事" previous={previous} next={next} description={mdxPost.excerpt}>
      <article>
        <header>
          <Jumbotron maxWidth="md">
            <Typography>{mdxPost.date}</Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {mdxPost.title}
            </Typography>
          </Jumbotron>
        </header>
        <SectionDivider />
        <Section>
          <Article maxWidth="md">
            <MDXProvider components={{ ...muiComponents, Diff }}>
              <MDXRenderer>{mdxPost.body}</MDXRenderer>
            </MDXProvider>
          </Article>
        </Section>
        <SectionDivider />
        <footer>
          <Section>
            <Article maxWidth="md">
              <Typography variant="h6" gutterBottom>
                {mdxPost.title}
              </Typography>
              <Typography>日付: {mdxPost.date}</Typography>
              <Typography>最終更新: {mdxPost.lastmod}</Typography>
              {mdxPost.club ? <Typography>クラブ: {mdxPost.club.name}</Typography> : null}
            </Article>
          </Section>
          <SectionDivider />
          {mdxPost.club ? (
            <Section>
              <Container maxWidth="md" disableGutters>
                <PanelLink to={mdxPost.club.href} disableBorder disableMargin>
                  {mdxPost.club.name}の経営情報一覧
                </PanelLink>
              </Container>
            </Section>
          ) : null}
          <SectionDivider />
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
        </footer>
      </article>
    </Layout>
  );
}

export default PostLayout;

export const query = graphql`
  query Post($slug: String!, $previous: String, $next: String) {
    mdxPost(slug: { eq: $slug }) {
      date(formatString: "YYYY年MM月DD日")
      title
      lastmod(formatString: "YYYY年MM月DD日")
      body
      excerpt(truncate: true)
      club {
        short_name
        href
        name
      }
    }
    previous: mdxPost(slug: { eq: $previous }) {
      to: slug
      title
    }
    next: mdxPost(slug: { eq: $next }) {
      to: slug
      title
    }
  }
`;
