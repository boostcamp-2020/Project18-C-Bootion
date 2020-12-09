/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Header, Title, Editor } from '@components/molecules';
import { HeaderMenu } from '@components/organisms';

const staticMenuAreaCss = () => css`
  position: fixed;
  z-index: 2;
`;
const staticHeaderAreaCss = () => css`
  position: fixed;
  right: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 1;
`;
const staticScrollAreaCss = () => css`
  position: fixed;
  top: 45px;
  right: 0;
  width: 100%;
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
  return (
    <div>
      <div css={staticMenuAreaCss()}>
        <HeaderMenu />
      </div>
      <div css={staticHeaderAreaCss()}>
        <Header />
      </div>
      <div css={staticScrollAreaCss()}>
        <Title />
        <Editor />
        <div css={bottomMarginCss()} />
      </div>
    </div>
  );
}

export default PageComponent;
