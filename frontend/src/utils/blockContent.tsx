/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import { ReactComponent as Toggle } from '@assets/toggle-default.svg';

export const regex: { [key: string]: RegExp } = {
  heading1: /^#\s[^\s.]*/gm,
  heading2: /^##\s[^\s.]*/gm,
  heading3: /^###\s[^\s.]*/gm,
  bulletedlist: /^-\s[^\s.]*/gm,
  numberedlist: /^1.\s[^\s.]*/gm,
  togglelist: /^>\s[^\s.]*/gm,
  quote: /^\|\s[^\s.]*/gm,
};

const divCSS = css`
  margin: 0px 4px;
  font-size: 18px;
  color: inherit;
  height: 100%;
`;

export const listComponent: { [key: string]: any } = {
  bulletedlist: <div css={divCSS}>•</div>,
  numberedlist: <div css={divCSS}> 1. </div>,
  togglelist: (
    <div css={divCSS}>
      <Toggle />
    </div>
  ),
  quote: <div css={divCSS}>▕</div>,
};

export const fontSize: { [key: string]: string } = {
  heading1: 'xx-large',
  heading2: 'x-large',
  heading3: 'large',
};

export const placeHolder: { [key: string]: string } = {
  text: "Type '/' for commands",
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  quote: 'Empty quote',
};
