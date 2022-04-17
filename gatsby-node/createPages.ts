import * as path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Club, MdxPost, Year } from '../types';

type GraphQLResult = {
  allClub: {
    edges: {
      node: Pick<Club, 'slug' | 'href'> & {
        posts: { totalCount: number };
      };
    }[];
  };
  allYear: {
    edges: {
      node: Pick<Year, 'year' | 'href'>;
    }[];
  };
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'slug' | 'draft'> & { club: Pick<Club, 'slug'> | null };
    }[];
  };
};

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<GraphQLResult>(`
    query {
      allClub {
        edges {
          node {
            slug
            href
            posts {
              totalCount
            }
          }
        }
      }
      allYear(sort: { fields: year, order: ASC }) {
        edges {
          node {
            year
            href
          }
        }
      }
      allMdxPost(sort: { fields: [date, lastmod, slug], order: [ASC, ASC, ASC] }) {
        edges {
          node {
            slug
            draft
            club {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no data');
  const { allClub, allYear, allMdxPost } = result.data;

  const postsPerPage = 20;

  allClub.edges.forEach(({ node }, index) => {
    const previous = index !== 0 ? allClub.edges[index - 1] : null;
    const next = index !== allClub.edges.length - 1 ? allClub.edges[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/club.tsx`),
      context: {
        previous: previous?.node.slug ?? null,
        next: next?.node.slug ?? null,
        slug: node.slug,
      },
    });
  });

  allYear.edges.forEach(({ node }, index) => {
    const previous = index !== 0 ? allYear.edges[index - 1] : null;
    const next = index !== allYear.edges.length - 1 ? allYear.edges[index + 1] : null;

    createPage({
      path: node.href,
      component: path.resolve(`./src/templates/year.tsx`),
      context: {
        previous: previous?.node.year ?? null,
        next: next?.node.year ?? null,
        year: node.year,
      },
    });
  });

  allMdxPost.edges.forEach(({ node }, index, arr) => {
    const previous = index !== 0 ? arr[index - 1] : null;
    const next = index !== arr.length - 1 ? arr[index + 1] : null;

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/post.tsx'),
      context: {
        previous: previous?.node.slug ?? null,
        next: next?.node.slug ?? null,
        slug: node.slug,
        club: node.club?.slug ?? null,
      },
    });
  });

  allClub.edges
    .filter(({ node }) => node.posts.totalCount)
    .forEach(({ node }) => {
      const { totalCount } = node.posts;
      const basePath = `/club/${node.slug}/posts`;
      const numPages = Math.ceil(totalCount / postsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `${basePath}` : `${basePath}/${i + 1}`,
          component: path.resolve('./src/templates/postsByClub.tsx'),
          context: {
            slug: node.slug,
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            basePath,
            totalCount,
          },
        });
      });
    });
}
