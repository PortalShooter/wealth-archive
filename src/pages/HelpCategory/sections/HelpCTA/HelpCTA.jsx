import React, {useRef} from 'react';

// Styles
import styles from './HelpCTA.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

//Components
import { Link } from '@/feature/Link';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';

// For Modal
import { modalController } from '@/pages/Home/sections/OldHero/shared/modal/useModal';
import { MODAL_ID } from '@/pages/Home/sections/OldHero/modalForm/ModalForm';
import { defaultModalGroupOptions } from '@/pages/Home/sections/OldHero/shared/modal/defaults';
import {useScrollInView} from "@/hooks";

const handleClick = () => {
  modalController.open(MODAL_ID, defaultModalGroupOptions['groupId']);
  document.body.classList.add('modal-opened');
};

function HelpCTA({ data }) {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  return (
    <Section className={cn('help-cta')}>
      <Container className={cn('help-cta__container')}>
        <h2 className={cn('help-cta__title', useScrollInView(titleRef, { title: true }).titleSpawn)} ref={titleRef} dangerouslySetInnerHTML={{ __html: data.title }}></h2>
        <p className={cn('help-cta__description', useScrollInView(paragraphRef).spawnAnimation)} ref={paragraphRef}>{data.description}</p>
        <button className={cn('help-cta__button', useScrollInView(buttonRef).spawnAnimation)} ref={buttonRef} onClick={handleClick}>
          {data.buttonTitle}
        </button>
      </Container>
    </Section>
  );
}

export default HelpCTA;
