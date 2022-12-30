import React, { useEffect, useRef, useState } from 'react';

//Sections
import HelpCTA from '@/pages/HelpCategory/sections/HelpCTA';
import HeroSection from '@/pages/Help/sections/HeroSection';
import CategorySection from '@/pages/Help/sections/CategorySection';
import { useBodyClass } from '@/hooks';
import { syncScroll } from '@/shared/scroll';

function Help({ data }) {
  useBodyClass('help');

  const heroProps = {
    title: data.title,
    inputPlaceholder: "I'm having trouble with",
    categories: data.questions.categories,
  };

  const categoryProps = {
    title: data.questions.title,
    categories: data.questions.categories,
  };

  const ctaProps = {
    title: data.cta.title,
    description: data.cta.subtitle,
    buttonTitle: data.cta.buttonText,
  };

  const noResultsProps = {
    title: 'Sorry, no results found',
    subtitle: 'Please check spelling or try different keywords',
  };

  return (
    <div>
      <HeroSection data={heroProps} noResultsProps={noResultsProps} />
      <CategorySection data={categoryProps} />
      <HelpCTA data={ctaProps} />
    </div>
  );
}

export default Help;
