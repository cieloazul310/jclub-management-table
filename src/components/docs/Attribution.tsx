import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DocContainer from './DocContainer';
import { MarkDownQuery } from '../../../graphql-types';

function AttributionDoc() {
  const { markdownRemark } = useStaticQuery<MarkDownQuery>(graphql`
    query MarkDown {
      markdownRemark(frontmatter: { id: { eq: "data" } }) {
        htmlAst
        frontmatter {
          title
        }
      }
    }
  `);
  return markdownRemark ? <DocContainer markdownRemark={markdownRemark} /> : null;
}

export default AttributionDoc;
