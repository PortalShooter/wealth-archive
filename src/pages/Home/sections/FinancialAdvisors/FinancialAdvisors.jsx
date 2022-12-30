import React, {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollInView } from '@/hooks';
import { modalController } from '@/pages/Home/sections/OldHero/shared/modal/useModal';
import { MODAL_ID } from '@/pages/Home/sections/OldHero/modalForm/ModalForm';
import { defaultModalGroupOptions } from '@/pages/Home/sections/OldHero/shared/modal/defaults';

import { changeTab } from '@/redux/reducers/animationReducer/actions';

// Component
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { TextBlock } from '@/feature/TextBlock';
import { Button } from '@/feature/Button';

// Styles
import classnames from 'classnames/bind';
import styles from './FinancialAdvisors.module.scss';
const cn = classnames.bind(styles);

function FinancialAdvisors({ data, style, className, home, modalForm }) {
  const { link, subtitle, title, altTitle } = data;
  const textRef = useRef(null);
  const subtitleAnim = useRef(null);
  const changedTab = useSelector(globalState=>globalState.animation.changePercentTab.change);
  const dispatch = useDispatch();

  const handleClick = () => {
    document.getElementById('percentTabs').scrollIntoView(true);
    dispatch(changeTab(!changedTab));
  };


  const handleMenuItemModalClick = () => {
    modalController.open(MODAL_ID, defaultModalGroupOptions['groupId'], modalForm ? modalForm : 0);
    document.body.setAttribute('scrollY', window.pageYOffset)
    document.body.style.top = `-${document.body.getAttribute('scrollY')}px`
    document.body.classList.add('modal-opened');
  };

  return (
    <Section className={cn('fa', className, { fa_white: title.accentPhrase })} isPaddingTop={true}>
      <Container className={cn('fa__wrap')}>
        <TextBlock
          textRef={textRef}
          subtitleRef={subtitleAnim}
          headingText={changedTab && home?title.altTitle:title.title}
          subHeadingText={subtitle}
          accentPhrase={title.accentPhrase ? title.accentPhrase : ''}
          tagName="h2"
          headingStyles="h2"
          subHeadingLevel="1"
          headingClassName={cn('fa__heading')}
          className={cn(
            'fa__text',
            { fa__text_green: !title.accentPhrase },
            useScrollInView(textRef, { title: true }).titleSpawn
          )}
          subHeadingClassName={cn('fa__subheading', className, useScrollInView(subtitleAnim).spawnAnimation)}
          align="center"
        />
        {home ? (
          <Button variant="base" className={cn('fa__link', className)} onClick={handleClick}>
            {link.name}
          </Button>
        ) : (
          <Button variant="base" className={cn('fa__link', className)} onClick={handleMenuItemModalClick}>
            {link.name}
          </Button>
        )}
      </Container>
    </Section>
  );
}

export default FinancialAdvisors;
