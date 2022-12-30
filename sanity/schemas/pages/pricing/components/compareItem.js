export default {
    title: 'Block with compare information',
    name: 'compareItem',
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
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
}
