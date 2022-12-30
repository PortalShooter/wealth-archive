export default {
  title: 'Teach section',
  name: 'teach',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },

    {
      title: 'List of qualities',
      name: 'quality',
      type: 'array',
      of: [
        {
          title: 'Benefits item',
          name: 'benefitsItem',
          type: 'object',
          fields: [
            {
              title: 'Icon',
              name: 'icon',
              type: 'imageWithAlt',
              validation: Rule => Rule.required()
            },
            {
              title: 'Quality name',
              name: 'name',
              type: 'string',
            },
          ]
        }
      ]
    },
  ]
}
