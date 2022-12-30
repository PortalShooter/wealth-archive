import client from 'part:@sanity/base/client'

export default {
  title: 'Compare prices block',
  name: 'priceCompare',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      type: 'svgUpload',
      name: 'icon',
      title: 'SVG icon for block',
    },
    {
      title: 'Core',
      name: 'isCore',
      type: 'boolean',
    },
    {
      title: 'Will',
      name: 'isWill',
      type: 'boolean',
    },
    {
      title: 'Trust',
      name: 'isTrust',
      type: 'boolean',
    },
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [{type: 'compareItem'}]
    },
    {
      title: 'Card name for display in',
      description: 'You need to specify which card on mobile will display this element in list.',
      name: 'section',
      type: 'string',
      validation: Rule => Rule.required().custom((value,{document}) => {
        const {priceCards} = document;
        const options = priceCards.map(({title}) => title)
        const errorMessage = `Value must be one of price card titles: ${options.join(', ')}.`;
        return options.includes(value) || errorMessage
      })
    }
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
