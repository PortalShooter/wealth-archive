export default {
  title: 'Estate planning',
  name: 'estatePlanning',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'oldWayTitle',
      type: 'titleWithAccent',
    },
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
              title: 'Title',
              name: 'cardTitle',
              type: 'string',
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
