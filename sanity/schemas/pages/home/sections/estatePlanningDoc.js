export default {
  title: 'estate planning documents section',
  name: 'estatePlanningDoc',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'titleWithAccent',
    },
    {
      title: 'Tabs',
      name: 'tabs',
      type: 'array',
      of: [
        {
          title: 'Tab',
          name: 'tab',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'tabTitle',
              type: 'string',
            },
            {
              title: 'Description',
              name: 'tabDescription',
              type: 'string',
            },
            {
              title: 'Image',
              name: 'tabImage',
              type: 'imageWithAlt',
            },
          ]
        }
      ]
    },
    {
      title: 'Button',
      name: 'btn',
      type: 'object',
      fields: [
        {
          title: 'Button title',
          name: 'name',
          type: 'string',
        },
        {
          title: 'Button link',
          name: 'link',
          type: 'string',
        },
      ]
    },
  ]
}
