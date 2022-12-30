import React from 'react';
import { getSanityData } from '@/shared/utils/sanity.utils';
import { getLayoutData } from '@/helpers/getLayoutData';
import TrustPlan from '@/pages/Solutions/TrustPlan';

const TrustPlanPage = (props) => {
  const data = props.data;
  return <TrustPlan data={data.trust} />;
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
        page: 'trust',
        pageSlug:'solutions'
      },
      data,
      layout,
    },
  };
}

export default TrustPlanPage;
