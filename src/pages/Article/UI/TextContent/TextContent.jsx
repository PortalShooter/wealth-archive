import React, { useEffect, useRef } from 'react';

import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';

import { PortableText } from '@portabletext/react';

import classnames from 'classnames/bind';
import styles from './TextContent.module.scss';
import { TextBlock } from '@/feature/TextBlock';
const cn = classnames.bind(styles);

function TextContent({ text, title, isPrimary, content }) {
  const ref = useRef(null);
  title = title ? title : '';
  text = text ? text : '';
  isPrimary = isPrimary ? isPrimary : false;

  console.log(isPrimary);

  useEffect(() => {
    const links = ref.current.querySelectorAll('a');
    const forcedSameHosts = ['app.wealth.com'];

    links.forEach((link) => {
      if (link.host === window.location.host) {
        return;
      }
      if (forcedSameHosts.indexOf(link.host) !== -1) {
        return;
      }

      link.target = '_blank';
    });
  }, []);

  return (
    <Section className={cn('text')}>
      <Container className={cn('text__wrapper')} ref={ref}>
        <TextBlock
          headingText={title}
          headingClassName={cn({ text__title: title }, { text__primary: isPrimary })}
          tagName={isPrimary ? 'h2' : 'h3'}
          headingStyles={'h4'}
          subHeadingClassName={cn('text__paragraph')}
          className={cn('text__block')}
        />
        <PortableText value={content.blockContent} />
      </Container>
    </Section>
  );
}

export default TextContent;
