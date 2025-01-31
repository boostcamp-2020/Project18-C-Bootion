import React, { useEffect, useState } from 'react';

import { fetchDummyData } from '@/utils';
import BlockComponent from '.';

const desc = {
  component: BlockComponent,
  title: 'Atoms/Block',
};

export const Default = (): JSX.Element => {
  const [block, setBlock] = useState(null);
  useEffect(() => {
    (async () => {
      const { page, blockMap } = await fetchDummyData();
      const rootBlock = blockMap[page.rootId];
      setBlock(blockMap[rootBlock.childIdList[0]]);
    })();
  });

  return <BlockComponent blockDTO={block} />;
};

export const HasDescendants = (): JSX.Element => {
  const [block, setBlock] = useState(null);
  useEffect(() => {
    (async () => {
      const { page, blockMap } = await fetchDummyData();
      const rootBlock = blockMap[page.rootId];
      setBlock(blockMap[rootBlock.childIdList[1]]);
    })();
  });
  return <BlockComponent blockDTO={block} />;
};

export const Grid = (): JSX.Element => {
  const [block, setBlock] = useState(null);
  useEffect(() => {
    (async () => {
      const { page, blockMap } = await fetchDummyData();
      const rootBlock = blockMap[page.rootId];
      setBlock(blockMap[rootBlock.childIdList[2]]);
    })();
  });
  return <BlockComponent blockDTO={block} />;
};

export default desc;
