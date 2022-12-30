export default {
  title: 'Modal Form',
  name: 'homeModalForm',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt'
    },
    {
      title: 'Success Image',
      name: 'successImage',
      type: 'imageWithAlt'
    },
    {
      title: 'Success Title',
      name: 'successTitle',
      type: 'string',
    },

    {
      title: 'Support info',
      name: 'support',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          title: 'Contacts',
          name: 'contacts',
          type: 'array',
          of: [
            {
              title: 'Contact',
              name: 'contact',
              type: 'object',
              fields: [
                {
                  title: 'Contact type',
                  name: 'contactTitle',
                  type: 'string',
                  validation: Rule => [
                    Rule.required().custom(str =>
                      str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
                    )
                  ]
                },
                {
                  title: 'Contact info',
                  name: 'contactInfo',
                  type: 'string',
                  validation: Rule => [
                    Rule.required().custom(str =>
                      str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
                    )
                  ]
                },
              ]
            }
          ]
        },
      ]
    },
]
}
