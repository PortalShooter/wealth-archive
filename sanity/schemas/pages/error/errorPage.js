export default {
  title: 'Error Page',
  name: 'errorPage',
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
      type: 'errorTextContent',
    },
  ],
};
