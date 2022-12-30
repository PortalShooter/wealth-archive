import React from 'react';

// Component
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import TitleImg from "@/pages/Careers/components/TitleImg";

// Styles
import classnames from "classnames/bind";
import styles from './Faith.module.scss';
const cn = classnames.bind(styles);

function Faith({data}) {
  return (
    <Section className={cn('faith')}>
      <Container>
        <TitleImg
          data={data}
          className={cn('faith__block')}
          classNameImg={cn('faith__img')}
          classNameText={cn('faith__text')}
          classNameHeading={cn('faith__heading')}
        />
      </Container>
    </Section>
  )
}

export default Faith
