export default {
    title: 'Quote',
    name: 'partnershipsQuote',
    type: 'object',
    fields: [
        {
            title: 'Quote',
            name: 'quote',
            type: 'textarea'
        },
        {
            title: 'Quote Author',
            name: 'quoteAuthor',
            type: 'string'
        },
        {
            title: 'Quote Author Info',
            name: 'quoteAuthorInfo',
            type: 'string'
        },
        {
            title: 'Quote Image',
            name: 'quoteImage',
            type: 'imageWithAlt',
        },
    ]
}
