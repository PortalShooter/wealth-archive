export default {
  title: 'Help',
  name: 'help',
  type: 'document',
  __experimental_actions: ["update", /* 'create', 'delete', */ "publish"],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Seo',
      name: 'seo',
      type: 'seo',
    },
    {
      title: 'Categories',
      name: 'questions',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          title: 'Categories to show',
          name: 'categories',
          type: 'array',
          of: [{
            type: 'reference',
            to: [{ type: 'helpCategory' }],
          }]
        },
      ]
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Subtitle',
          name: 'subtitle',
          type: 'string'
        },
        {
          title: 'Button text',
          name: 'buttonText',
          type: 'string',
        }
      ]
    }
  ],
};
