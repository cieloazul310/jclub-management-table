import * as React from 'react';
import { Title, TitleProps } from '@devexpress/dx-react-chart';
import { H4 } from '@cieloazul310/gatsby-theme-aoi';

function TextComponent({ text }: Title.TextProps) {
  return <H4>{text}</H4>;
}

function CustomTitle({ text, position }: Omit<TitleProps, 'textComponent'>): JSX.Element {
  return <Title text={text} textComponent={TextComponent} position={position} />;
}

export default CustomTitle;
