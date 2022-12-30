export default {
  name: 'otherPlans',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Plan Cards',
      name: 'cards',
      type: 'array',
      of: [{ type: 'otherPlanCard' }]
    },
  ]
}
