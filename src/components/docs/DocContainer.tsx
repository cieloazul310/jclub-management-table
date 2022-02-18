import * as React from 'react';
import { ArticleTitle } from '@cieloazul310/gatsby-theme-aoi';
import renderAst from '../../utils/renderAst';

type DocContainerProps = {
  markdownRemark: {
    frontmatter: {
      title: string;
    };
    htmlAst: string;
  };
};

function DocContainer({ markdownRemark }: DocContainerProps) {
  const { frontmatter, htmlAst } = markdownRemark;
  return (
    <>
      <ArticleTitle>{frontmatter.title}</ArticleTitle>
      {renderAst(htmlAst)}
    </>
  );
}

export default DocContainer;
