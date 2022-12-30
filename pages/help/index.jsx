import React from 'react';

import { getSanityData } from '@/shared/utils/sanity.utils';
import { getLayoutData } from '@/helpers/getLayoutData';
import Help from '@/pages/Help';

function BlogPage(props) {
  return <Help {...props} />;
}

export async function getStaticProps() {
  const data = await getSanityData(
    '',
    `*[_type == "help"]{
      title,
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
        pageSlug:'help'
      },
      data,
      layout,
    },
  };
}

export default BlogPage;
