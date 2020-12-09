/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';

import { PageComponent } from '@components/pages';

function App(): JSX.Element {
  return (
    <div>
      <Global
        styles={css`
          /* Simple Reset CSS */
          *,
          *:before,
          *:after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      />
      <PageComponent />
    </div>
  );
}

export default App;
