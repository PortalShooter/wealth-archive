import React from 'react';
import Promo from '@/pages/PrivacySecurity/Promo/Promo';
import Tabs from '@/pages/PrivacySecurity/Tabs';
import {useBodyClass} from "@/hooks";

const PrivacySecurity = ({ data }) => {
  useBodyClass('security');
  if (!data) {
    return null;
  }

  return (
    <section className="privacy-security">
      <Promo promoObj={data.hero} />
      <Tabs tabsObj={data.tabs} />
    </section>
  );
};

export default PrivacySecurity;
