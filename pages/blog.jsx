import React from 'react';
import Product from '@/pages/Product';

import { getSanityData } from '@/shared/utils/sanity.utils';
import { getLayoutData } from '@/helpers/getLayoutData';
import {getArticlesByCategoryId, getCategoryById, getPageId} from "@/helpers/getBlogArticles";

function Index(props) {
  return <Product {...props} />;
}

export async function getStaticProps() {
  const data = await getSanityData('product');
  const categorySlug = 'product-updates';
  const categoryId = await getPageId('category', categorySlug);
  const articles = await getArticlesByCategoryId(categoryId)
  const category = await getCategoryById(categoryId)


  const ctaData = await getSanityData(
    '',
    `*[_type == "blog"]{
      wantToLearnMore,
      searchInscriptions,
    }`
  );

  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'resources',
        pageSlug:'product'
      },
      data,
      layout,
      ctaData,
      articles,
      category
    },
  };
}

export default Index;
