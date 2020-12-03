const hexadecimals = '0123456789abcdef';

export const generateId = () => {
  const timestamp = Date.now() + '';
  return (
    timestamp +
    new Array(24 - timestamp.length)
      .fill(null)
      .map((_) => hexadecimals[(Math.random() * hexadecimals.length) | 0])
      .join('')
  );
};
