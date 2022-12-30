import React, { useRef, useState } from 'react';

// Helpers
import classnames from 'classnames/bind';

// Hooks
import { useScrollInView } from '@/hooks';

// Components
import Switch from '../../UI/Switch';
import Card from '../../UI/Card';

// Styles
import styles from './ChoosePlan.module.scss';

const cn = classnames.bind(styles);

function ChoosePlan({ Cards, head }) {
  const [isCouple, setIsCouple] = useState(false);

  const getCardsCompare = (title) => {
    return Cards?.compare?.comparisonList.filter((elem) => title === elem.section);
  };

  const choosePlanTitle = useRef();
  const choosePlanSwitch = useRef();

  const getCardsData = (card) => {
    return card?.map((cardData) => {
      const cardProps = {
        key: cardData?._key,
        cardData: cardData,
        flag: isCouple,
        link: cardData.url,
        list: getCardsCompare(cardData.title),
      };
      return <Card {...cardProps} />;
    });
  };
  const cards = getCardsData(Cards?.priceCards);
  const cardsCouples = getCardsData(Cards?.priceCardsCouples);

  const closeElem = () => {
    setIsCouple(true);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('background')} />
      <div className={cn('choose-plan')}>
        <h2
          className={cn('choose-plan__header', useScrollInView(choosePlanTitle, { title: true }).titleSpawn)}
          ref={choosePlanTitle}
        >
          {head?.title}
        </h2>
        <div
          className={cn('choose-plan__switch', useScrollInView(choosePlanSwitch).spawnAnimation)}
          ref={choosePlanSwitch}
        >
          <Switch
            btnFirst={head?.firstButtonText}
            btnSecond={head?.secondButtonText}
            setIsCouple={setIsCouple}
            flag={isCouple}
          />
        </div>
        <div className={cn('choose-plan__cardsContainer')}>{!isCouple ? cards : cardsCouples}</div>
      </div>
    </div>
  );
}

export default ChoosePlan;
