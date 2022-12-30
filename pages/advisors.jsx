import React from 'react';
import { useSanity } from '../src/hooks';
import { getSanityData } from '@/shared/utils/sanity.utils';
import { getLayoutData } from '@/helpers/getLayoutData';
import Advisors from '@/pages/Advisers';

function AdvisorsPage(props) {
  return <Advisors {...props} />;
}

export async function getStaticProps() {
  const dataAdvisers = await getSanityData('advisers');
  const dataHome = await getSanityData(
    '',
    `*[_type == "home"]{
      coloredCards
    }`
  );
  const data = { ...dataAdvisers, ...dataHome };
  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'wealthatwork'
      },
      data,
      layout,
    },
  };
}

export default AdvisorsPage;
