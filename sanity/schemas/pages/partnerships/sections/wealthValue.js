export default {
  title: 'Wealth Value',
  name: 'wealthValue',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'List of values',
      name: 'list',
      type: 'array',
      of: [
        {
          title: 'Value',
          name: 'value',
          type: 'object',
          fields: [

            {
              title: 'Image',
              name: 'image',
              type: 'imageWithAlt',
            },
            {
              title: 'Text',
              name: 'text',
              type: 'string',
            },
          ]
        }
      ]
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
  ],
};
