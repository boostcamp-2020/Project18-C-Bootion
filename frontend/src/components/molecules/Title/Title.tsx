/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { useRecoilValue } from 'recoil';
import { pageState } from '@/stores';

const wrapperCss = () => css`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  padding-bottom: 30px;
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

interface Props {}

function Title({}: Props): JSX.Element {
  const page = useRecoilValue(pageState('1'));

  return (
    <div css={wrapperCss()}>
      <div css={titlePaddingTopCss()} />
      <div css={titleCss()} contentEditable suppressContentEditableWarning>
        {page?.title}
      </div>
    </div>
  );
}

export default Title;
