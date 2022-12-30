export default {
  title: 'Seo',
  name: 'seo',
  type: 'object',
  __experimental_actions: ["update", /* 'create', 'delete', */ "publish"],
  fields: [
    {
      title: 'Page title',
      name: 'title',
      type: 'string',
      description: 'If field is empty Title will be used for browser tab name',
      validation: Rule => [
        Rule.optional().custom(str =>
          str && str.trim() === '' && str !=='' ? 'Field must contain not only spaces': true
        )
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'textarea',
    }
  ]
}
