/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Heading1, Heading2, Heading3 } from '.';

const desc = {
  component: Heading1,
  title: 'Atoms/Heading',
};

export const HEADING1 = (): JSX.Element => {
  const headingProps = {
    handleValue: () => {},
    text: { current: 'Heading1' },
  };
  return <Heading1 {...headingProps} />;
};

export const HEADING2 = (): JSX.Element => {
  const headingProps = {
    handleValue: () => {},
    text: { current: 'Heading2' },
  };
  return <Heading2 {...headingProps} />;
};

export const HEADING3 = (): JSX.Element => {
  const headingProps = {
    handleValue: () => {},
    text: { current: 'Heading3' },
  };
  return <Heading3 {...headingProps} />;
};

export default desc;
