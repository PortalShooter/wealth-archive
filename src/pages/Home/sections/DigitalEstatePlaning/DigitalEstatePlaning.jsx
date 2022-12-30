import React, {useEffect, useRef, useState} from "react";
import * as styles from './DigitalEstatePlaning.module.scss'
import classnames from "classnames/bind";
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {
  setCardsEndCoords,
  setChartsSectionOffset
} from "@/redux/reducers/animationReducer/actions";
import {useDispatch,useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";
import Lottie from "lottie-react";
import girlCalm from './02-Girl-Calm-No-BG.json'
import VisualizationChart from './VisualizationChart';
import CreatingChart from './CreatingChart';
import ManageChart from './ManageChart';
import { useWindowSize } from '../../../../hooks';
import {Link} from "@/feature/Link";

const registerUrl = 'https://app.wealth.com/register'

const cn = classnames.bind(styles);

const DigitalEstatePlaning = ({data}) => {
  const cardPurpleParking = useRef(null)
  const cardYellowParking = useRef(null)
  const cardMintParking = useRef(null)
  const markerRef = useRef(null)
  const sectionsOffset = useSelector(globalState=>globalState.animation.sectionsOffset);

  const [mounted,setMounted] = useState(false)
  const windowParams = useWindowSize();

  const sectionInView = useInView({})
  const markerShirtInView = useInView({
    rootMargin: '0% 0% 0% 0%'
  })

  const dispatch = useDispatch();

  useEffect(()=>{
    const icons = [cardPurpleParking.current,cardYellowParking.current,cardMintParking.current]
    icons.forEach((icon,index)=> {
      const stateX = icon.getBoundingClientRect().left + icon.clientWidth/2;
      const stateY = icon.getBoundingClientRect().top + window.scrollY + icon.clientHeight/2;
      const stateWidth = icon.clientWidth;
      const stateHeight = icon.clientHeight;
      dispatch(setCardsEndCoords(stateX,stateY,stateWidth,stateHeight,`card${index}`))
    })


  },[sectionInView.inView,mounted,windowParams])

  useEffect(()=>{
    const offset = markerRef.current.getBoundingClientRect().top + window.scrollY
    dispatch(setChartsSectionOffset(offset))
  },[mounted,sectionsOffset?.flyOffset?.offsetY])

  useEffect(()=>{
    setMounted(true)
  },[])

  return (
    <Section className={cn('deplaning-section')}>
      <Container>
        <div ref={sectionInView.ref} className={cn('deplaning')}>
            {/*<div className={cn('deplaning__content')}>*/}
            {/*  <h2 className={cn('deplaning__title','h2')}>{ data.title }</h2>*/}
            {/*  <div className={cn('deplaning__text')}>*/}
            {/*    <p>{data.text}</p>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className={cn('deplaning__charts',markerShirtInView.inView?'visible':'')}>
              <div className={cn('deplaning__chart-wrap')}>
                <div  className={cn('deplaning__chart')}>
                  <VisualizationChart/>
                </div>
                <div onClick={() => {window.open(registerUrl)}} ref={cardPurpleParking} className={cn('deplaning__textarea','deplaning__textarea--purple')}>{data.purple_text}</div>
              </div>
              <div className={cn('deplaning__chart-wrap')}>
                <div  className={cn('deplaning__chart')}>
                  <CreatingChart/>
                </div>
                <div onClick={() => {window.open(registerUrl)}} ref={cardYellowParking} className={cn('deplaning__textarea','deplaning__textarea--yellow')}>{data.yellow_text}</div>
              </div>
              <div className={cn('deplaning__chart-wrap')}>
                <div  className={cn('deplaning__chart')}>
                  <ManageChart/>
                </div>

                <div onClick={() => {window.open(registerUrl)}} ref={cardMintParking} className={cn('deplaning__textarea','deplaning__textarea--mint')}>{data.mint_text}</div>
              </div>

            </div>
            <div  className={cn('deplaning__illustration')}>
              <Lottie animationData={girlCalm} loop={true}/>
              <div ref={markerShirtInView.ref} className={cn('deplaning__marker')}>
                <div ref={markerRef}></div>
              </div>
            </div>
        </div>

        <Link variant="button-fill" className={cn('deplaning__cta-link')} href={data.cta_link.url}>
          {data.cta_link.text}
        </Link>
      </Container>
    </Section>
  )
}

export  default  DigitalEstatePlaning;
