import React from 'react';
import Promo from '@/pages/Companies/sections/Promo';
// import AsSeen from '@/pages/Home/sections/AsSeen';
import PlanningSection from '@/pages/About/sections/PlanningSection';
import { getImgSize, getImgUrl } from '@/shared/utils/sanity.utils';
import FinancialAdvisors from '@/pages/Home/sections/FinancialAdvisors';
import HowItWorks from '@/pages/Companies/sections/HowItWorks';
import Questions from '@/pages/Solutions/sections/Questions';
import CompareSide from '@/pages/Companies/sections/CompareSide';
import Tabs from '@/pages/Companies/sections/Tabs';
import ColoredCards from './sections/ColoredCards';
import {useBodyClass} from '@/hooks';
import ScrollProvider from '@/feature/ScrollProvider';
import PlanningBlockSection from '@/pages/About/sections/PlanningBlockSection';
import CompaniesAsSeen from '@/pages/Home/sections/Companies'

const Companies = ({ data }) => {
  useBodyClass('wealthatwork');
  if (!data) {
    return null;
  }

  const planningData = {
    title: data.makingEstatePlanning.title,
    description: data.makingEstatePlanning.description,
    images: data.makingEstatePlanning.images.map((imageData) => {
      const imageUrl = getImgUrl(imageData.image);
      const { width, height } = getImgSize(imageData.image);

      return {
        alt: imageData.alt,
        width,
        height,
        url: imageUrl,
      };
    }),
  };

  const planningBlockData = {
    blocks: data.makingEstatePlanning.blocks.map((block) => {
      const imageUrl = getImgUrl(block.image.image);
      const { width, height } = getImgSize(block.image.image);

      return {
        title: block.title,
        description: block.description,
        image: {
          alt: block.image.alt,
          width,
          height,
          url: imageUrl,
        },
      };
    }),
  };

  return (
    <>
      <Promo promoObj={data?.companiesHero} />
      {/*<AsSeen data={data.asSeen} />*/}
      <CompaniesAsSeen data={data.asSeen} />
      <ScrollProvider mobileDisable={1024}>
        <PlanningSection data={planningData} className={'planning__companies'} additionalClassName="plan" />
      </ScrollProvider>
      <PlanningBlockSection data={planningBlockData} className="company" />
      <Tabs tabsObj={data.companiesCards} />
      <ColoredCards data={{ coloredCards: data.coloredCards, quote: data.quote }} />
      <HowItWorks data={data.howItWorks} />
      <CompareSide data={data.companiesCompare} />
      <Questions questions={data.questions} className={'questions__companies'} />
      <FinancialAdvisors data={data.financialAdvisors} className={'fa__companies'} modalForm={2} />
    </>
  );
};

export default Companies;
