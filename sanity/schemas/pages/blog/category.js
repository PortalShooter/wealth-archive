export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Slug',
      description: 'This value will be used for the URL of the page',
      name: 'slug',
      type: 'uniqueSlug',
    },
    {
      title: 'Seo',
      name: 'seo',
      type: 'seo',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
