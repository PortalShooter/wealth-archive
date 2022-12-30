export default {
  title: 'Colored Cards',
  name: 'coloredCards',
  type: 'object',
  fields: [
    {
      title: 'Cards List',
      name: 'cards',
      type: 'array',
      of: [
        {
          title: 'Card',
          name:'card',
          type: 'object',
          fields: [
            {
              title: 'Key word',
              name: 'key',
              type: 'string'
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string'
            },
            {
              title: 'List',
              name: 'list',
              type: 'array',
              of: [{
                title: 'List item',
                name: 'item',
                type: 'string'
              }]
            }
          ]
        }
      ]
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Text',
      name: 'text',
      type: 'string'
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'string'
    },
    {
      title: 'Quote Sub Text',
      name: 'quoteSubtext',
      type: 'string'
    },
    {
      title: 'Quote Author',
      name: 'quoteAuthor',
      type: 'string'
    },
    {
      title: 'Quote Author Info',
      name: 'quoteAuthorInfo',
      type: 'string'
    },
  ]
}
