/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { PageComponent } from '@components/pages';
import { pageState } from '@/stores';

function App(): JSX.Element {
  const page = useRecoilValue(pageState('1'));
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
      <PageComponent page={page} />
    </div>
  );
}

export default App;
