/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { Suspense } from 'react';
import { useRecoilState } from 'recoil';

import { pagesState } from '@/stores';
import { createPage } from '@/utils';

const wrapperCss = (): SerializedStyles => css`
  width: 30px;
  width: 240px;
  height: 80vh;
  border: 1px solid #999999;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 0 30px 1px #aaaaaa;
`;

interface Props {}

function Menu({}: Props): JSX.Element {
  const [pages, setPages] = useRecoilState(pagesState);

  const handleClick = () => {
    (async () => {
      const { pages: updatedPages } = await createPage();
      setPages(updatedPages);
    })();
  };

  return (
    <div css={wrapperCss()}>
      <div>menu</div>
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
