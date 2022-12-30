import React, { useRef } from 'react';

import styles from './OtherPlans.module.scss';
import classnames from 'classnames/bind';
import { Link } from '../../../../feature/Link';
import SvgSolutionsCorePlan from '../../../../svgComponents/SolutionsCorePlan';
import SvgSolutionsWillPlan from '../../../../svgComponents/SolutionsWillPlan';
import { useScrollInView } from '@/hooks';
import SvgSolutionsTrustPlan from '@/svgComponents/SolutionsTrustPlan';

const cn = classnames.bind(styles);

const OtherPlans = ({ otherPlans, plan }) => {
  const title = useRef();
  const card1 = useRef();
  const card2 = useRef();

  const arrRef = [card1, card2];

  return (
    <section className={cn('other-plans')}>
      <div className={cn('other-plans__wrapper')}>
        <h2 className={cn('other-plans__title', useScrollInView(title, { title: true }).titleSpawn)} ref={title}>
          {otherPlans.title}
        </h2>
        <div className={cn('other-plans__blocks')}>
          {otherPlans.cards.map((item, index) => {
            return (
              <div
                className={cn('other-plans__external', useScrollInView(arrRef[index]).spawnAnimation)}
                ref={arrRef[index]}
                key={`other${index}`}
              >
                <div className={cn('other-plans__card')} key={`other${index}`}>
                  <h2 className={cn('other-plans__card-title')}>{item.title}</h2>
                  {index === 0 && plan === 'will' && <SvgSolutionsCorePlan className={cn('other-plans__card-img')} />}
                  {index === 1 && plan === 'will' && <SvgSolutionsTrustPlan className={cn('other-plans__card-img')} />}
                  {index === 0 && plan === 'trust' && <SvgSolutionsCorePlan className={cn('other-plans__card-img')} />}
                  {index === 1 && plan === 'trust' && <SvgSolutionsWillPlan className={cn('other-plans__card-img')} />}
                  {index === 0 && plan === 'core' && <SvgSolutionsTrustPlan className={cn('other-plans__card-img')} />}
                  {index === 1 && plan === 'core' && <SvgSolutionsWillPlan className={cn('other-plans__card-img')} />}
                  <div className={cn('other-plans__card-text')}>{item.description}</div>
                  <Link variant="button-fill" className={cn('other-plans__card_btn')} href={item?.btnLink}>
                    {item?.buttonText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OtherPlans;
