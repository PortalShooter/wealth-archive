export default {
  title: 'Are we for you section',
  name: 'areWeForYou',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Avatars',
      name: 'avatars',
      type: 'array',
      of: [{type: 'imageWithAlt'}]
    },
    {
      title: 'mainImage',
      name: 'mainImage',
      type: 'imageWithAlt',
    },
    {
      title: 'Second title',
      name: 'secondTitle',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'cta_link',
      type: 'link',
    }
  ]
}
