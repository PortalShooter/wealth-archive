export default {
    title: 'Compare section',
    name: 'compareSideBySide',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Comparison list',
            name: 'comparisonList',
            type: 'array',
            of: [{ type: 'priceCompare' }]
        },
    ]
}
