/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Header, Title, Editor } from '@components/molecules';
import { HeaderMenu } from '@components/organisms';
import { useRecoilValue } from 'recoil';
import { staticMenuToggleState } from '@/stores';

const staticMenuAreaCss = () => css`
  position: fixed;
  z-index: 2;
`;
const staticHeaderAreaCss = (staticMenuToggle: boolean) => css`
  position: fixed;
  right: 0;
  left: ${staticMenuToggle ? 240 : 0}px;
  width: calc(100% - ${staticMenuToggle ? 240 : 0}px);
  background-color: #ffffff;
  z-index: 1;
`;
const staticScrollAreaCss = (staticMenuToggle: boolean) => css`
  position: fixed;
  top: 45px;
  right: 0;
  left: ${staticMenuToggle ? 240 : 0}px;
  width: calc(100% - ${staticMenuToggle ? 240 : 0}px);
  height: calc(100% - 45px);
  overflow: auto;
`;
const bottomMarginCss = () => css`
  display: inline-block;
  width: 100%;
  height: 45%;
`;

interface Props {}

function PageComponent({}: Props): JSX.Element {
  const staticMenuToggle = useRecoilValue(staticMenuToggleState);

  return (
    <div>
      <div css={staticMenuAreaCss()}>
        <HeaderMenu />
      </div>
      <div css={staticHeaderAreaCss(staticMenuToggle)}>
        <Header />
      </div>
      <div css={staticScrollAreaCss(staticMenuToggle)}>
        <Title />
        <Editor />
        <div css={bottomMarginCss()} />
      </div>
    </div>
  );
}

export default PageComponent;
