import React from 'react';
import Hero from '@/pages/Careers/sections/Hero';
import CTA from '@/pages/Careers/sections/CTA';
import AllHuman from '@/pages/Careers/sections/AllHuman';
import Faith from '@/pages/Careers/sections/Faith';
import Job from '@/pages/Careers/sections/Job';
import Teach from '@/pages/Careers/sections/Teach';
import ParallaxImages from '@/pages/Careers/sections/ParallaxImages';
import Map from '@/pages/Careers/sections/Map';
import Investors from '@/pages/Careers/sections/Investors';

function Careers({ data }) {
  if (!data) {
    return null;
  }

  return (
    <>
      <Hero data={data.hero} />
      <Faith data={data.titleImg} />
      <Map data={data.map} />

      <AllHuman data={data.allHuman} />

      <ParallaxImages data={data.parallaxImages} />
      <Teach data={data.teach} />
      {/*<Investors data={data.investors} />*/}
      <Job data={data.job} />
      <CTA data={data.cta} />
    </>
  );
}

export default Careers;
