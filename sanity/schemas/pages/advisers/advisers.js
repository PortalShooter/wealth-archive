export default {
  title: 'For Advisors',
  name: 'advisers',
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
      title: 'AdvisersHero',
      name: 'advisersHero',
      type: 'advisersHero',
    },
    // {
    //   title: 'As seen section',
    //   name: 'asSeen',
    //   type: 'asSeen',
    // },

    {
      title: 'As seen section',
      name: 'asSeen',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Companies logos',
          name: 'companiesLogos',
          type: 'array',
          options: {
            layout: 'grid',
          },
          of: [
            {
              type: 'svgUpload',
            },
          ],
          validation: Rule => Rule.max(8)
        },
      ]
    },

    {
      title: 'Why choose wealth',
      type: 'makingEstatePlanning',
      name: 'makingEstatePlanning',
    },
    {
      title: 'Cards',
      name: 'advisersCards',
      type: 'array',
      of: [{ type: 'advisersCard' }],
    },
    {
      title: 'Section resources',
      name: 'advisersResources',
      type: 'advisersResources',
    },
    {
      title: 'CompaniesCompare',
      name: 'companiesCompare',
      type: 'companiesCompare',
    },
    {
      title: 'Questions',
      name: 'questions',
      type: 'questions',
    },
    {
      title: 'Section financial advisors',
      name: 'financialAdvisors',
      type: 'financialAdvisors',
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'quote',
    },
  ],
};
