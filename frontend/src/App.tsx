/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';

import { PageComponent } from '@components/pages';
import { getPage } from '@/utils';
import { useEffect, useState } from 'react';

function App(): JSX.Element {
  const [page, setPage] = useState(null);
  useEffect(() => {
    (async () => {
      setPage(await getPage('1'));
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
      <PageComponent page={page} menuClosed />
    </div>
  );
}

export default App;
