export default {
  title: 'Download section',
  name: 'downloadSection',
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
              title: 'Title',
              name: 'title',
              type: 'titleWithAccent',
            },
            {
              title: 'Link name',
              name: 'linkName',
              type: 'string',
            },
            {
              title: 'File',
              name: 'file',
              type: 'object',
              fields: [
                {
                  title: 'File name',
                  name: 'fileName',
                  type: 'string',
                },
                {
                  name: 'file',
                  type: 'file',
                },
              ]
            },
          ]
        }
      ]
    },
  ]
}
