/** @jsx jsx */
/** @jsxRuntime classic */
import { css, jsx } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

import { Page } from '@/schemes';
import { selectedPageState } from '@/stores';
import { HeaderButton } from '@atoms/index';
import { ReactComponent as Trash } from '@assets/trash.svg';

const itemCss = (isHovered: boolean) => css`
  align-items: center;
  min-height: 27px;
  padding: 2px 14px;
  padding-right: ${isHovered ? 8 : 14}px;
  cursor: pointer;
  background: ${isHovered ? 'rgba(55, 53, 47, 0.08)' : 'inherit'};
`;
const selectedItemCss = (isHovered: boolean) => css`
  align-items: center;
  min-height: 27px;
  padding: 2px 14px;
  padding-right: ${isHovered ? 8 : 14}px;
  background: ${isHovered
    ? 'rgba(55, 53, 47, 0.16)'
    : 'rgba(55, 53, 47, 0.08)'};
  cursor: pointer;
`;
const titleCss = () => css`
  color: rgb(55, 53, 47);
  font-size: 14px;
  font-weight: 600;
  line-height: 2.1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const trashCss = () => css`
  float: right;
`;

interface Props {
  page: Page;
}

function MenuItem({ page }: Props): JSX.Element {
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageState);
  const [hoverToggle, setHoverToggle] = useState(false);

  const handleDeletePage = () => {};

  return (
    <div
      key={page.id}
      css={
        selectedPage.id === page.id
          ? selectedItemCss(hoverToggle)
          : itemCss(hoverToggle)
      }
      onClick={() => setSelectedPage(page)}
      onKeyUp={() => setSelectedPage(page)}
      onMouseEnter={() => setHoverToggle(true)}
      onMouseLeave={() => setHoverToggle(false)}
    >
      {hoverToggle && (
        <div css={trashCss()}>
          <HeaderButton handleClick={handleDeletePage}>
            <Trash />
          </HeaderButton>
        </div>
      )}
      <div css={titleCss()}>{page.title || 'Untitled'}</div>
    </div>
  );
}

export default MenuItem;
