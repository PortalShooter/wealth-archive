export default {
  title: 'Title + img block',
  name: 'titleImg',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'img',
      type: 'imageWithAlt',
      validation: Rule => Rule.required()
    },
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
    }
  ]
}
