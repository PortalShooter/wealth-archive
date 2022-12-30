export default {
  name: 'wantToLearnMore',
  title: 'Want to learn more',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'titleWithAccent',
    },
    {
      title: 'Input Placeholder',
      name: 'placeholder',
      type: 'string',
    },
    {
      title: 'Button',
      name: 'link',
      type: 'link',
    },
    {
      title: 'Subscription success message',
      name: 'successMessage',
      type: 'string',
    },
  ]
}
