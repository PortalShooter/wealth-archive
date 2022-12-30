export default {
  title: 'Hero',
  name: 'advisersHero',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Button text',
      name: 'btnText',
      type: 'string',
    },
    {
      title: 'Button link',
      name: 'btnLink',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'pictureWithAlt',
    },
    {
      title: 'Is advisers',
      name: 'isAdvisers',
      type: 'boolean',
    },
  ],
};
