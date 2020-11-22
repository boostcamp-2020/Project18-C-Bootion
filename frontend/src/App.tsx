/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/react';

const appStyle: SerializedStyles = css`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  &:hover {
    color: white;
  }
`;

function App(): JSX.Element {
  return (
    <div css={appStyle}>
      Hello Bootion!
    </div>
  );
}

export default App;
