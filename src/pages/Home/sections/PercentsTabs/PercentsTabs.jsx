import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {changeTab} from "@/redux/reducers/animationReducer/actions";

// Components
import Tab from './Tab';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import Switch from './Switch';

// Style
import classnames from "classnames/bind";
import * as styles from './PercentsTabs.module.scss';
const cn = classnames.bind(styles);

const PercentsTabs = ({data}) => {
  if (!data){ return null}

  // const [IsAdvisers, setIsAdvisers] = useState(false);
  const [currentTab, setCurrentTab] = useState(data?.tabs[0])
  const chengedTab = useSelector(globalState=>globalState.animation.changePercentTab.change);
  const dispatch = useDispatch();

  useEffect(()=>{
      setCurrentTab(chengedTab?data?.tabs[1]:data?.tabs[0]);
  },[chengedTab])

  // useEffect(()=>{
  //   if (!IsAdvisers) {
  //
  //   }
  // },[IsAdvisers])

  return (
    <Section className={cn('percents')} id={'percentTabs'}>
      <Container className={cn('percents__wrapper')}>
        <div className={cn('percents_inner')}>
          <div className={cn('percents__switch')}>
            <Switch
              btnFirst={data?.tabs[0]?.tabButtonText}
              btnSecond={data?.tabs[1]?.tabButtonText}
              setIsCouple={(flag)=>dispatch(changeTab(flag))}
              flag={chengedTab}/>
          </div>
          <div className={cn('percents__tabs')}>
              <Tab data={currentTab}/>
          </div>
        </div>

        <div className={cn('percents__border-bottom')}/>
      </Container>
    </Section>

  )
}
export  default PercentsTabs;
