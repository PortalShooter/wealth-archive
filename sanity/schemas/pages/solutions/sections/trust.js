export default {
  title: 'Trust',
  name: 'trust',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'titleWithAccent',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [{type: 'trustCard'}]
    },
    {
      title: 'Reviews',
      name: 'reviews',
      type: 'solutionsReview'
    },
  ]
}
