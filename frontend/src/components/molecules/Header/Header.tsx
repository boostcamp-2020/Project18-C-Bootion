/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { Page } from '@/schemes';
import { HeaderLink, HeaderButton } from '@components/atoms';
import { ReactComponent as Dots } from '@assets/dots.svg';
import { ReactComponent as Check } from '@assets/check.svg';
import { useRecoilValue } from 'recoil';
import { staticMenuToggleState } from '@/stores';

const headerCss = () => css`
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
const wrapperCss = () => css`
  display: flex;
  align-items: center;
  line-height: 1.2;
  font-size: 14px;
  height: 100%;
  flex-grow: 0;
  margin-right: 8px;
  min-width: 0;
`;
const menuMarginCss = () => css`
  width: 30px;
`;

interface Props {
  page: Page;
}

function Header({ page }: Props): JSX.Element {
  const staticMenuToggle = useRecoilValue(staticMenuToggleState);

  return (
    <div css={headerCss()}>
      <div css={wrapperCss()}>
        {!staticMenuToggle && <div css={menuMarginCss()} />}
        <HeaderLink>{page?.title}</HeaderLink>
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
