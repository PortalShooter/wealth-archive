export default {
  name: 'securityQuestion',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Question',
      name: 'question',
      type: 'array',
      of: [{ type: 'securityOneQuestion' }],
    },
  ],
};
