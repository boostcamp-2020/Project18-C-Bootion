/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Block } from '@/schemes';
import { BlockComponent } from '@components/molecules';
import { useRecoilValue } from 'recoil';
import { pageState } from '@/stores';

const wrapperCss = () => css`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 100%;
  width: 900px;
  margin: auto;
`;
const titlePaddingTopCss = () => css`
  height: 100px;
`;
const titleCss = () => css`
  font-weight: 700;
  line-height: 1.2;
  font-size: 40px;
`;
const emptyCss = () => css`
  height: 30px;
`;

interface Props {}

function Editor({}: Props): JSX.Element {
  const page = useRecoilValue(pageState('1'));

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
        {page?.blockList.map((block: Block) => (
          <BlockComponent key={block.id} blockDTO={block} />
        ))}
      </div>
    </div>
  );
}

export default Editor;
