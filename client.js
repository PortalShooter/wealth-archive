import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '2l4juc4x', // you can find this in sanity.json
  dataset: 'develop', // or the name you chose in step 1
  apiVersion: '2022-07-14',
  token: 'sk7meNVEk9JqxGR4KlVIOsDY0bOLH7SaiWGJneKr6xBveoJjxnzzEzAP29PaW93PytBm7P5uxMExdb13nuhzNHtslloKyQ9ylSpNBD7Lz5lFluchHoYJqc1BleczinEJhbAaQ8YTGR3ujdVf2QaAuKZi2rRZL6G19n3dizdDkWCDksbV4HBK',
  useCdn: true,
  withCredentials: true
})
