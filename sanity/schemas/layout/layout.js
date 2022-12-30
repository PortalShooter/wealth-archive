export default {
  title: 'Layout',
  name: 'layout',
  type: 'document',
  __experimental_actions: ["update", /* 'create', 'delete', */ "publish"],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Header',
      name: 'header',
      type: 'header',
    },
    {
      title: 'Footer',
      name: 'footer',
      type: 'footer',
    },
  ]
}
