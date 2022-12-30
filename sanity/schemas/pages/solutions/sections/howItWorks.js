export default {
  title: 'How it works',
  name: 'howItWorksSolutions',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'SubTitle',
      name: 'subTitle',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
    {
      title: 'Steps',
      name: 'steps',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'Button text',
      name: 'btnText',
      type: 'string',
    },
    {
      title: 'Button link',
      name: 'btnLink',
      type: 'string',
    },
  ],
};
