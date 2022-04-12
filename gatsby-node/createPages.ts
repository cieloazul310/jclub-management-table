import * as path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Club, MdxPost, Year } from '../types';

type GraphQLResult = {
  allClub: {
    edges: {
      node: Pick<Club, 'slug' | 'href'>;
    }[];
  };
  allYear: {
    edges: {
      node: Pick<Year, 'year' | 'href'>;
    }[];
  };
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'slug'>;
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
            short_name
            name
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
      allMdxPost(sort: { fields: date, order: ASC }) {
        edges {
          node {
            slug
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

  allClub.edges
    .map((data) => ({ ...data, mode: 'club' }))
    .forEach(({ node }, index, arr) => {
      const previous = index !== 0 ? arr[index - 1] : null;
      const next = index !== arr.length - 1 ? arr[index + 1] : null;

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

  allYear.edges
    .map((data) => ({ ...data, mode: 'year' }))
    .forEach(({ node }, index, arr) => {
      const previous = index !== 0 ? arr[index - 1] : null;
      const next = index !== arr.length - 1 ? arr[index + 1] : null;

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

  allMdxPost.edges.forEach(({ node }, index) => {
    const previous = index !== 0 ? allMdxPost.edges[index - 1] : null;
    const next = index !== allMdxPost.edges.length - 1 ? allMdxPost.edges[index + 1] : null;

    createPage({
      path: node.slug,
      component: path.resolve('./src/templates/post.tsx'),
      context: {
        previous: previous?.node.slug ?? null,
        next: next?.node.slug ?? null,
        slug: node.slug,
      },
    });
  });
}
