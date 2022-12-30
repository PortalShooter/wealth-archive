export default {
  title: 'Hero',
  name: 'securityHero',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'AccentPhrase',
      name: 'accentPhrase',
      type: 'string',
    },
    {
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [{ type: 'securityCard' }],
    },
    {
      title: 'Info',
      name: 'info',
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
          title: 'Image',
          name: 'image',
          type: 'array',
          of: [
            {
              title: 'Image',
              name: 'image',
              type: 'pictureWithAlt',
            },
          ],
        },
      ],
    },
  ],
};
