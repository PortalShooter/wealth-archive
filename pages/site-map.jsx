import React from 'react';
import {getLayoutData} from "@/helpers/getLayoutData";
import {getSanityData} from "@/shared/utils/sanity.utils";
import SiteMap from "@/pages/SiteMap/SiteMap";

export const getStaticProps = async() => {
  const data = await getSanityData('siteMap');
  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: null
      },
      data,
      layout
    },
  }
}

export function NotFoundPage({ data }) {
  return <SiteMap data={data}/>
}

export default NotFoundPage;
