/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';

import { Page } from '@/schemes';
import { BlockComponent } from '@components/molecules';
import { blockMapState } from '@/stores';
import { useRecoilValue } from 'recoil';

const wrapperCss = (): SerializedStyles => css`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 100%;
  width: 900px;
  margin: auto;
`;
const titlePaddingTopCss = (): SerializedStyles => css`
  height: 100px;
`;
const titleCss = (): SerializedStyles => css`
  font-weight: 700;
  line-height: 1.2;
  font-size: 40px;
`;
const emptyCss = (): SerializedStyles => css`
  height: 30px;
`;

interface Props {
  page: Page;
}

function Editor({ page }: Props): JSX.Element {
  const blockMap = useRecoilValue(blockMapState);

  return (
    <div>
      <div css={wrapperCss()}>
        <div css={titlePaddingTopCss()} />
        <div css={titleCss()} contentEditable suppressContentEditableWarning>
          {page?.title}
        </div>
      </div>
      <div css={wrapperCss()}>
        <div css={emptyCss()} />
      </div>
      <div css={wrapperCss()}>
        {blockMap[page.rootId].childIdList.map((blockId: string) => (
          <BlockComponent key={blockId} blockDTO={blockMap[blockId]} />
        ))}
      </div>
    </div>
  );
}

export default Editor;
