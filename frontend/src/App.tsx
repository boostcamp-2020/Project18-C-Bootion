/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { fetchDummyData } from '@/utils';

const PageComponent = lazy(() => import('@components/pages/PageComponent'));

function App(): JSX.Element {
  const [page, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      setPage(await fetchDummyData('1'));
    })();
  }, []);
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
      <Suspense fallback={<div />}>
        <PageComponent page={page} menuClosed />
      </Suspense>
    </div>
  );
}

export default App;
