export default {
  title: 'Blog',
  name: 'product',
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
      name: 'productHero',
      type: 'productHero',
    },
    {
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [{ type: 'productCard' }],
      validation: (Rule) => Rule.max(3),
    },
  ],
};
