/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { BlockComponent } from '@components/molecules';
import { useRecoilValue } from 'recoil';
import { pageState, blockMapState } from '@/stores';

const wrapperCss = () => css`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 100%;
  width: 900px;
  margin: auto;
`;

function Editor(): JSX.Element {
  const page = useRecoilValue(pageState);
  const blockMap = useRecoilValue(blockMapState);

  return (
    <div css={wrapperCss()}>
      {blockMap[page.rootId].childIdList.map((blockId: string) => (
        <BlockComponent key={blockId} blockDTO={blockMap[blockId]} />
      ))}
    </div>
  );
}

export default Editor;
