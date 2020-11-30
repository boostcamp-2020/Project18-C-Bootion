/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useState } from 'react';

import { Page } from '@/schemes';
import { Header, Editor } from '@components/molecules';
import { HeaderMenu } from '@components/organisms';

const staticMenuAreaCss = (): SerializedStyles => css`
  position: fixed;
  z-index: 2;
`;
const staticHeaderAreaCss = (): SerializedStyles => css`
  position: fixed;
  right: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 1;
`;
const staticScrollAreaCss = (): SerializedStyles => css`
  position: fixed;
  top: 45px;
  right: 0;
  width: 100%;
  height: calc(100% - 45px);
  overflow: auto;
`;
const bottomMarginCss = (): SerializedStyles => css`
  display: inline-block;
  width: 100%;
  height: 45%;
`;

interface Props {
  page: Page;
  menuClosed: boolean;
}

function PageComponent({ page, menuClosed }: Props): JSX.Element {
  const [isMenuClosed, setIsMenuClosed] = useState<boolean>(menuClosed);
  return (
    <div>
      <div css={staticMenuAreaCss()}>
        <HeaderMenu isMenuClosed />
      </div>
      <div css={staticHeaderAreaCss()}>
        <Header page={page} menuClosed={isMenuClosed} />
      </div>
      <div css={staticScrollAreaCss()}>
        <Editor page={page} />
        <div css={bottomMarginCss()} />
      </div>
    </div>
  );
}

export default PageComponent;
