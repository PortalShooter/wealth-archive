export default {
  title: 'Cards',
  name: 'solutionsCard',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Options',
      name: 'options',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      title: 'Image',
      name: 'image',
      type: 'svgUpload',
    },
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
