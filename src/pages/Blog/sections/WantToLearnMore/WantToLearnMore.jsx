import React, { useEffect, useRef, useState } from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import { useScrollInView } from '@/hooks';

// Components
import { Container } from '@/feature/Container';
import { TextBlock } from '@/feature/TextBlock';
import SubscribeBanner from '@/pages/Blog/UI/SubscribeBanner';

// Styles
import iframeStyles from './iframeStyles'
import styles from './WantToLearnMore.module.scss';

const cn = classnames.bind(styles);

function WantToLearnMore({ data }) {
  const titleRef = useRef(null);
  const [showThanksMsg, setShowThanksMsg] = useState(false);

  const { title, link, placeholder } = data;

  useEffect(() => {
    if(!hbspt) {
      console.log('no Hubspot code found!');
    }

    const onFormReady = (form) => {
      const iframeStyle = document.createElement('style');
      iframeStyle.innerHTML = iframeStyles;
      form.append(iframeStyle);

      form.querySelector('.input input').placeholder = placeholder ?? 'Email Address';
      form.querySelector('.actions input').value = link.text ?? 'Subscribe';
    }

    const onFormSubmitted = () => {
      setShowThanksMsg(true);
      setTimeout(() => setShowThanksMsg(false), 4000);
    }

    hbspt.forms.create({
      target: '#subscribeForm',
      region: "na1",
      portalId: "9450632",
      formId: "aff58635-796c-4938-82ba-70aee175fcac",
      inlineMessage: ' ',
      onFormReady,
      onFormSubmitted
    })
  }, []);

  return (
    <Container className={cn('want-to-learn-more')}>

      <div>
        <TextBlock
          textRef={titleRef}
          headingText={title.title}
          accentPhrase={title.accentPhrase}
          additionalAccentPhrases={title.additionalAccentPhrases}
          headingStyles="h2"
          tagName="h2"
          className={cn('want-to-learn-more__title', useScrollInView(titleRef, { title: true }).titleSpawn)}
          align="center"
        />
        <div className={cn('subscribe')} id="subscribeForm"/>

        {showThanksMsg && (
          <div>
            <SubscribeBanner click={showThanksMsg} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default WantToLearnMore;
