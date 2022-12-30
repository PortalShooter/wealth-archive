export default {
  title: 'What is included',
  name: 'whatIsIncluded',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Inclusions',
      name: 'inclusions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Text',
              name: 'text',
              type: 'string'
            },
            {
              title: 'Icon',
              name: 'icon',
              type: 'svgUpload'
            },
          ]
        }
      ]
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
    {
      title: 'Membership text',
      name: 'membershipText',
      type: 'string',
    },
    {
      title: 'Membership includes',
      name: 'membershipInclusions',
      type: 'array',
      of: [{ type: 'string' }]
    },
  ]
}
