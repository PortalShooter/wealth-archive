export default {
  title: 'Partnerships',
  name: 'partnerships',
  type: 'document',
  __experimental_actions: ["update", "create", "delete", "publish"],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      description: 'This value will be used for the URL of the page',
      name: 'partnershipsSlug',
      type: 'uniqueSlug',
    },
    {
      title: 'Seo',
      name: 'seo',
      type: 'seo',
    },
    {
      title: 'CTA button',
      name: 'ctaButton',
      type: 'object',
      fields: [
        {
          title: 'CTA button text',
          name: 'ctaButtonText',
          type: 'string',
        },
        {
          title: 'CTA button URL',
          name: 'ctaButtonUrl',
          type: 'string',
        },
      ]
    },
    {
      title: 'Hero section',
      name: 'partnershipsHero',
      type: 'partnershipsHero',
    },
    {
      title: 'Wealth Value',
      name: 'wealthValue',
      type: 'wealthValue',
    },
    {
      title: 'As seen section',
      name: 'partnershipsAsSeen',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Companies logos',
          name: 'companiesLogos',
          type: 'array',
          options: {
            layout: 'grid',
          },
          of: [
            {
              type: 'svgUpload',
            },
          ],
          validation: Rule => Rule.max(8)
        },
      ]
    },
    {
      title: 'Quote',
      name: 'partnershipsQuote',
      type: 'partnershipsQuote',
    },
    {
      title: 'How Wealth Works',
      name: 'howWealthWorks',
      type: 'howWealthWorks',
    },
    {
      title: 'Assessment',
      name: 'assessment',
      type: 'assessment',
    },
    {
      title: 'Closing Image',
      name: 'closingImage',
      type: 'imageWithAlt',
    },
  ],
};
