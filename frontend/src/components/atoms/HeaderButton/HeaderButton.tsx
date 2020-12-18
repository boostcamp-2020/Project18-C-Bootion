/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';

const buttonCss = (): SerializedStyles => css`
  display: flex;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  color: inherit;
  min-width: 0px;
  padding: 6px;
  margin: auto;
  white-space: nowrap;
  border-radius: 3px;
  font-size: inherit;
  border: 0;
  outline: 0;

  &:hover {
    background-color: #cccccc;
  }
`;

function HeaderButton({ children, clickHandler }: any): JSX.Element {
  return (
    <div
      role="button"
      css={buttonCss()}
      onClick={clickHandler}
      onKeyUp={clickHandler}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export default HeaderButton;
