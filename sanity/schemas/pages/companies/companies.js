export default {
  title: 'For Companies',
  name: 'companies',
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
      title: 'CompaniesHero',
      name: 'companiesHero',
      type: 'companiesHero',
    },
    {
      title: 'Cards',
      name: 'companiesCards',
      type: 'array',
      of: [{ type: 'companiesCard' }],
    },
    {
      title: 'Section how it works',
      name: 'howItWorks',
      type: 'howItWorks',
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
