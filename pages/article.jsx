import React from 'react';

import Article from '@/pages/Article';
import { getLayoutData } from '@/helpers/getLayoutData';
import { getSanityData } from '@/shared/utils/sanity.utils';

function ArticlePage(props) {
  return <Article {...props} />;
}

export async function getStaticProps() {
  const ctaData = await getSanityData(
    '',
    `*[_type == "blog"]{
      wantToLearnMore,
    }`
  );

  const data = await getSanityData(
    '',
    `*[_type == "article"]{
      category->,
      _createdAt,
      _id,
      _rev,
      _type,
      _updatedAt,
      body,
      _ref,
      mainImage,
      publishedAt,
      readTime,
      title,
      related[]-> {
        category->,
        _id,
        mainImage,
        publishedAt,
        readTime,
        title,
      }
    } | order(publishedAt desc)`
  );

  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'resources',
      },
      data,
      ctaData,
      layout,
    },
  };
}

export default ArticlePage;
