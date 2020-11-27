/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';

const buttonCss = (): SerializedStyles => css`
  display: flex;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  color: inherit;
  minwidth: 0px;
  padding: 6px;
  white-space: nowrap;
  border-radius: 3px;
  font-size: inherit;
  &:hover {
    background-color: #cccccc;
  }
`;

function HeaderLink({ children }: any): JSX.Element {
  return (
    <a css={buttonCss()} role="button">
      {children}
    </a>
  );
}

export default HeaderLink;
