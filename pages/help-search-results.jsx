import React from 'react';

import { getSanityData } from '@/shared/utils/sanity.utils';
import { getLayoutData } from '@/helpers/getLayoutData';
import HelpSearchResults from '@/pages/HelpSearchResults';

function HelpSearchResultPage(props) {
  return <HelpSearchResults {...props} />;
}

export async function getStaticProps() {
  const data = await getSanityData(
    '',
    `*[_type == "help"]{
      cta,
      questions{
        title,
        categories[]->
      },
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

export default HelpSearchResultPage;
