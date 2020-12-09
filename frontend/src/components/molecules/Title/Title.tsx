/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { pagesState, selectedPageState } from '@/stores';
import { ChangeEvent } from 'react';

const wrapperCss = () => css`
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  padding-bottom: 30px;
  max-width: 100%;
  width: 900px;
  margin: auto;
`;
const titlePaddingTopCss = () => css`
  height: 100px;
`;
const titleCss = () => css`
  font-weight: 700;
  line-height: 1.2;
  font-size: 40px;
  color: rgb(55, 53, 47);
  border: none;
  outline: none;
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  min-height: 1em;
  cursor: text;

  &::placeholder {
    color: rgba(55, 53, 47, 0.15);
  }
`;

interface Props {}

function Title({}: Props): JSX.Element {
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageState);
  const setPages = useSetRecoilState(pagesState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPage({ ...selectedPage, title: event.currentTarget.value });
  };

  return (
    <div css={wrapperCss()}>
      <div css={titlePaddingTopCss()} />
      <input
        css={titleCss()}
        onChange={handleChange}
        type="text"
        placeholder="Untitled"
      />
    </div>
  );
}

export default Title;
