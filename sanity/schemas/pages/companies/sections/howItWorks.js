export default {
  title: 'How it works section',
  name: 'howItWorks',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Days',
      name: 'days',
      type: 'array',
      of: [
        {
          title: 'Day',
          name: 'day',
          type: 'object',
          fields: [
            {
              title: 'Header',
              name: 'header',
              type: 'string',
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Subtitle',
              name: 'subtitle',
              type: 'array',
              of: [
                {
                  title: 'Paragraph',
                  name: 'paragraph',
                  type: 'string',
                },
              ]

            },
            {
              title: 'Image',
              name: 'image',
              type: 'imageWithAlt',
            },
          ]
        }
      ]
    },
    {
      title: 'Benefits',
      name: 'benefits',
      type: 'array',
      of: [
        {
          title: 'Benefit',
          name: 'Benefit',
          type: 'object',
          fields: [
            {
              title: 'Text',
              name: 'text',
              type: 'string',
            },
            {
              title: 'Image',
              name: 'image',
              type: 'imageWithAlt',
            },
          ]
        }
      ]
    },
  ]
}
