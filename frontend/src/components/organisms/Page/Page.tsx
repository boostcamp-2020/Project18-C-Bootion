/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { FunctionComponent } from 'react';

interface PageProps {
  children: React.ReactNode[];
}

const Page: FunctionComponent<PageProps> = (props: PageProps) => {
  const { children } = props;
  return (
    <div
      css={css`
        display: flex;
        width: 900px;
        position: relative;
        max-width: 100%;
        flex-direction: column;
        fontsize: 16px;
        lineheight: 1.5;
        padding-left: calc(96px + env(safe-area-inset-left));
        padding-right: calc(96px + env(safe-area-inset-right));
        padding-bottom: 30px;
      `}
    >
      {children}
    </div>
  );
};

export default Page;
