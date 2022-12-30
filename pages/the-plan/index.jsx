import React from 'react';

import {getSanityData} from '@/shared/utils/sanity.utils';
import {getLayoutData} from '@/helpers/getLayoutData';
import Blog from '@/pages/Blog';

function BlogPage(props) {
  return <Blog {...props} />;
}

export async function getStaticProps() {
  const data = await getSanityData(
    '',
    `*[_type == "blog"]{
  wantToLearnMore,
  'categoriesArticles': categoriesArticles[] {
    _type == 'reference' => @->,
    _type != 'reference' => @,
    "category": {
      "title": category->title,
      "id": category->_id,
      "slug": category->slug.current
    },
    "articles": articles[] {
       _type == 'reference' => @->,
      _type != 'reference' => @,
    }
  },
  heroArticle->{
    title,
    "image": mainImage,
    publishedAt,
    readTime,
    "category": category->title,
    "articleId": _id,
    "articleSlug": slug,
    "categoryId": category->_id,
    "categorySlug": category->slug
  },
  searchInscriptions,
  seo,
}`
  );

  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'resources'
      },
      data,
      layout,
    },
  };
}

export default BlogPage;
