import FlyingIllustartions from "src/pages/Home/sections/FlyingIllustartions/FlyingIllustartions.jsx"
import Cards from 'src/pages/Home/sections/Cards'
import { ScrollProvider } from "src/feature/ScrollProvider/ScrollProvider"


import FinancialAdvisors from 'src/pages/Home/sections/FinancialAdvisors'

import EstatePlanningSection from 'src/pages/Home/sections/EstatePlanningSection'
import EstatePlanningDocSection from 'src/pages/Home/sections/EstatePlanningDocSection'
import JoinSection from 'src/pages/Home/sections/Join'

import DigitalEstatePlaning from "@/pages/Home/sections/DigitalEstatePlaning";
// import AsSeen from 'src/pages/Home/sections/AsSeen'
import Trust from "src/pages/Solutions/sections/Trust";
import React, { useEffect } from 'react';

import TrustInfo from "@/pages/Home/sections/TrustInfo";
import PercentsTabs from './sections/PercentsTabs';
import DownloadSection from "@/pages/Home/sections/DownloadSection";
import {useBodyClass} from "@/hooks";
import { useDispatch } from 'react-redux';
import {hideIcons} from '@/redux/reducers/animationReducer/actions';

import Hero from './sections/Hero';
import Companies from "./sections/Companies";
import QuotesSection from "@/pages/Home/sections/QuotesSection";


function Home({data}) {
  useBodyClass('home');

  if (!data) {
    return null;
  }

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(hideIcons(false))
  },[])

  return (
    <>
      <ScrollProvider >
        <Hero data={data.homeHero}/>
      </ScrollProvider>
      <ScrollProvider forward mobileDisable={1024}>
        <FlyingIllustartions data={{title:data.deplaning.title}}/>
        <Cards/>
      </ScrollProvider>
      <ScrollProvider mobileDisable={1024} >
        <Cards data={{
          ...data.coloredCards,
          purple_text:data.deplaning.purple_text,
          yellow_text:data.deplaning.yellow_text,
          mint_text:data.deplaning.mint_text,
          }}/>
      </ScrollProvider>
      <DigitalEstatePlaning data={data.deplaning}/>
      <Companies data={data.asSeen} />
      {/*<AsSeen data={data.asSeen} />*/}
      <QuotesSection data={data.quotes} />
      <ScrollProvider>
        <PercentsTabs data={data.homePercentsTabs   }/>
      </ScrollProvider>
      <FinancialAdvisors home={true} data={data.financialAdvisors} />
      <EstatePlanningSection data={data.estatePlanningHome} />
      <ScrollProvider mobileDisable={1024} >
        <Trust trustObj={data.trust}>
          <TrustInfo data={data.trust} />
        </Trust>
      </ScrollProvider>
      <EstatePlanningDocSection data={data.estatePlanningDoc}/>
      <DownloadSection data={data.downloadSection} />
      <JoinSection data={data.joinHome}/>
    </>
  );
}

export default Home
