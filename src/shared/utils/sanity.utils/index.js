import client from "/client";
import imageUrlBuilder from '@sanity/image-url';
const PROJECT_ID = '2l4juc4x'
const DATASET = 'develop'
const builder = imageUrlBuilder(client);

const getImgUrl = (source) => builder.image(source).url()

const getImgSize = (source) => {
  const imageUrl = builder.image(source).url();
  const [_, width, height] = imageUrl.match(/(\d+)x(\d+)[.].*$/);

  return {
    width,
    height
  }
}
const getUrlFromId = ref => {
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`
}

const getSanityData = async (type, query = null, firstElement = true) => {
  const fetchQuery = query ?? `*[_type == "${type}"]`;
  const data =  await client.fetch(
    fetchQuery
  )

  if (Array.isArray(data) && data.length) {
    return firstElement ? data[0] : data
  }

  return null;
}

export {
  getImgUrl,
  getImgSize,
  getSanityData,
  getUrlFromId
}
