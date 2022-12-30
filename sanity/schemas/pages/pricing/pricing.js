export default {
    title: 'Pricing',
    name: 'pricing',
    type: 'document',
    __experimental_actions: ["update", /* 'create', 'delete', */ "publish"],
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
          title: 'Seo',
          name: 'seo',
          type: 'seo',
        },
        {
            title: 'Hero',
            name: 'hero',
            type: 'pricingHero'
        },
        {
            title: 'Price cards Individual',
            name: 'priceCards',
            type: 'array',
            of: [{ type: 'priceCard' }],
        },
        {
            title: 'Price cards Couples',
            name: 'priceCardsCouples',
            type: 'array',
            of: [{ type: 'priceCard' }],
        },
        {
            title: 'Compare side by side',
            name: 'compare',
            type: 'compareSideBySide'
        },
        {
            title: 'Pricing Info',
            name: 'pricingInfo',
            type: 'pricingInfo'
        }
    ]
}
