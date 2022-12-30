export default {
  title: 'Hero',
  name: 'homeHero',
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
      title: 'Left Button Text',
      name: 'left_button_text',
      type: 'string',
    },
    {
      title: 'Left Button Link',
      name: 'left_button_link',
      type: 'string',
    },
    {
      title: 'Right Button Text',
      name: 'right_button_text',
      type: 'string',
    },
    {
      title: 'Right Button Link',
      name: 'right_button_link',
      type: 'string',
    },
    {
      title: 'Cards',
      name: 'carousel',
      type: 'array',
      of: [{
        title: 'Card',
        name:'card',
        type: 'object',
        fields: [
          {
            title: 'Title',
            name: 'title',
            type: 'string'
          },
          {
            title: 'Subitle',
            name: 'subtitle',
            type: 'string'
          },
          {
            title: 'Description',
            name: 'description',
            type: 'string'
          },
          {
            title: 'Image',
            name: 'image',
            type: 'imageWithAlt'
          },
          {
            title: 'Card Image',
            name: 'cardimage',
            type: 'imageWithAlt'
          },
          {
            title: 'Button Text',
            name: 'buttonText',
            type: 'string'
          },
          {
            title: 'Link',
            name: 'link',
            type: 'string'
          }
        ]
      }]
    },
  ]
}
