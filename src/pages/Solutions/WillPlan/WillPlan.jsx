import React from 'react';

import Promo from '../sections/Promo';
import Include from '../sections/Include';
import Tabs from '../sections/Tabs';
import Works from '../sections/Works';
import Way from '../sections/Way';
import Trust from '../sections/Trust';
import CompareSide from '../sections/CompareSide';
import Questions from '../sections/Questions';
import OtherPlans from '../sections/OtherPlans';
import EstatePlanning from '../sections/EstatePlanningSection';
import TrustInfo from '@/pages/Solutions/sections/Trust/TrustInfo';
import { useBodyClass } from '@/hooks';

const WillPlan = ({ data }) => {
  useBodyClass('solutions');
  if (!data) {
    return null;
  }
  const {
    solutionsHero,
    whatIsIncluded,
    cards,
    howItWorks,
    ways,
    estatePlanning,
    trust,
    otherPlans,
    questions,
    compare,
  } = data;
  return (
    <section>
      <Promo promoObj={solutionsHero} />
      <Include includeObj={whatIsIncluded} className={'will'} />
      <Tabs tabsObj={cards} className={'will'} />
      <Works workObj={howItWorks} />
      <Way wayObj={ways} />
      <EstatePlanning data={estatePlanning} />
      <Trust trustObj={trust}>
        <TrustInfo trustObj={trust} />
      </Trust>
      <CompareSide compareSide={compare} trustVal={false} willVal={true} coreVal={false} />
      <Questions questions={questions} />
      <OtherPlans otherPlans={otherPlans} plan={'will'} />
    </section>
  );
};

export default WillPlan;
