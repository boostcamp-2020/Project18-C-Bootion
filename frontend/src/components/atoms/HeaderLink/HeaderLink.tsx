/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

const buttonCss = () => css`
  display: flow-root;
  width: 100%;
  max-width: 400px;
  padding: 6px;
  margin: auto;
  margin-left: 10px;
  border-radius: 3px;
  font-size: inherit;
  color: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  user-select: none;
  cursor: pointer;

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
