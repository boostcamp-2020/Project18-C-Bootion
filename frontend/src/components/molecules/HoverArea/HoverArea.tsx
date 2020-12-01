/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

const LeftHoverAreaCss = css`
  position: absolute;
  top: 0;
  right: 100%;
  width: calc(10% + 36px);
  height: 100%;
`;
const RightHoverAreaCss = css`
  position: absolute;
  top: 0;
  left: 100%;
  width: 10%;
  height: 100%;
`;
function HoverArea(): React.ReactElement {
  return (
    <div>
      <div css={LeftHoverAreaCss} />
      <div css={RightHoverAreaCss} />
    </div>
  );
}

export default HoverArea;
