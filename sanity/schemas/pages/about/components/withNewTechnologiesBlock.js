export default {
    title: 'Block with new technologies data',
    name: 'withNewTechnologiesBlock',
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
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image.image.asset'
        }
    }
}
