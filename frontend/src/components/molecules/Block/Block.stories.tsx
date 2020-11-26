import React from 'react';
import Block from '.';

const desc = {
  component: Block,
  title: 'Molecules/Block',
  decorators: [
    (Story: any) => (
      <div style={{ width: '400px', margin: 'auto', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = (): JSX.Element => {
  return (
    <>
      <Block
        {...{ id: '123', type: 1, value: 'test', notifyHover: () => {} }}
      />
      <Block
        {...{ id: '124', type: 1, value: 'test', notifyHover: () => {} }}
      />
    </>
  );
};

export default desc;
