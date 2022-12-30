export default {
  title: 'Compare side by side',
  name: 'companiesCompare',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Comparison points',
      name: 'companiesComparisonPoints',
      type: 'companiesComparisonPoints',
    },
    {
      title: 'Plans',
      name: 'companiesPlan',
      type: 'array',
      of: [{ type: 'companiesPlan' }],
    },
  ],
};
