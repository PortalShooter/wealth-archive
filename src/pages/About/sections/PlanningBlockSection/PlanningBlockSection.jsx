import React, {useRef} from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import {useScrollInView} from '@/hooks';

// Components
import Image from 'next/image';
import {Section} from '@/feature/Section';
import {Container} from '@/feature/Container';
import {TextBlock} from '@/feature/TextBlock';

// Styles
import styles from './PlanningBlockSection.module.scss';

const cn = classnames.bind(styles);

function PlanningBlock({block, className}) {
  const blockRef = useRef(null);

  return (
    <Section className={cn('planning-block', className)}>
      <Container className={cn('planning-block__wrap', useScrollInView(blockRef).spawnAnimation)} ref={blockRef}>
        <TextBlock
          headingText={block.title}
          subHeadingText={block.description}
          headingStyles="h4"
          tagName="h3"
          className={cn('planning-block__title')}
          headingClassName={cn('planning-block__heading')}
        />
        <div className={cn('planning-block__image-wrap')}>
          <Image
            src={block.image.url}
            width={block.image.width}
            height={block.image.height}
            layout="responsive"
            loading="eager"
            className={cn('planning-block__image')}
            alt={block.image.alt || ''}
            unoptimized
          />
        </div>
      </Container>
    </Section>
  );
}

function PlanningBlockSection({data, className}) {
  const {blocks: blocksData} = data;
  if (!blocksData) {
    return null;
  }

  const planningBlocksSections = blocksData.map((block) => {
    return <PlanningBlock block={block} key={block.title} className={className}/>;
  });

  return <>{planningBlocksSections}</>;
}

export default PlanningBlockSection;
