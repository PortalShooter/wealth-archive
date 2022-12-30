import React from 'react';

// Hooks
import {useBodyClass} from '@/hooks';

// Components
import ChoosePlan from './sections/ChoosePlan';
import Compare from './sections/Compare';
import CTA from './sections/CTA';


function PricingPage({ data: choosePlan }) {
  useBodyClass('pricing');

  if (!choosePlan) {
    return null;
  }

  const head = choosePlan.hero;

  const ctaSection = choosePlan.pricingInfo;

  const compareTitle = choosePlan.compare?.title;
  const compareList = choosePlan.compare?.comparisonList;
  const compareHeader = choosePlan.priceCards?.map(({title}) => title);

  return (
    <div>
      <ChoosePlan head={head} Cards={choosePlan} />
      <Compare title={compareTitle} header={compareHeader} list={compareList} />
      <CTA ctaSection={ctaSection} />
    </div>
  );
}

export default PricingPage;
