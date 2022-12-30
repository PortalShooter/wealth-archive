export default {
  title: 'Questions',
  name: 'questions',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Questions',
      name: 'questions',
      type: 'array',
      of: [{ type: 'solutionQuestion' }]
    },
  ]
}
