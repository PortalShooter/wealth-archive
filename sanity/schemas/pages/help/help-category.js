export default {
  title: 'Help Category',
  name: 'helpCategory',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      description: 'This value will be used for the URL of the page',
      name: 'slug',
      type: 'uniqueSlug',
    },
    {
      title: 'Seo',
      name: 'seo',
      type: 'seo',
    },
    {
      title: 'Questions',
      name: 'questions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            title: 'Question',
            name: 'question',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            title: 'Answer',
            name: 'answer',
            type: 'textarea',
            validation: Rule => Rule.required()
          }
        ]
      }]
    },
  ],
};
