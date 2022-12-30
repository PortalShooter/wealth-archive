export default {
  title: 'Review',
  name: 'solutionsReview',
  type: 'object',
  fields: [
    {
      title: 'Hide quote',
      description: 'Toggle controls displaying of quote block. On is hidden, off is shown',
      name: 'isQuoteHidden',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Title',
      name: 'title',
      type: 'titleWithAccent',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'titleWithAccent',
    },
    {
      title: 'Person',
      name: 'person',
      type: 'object',
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          title: 'Work',
          name: 'work',
          type: 'string',
        },
        {
          title: 'Image',
          name: 'image',
          type: 'imageWithAlt',
        },
      ]
    },
  ]
}
