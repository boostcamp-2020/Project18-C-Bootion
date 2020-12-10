/** @jsx jsx */
/** @jsxRuntime classic */
import { css, jsx } from '@emotion/react';
import { Page } from '@/schemes';
import { useRecoilState } from 'recoil';
import { selectedPageState } from '@/stores';
import { useState } from 'react';

const itemCss = (isHovered: boolean) => css`
  align-items: center;
  min-height: 27px;
  padding: 2px 14px;
  width: 100%;
  font-size: 14px;
  line-height: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  background: ${isHovered ? 'rgba(55, 53, 47, 0.08)' : 'inherit'};
`;
const selectedItemCss = (isHovered: boolean) => css`
  align-items: center;
  min-height: 27px;
  padding: 2px 14px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  line-height: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${isHovered
    ? 'rgba(55, 53, 47, 0.18)'
    : 'rgba(55, 53, 47, 0.08)'};
  color: rgb(55, 53, 47);
  cursor: pointer;
`;

interface Props {
  page: Page;
}

function MenuItem({ page }: Props): JSX.Element {
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageState);
  const [hoverToggle, setHoverToggle] = useState(false);

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
      {page.title || 'Untitled'}
    </div>
  );
}

export default MenuItem;
