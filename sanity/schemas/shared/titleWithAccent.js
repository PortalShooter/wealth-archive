export default {
  title: 'Title with accent part',
  name: 'titleWithAccent',
  type: 'object',
  fields: [
    {
      title: 'Full title text',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Alt title text',
      description: 'Optional',
      name: 'altTitle',
      type: 'string'
    },
    {
      title: 'Accent phrase',
      name: 'accentPhrase',
      type: 'string'
    },
    {
      title: 'Additional accent phrases',
      name: 'additionalAccentPhrases',
      type: 'array',
      of: [{type: 'string'}]
    },
  ]
}
