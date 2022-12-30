import React from 'react';
import Home from "@/pages/Home";

import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";

function Index(props) {
  return <Home {...props}/>;
}

export async function getStaticProps() {
  const data = await getSanityData('home');

  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: null,
        pageSlug:'home'
      },
      data,
      layout,
    },
  };
}

export default Index;
