import React from 'react';
import PrivacySecurity from '@/pages/PrivacySecurity/PrivacySecurity';
import {getSanityData} from "@/shared/utils/sanity.utils";
import {getLayoutData} from "@/helpers/getLayoutData";

const PrivacySecurityPage = (props) => {

  return <PrivacySecurity {...props} />;
};

export async function getStaticProps() {
  const data = await getSanityData('security');
  const layout = await getLayoutData();

  return {
    props: {
      page: {
        menuItemUnderline: 'resources',
        name: 'privacy-and-security',
        pageSlug:'security'
      },
      data,
      layout,
    },
  };
}

export default PrivacySecurityPage;
