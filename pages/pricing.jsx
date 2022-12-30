import React from 'react';

import Pricing from '../src/pages/Pricing';
import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";

function PricingPage(props) {
  return <Pricing {...props}/>
}

export async function getStaticProps() {
  const data = await getSanityData('pricing');

  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'estateplans',
        pageSlug:'pricing'
      },
      data,
      layout,
    },
  };
}

export default PricingPage;
