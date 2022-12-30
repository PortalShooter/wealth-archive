export default {
  title: 'Image with alt attribute',
  name: 'imageWithAlt',
  type: 'object',
  fields: [
    {
      title: 'Alternate text',
      name: 'alt',
      type: 'string',
      hidden: ({parent}) => !parent?.image,
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      validation: Rule => Rule.required()
    }
  ]
}
