export default {
  title: 'Old way - New way section',
  name: 'ways',
  type: 'object',
  fields: [
    {
      title: 'Old way title',
      name: 'oldWayTitle',
      type: 'string',
    },
    {
      title: 'Old way subtitle',
      name: 'oldWaySubtitle',
      type: 'string',
    },
    {
      title: 'Steps',
      name: 'oldSteps',
      type: 'array',
      of: [{title: 'Step', name: 'step', type: 'string'}]
    },
    {
      title: 'New way title',
      name: 'newWayTitle',
      type: 'string',
    },
    {
      title: 'New way subtitle',
      name: 'newWaySubtitle',
      type: 'string',
    },
    {
      title: 'Steps',
      name: 'newSteps',
      type: 'array',
      of: [{title: 'Step', name: 'step', type: 'string'}]
    },
  ]
}
