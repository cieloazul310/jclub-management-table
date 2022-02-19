import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardItem from '../components/Card/CardItem';
import data from './assets/data';

export default {
  title: 'Card Item',
  component: CardItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /*
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  */
} as ComponentMeta<typeof CardItem>;

const Template: ComponentStory<typeof CardItem> = (args) => <CardItem {...args} />;

export const PL = Template.bind({});
PL.args = {
  edge: data[data.length - 1],
  previous: data[data.length - 2],
  tab: 'pl',
};

export const BS = Template.bind({});
BS.args = {
  edge: data[6],
  previous: data[5],
  tab: 'bs',
};

export const Revenue = Template.bind({});
Revenue.args = {
  edge: data[data.length - 2],
  previous: data[data.length - 3],
  tab: 'revenue',
};

export const Expense = Template.bind({});
Expense.args = {
  edge: data[8],
  previous: data[7],
  tab: 'expense',
};

export const Attd = Template.bind({});
Attd.args = {
  edge: data[data.length - 2],
  previous: data[data.length - 3],
  tab: 'attd',
};
