export default {
  title: 'Join section',
  name: 'joinHome',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'href',
      type: 'imageWithAlt',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'titleWithAccent',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'object',
      fields: [
        {
          title: 'Link text',
          name: 'text',
          type: 'string',
        },
        {
          title: 'Link url',
          name: 'url',
          type: 'string',
        },
      ]
    }
  ]
}
