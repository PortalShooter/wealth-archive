export default {
  title: 'Site map',
  name: 'siteMap',
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
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [{
          type: 'siteMapSection',
        }]
    },
  ],
};
