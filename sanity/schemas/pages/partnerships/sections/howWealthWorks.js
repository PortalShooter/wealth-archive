export default {
    title: 'How Wealth Works',
    name: 'howWealthWorks',
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
            title: 'Wealth Plans',
            name: 'wealthPlans',
            type: 'array',
            of: [
                {
                    title: 'Wealth Plan',
                    name: 'wealthPlan',
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
                    ]
                }
            ]
        },
        {
            title: 'Companies Compare',
            name: 'companiesCompare',
            type: 'companiesCompare',
        },
        {
            title: 'Subtitle',
            name: 'subtitle',
            type: 'string',
        },
    ]
}
