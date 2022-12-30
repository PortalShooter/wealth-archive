export default {
  title: 'financial advisors section',
  name: 'financialAdvisors',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'titleWithAccent',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Link for button',
      name: 'link',
      type: 'object',
      fields: [
        {
          title: 'Name button',
          name: 'name',
          type: 'string',
        },
        {
          title: 'Link',
          name: 'href',
          type: 'string',
        },
      ]
    },
  ]
}
