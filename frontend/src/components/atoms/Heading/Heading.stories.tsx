import React from 'react';

import Heading from '.';

const desc = {
  component: Heading.Heading1,
  title: 'Atoms/Heading',
};

export const HEADING1 = (): JSX.Element => {
  const headingProps = {
    handleValue: () => {},
    content: { current: 'Heading1' },
  };
  return <Heading.Heading1 {...headingProps} />;
};

export const HEADING2 = (): JSX.Element => {
  const headingProps = {
    handleValue: () => {},
    content: { current: 'Heading2' },
  };
  return <Heading.Heading2 {...headingProps} />;
};

export const HEADING3 = (): JSX.Element => {
  const headingProps = {
    handleValue: () => {},
    content: { current: 'Heading3' },
  };
  return <Heading.Heading3 {...headingProps} />;
};

export default desc;
