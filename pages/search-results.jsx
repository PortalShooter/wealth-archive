import React from 'react';

import BlogSearchResults from '@/pages/BlogSearchResults';
import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";

function SearchResultsPage(props) {

  return <BlogSearchResults {...props} />;
}

export async function getStaticProps() {
  const data = await getSanityData(
    '',
    `*[_type == "blog"]{
      wantToLearnMore,
      searchResultInscription,
      searchInscriptions,
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

export default SearchResultsPage;
