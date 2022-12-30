export default {
  title: 'Compare side by side',
  name: 'compare',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Desktop Button Text',
      description: 'Plan select button text',
      name: 'desktopButtonText',
      type: 'string',
    },
    {
      title: 'Button Desktop link',
      name: 'btnDeskLink',
      type: 'string',
    },
    {
      title: 'Mobile Button Text',
      description: 'Plan select button text',
      name: 'mobileButtonText',
      type: 'string',
    },
    {
      title: 'Button Mobile link',
      name: 'btnMobileLink',
      type: 'string',
    },
    {
      title: 'Comparison points',
      name: 'comparisonPoints',
      type: 'comparisonPoints',
    },
    {
      title: 'Plans',
      name: 'plans',
      type: 'array',
      of: [{ type: 'plan' }],
    },
  ],
};
