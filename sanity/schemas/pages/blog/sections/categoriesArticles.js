export default {
    name: 'categoriesArticles',
    title: 'Categories and Articles',
    type: 'object',
    fields: [
        {
            title: 'Category',
            name: 'category',
            type: 'reference',
            to: [{ type: 'category' }]
        },
        {
          description: 'Determines whether to display the selected or the latest by publication date articles',
          title: 'Show latest articles?',
          name: 'isShowLatestArticles',
          type: 'boolean',
        },
        {
            title: 'Articles',
            name: 'articles',
            type: 'array',
            of: [
                    {
                        type: 'reference',
                        to: { type: 'article' },
                        // options: {
                        //     filter: (param) => {
                        //         console.log(param, 'document')
                        //         return {
                        //             filter: `$category._ref == category._ref`,
                        //             params: {
                        //                 category: param.document.categoriesArticles[0].category,
                        //             }
                        //         }
                        //     }
                        // }
                    }
            ]
        }
    ],
    preview: {
        select: {
            title: 'category.title',
        }
    }
}
