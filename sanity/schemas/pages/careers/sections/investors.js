export default {
  title: 'Investor section',
  name: 'investors',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Investors logos',
      name: 'investorsLogos',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'svgUpload',
        },
      ],
      validation: Rule => Rule.max(6)
    },
  ]
}
