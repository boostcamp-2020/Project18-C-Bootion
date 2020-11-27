import React from 'react';

import Header from './Header';
import { Page } from '../../../schemes';

const desc = {
  component: Header,
  title: 'molecules/Header',
};

export const Default = (): JSX.Element => {
  const page: Page = {
    id: 0,
    title: 'Page 01',
    records: [],
  };
  return <Header page={page} menuClosed />;
};

export const menuOpened = (): JSX.Element => {
  const page: Page = {
    id: 0,
    title: 'Page 01',
    records: [],
  };
  return <Header page={page} menuClosed={false} />;
};

export default desc;
