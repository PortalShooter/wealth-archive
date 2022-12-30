import React from 'react';
import {getLayoutData} from "@/helpers/getLayoutData";
import {getSanityData} from "@/shared/utils/sanity.utils";
import NotFound from "@/pages/NotFound/NotFound";

export const getStaticProps = async() => {
  const data = await getSanityData('notFound');
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
  return <NotFound data={data}/>
}

export default NotFoundPage;
