import React from 'react';

import Promo from '../sections/Promo';
import Include from '../sections/Include';
import Tabs from '../sections/Tabs';
import Works from '../sections/Works';
import Way from '../sections/Way';
import EstatePlanning from '../sections/EstatePlanningSection';
import Trust from '../sections/Trust';
import CompareSide from '../sections/CompareSide';
import Questions from '../sections/Questions';
import OtherPlans from '../sections/OtherPlans';
import TrustInfo from '@/pages/Solutions/sections/Trust/TrustInfo';
import { useBodyClass } from '@/hooks';

const TrustPlan = ({ data }) => {
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
      <Include includeObj={whatIsIncluded} />
      <Tabs tabsObj={cards} />
      <Works workObj={howItWorks} />
      <Way wayObj={ways} />
      <EstatePlanning data={estatePlanning} />
      <Trust trustObj={trust}>
        <TrustInfo trustObj={trust} />
      </Trust>
      <CompareSide compareSide={compare} trustVal={true} willVal={false} coreVal={false} />
      <Questions questions={questions} />
      <OtherPlans otherPlans={otherPlans} plan={'trust'} />
    </section>
  );
};

export default TrustPlan;
