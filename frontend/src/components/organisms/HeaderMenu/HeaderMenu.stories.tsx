import React from 'react';

import HeaderMenu from '.';

const desc = {
  component: HeaderMenu,
  title: 'organisms/HeaderMenu',
};

export const Default = (): JSX.Element => {
  return <HeaderMenu isMenuClosed />;
};

export const MenuOpened = (): JSX.Element => {
  return <HeaderMenu isMenuClosed={false} />;
};

export default desc;
