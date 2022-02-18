import * as React from 'react';
import { Title, TitleProps } from '@devexpress/dx-react-chart';
import { ArticleTitle } from '@cieloazul310/gatsby-theme-aoi';

function TextComponent({ text }: Title.TextProps) {
  return <ArticleTitle>{text}</ArticleTitle>;
}

function CustomTitle({ text, position }: Omit<TitleProps, 'textComponent'>): JSX.Element {
  return <Title text={text} textComponent={TextComponent} position={position} />;
}

export default CustomTitle;
