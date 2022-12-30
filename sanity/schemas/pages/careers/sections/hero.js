export default {
  title: 'Hero section',
  name: 'hero',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Link',
      name: 'link',
      type: 'link',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
  ]
}
