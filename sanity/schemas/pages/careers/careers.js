export default {
  title: 'Careers',
  name: 'careers',
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
      name: 'hero',
      type: 'hero',
    },

    {
      title: 'Title + img',
      name: 'titleImg',
      type: 'titleImg',
    },

    {
      title: 'Map section',
      name: 'map',
      type: 'map',
    },

    {
      title: 'All human section',
      name: 'allHuman',
      type: 'allHuman',
    },

    {
      title: 'Parallax - images',
      name: 'parallaxImages',
      type: 'areWeForYou',
    },

    {
      title: 'Training section',
      name: 'teach',
      type: 'teach',
    },

    {
      title: 'Investors section',
      name: 'investors',
      type: 'investors',
    },

    {
      title: 'Job section',
      name: 'job',
      type: 'titleImg',
    },

    {
      title: 'CTA section',
      name: 'cta',
      type: 'join',
    },
  ],
};
