export default {
  title: 'Companies section',
  name: 'careersCompanies',
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
      validation: Rule => Rule.max(10)
    },
  ]
}
