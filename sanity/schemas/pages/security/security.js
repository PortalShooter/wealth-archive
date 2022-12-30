export default {
  title: 'Security',
  name: 'security',
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
      title: 'Hero',
      name: 'hero',
      type: 'securityHero',
    },
    {
      title: 'Tabs',
      name: 'tabs',
      type: 'securityTabs',
    },
  ],
};
