import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CardContainer from '../components/Card/Container';

export default {
  title: 'Card/Container',
  component: CardContainer,
} as ComponentMeta<typeof CardContainer>;

const Template: ComponentStory<typeof CardContainer> = (args) => <CardContainer {...args} />;

const data = Array.from({ length: 10 }, () => ({
  node: {
    value: Math.round(Math.random() * 100),
  },
}));

export const Basic = Template.bind({});
Basic.args = {
  edges: data,
};
