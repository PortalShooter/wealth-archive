import React from 'react';

import { getSanityData } from '@/shared/utils/sanity.utils';
import { getLayoutData } from '@/helpers/getLayoutData';
import HelpCategory from '@/pages/HelpCategory';
import { getPageId } from '@/helpers/getBlogArticles';

function BlogPage(props) {
  return <HelpCategory {...props} />;
}

export async function getStaticPaths() {
  const helpCategories = await getSanityData('helpCategory', null, false);
  const paths = helpCategories.map((helpCategory) => {
    return {
      params: {
        helpCategorySlug: helpCategory.slug.current ?? '',
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { helpCategorySlug } = context.params;

  const helpCategoryId = await getPageId('helpCategory', helpCategorySlug);
  const data = await getSanityData('', `*[ _type == "helpCategory" && _id in ["${helpCategoryId}"]]`);

  const ctaData = await getSanityData(
    '',
    `*[_type == "help"]{
    questions{
        title,
        categories[]->
      },
      cta,
      seo
    }`
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

export default BlogPage;
