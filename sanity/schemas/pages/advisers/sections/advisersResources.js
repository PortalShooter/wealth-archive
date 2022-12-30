export default {
  title: 'Resources',
  name: 'advisersResources',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'pictureWithAlt',
    },
    {
      title: 'Resource',
      name: 'advisersResource',
      type: 'array',
      of: [{ type: 'advisersOneResource' }],
    },
  ],
};
