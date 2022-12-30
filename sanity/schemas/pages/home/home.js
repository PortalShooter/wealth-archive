export default {
  title: 'Home',
  name: 'home',
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
      title: 'Hero section',
      name: 'homeHero',
      type: 'homeHero'
    },
    {
      title: '3 colored cards',
      name: 'coloredCards',
      type: 'coloredCards'
    },
    {
      title: 'Digital Estate Planing',
      name: 'deplaning',
      type: 'digitalEstatePlaning'
    },
    // {
    //   title: 'As seen section',
    //   name: 'asSeen',
    //   type: 'asSeen'
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
      title: 'Section quotes',
      name: 'quotes',
      type: 'quotes'
    },
    {
      title: 'Section tabs',
      name: 'homePercentsTabs',
      type: 'homePercentsTabs'
    },
    {
      title: 'Section financial advisors',
      name: 'financialAdvisors',
      type: 'financialAdvisors'
    },
    {
      title: 'Section estate planning',
      name: 'estatePlanningHome',
      type: 'estatePlanningHome'
    },
    {
      title: 'Home Modal Form',
      name: 'homeModalForm',
      type: 'homeModalForm'
    },
    {
      title: 'TrustInfo section',
      name: 'trust',
      type: 'trust'
    },
    {
      title: 'Section estate planning documents',
      name: 'estatePlanningDoc',
      type: 'estatePlanningDoc'
    },
    {
      title: 'Download section',
      name: 'downloadSection',
      type: 'downloadSection'
    },
    {
      title: 'Section join',
      name: 'joinHome',
      type: 'joinHome'
    }
  ]
}
