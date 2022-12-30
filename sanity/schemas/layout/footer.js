export default {
  title: 'Footer',
  name: 'footer',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Address',
      name: 'address',
      type: 'object',
      fields: [
        {
          title: 'First string',
          name: 'firstString',
          type: 'string'
        },
        {
          title: 'Second string',
          name: 'secondString',
          type: 'string'
        }
      ]
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            title: 'Title',
            name: 'title',
            type: 'string',
          },
          {
            title: 'List of links',
            name: 'list',
            type: 'array',
            of: [{type: 'link'}]
          }
        ]
      }
      ]
    },
    {
      title: 'Socials',
      name: 'socials',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Socials items',
          name: 'socialsItems',
          type: 'array',
          of: [{
            type: 'social',
          }]
        },
      ]
    },
    {
      title: 'Privacy',
      name: 'privacy',
      type: 'object',
      fields: [
        {
          title: 'Copyright',
          name: 'copyright',
          type: 'string'
        },
        {
          title: 'Links',
          name: 'links',
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
          ]
        }
      ]
    }
  ]
}
