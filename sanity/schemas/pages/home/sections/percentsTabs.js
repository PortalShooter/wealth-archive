export default {
  title: 'Percents Tabs',
  name: 'homePercentsTabs',
  type: 'object',
  fields: [{
    title: 'Tabs',
    name: 'tabs',
    type: 'array',
    of: [{
      title: 'Tab',
      name:'tab',
      type: 'object',
      fields: [
        {
          title: 'Tab button text',
          name: 'tabButtonText',
          type: 'string',
        },
        {
          title: 'Title',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Link',
          name: 'ctaLink',
          type: 'link',
        },
        {
          title: 'Image',
          name: 'image',
          type: 'imageWithAlt'
        },
        {
          title: 'Sub Title',
          name: 'subtitle',
          type: 'string'
        },
        {
          title: 'Percents',
          name: 'percents',
          type: 'number'
        },
        {
          title: 'Percents Text',
          name: 'percentsText',
          type: 'string'
        },
        {
          title: 'Text',
          name: 'text',
          type: 'string'
        },
        {
          title: 'Footer Text',
          name: 'footerText',
          type: 'string'
        },
        {
          title: 'Link Text',
          name: 'linkText',
          type: 'string'
        },
        {
          title: 'Link',
          name: 'link',
          type: 'string'
        },
    ]}]
  }]
}
