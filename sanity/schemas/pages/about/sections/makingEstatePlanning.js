export default {
    title: 'Making estate planing section',
    name: 'makingEstatePlanning',
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
            title: 'Images',
            name: 'images',
            type: 'array',
            of: [{ type: 'imageWithAlt' }]
        },
        {
            title: 'Blocks',
            name: 'blocks',
            type: 'array',
            of: [{ type: 'withNewTechnologiesBlock' }]
        },
    ]
}
