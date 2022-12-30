import React from 'react';
import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";
import WillPlan from '@/pages/Solutions/WillPlan';

const WillPlanPage = (props) => {
  const data = props.data;

  return <WillPlan data={data.will} />;
};

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
        page: 'will',
        pageSlug:'solutions'
      },
      data,
      layout,
    },
  };
}

export default WillPlanPage;
