export default {
    title: 'Latest stories section',
    name: 'latestStories',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Stories',
            name: 'stories',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: { type: 'article' },
                },
            ],
        },
    ]
}
