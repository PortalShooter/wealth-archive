export default {
  title: 'Hero',
  name: 'productHero',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'AccentPhrase',
      name: 'accentPhrase',
      type: 'string',
    },
    {
      title: 'SubTitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
  ],
};
