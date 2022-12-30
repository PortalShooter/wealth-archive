import React from 'react';
import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";
import CorePlan from '@/pages/Solutions/CorePlan';

function CorePlanPage(props) {
  const {data} = props;

  return <CorePlan data={data.core} />;
}

export async function getStaticProps() {
  const data = await getSanityData(
    '',
    `*[_type == "solutionPage"]{
      core->,
      will->,
      trust->
}`
  );

  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'estateplans',
        page: 'core',
        pageSlug:'solutions'
      },
      data,
      layout,
    },
  };
}

export default CorePlanPage;
