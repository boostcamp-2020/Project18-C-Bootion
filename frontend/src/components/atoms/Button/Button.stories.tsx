import React from 'react';
import Button from '@atoms/Button';

export default {
  component: Button,
  title: 'Atoms/Button',
};
export const Default = (): JSX.Element => {
  //   const content = text('content', 'No results matched your search.');
  return <Button color="#FFFFFF" backgroundColor="#FFFFFF" />;
};