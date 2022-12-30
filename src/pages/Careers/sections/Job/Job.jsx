import React from 'react';

// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import TitleImg from "@/pages/Careers/components/TitleImg";

// Styles
import classnames from "classnames/bind";
import styles from './Job.module.scss';
const cn = classnames.bind(styles);

function Job({data}) {
  return (
    <Section className={cn('job')} isPaddingTop>
      <Container>
        <TitleImg
          data={data}
          className={cn('job__block')}
          classNameImg={cn('job__img')}
          classNameText={cn('job__text')}
          classNameHeading={cn('job__heading')}
          headingStyles={'h3'}
        />
      </Container>
    </Section>
  )
}

export default Job
