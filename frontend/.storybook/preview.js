import { Global, css } from '@emotion/react';
import { RecoilRoot } from 'recoil';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <div
        style={{
          margin: '3em',
          border: '1px solid #000000',
          position: 'relative',
        }}
      >
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
        <Story />
      </div>
    </RecoilRoot>
  ),
];
