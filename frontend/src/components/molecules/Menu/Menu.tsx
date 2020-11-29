/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';

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

function Menu(): JSX.Element {
  return <div css={wrapperCss()}>menu</div>;
}

export default Menu;
