export default {
  title: 'Estate Plans list',
  name: 'solutionPage',
  type: 'document',
  __experimental_actions: ["update", /* 'create', 'delete', */ "publish"],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'This page uses only to select solution pages, there is no need to change anything here'
    },
    {
      title: 'Core',
      name: 'core',
      type: 'reference',
      to: [{type: 'solutions'}],
    },
    {
      title: 'Will',
      name: 'will',
      type: 'reference',
      to: [{type: 'solutions'}],
    },
    {
      title: 'Trust',
      name: 'trust',
      type: 'reference',
      to: [{type: 'solutions'}],
    },
  ]
}
