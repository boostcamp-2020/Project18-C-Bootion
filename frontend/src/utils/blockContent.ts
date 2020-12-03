export const regex = {
  h1: /^#\s[^\s.]*/gm,
  h2: /^##\s[^\s.]*/gm,
  h3: /^###\s[^\s.]*/gm,
  li: /^-\s[^\s.]*/gm,
  ol: /^1.\s[^\s.]*/gm,
  toggle: /^>\s[^\s.]*/gm,
  quote: /^\|\s[^\s.]*/gm,
};

export const fontSize: { [key: string]: string } = {
  heading1: 'xx-large',
  heading2: 'x-large',
  heading3: 'large',
};

export const placeHolder: { [key: string]: string } = {
  text: "Type '/' for commands",
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
};
