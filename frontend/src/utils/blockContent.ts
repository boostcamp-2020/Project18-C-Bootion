export const regex: { [key: string]: RegExp } = {
  heading1: /^#\s[^\s.]*/gm,
  heading2: /^##\s[^\s.]*/gm,
  heading3: /^###\s[^\s.]*/gm,
  bulletedlist: /^-\s[^\s.]*/gm,
  numberedlist: /^1.\s[^\s.]*/gm,
  togglelist: /^>\s[^\s.]*/gm,
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
