export default {
  title: 'Not Found',
  name: 'notFound',
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
      title: 'Text Content',
      name: 'textContent',
      type: 'textContent',
    },
  ],
};
