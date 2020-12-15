/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

const modalWrapperCss = css`
  position: relative;
  display: flex;
  padding-left: calc(96px + env(safe-area-inset-left));
  padding-right: calc(96px + env(safe-area-inset-right));
  max-width: 100%;
  width: 200px;
  height: 250px;
  margin: auto;
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 2;
`;

function BlockModal(): JSX.Element {
  return <div css={modalWrapperCss}>content</div>;
}

export default BlockModal;
