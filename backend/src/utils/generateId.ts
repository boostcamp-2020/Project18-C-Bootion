const hexadecimals = '0123456789abcdef';

export const generateId = () =>
  new Array(24)
    .fill(null)
    .map((_) => hexadecimals[(Math.random() * hexadecimals.length) | 0])
    .join('');
