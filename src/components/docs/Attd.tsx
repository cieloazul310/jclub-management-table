import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { MarkDownQuery } from '../../../graphql-types';
import DocContainer from './DocContainer';

function AttdDoc() {
  const { markdownRemark } = useStaticQuery<MarkDownQuery>(graphql`
    query {
      markdownRemark(frontmatter: { id: { eq: "attd" } }) {
        htmlAst
        frontmatter {
          title
        }
      }
    }
  `);
  return markdownRemark ? <DocContainer markdownRemark={markdownRemark} /> : null;
}

export default AttdDoc;
