export default {
  title: 'All human section',
  name: 'allHuman',
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
      title: 'Title + img',
      name: 'titleImg',
      type: 'titleImg',
      validation: Rule => Rule.required()
    },

    {
      title: 'Benefits',
      name: 'benefits',
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
          title: 'Benefits items',
          name: 'benefitsItems',
          type: 'array',
          of: [
            {
              title: 'Benefits item',
              name: 'benefitsItem',
              type: 'object',
              fields: [
                {
                  title: 'Icon',
                  name: 'icon',
                  type: 'imageWithAlt',
                  validation: Rule => Rule.required()
                },
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string',
                  validation: Rule => Rule.max(50)
                },
                {
                  title: 'Description',
                  name: 'description',
                  type: 'string',
                },
              ]
            }
          ]
        },
      ]
    },
  ]
}
