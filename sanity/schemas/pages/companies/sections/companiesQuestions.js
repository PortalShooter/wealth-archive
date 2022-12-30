export default {
  title: 'Questions',
  name: 'companiesQuestions',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Questions',
      name: 'companiesQuestions',
      type: 'array',
      of: [{ type: 'companiesQuestion' }],
    },
  ],
};
