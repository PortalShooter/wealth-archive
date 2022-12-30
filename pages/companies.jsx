import React from 'react';
import {useSanity} from '../src/hooks';
import Companies from '@/pages/Companies/Companies';
import {getSanityData} from '@/shared/utils/sanity.utils';
import {getLayoutData} from '@/helpers/getLayoutData';

function CompaniesPage(props) {
  return <Companies {...props} />;
}

export async function getStaticProps() {
  const dataCompanies = await getSanityData('companies');
  const dataHome = await getSanityData( '',
    `*[_type == "home"]{
      coloredCards
    }`);
  const data = {...dataCompanies,...dataHome}
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

export default CompaniesPage;
