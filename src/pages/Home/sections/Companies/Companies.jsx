import React, {useRef} from "react";
import {useScrollInView} from "@/hooks";

//Components
import {Container} from "@/feature/Container";
import {Section} from "@/feature/Section";
import {TextBlock} from "@/feature/TextBlock";


//Styles
import classnames from "classnames/bind";
import styles from './Companies.module.scss';
import {useInView} from "react-intersection-observer";
const cn = classnames.bind(styles);

function Companies ({data}) {
  const {title, companiesLogos} = data;
  const titleRef = useRef(null)
  const logos = useInView({
    rootMargin: '-100px',
    triggerOnce: true,
  });

  return (
    <Section className={cn('companies','companies-companies')} isPaddingTop>
      <Container className={cn('companies__wrapper')}>
        <TextBlock
          textRef={titleRef}
          headingText={title}
          tagName='h2'
          headingStyles='h4'
          className={cn('companies__text',  useScrollInView(titleRef, { title: true }).titleSpawn)}
          headingClassName={cn('companies__heading')}
          align="center"
        />
        <div className={cn('companies__list-wrarrer')}>
          <ul
            className={cn('companies__list', {'companies__list_hidden': !logos.inView})}
            ref={logos.ref}
          >
            {
              companiesLogos.map((logo, i) => (
                <li key={i} className={cn('companies__elem')} dangerouslySetInnerHTML={{__html: logo.source}}/>
              ))
            }
          </ul>
        </div>
      </Container>
    </Section>

  )
}

export default Companies
