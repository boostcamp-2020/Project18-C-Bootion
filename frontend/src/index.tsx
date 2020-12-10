/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from '@/App';

ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  </RecoilRoot>,
  document.getElementById('root'),
);
