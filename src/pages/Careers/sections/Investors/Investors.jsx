import React, {useRef} from 'react';
import {useScrollInView} from "@/hooks";
import {useInView} from "react-intersection-observer";

// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";

// Styles
import classnames from "classnames/bind";
import styles from './Investors.module.scss';
const cn = classnames.bind(styles);

function Investors({data, className, classNameItem, classNameList, classNameTitle}) {
  const {title, investorsLogos} = data
  const titleRef = useRef(null)
  const logos = useInView({
    rootMargin: '-100px',
    triggerOnce: true,
  });

  return (
    <Section className={cn('investors', className)} isPaddingTop>
      <Container>
          <TextBlock
            headingText={title}
            headingStyles="h4"
            tagName="h3"
            className={cn('investors__title', classNameTitle)}
            headingClassName={cn('investors__heading', useScrollInView(titleRef).spawnAnimation)}
            align="center"
            textRef={titleRef}
          />
          <ul
            className={cn('investors__list', {'investors__list_hidden': !logos.inView}, classNameList)}
            ref={logos.ref}
          >
            {
              investorsLogos.map((logo, i) => (
                <li key={i} className={cn('investors__elem', classNameItem)} dangerouslySetInnerHTML={{__html: logo.source}}/>
              ))
            }
          </ul>
      </Container>
    </Section>
  )
}

export default Investors
