/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { HeaderLink, HeaderButton } from '@components/atoms';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import {
  pageState,
  staticMenuToggleState,
  pageUserCountState,
  lastUpdateState,
} from '@/stores';
import { timeSince } from '@/utils';
import { boolean } from '@storybook/addon-knobs';

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

interface Props {}

function Header({}: Props): JSX.Element {
  const staticMenuToggle = useRecoilValue(staticMenuToggleState);
  const selectedPage = useRecoilValue(pageState);
  const [tic, setTic] = useState(true);
  const pageUserCount = useRecoilValue(pageUserCountState);
  const lastUpdate = useRecoilValue(lastUpdateState);

  const date = `Updated ${timeSince(lastUpdate)} ago`;
  const people = `${pageUserCount}명 접속중`;

  useEffect(() => {
    const id = setInterval(() => {
      setTic(!tic);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });

  return (
    <div css={headerCss()}>
      <div css={wrapperCss()}>
        {!staticMenuToggle && <div css={menuMarginCss()} />}
        <HeaderLink>{selectedPage?.title || 'Untitled'}</HeaderLink>
      </div>
      <div css={wrapperCss()}>
        <HeaderButton>{date}</HeaderButton>
        <HeaderButton>{people}</HeaderButton>
      </div>
    </div>
  );
}

export default Header;
