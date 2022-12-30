export default {
  title: 'Map section',
  name: 'map',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'ImageDesktop',
      name: 'imageDesktop',
      type: 'imageWithAlt',
      validation: Rule => Rule.required()
    },
    {
      title: 'ImageMobile',
      name: 'imageMobile',
      type: 'imageWithAlt',
      validation: Rule => Rule.required()
    },
    {
      title: 'Cards',
      name: 'mapCards',
      type: 'array',
      of: [{ type: 'mapCard' }],
    },
    {
      title: 'ButtonMap',
      name: 'buttonMap',
      type: 'string',
    },

    {
      title: 'Companies section',
      name: 'careersCompanies',
      type: 'careersCompanies',
    },

    {
      title: 'Quote section',
      name: 'quote',
      type: 'object',
      fields: [
        {
          title: 'Quote title',
          name: 'title',
          type: 'string',
        },
        {
          title: 'Quote subtitle',
          name: 'subtitle',
          type: 'string',
        },
        {
          title: 'Quote author',
          name: 'quoteAuthor',
          type: 'string',
        },
        {
          title: 'Job title',
          name: 'jobTitle',
          type: 'string',
        },
        {
          title: 'Background image',
          name: 'backgroundImg',
          type: 'imageWithAlt',
          validation: Rule => Rule.required()
        },
      ],
    },
  ],
};
