export default {
  title: 'Slider',
  name: 'slider',
  type: 'object',
  fields: [
    {
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [
        {
          title: 'Card',
          name: 'card',
          type: 'object',
          fields: [
            {
              title: 'Header',
              name: 'cardHeader',
              type: 'imageWithAlt',
            },
            {
              title: 'Title',
              name: 'cardTitle',
              type: 'string',
              validation: Rule => Rule.max(100)
            },
            {
              title: 'Subtitle',
              name: 'cardSubtitle',
              type: 'string',
            },
            {
              title: 'Image',
              name: 'cardImage',
              type: 'imageWithAlt',
            },
          ]
        }
      ]
    },
  ]
}
