export default {
    title: 'Hero section',
    name: 'aboutHero',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Description',
            name: 'description',
            type: 'string',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'imageWithAlt',
        }
    ]
}
