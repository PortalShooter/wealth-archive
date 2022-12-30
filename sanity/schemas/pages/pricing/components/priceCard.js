export default {
    title: 'Price card',
    name: 'priceCard',
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
            title: 'Price',
            description: "example: $99",
            name: 'price',
            type: 'string',
        },
        {
            title: 'Price Caption',
            description: "example: First Year",
            name: 'priceCaption',
            type: 'string',
        },
        {
            title: 'Caption',
            description: "example: Renews at $7 per month ",
            name: 'caption',
            type: 'string'
        },
        {
            title: 'Button Text',
            name: 'buttonText',
            type: 'string',
        },
        {
          title: 'URL',
          name: 'url',
          type: 'string',
        },
        {
            title: 'What is included',
            name: 'includedText',
            type: 'string',
        },
        {
            title: 'Label',
            name: 'label',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
}
