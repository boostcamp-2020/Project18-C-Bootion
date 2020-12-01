/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from '@/App';

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
);
