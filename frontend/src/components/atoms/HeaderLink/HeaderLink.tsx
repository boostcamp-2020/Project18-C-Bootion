/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';

const buttonCss = (): SerializedStyles => css`
  display: flow-root;
  max-width: 150px;
  padding: 6px;
  margin: auto;
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
