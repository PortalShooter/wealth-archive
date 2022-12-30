export default {
  title: 'quotes section',
  name: 'quotes',
  type: 'object',
  fields: [
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
              title: 'Logo image',
              name: 'logoImage',
              type: 'imageWithAlt',
            },

            {
              title: 'Reviews',
              name: 'reviews',
              type: 'solutionsReview'
            },

            // {
            //   title: 'Quote',
            //   name: 'quote',
            //   type: 'object',
            //   fields: [
            //     {
            //       title: 'Full title text',
            //       name: 'title',
            //       type: 'string',
            //       validation: Rule => Rule.max(100)
            //     },
            //     {
            //       title: 'Alt title text',
            //       description: 'Optional',
            //       name: 'altTitle',
            //       type: 'string'
            //     },
            //     {
            //       title: 'Accent phrase',
            //       name: 'accentPhrase',
            //       type: 'string'
            //     },
            //     {
            //       title: 'Additional accent phrases',
            //       name: 'additionalAccentPhrases',
            //       type: 'array',
            //       of: [{type: 'string'}]
            //     },
            //   ]
            // },
            // {
            //   title: 'Quote author',
            //   name: 'quoteAuthor',
            //   type: 'string',
            // },
            // {
            //   title: 'Job title',
            //   name: 'jobTitle',
            //   type: 'string',
            // },
          ]
        }
      ]
    },
    {
      title: 'Background image',
      name: 'backgroundImg',
      type: 'imageWithAlt',
    }
  ]
}
