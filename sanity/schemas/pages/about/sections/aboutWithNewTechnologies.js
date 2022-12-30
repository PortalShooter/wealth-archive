export default {
    title: 'New technologies section',
    name: 'aboutWithNewTechnologies',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'titleWithAccent',
        },
        {
            title: 'Blocks',
            name: 'blocks',
            type: 'array',
            of: [{ type: 'withNewTechnologiesBlock' }]
        },
        {
            title: 'Partners',
            name: 'partners',
            type: 'string'
        },
        {
            title: 'Partners logos',
            name: 'partnersLogos',
            type: 'array',
            options: {
              layout: 'grid',
            },
            of: [
              {
                type: 'svgUpload',
              },
            ],
            validation: Rule => Rule.max(6)
        },
    ]
}
