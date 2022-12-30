import client from '~/client';

const getArticlesByTitle = async (textSearch, start, end) => {
  const pagination = end ? `[${start}...${end}]` : '';
  const textQuery = textSearch ? `&& title match "${textSearch}*"` : '';
  const fetchQuery = `*[ _type == "article" ${textQuery}]{
      category->,
      _createdAt,
      _id,
      _rev,
      _type,
      _updatedAt,
      body,
      _ref,
      _type,
      seo,
      mainImage,
      publishedAt,
      readTime,
      title,
      slug,
    } | order(publishedAt desc) ${pagination}`;

  return client.fetch(fetchQuery);
};

const getArticlesById = async (articleId) => {
  const fetchQuery = `*[ _type == "article" && _id in ["${articleId}"]]{
      category->,
      _createdAt,
      _id,
      _rev,
      _type,
      _updatedAt,
      body,
      _ref,
      _type,
      mainImage,
      publishedAt,
      readTime,
      title,
      seo,
      slug,
      related[]-> {
        category->,
        _id,
        mainImage,
        publishedAt,
        readTime,
        title,
        slug,
      }
    }`;

  return client.fetch(fetchQuery);
};

const getArticlesByCategoryId = async (categoryId, start, end) => {
  const duration = end ? `[${start}...${end}]` : '';
  const fetchQuery = `*[ _type == "article" && category._ref in ["${categoryId}"]]{
       category->,
      _createdAt,
      _id,
      _rev,
      _type,
      _updatedAt,
      body,
      _ref,
      _type,
      seo,
      mainImage,
      publishedAt,
      readTime,
      title,
      slug,
    } | order(publishedAt desc)
    ${duration}`;
  return client.fetch(fetchQuery);
};

const getCategoryById = async (id) => {
  const fetchQuery = `*[ _type == "category" && _id in ["${id}"]]`;
  return client.fetch(fetchQuery);
}

const getPageId = async (pageType, slug) => {
  const fetchQuery = `*[ _type == "${pageType}" && slug.current in ["${slug}"]] {
  _id
  }`;

  const res = await client.fetch(fetchQuery);

  if (!res || !res.length) {
    return
  }

  return res[0]._id
}

export { getArticlesByTitle, getArticlesByCategoryId, getArticlesById, getCategoryById, getPageId };
