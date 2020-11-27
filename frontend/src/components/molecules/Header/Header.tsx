/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useState } from 'react';

import { Page } from '../../../schemes';
import HeaderLink from '../../atoms/HeaderLink';
import HeaderButton from '../../atoms/HeaderButton';
import HeaderMenu from '../../organisms/HeaderMenu';
import { ReactComponent as Dots } from '../../../assets/dots.svg';
import { ReactComponent as Check } from '../../../assets/check.svg';

const headerCss = (): SerializedStyles => css`
  width: 100%;
  max-width: 100vw;
  height: 45px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding-left: 12px;
  padding-right: 10px;
`;
const wrapperCss = (): SerializedStyles => css`
  display: flex;
  align-items: center;
  line-height: 1.2;
  font-size: 14px;
  height: 100%;
  flex-grow: 0;
  margin-right: 8px;
  min-width: 0;
`;
const menuMarginCss = (): SerializedStyles => css`
  width: 30px;
`;

interface Props {
  page: Page;
  menuClosed: boolean;
}

function Header({ page, menuClosed }: Props): JSX.Element {
  const [isMenuClosed, setIsMenuClosed] = useState<boolean>(menuClosed);
  return (
    <div css={headerCss()}>
      <div css={wrapperCss()}>
        {/* {isMenuClosed && <HeaderMenu isMenuClosed />} */}
        {isMenuClosed && <div css={menuMarginCss()} />}
        <HeaderLink>{page.title}</HeaderLink>
        <span>/</span>
        <HeaderLink>temp</HeaderLink>
      </div>
      <div css={wrapperCss()}>
        <HeaderButton>Share</HeaderButton>
        <HeaderButton>
          <Check />
          Updates
        </HeaderButton>
        <HeaderButton>Favorite</HeaderButton>
        <HeaderButton>
          <Dots />
        </HeaderButton>
      </div>
    </div>
  );
}

export default Header;
