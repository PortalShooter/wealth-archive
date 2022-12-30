export default {
    title: 'About Us',
    name: 'about',
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
            type: 'aboutHero'
        },
        {
            title: 'With new technologies comes the challenge of seeing everything you own',
            name: 'withNewTechnologies',
            type: 'aboutWithNewTechnologies'
        },
        {
          title: 'Designed by experts',
          type: 'designedByExperts',
          name: 'designedByExperts'
        },
        {
          title: 'Making estate planning dynamic and accessible for all',
          type: 'makingEstatePlanning',
          name: 'makingEstatePlanning'
        },
        {
            title: 'Are we for you?',
            name: 'areWeForYou',
            type: 'areWeForYou'
        },
        {
            title: 'Partnering employers',
            name: 'employers',
            type: 'employers',
        },
        {
            title: 'Individually available',
            name: 'individuallyAvailable',
            type: 'individuallyAvailable',
        },
        {
            title: 'Latest Stories',
            name: 'latestStories',
            type: 'latestStories',
        },
        {
            title: 'Join',
            name: 'joinSection',
            type: 'join',
        },
        {
          title: 'Legal info',
          name: 'legalInfo',
          type: 'object',
          fields: [
            {
              title: 'Link',
              name: 'link',
              type: 'link',
            },
            {
              title: 'Text without link',
              name: 'text',
              type: 'string',
            }
          ]
        }
    ]
}
