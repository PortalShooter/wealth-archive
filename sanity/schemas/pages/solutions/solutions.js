export default {
  title: 'Estate Plans',
  name: 'solutions',
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
      name: 'solutionsHero',
      type: 'solutionsHero'
    },
    {
      title: 'What is included',
      name: 'whatIsIncluded',
      type: 'whatIsIncluded'
    },
    {
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [{type: 'solutionsCard'}]
    },
    {
      title: 'How it works',
      name: 'howItWorks',
      type: 'howItWorksSolutions'
    },
    {
      title: 'Old way - New way',
      name: 'ways',
      type: 'ways'
    },
    {
      title: 'Estate planning',
      name: 'estatePlanning',
      type: 'estatePlanning'
    },
    {
      title: 'Trust',
      name: 'trust',
      type: 'trust'
    },
    {
      title: 'Compare side by side',
      name: 'compare',
      type: 'compare'
    },
    {
      title: 'Questions',
      name: 'questions',
      type: 'questions'
    },
    {
      title: 'Check out our other plans ',
      name: 'otherPlans',
      type: 'otherPlans'
    },
  ]
}
