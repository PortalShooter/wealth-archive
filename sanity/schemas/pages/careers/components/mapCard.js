export default {
  title: 'Cards',
  name: 'mapCard',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
  ],
};
