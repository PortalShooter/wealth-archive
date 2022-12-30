export default {
  title: 'Picture with alt attribute',
  name: 'pictureWithAlt',
  type: 'object',
  fields: [
    {
      title: 'Alternate text',
      name: 'alt',
      type: 'string',
    },
    {
      title: 'Image for desktop',
      name: 'image_desktop',
      type: 'image',
    },
    {
      title: 'Image for tablet',
      name: 'image_tablet',
      type: 'image',
    },
    {
      title: 'Image for mobile',
      name: 'image_mobile',
      type: 'image',
    }
  ]
}