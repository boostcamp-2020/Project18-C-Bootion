import React from 'react';
import Page from '.';
import M from '../../molecules/index';

const des = {
  component: Page,
  title: 'Organisms/Page',
};

export const testPage = (): JSX.Element => {
  return (
    <Page>
      <M.Block
        {...{ id: '123', type: 1, value: 'test', notifyHover: () => {} }}
      />
      <M.Block
        {...{ id: '124', type: 1, value: 'test', notifyHover: () => {} }}
      />
    </Page>
  );
};

export default des;
