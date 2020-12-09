/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { Suspense } from 'react';
import { useRecoilState } from 'recoil';

import { pagesState, staticMenuToggleState } from '@/stores';
import { createPage } from '@/utils';

const wrapperCss = (staticToggle: boolean) => css`
  width: 240px;
  height: 80vh;
  border-radius: 3px;
  background: rgb(247, 246, 243);
  ${!staticToggle ? 'box-shadow: 0 0 10px 1px #aaaaaa' : ''};
`;

interface Props {}

function Menu({}: Props): JSX.Element {
  const [pages, setPages] = useRecoilState(pagesState);
  const [staticToggle, setStaticToggle] = useRecoilState(staticMenuToggleState);

  const handleClick = () => {
    const createAndFetchPage = async () => {
      const { pages: updatedPages } = await createPage();
      setPages(updatedPages);
    };
    createAndFetchPage();
  };

  return (
    <div css={wrapperCss(staticToggle)}>
      <div>WORKSPACE</div>
      <button type="button" onClick={handleClick}>
        +
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        {pages.map((page) => (
          <div key={page.id}>{` * ${page.title || 'Untitled'}`}</div>
        ))}
      </Suspense>
    </div>
  );
}

export default Menu;
