export default {
    title: 'The Plan',
    name: 'blog',
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
            title: 'Hero Article',
            name: 'heroArticle',
            type: 'reference',
            to: [{ type: 'article' }],
        },
        {
            title: 'Categories and Articles',
            type: 'array',
            name: 'categoriesArticles',
            of: [{ type: 'categoriesArticles' }]
        },
        {
            name: 'wantToLearnMore',
            type: 'wantToLearnMore',
            title: 'Want to learn more'
        },
        {
            name: 'searchInscriptions',
            type: 'searchInscriptions',
            description: 'Inscriptions are displayed when no articles are found',
            title: 'Search Inscriptions'
        },
        {
          name: 'searchResultInscription',
          type: 'string',
          title: 'Search result inscription'
        }
    ]
}
