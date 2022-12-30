import React from 'react';
import Careers from '@/pages/Careers'

import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";

function Index(props) {
  return <Careers {...props}/>;
}

export async function getStaticProps() {
  const data = await getSanityData('careers');

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

export default Index;
