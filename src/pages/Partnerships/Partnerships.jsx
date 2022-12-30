import React from 'react';
import Hero from '@/pages/Partnerships/sections/Hero';
import Value from '@/pages/Partnerships/sections/Value';
import AsSeen from '@/pages/Partnerships/sections/AsSeen';
import Quote from '@/pages/Partnerships/sections/Quote';
import Works from '@/pages/Partnerships/sections/Works';
import Assessment from '@/pages/Partnerships/sections/Assessment';
import ClosingImage from '@/pages/Partnerships/sections/ClosingImage';

function Partnerships({ data }) {
    if (!data) {
        return null;
    }

    return (
        <>
            <Hero data={data.partnershipsHero} ctaButton={data.ctaButton}/>
            <Value data={data.wealthValue} ctaButton={data.ctaButton} />
            <AsSeen data={data.partnershipsAsSeen} />
            <Quote data={data.partnershipsQuote} />
            <Works data={data.howWealthWorks} />
            <Assessment data={data.assessment} ctaButton={data.ctaButton}/>
            <ClosingImage data={data.closingImage} />
        </>
    )
}

export default Partnerships;
