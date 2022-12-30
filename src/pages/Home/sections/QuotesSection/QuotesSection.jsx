import React, {useRef, useState} from 'react';
import {getImgUrl} from "@/shared/utils/sanity.utils";

// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import TrustInfo from '@/pages/Solutions/sections/Trust/TrustInfo';

// Styles
import classnames from "classnames/bind";
import styles from './QuotesSection.module.scss';
import {useScrollInView} from "@/hooks";
const cn = classnames.bind(styles);

function QuotesSection ({data}) {
  const {tabs, backgroundImg} = data
  const [activeTab, setActiveTab] = useState(0)
  const [isHidden, setsHidden] = useState(false)

  // const textRef = useRef(null)
  // const textQuotesRef = useRef(null)
  const tabsRef = useRef(null)

  const changeTab = (newTab) => {
    if (newTab !== activeTab) {
      setsHidden(true)
      setTimeout(()=> {
        setActiveTab(newTab)
        setsHidden(false)
      },300)
    } else return

  }

  // const useScrollText = useScrollInView(textRef, { title: true })
  // const useQuotes = useScrollQuotes(textQuotesRef)

  return (
    <Section className={cn('quotes__section')} isPaddingTop>
      <Container className={cn('quotes__wrap')}>

        {tabs && <TrustInfo trustObj={tabs[activeTab]} className={cn('quotes__trust-info',{hidden:isHidden})} classNameQuotes={cn('quotes__trust-quotes')} />}
        {/*<div className={cn('quotes__content')}>*/}
        {/*  <TextBlock*/}
        {/*    ref={textQuotesRef}*/}
        {/*    textRef={textRef}*/}
        {/*    headingText={tabs[activeTab].quote.title}*/}
        {/*    accentPhrase={tabs[activeTab].quote.accentPhrase}*/}
        {/*    additionalAccentPhrases={tabs[activeTab].quote.additionalAccentPhrases}*/}
        {/*    tagName='h3'*/}
        {/*    headingStyles='h3'*/}
        {/*    headingClassName={cn( 'quotes__heading',useQuotes.textBlock, useScrollText.isCompleted ? 'quotes-after' : '')}*/}
        {/*    className={cn('quotes__text', useScrollText.titleSpawn, useQuotes.wrapperQuotes)}*/}
        {/*  />*/}
        {/*  <p className={cn('quotes__author')}>{tabs[activeTab].quoteAuthor}</p>*/}
        {/*  <p className={cn('quotes__job')}>{tabs[activeTab].jobTitle}</p>*/}
        {/*</div>*/}

        {tabs && <div ref={tabsRef} className={cn('quotes__tabs', useScrollInView(tabsRef).spawnAnimation)}>
          {tabs.map((tab, index) => {
            return (
              <div key={`qtab${index}`} onClick={()=>changeTab(index)}
                   className={cn('quotes__tab', {'quotes__tab_active': activeTab === index}, {'quotes__tab_not-active': activeTab !== index})}>

                <img className={cn('quotes__tab-img')} src={getImgUrl(tab.logoImage.image.asset)}
                     alt={tab.logoImage.alt || ""}/>
              </div>
            )
          })}
        </div>
        }
        <div className={cn('quotes__background',{hidden:isHidden})} style={{backgroundImage: `url(${getImgUrl(backgroundImg.image.asset)})`}} />
      </Container>
    </Section>
  )
}

export default QuotesSection
