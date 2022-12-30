export default {
  name: 'siteMapSection',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [
        {
          title: 'Link',
          name: 'link',
          type: 'object',
          fields: [
            {
              title: 'Link text',
              name: 'linkText',
              type: 'string',
            },
            {
              title: 'URL',
              name: 'url',
              type: 'string',
            },
          ]
        }
      ]
    },
  ],
};
