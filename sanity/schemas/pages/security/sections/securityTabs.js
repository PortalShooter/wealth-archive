export default {
  title: 'Tabs',
  name: 'securityTabs',
  type: 'object',
  fields: [
    {
      title: 'Tab',
      name: 'tab',
      type: 'array',
      of: [{ type: 'securityTab' }],
    },
    {
      title: 'Question',
      name: 'question',
      type: 'array',
      of: [{ type: 'securityQuestion' }],
    },
  ],
};
