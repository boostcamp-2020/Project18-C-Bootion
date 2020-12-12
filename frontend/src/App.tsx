/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import { lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { pageState } from './stores';

const PageComponent = lazy(() => import('@components/pages/PageComponent'));

function App(): JSX.Element {
  const page = useRecoilValue(pageState);
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
      <PageComponent page={page} menuClosed />
    </div>
  );
}

export default App;
