import React from 'react';

import Article from '@/pages/Article';
import { getLayoutData } from '@/helpers/getLayoutData';
import { getSanityData } from '@/shared/utils/sanity.utils';
import {
  getArticlesByCategoryId,
  getArticlesById,
  getPageId
} from '@/helpers/getBlogArticles';

function ArticlePage(props) {
  return <Article {...props} />;
}

export async function getStaticPaths(context) {
  const categories = await getSanityData('category', null, false);
  const paths = [];
  for (let i = 0; i < categories.length; i++) {
    const categorySlug = categories[i].slug.current;
    const categoryId = categories[i]._id;
    const articles = await getArticlesByCategoryId(categoryId);
    articles.forEach((article) => {

      if(!article.slug) {
        console.log(article)
      }

      const articleSlug = article.slug.current;
      paths.push({
        params: { categorySlug, articleSlug },
      });
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { articleSlug } = context.params;

  const articleId = await getPageId('article', articleSlug);
  const article = await getArticlesById(articleId);

  const ctaData = await getSanityData(
    '',
    `*[_type == "blog"]{
      wantToLearnMore,
      searchInscriptions,
    }`
  );

  const layout = await getLayoutData();

  const page = {
    menuItemUnderline: 'resources',
  }

  if (article[0]?.seo) {
    page.seo = article[0].seo
  }

  return {
    props: {
      page,
      data: article?.length ? article[0] : null,
      ctaData,
      layout,
    },
  };
}

export default ArticlePage;
