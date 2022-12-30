export default {
  title: 'Header',
  name: 'header',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Menu',
      name: 'menu',
      type: 'array',
      of: [
        {
          title: 'Link',
          name: 'link',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: Rule => [
                Rule.required().custom(str =>
                  str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
                )
              ]
            },
            {
              title: 'URI',
              name: 'uri',
              type: 'string',
              validation: Rule => [
                Rule.required().custom(str =>
                  str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
                )
              ]
            },
            {
              title: 'Mark for underline',
              name: 'underlineMark',
              type: 'string',
              description: 'Internal use. It is highly recommend not to change this value even if link is renamed.'
            },
          ],
        },
        {
          title: 'Links list',
          name: 'linksList',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: Rule => [
                Rule.required().custom(str =>
                  str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
                )
              ]
            },
            {
              title: 'Links',
              name: 'children',
              type: 'array',
              of: [
                {
                  title: 'Link',
                  name: 'page',
                  type: 'object',
                  fields: [
                    {
                      title: 'Title',
                      name: 'title',
                      type: 'string',
                      validation: Rule => [
                        Rule.required().custom(str =>
                          str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
                        )
                      ]
                    },
                    {
                      title: 'Description',
                      name: 'description',
                      type: 'string',
                      description: 'This string shows on desktop submenu',
                    },
                    {
                      title: 'Icon',
                      name: 'icon',
                      type: 'svgUpload',
                      description: 'This icon shows on desktop submenu',
                    },
                    {
                      title: 'URI',
                      name: 'uri',
                      type: 'string',
                      validation: Rule => [
                        Rule.required().custom(str =>
                          str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
                        )
                      ]
                    },
                  ],
                },
              ],
            },
            {
              title: 'Mark for underline',
              name: 'underlineMark',
              type: 'string',
              description: 'Internal use. It is highly recommend not to change this value even if link is renamed.'
            },
          ],
        },
      ],
    },
    {
      title: 'Plan',
      name: 'planDattebasa',
      type: 'object',
      fields: [
        {
          title: 'Link text',
          name: 'linkText2',
          type: 'string'
        },
        {
          title: 'Link URL',
          name: 'url2',
          type: 'string'
        }
      ]
    },
    {
      title: 'Sign In',
      name: 'signIn',
      type: 'object',
      fields: [
        {
          title: 'Link text',
          name: 'linkText',
          type: 'string'
        },
        {
          title: 'Link URL',
          name: 'url',
          type: 'string'
        }
      ]
    },
    {
      title: 'Mobile menu bottom links',
      name: 'bottomLinks',
      type: 'array',
      of: [
        {
          title: 'Link',
          name: 'link',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string'
            },
            {
              title: 'URL',
              name: 'url',
              type: 'string'
            },
            {
              title: 'Link to file download',
              name: 'isDownload',
              type: 'boolean',
              initialValue: false
            },
            {
              title: 'Download file name',
              name: 'downloadFileName',
              type: 'string',
              hidden: ({parent}) => !parent?.isDownload,
            },
          ]
        }
      ],
      description: 'Privacy etc',
    },
    {
      title: 'Socials',
      name: 'socials',
      type: 'array',
      of: [{
        type: 'social',
      }]
    },
  ],
};
