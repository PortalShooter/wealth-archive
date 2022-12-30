import React, { useEffect, useRef, useState } from 'react';

// Styles
import classnames from "classnames/bind";
import styles from './FlyingIllustartions.module.scss';
// Components
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import DiamondIcon from '@/pages/Home/sections/FlyingIllustartions/DiamondIcon';
import HomeIcon from '@/pages/Home/sections/FlyingIllustartions/HomeIcon';
import DocumentIcon from '@/pages/Home/sections/FlyingIllustartions/DocumentIcon';
import AutoIcon from '@/pages/Home/sections/FlyingIllustartions/AutoIcon';
// hooks
import { useInView } from 'react-intersection-observer';
import { motion, useTransform } from 'framer-motion';
import { useScrollTrigger } from '@/feature/ScrollProvider/ScrollProvider';
import { setStartCoords } from '@/redux/reducers/animationReducer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { hideIcons,setFlySectionOffset } from '@/redux/reducers/animationReducer/actions';
import { useScrollInView, useWindowSize } from '@/hooks';
import CircleDiagram from './CircleDiagram';
import ColumnDiagram from './ColumnDiagram';
import SinusDiagram from './SinusDiagram';
import BoxIcon from './BoxIcon';
import CoinIcon from './CoinIcon';


const cn = classnames.bind(styles);

const FlyingIllustartions = ({data}) => {

  const homeArea = useRef(null);
  const diamondArea = useRef(null);
  const documentArea = useRef(null);
  const autoArea = useRef(null);
  const circleDiagram = useRef(null);
  const columnDiagram = useRef(null);
  const sinusDiagram = useRef(null);
  const box = useRef(null);
  const coin = useRef(null);
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const iconSProps = useSelector(globalState=>globalState.animation.icons);
  const isHideIcons = useSelector(globalState=>globalState.animation.isHideIcons);
  const sectionsOffset = useSelector(globalState=>globalState.animation.sectionsOffset);
  const delays = ['0s','0.3s','0.6s','0.9','1.2s','1.5s','1.8s','2.1s','2.4s'];
  const [mounted,setMounted] = useState(false);


  const cupInView = useInView(
    {
      rootMargin:'0% 0px -35%  0px',
      triggerOnce:true
    }
  )
 const svgInView = useInView({
   triggerOnce:true
 })
  const [cupClass,setCupClass] = useState('');
  const [isMove,setIsMove] = useState(false);


  const progress = useScrollTrigger().progress;
  const windowParams = useWindowSize();

  /********** Icons animation ***********/

  const refs = [homeArea,diamondArea,documentArea,autoArea]
  const motionParams = {}
  const [progressBorderValue,setProgressBorderValue] = useState(0.4);

  refs.forEach((icon,index)=> {
    const directionX = iconSProps[`icon${index}`]?.startX > iconSProps[`icon${index}`]?.endX?-1:1
    const directionY = iconSProps[`icon${index}`]?.startY > iconSProps[`icon${index}`]?.endY?-1:1
    const catAC = Math.abs(iconSProps[`icon${index}`]?.startX - iconSProps[`icon${index}`]?.endX)
    const catBC = Math.abs(iconSProps[`icon${index}`]?.startY - iconSProps[`icon${index}`]?.endY)
    const hippo = Math.sqrt(Math.pow(catAC,2)+Math.pow(catBC,2))
    const angle  = Math.atan(catBC/catAC);
    const transformXhalf = (hippo*0.5)*Math.cos(angle)*directionX
    const transformYhalf = (hippo*0.5)*Math.sin(angle)*directionY
    const scaleXhalf = ((iconSProps[`icon${index}`]?.endWidth/2) / iconSProps[`icon${index}`]?.startWidth) + ((iconSProps[`icon${index}`]?.endWidth/2) / iconSProps[`icon${index}`]?.startWidth)*0.5



    const color = useTransform(progress, [0, progressBorderValue],['#000000','#051505'])
    const iconTransform = useTransform(progress, [0, progressBorderValue],
      ['translate3d(0,0,0) scale(1)',
        `translate3d(${transformXhalf}px,${transformYhalf}px,0) scale(${scaleXhalf})`
      ])
    motionParams[`icon${index}`] = {
      transform:iconTransform,
      color
    }
  })
  /*****************************************/

  useEffect(()=> {
    if (cupInView.inView) {
      setCupClass('flyanimation__cup')
    } else {
      setCupClass('')
    }

  },[cupInView.inView])

  useEffect(()=>{
    const icons = [homeArea.current,diamondArea.current,documentArea.current,autoArea.current]
    icons.forEach((icon,index)=> {
      const stateX = icon.getBoundingClientRect().left + window.scrollX;
      const stateY = icon.getBoundingClientRect().top + window.scrollY;
      const stateWidth = icon.clientWidth;
      const stateHeight = icon.clientHeight;
      dispatch(setStartCoords(stateX,stateY,stateWidth,stateHeight,`icon${index}`))
    })


  },[sectionsOffset])

  useEffect(()=>{
    const calcBorderValue = ((sectionsOffset?.cardsOffset?.offsetY - windowParams.windowHeight*0.65)-sectionsOffset?.flyOffset?.offsetY)/sectionRef.current.clientHeight
    !isNaN(calcBorderValue) && setProgressBorderValue(calcBorderValue);
  },[sectionsOffset])

  useEffect(()=>{
    const checkBorderValue = progress.onChange(()=>{
      // if (!isNaN(progressBorderValue) && progress.current >= progressBorderValue && progressBorderValue>0) {
      //   dispatch(hideIcons(true))
      // }
      if (!isNaN(progressBorderValue) && progress.current >= progressBorderValue / 2 && progressBorderValue>0) {
        setIsMove(true)
      }
    })

    return  checkBorderValue
  },[progressBorderValue])

  useEffect(()=>{
    const offset = sectionRef.current.getBoundingClientRect().top + window.scrollY
    dispatch(setFlySectionOffset(offset))
  },[windowParams,svgInView.inView])

  useEffect(()=>{
    setMounted(true)
  },[])

  return(
    <Section ref={sectionRef} className={cn('flyingillustration')}>
      <Container>
        <div className={cn('flyingillustration__content')}>
          <h2 className={cn('flyingillustration__title','h2')}>{ data.title }</h2>
          {/*<div className={cn('flyingillustration__text')}>*/}
          {/*  <p>{data.text}</p>*/}
          {/*</div>*/}
        </div>
        <div  className={cn('flyingillustration__wrapper')}>
          <svg ref={svgInView.ref} className={cn('flyingillustration__frame')}  width="1440" height="800" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/*<g clip-path="url(#clip0_1036_10343)" className={cn('flyanimation__icon','flyanimation__icon--reverse')}>*/}
          {/*  <path d="M473.725 169.871C473.943 170.671 474.768 171.142 475.567 170.924C476.366 170.705 476.837 169.881 476.619 169.082L473.725 169.871ZM447.21 67.0062L446.816 65.5591C446.016 65.7772 445.545 66.6019 445.763 67.4011L447.21 67.0062ZM560.599 146.165L560.993 147.613C561.793 147.394 562.264 146.57 562.046 145.771L560.599 146.165ZM495.405 162.401C494.606 162.619 494.135 163.443 494.353 164.242C494.571 165.042 495.395 165.513 496.195 165.295L495.405 162.401ZM513.411 48.9416L514.245 47.695C513.884 47.4532 513.435 47.3801 513.016 47.4945L513.411 48.9416ZM538.684 65.8557L540.131 65.4608C540.036 65.1124 539.818 64.81 539.518 64.6091L538.684 65.8557ZM476.619 169.082L448.658 66.6113L445.763 67.4011L473.725 169.871L476.619 169.082ZM560.204 144.718L495.405 162.401L496.195 165.295L560.993 147.613L560.204 144.718ZM447.605 68.4533L513.806 50.3887L513.016 47.4945L446.816 65.5591L447.605 68.4533ZM537.237 66.2506L559.151 146.56L562.046 145.771L540.131 65.4608L537.237 66.2506ZM512.577 50.1882L537.849 67.1023L539.518 64.6091L514.245 47.695L512.577 50.1882Z" fill="black"/>*/}
          {/*  <circle cx="500.87" cy="95.5252" r="10.2753" transform="rotate(-15.2631 500.87 95.5252)" stroke="black" stroke-width="3"/>*/}
          {/*  <path d="M489.696 134.559L488.902 131.65C487.448 126.322 490.589 120.824 495.917 119.37L517.279 113.541C522.607 112.087 528.105 115.228 529.559 120.556L530.353 123.464" stroke="black" stroke-width="3" stroke-linecap="round"/>*/}
          {/*</g>*/}

          <path d="M536.444 791.006C530.373 791.006 522.701 787.3 524.501 780.5C526.751 772 559.251 775.25 568.001 767.75" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M663.134 622.9C660.771 636.87 651.931 671.559 649.75 677.25" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M625.172 622.9C622.095 640.019 610.589 682.526 607.75 689.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

          <path d="M235.5 791H1212.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>


          <path  className={cn('flyanimation__hand')} d="M851.5 500.251C862 490.001 874.586 416.631 889.402 395.584C897.778 383.686 911.322 383.684 920.452 376.547C939.46 361.686 949.885 363.858 949.885 369.1C949.885 378.265 923.229 391.191 916 408.251C909.75 423.001 897.87 518.565 885.25 534.751C873.75 549.501 856.5 548.751 836 543.251" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path className={cn('flyanimation__neck')} d="M721.5 454.75C723 462.5 728.2 474.95 736 480.75" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M690.5 453C690.5 461 686.35 483.15 680.75 490.75" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <g className={cn('flyanimation__head')} >
            <path d="M727.75 376.5C734.333 395.667 745.25 435 726.25 449C718.932 454.392 702.5 452.25 697.25 449" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M688.25 467.75C653.65 469.75 634.167 464.417 627 461.5C629.083 436.25 634.527 380.476 645.5 362.75C658.5 341.75 675.5 341 683.5 347.5C707.243 330.233 729.984 365.774 731 385.75C726.917 380.333 715.6 368.15 703 362.75C704.8 381.55 690.25 403.25 681.5 410C686.75 418.25 694.25 447.15 688.25 467.75Z" fill="black" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M757.001 455.25C743.601 462.25 730.251 463.333 725.251 463C723.668 461.167 720.901 456.4 722.501 452C730.751 449.25 741.024 437.2 736.501 412.5C739.751 430.25 749.251 445.75 757.001 455.25Z" fill="black" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M766 423C766 433.75 743.25 439.5 736.75 416" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M606.5 447.25C611.75 453.25 626.3 451.7 630.5 427.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M663.5 332.5C672.5 332.5 681.25 340.75 684.25 347.75" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g  className={cn(cupClass)} style={{animationDelay:delays[0]}}>
            <path d="M1049.88 673.798L1060.08 669.614L1042.24 626.162L1011.42 638.815C1014.03 646.344 1020.49 656.792 1030.32 660.601C1046.17 666.739 1048.36 671.018 1049.88 673.798Z" fill="black" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1070.27 665.429L1060.08 669.613L1042.24 626.162L1073.07 613.509C1076.5 620.707 1079.25 632.677 1074.92 642.298C1067.95 657.8 1069.4 662.383 1070.27 665.429Z" fill="black" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1070.1 665.096C1068.35 650.274 1076.81 646.331 1086.67 637.355C1100 625.225 1085.15 606.912 1076.67 625.403" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <path d="M759.001 678.5C711.835 682.333 627.001 695.5 615.001 727C601.799 761.655 628.91 790.584 703.41 791.084" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M702.107 669.004C654.94 673.144 579.672 690.624 563.914 722.727C546.427 758.352 573.072 790.413 647.572 790.953" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1009.38 790.354L1001.9 779.375H1012.88L1005.39 770.892L1012.88 766.4L1002.9 761.41L1012.88 757.418L1002.9 743.444C1014.37 747.27 1045.41 754.922 1077.75 754.922C1110.09 754.922 1145.46 750.597 1159.1 748.435L1146.62 761.41H1159.1L1146.62 772.888L1159.1 779.375V790.354" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1002 731C1014.33 739.083 1046.65 755.25 1077.25 755.25C1107.85 755.25 1144.83 743.917 1159.5 738.25" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1009.56 779.375H1076.06" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1092.87 779.375L1125.05 779.375" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1066.37 766.899L1125.05 766.899" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M437.612 790.354L445.098 779.375H434.119L441.604 770.892L434.119 766.4L444.1 761.41L434.119 757.418L444.1 743.444L434.119 740.5L444.1 728.5C427.398 732.5 387.396 740.5 360.996 740.5C334.596 740.5 303.329 732.5 290.996 728.5L297.496 740.5L287.899 748.435L300.375 761.41H287.899L300.375 772.888L287.899 779.375V790.354" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M399.75 779.375H333.25" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M321.945 779.375L289.767 779.375" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M414.121 759.427L315.999 759.427" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path className={cn('flyanimation__leaflet')}  d="M423 679.25C402.6 677.05 386.667 685.167 379.5 690.25H419.5C426.833 697.917 443.2 712.95 450 711.75C458.5 710.25 448.5 682 423 679.25Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M307.751 675.25C331.351 670.45 351.289 683.502 357.956 690.169H335.268C318.101 696.169 282.201 708.15 272.001 706.75C259.251 705 278.251 681.25 307.751 675.25Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M292.999 680C288.583 681.25 279.649 682.1 279.249 675.5C278.749 667.25 303.999 656 323.499 660.5C342.999 665 360.5 679.25 366.5 689.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M377.002 690.25H335.252C334.919 706.5 342.802 739 377.002 739" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M377.002 690.25H418.752C419.085 706.5 411.202 739 377.002 739" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M293 717.5C308 725 345.897 739.5 377.5 739.5C401.5 739.5 433.333 727 441.5 721" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path className={cn('flyanimation__shirt')} d="M661.25 632L603.75 619C617.75 574.75 639.848 524.771 657 506.5C703 457.5 804.003 489.211 851 499.5L857 567L801.5 552C816.167 581.167 846.6 649.8 851 691C808 664 716.5 668.5 691.5 670C689.9 635.6 676.75 602.917 670.25 589.75L661.25 632Z" fill="black" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M694 723.5L877 715.5V749.5C882.833 743.5 896.4 730.7 904 727.5C920 749.5 955.5 782.5 979.5 790.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M849.5 683C851.875 691 852.125 709.125 852.125 716.375" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          {/*<g className={cn('flyanimation__icon')} style={}>*/}
          {/*  <path  d="M339.899 165.807L341.118 164.933C341.479 165.437 341.493 166.111 341.153 166.63L339.899 165.807ZM319.248 136.999L319.038 135.514C319.591 135.435 320.142 135.671 320.467 136.125L319.248 136.999ZM249.048 146.288C249.302 145.499 250.147 145.066 250.936 145.321C251.724 145.575 252.157 146.42 251.903 147.209L249.048 146.288ZM239.863 179.651L238.865 180.77C238.422 180.375 238.253 179.756 238.436 179.191L239.863 179.651ZM271.158 145.331C270.337 145.447 269.578 144.877 269.462 144.057C269.346 143.236 269.916 142.477 270.736 142.361L271.158 145.331ZM297.231 230.827L298.485 231.65C298.246 232.015 297.859 232.258 297.427 232.315C296.994 232.371 296.558 232.237 296.233 231.947L297.231 230.827ZM338.68 166.681L318.029 137.873L320.467 136.125L341.118 164.933L338.68 166.681ZM251.903 147.209L241.291 180.112L238.436 179.191L249.048 146.288L251.903 147.209ZM319.459 138.484L271.158 145.331L270.736 142.361L319.038 135.514L319.459 138.484ZM240.862 178.532L298.23 229.708L296.233 231.947L238.865 180.77L240.862 178.532ZM295.977 230.004L338.645 164.984L341.153 166.63L298.485 231.65L295.977 230.004Z" fill="black"/>*/}
          {/*  <path d="M338.832 165.851L239.865 179.651" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>*/}
          {/*</g>*/}
          {/*<g clip-path="url(#clip1_1036_10343)" className={cn('flyanimation__icon')} >*/}
          {/*  <path d="M783.01 207.748C783.833 207.648 784.58 208.234 784.68 209.056C784.781 209.878 784.195 210.626 783.373 210.726L783.01 207.748ZM754.24 235.317C754.092 236.132 753.312 236.674 752.497 236.527C751.682 236.38 751.14 235.6 751.287 234.784L754.24 235.317ZM783.373 210.726L763.467 213.149L763.105 210.171L783.01 207.748L783.373 210.726ZM757.165 219.1L754.24 235.317L751.287 234.784L754.213 218.567L757.165 219.1ZM763.467 213.149C760.289 213.536 757.734 215.949 757.165 219.1L754.213 218.567C755.015 214.122 758.62 210.717 763.105 210.171L763.467 213.149Z" fill="black"/>*/}
          {/*  <path d="M766.472 266.756C766.562 265.933 767.302 265.338 768.126 265.428C768.949 265.518 769.544 266.258 769.454 267.081L766.472 266.756ZM750.261 244.524C750.161 243.701 750.746 242.953 751.569 242.853C752.391 242.753 753.139 243.339 753.239 244.161L750.261 244.524ZM763.214 279.132L763.032 277.643L763.214 279.132ZM760.277 277.978L763.032 277.643L763.395 280.621L760.639 280.956L760.277 277.978ZM765.565 275.078L766.472 266.756L769.454 267.081L768.547 275.403L765.565 275.078ZM754.07 275.812L750.261 244.524L753.239 244.161L757.048 275.45L754.07 275.812ZM763.032 277.643C764.37 277.48 765.419 276.417 765.565 275.078L768.547 275.403C768.25 278.128 766.116 280.289 763.395 280.621L763.032 277.643ZM760.639 280.956C757.405 281.35 754.463 279.047 754.07 275.812L757.048 275.45C757.241 277.04 758.687 278.172 760.277 277.978L760.639 280.956Z" fill="black"/>*/}
          {/*  <path d="M812.541 260.973C812.245 260.199 811.378 259.812 810.604 260.107C809.83 260.402 809.443 261.269 809.738 262.043L812.541 260.973ZM823.766 242.966C823.666 242.144 822.918 241.558 822.096 241.658C821.274 241.759 820.688 242.506 820.788 243.329L823.766 242.966ZM821.281 271.434L821.102 269.945L821.281 271.434ZM821.102 269.945L818.438 270.265L818.796 273.243L821.46 272.923L821.102 269.945ZM815.383 268.419L812.541 260.973L809.738 262.043L812.58 269.489L815.383 268.419ZM826.613 266.352L823.766 242.966L820.788 243.329L823.635 266.715L826.613 266.352ZM818.438 270.265C817.117 270.423 815.857 269.663 815.383 268.419L812.58 269.489C813.545 272.018 816.108 273.566 818.796 273.243L818.438 270.265ZM821.46 272.923C824.699 272.534 827.007 269.591 826.613 266.352L823.635 266.715C823.829 268.306 822.694 269.753 821.102 269.945L821.46 272.923Z" fill="black"/>*/}
          {/*  <path d="M767.945 266.467L810.775 261.254" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>*/}
          {/*  <path d="M821.139 233.818L820.957 232.329C820.135 232.429 819.55 233.177 819.65 233.999L821.139 233.818ZM823.575 266.243C823.675 267.066 824.423 267.651 825.245 267.551C826.067 267.451 826.653 266.703 826.553 265.881L823.575 266.243ZM781.991 207.872C781.168 207.972 780.583 208.72 780.683 209.543C780.783 210.365 781.531 210.95 782.353 210.85L781.991 207.872ZM817.799 227.117L816.459 227.792C816.744 228.357 817.352 228.682 817.98 228.606L817.799 227.117ZM826.271 226.085L827.76 225.904C827.66 225.082 826.913 224.496 826.09 224.596L826.271 226.085ZM810.085 211.822L808.746 212.498L810.085 211.822ZM819.65 233.999L823.575 266.243L826.553 265.881L822.628 233.637L819.65 233.999ZM782.353 210.85L801.346 208.538L800.983 205.56L781.991 207.872L782.353 210.85ZM808.746 212.498L816.459 227.792L819.138 226.441L811.425 211.147L808.746 212.498ZM817.98 228.606L826.453 227.574L826.09 224.596L817.618 225.628L817.98 228.606ZM824.782 226.267L825.152 229.3L828.13 228.938L827.76 225.904L824.782 226.267ZM822.972 232.084L820.957 232.329L821.32 235.307L823.335 235.062L822.972 232.084ZM825.152 229.3C825.319 230.671 824.343 231.917 822.972 232.084L823.335 235.062C826.35 234.695 828.497 231.953 828.13 228.938L825.152 229.3ZM801.346 208.538C804.4 208.167 807.36 209.75 808.746 212.498L811.425 211.147C809.469 207.27 805.293 205.036 800.983 205.56L801.346 208.538Z" fill="black"/>*/}
          {/*  <path d="M752.512 235.102L746.841 235.792" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>*/}
          {/*  <circle cx="808.894" cy="244.861" r="5" transform="rotate(-6.94031 808.894 244.861)" stroke="black" stroke-width="3"/>*/}
          {/*  <circle cx="767.199" cy="249.936" r="5" transform="rotate(-6.94031 767.199 249.936)" stroke="black" stroke-width="3"/>*/}
          {/*</g>*/}
          {/*<g  className={cn('flyanimation__icon','flyanimation__icon--reverse')} style={{animationDelay:delays[1]}}>*/}
          {/*  <path d="M822.425 79.4253C819.961 88.3885 814.895 96.4198 807.866 102.503C800.838 108.587 792.163 112.45 782.939 113.604C773.715 114.757 764.357 113.15 756.046 108.984C747.736 104.819 740.848 98.2831 736.252 90.2029C731.656 82.1226 729.56 72.861 730.228 63.5893C730.896 54.3177 734.299 45.4523 740.005 38.1143C745.712 30.7763 753.466 25.2953 762.287 22.3644C771.109 19.4334 780.602 19.1842 789.565 21.6483L782.84 46.1106C778.715 44.9766 774.346 45.0913 770.287 46.4402C766.227 47.789 762.658 50.3115 760.032 53.6885C757.406 57.0656 755.84 61.1456 755.532 65.4126C755.225 69.6795 756.19 73.9419 758.305 77.6605C760.42 81.3792 763.59 84.3872 767.414 86.3041C771.239 88.2211 775.546 88.9608 779.791 88.4299C784.036 87.899 788.028 86.1213 791.263 83.3214C794.497 80.5216 796.829 76.8255 797.963 72.7005L822.425 79.4253Z" fill="black" stroke="black" strokeWidth="3"/>*/}
          {/*  <path d="M789.567 21.6483C795.518 23.2843 801.089 26.0766 805.961 29.8656C810.833 33.6546 814.911 38.3661 817.963 43.7312C821.014 49.0963 822.979 55.0099 823.745 61.1343C824.511 67.2587 824.063 73.474 822.427 79.4254L797.941 72.694C798.693 69.9583 798.899 67.1011 798.547 64.2858C798.195 61.4704 797.291 58.752 795.889 56.2857C794.486 53.8194 792.611 51.6536 790.372 49.9118C788.132 48.17 785.571 46.8865 782.835 46.1344L789.567 21.6483Z" stroke="black" strokeWidth="3"/>*/}
          {/*  <path d="M796.446 56.4697L817.656 44.4065" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*</g>*/}
          {/*<g className={cn('flyanimation__icon','flyanimation__icon--long')} style={{animationDelay:delays[2]}}>*/}
          {/*  <path d="M1019.85 265.328L977.359 341.373" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M994.553 251.196L952.066 327.241" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M929.196 303.757C946.9 313.649 971.636 272.403 980.279 277.232C988.921 282.061 974.029 321.195 985.15 327.408C996.271 333.622 1027.79 284.748 1038.71 290.848C1049.62 296.948 1017.73 353.221 1033.85 362.23" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M915.08 306.563L909.498 303.444" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M936.32 268.546L930.738 265.427" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M957.561 230.529L951.978 227.41" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M946.939 249.537L941.357 246.418" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M925.699 287.554L920.117 284.435" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M1045.14 279.46L1002.65 355.505" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <rect x="967.309" y="235.736" width="120.597" height="87.3053" rx="8" transform="rotate(29.1923 967.309 235.736)" stroke="red" strokeWidth="3"/>*/}
          {/*</g>*/}
          {/*<g className={cn('flyanimation__icon','flyanimation__icon--reverse-long')} style={{animationDelay:delays[3]}}>*/}
          {/*  <rect x="534.859" y="230.966" width="116.32" height="84.2091" rx="8" transform="rotate(-9.18708 534.859 230.966)" stroke="black" strokeWidth="3"/>*/}
          {/*  <path d="M597.766 255.643L602.343 283.945" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M583.574 269.596L586.314 286.538" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M631.66 261.819L634.4 278.76" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M568.672 279.165L570.284 289.13" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M611.281 237.504L618.373 281.353" stroke="red" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*</g>*/}
          {/*<g clipPath="url(#clip2_1036_10343)" className={cn('flyanimation__icon','flyanimation__icon--reverse')} style={{animationDelay:randomAnimationDelay()}}>*/}
          {/*  <path d="M1101.35 117.746L1140 152.394L1185.69 130.025L1148.24 94.9478L1119.67 108.693" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M1185.76 130.27L1178.77 178.948L1132.77 202.73L1093.69 166.733L1100.77 117.447" stroke="red" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M1139.74 154.143L1132.77 202.73" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*</g>*/}
          {/*<g className={cn('flyanimation__icon')} style={{animationDelay:delays[4]}}>*/}
          {/*  <path d="M1004.74 158.402C992.831 181.468 964.481 190.515 941.415 178.609C918.349 166.704 909.302 138.354 921.207 115.288C933.113 92.2216 961.463 83.1743 984.529 95.08C1007.6 106.986 1016.64 135.336 1004.74 158.402Z" stroke="black" strokeWidth="3"/>*/}
          {/*  <path d="M974.551 129.067C976.606 120.452 962.532 116.956 955.239 116.285L951.426 134.332C958.278 136.166 972.496 137.681 974.551 129.067Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M976.564 148.697C978.617 138.979 960.641 135.761 951.355 134.67L947.542 152.716C956.334 154.96 974.511 158.414 976.564 148.697Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M961.32 111.568L960.194 116.897M951.301 158.993L952.304 154.245" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*  <path d="M969.938 113.389L968.795 118.795M959.918 160.813L961.083 155.299" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>*/}
          {/*</g>*/}
          {/*<g clip-path="url(#clip3_1036_10343)" className={cn('flyanimation__icon')} >*/}
          {/*  <path d="M449.666 320.036L451.113 320.43C451.251 319.924 451.115 319.383 450.754 319.003L449.666 320.036ZM436.536 368.276L436.142 369.723C436.941 369.94 437.766 369.469 437.983 368.669L436.536 368.276ZM357.674 346.811C357.457 347.611 357.928 348.435 358.728 348.653C359.527 348.87 360.351 348.399 360.569 347.599L357.674 346.811ZM372.251 298.965L371.841 297.523C371.335 297.666 370.942 298.064 370.804 298.571L372.251 298.965ZM377.317 350.603C376.518 350.386 375.694 350.857 375.476 351.657C375.258 352.456 375.73 353.28 376.529 353.498L377.317 350.603ZM417.482 286.11L418.57 285.077C418.186 284.672 417.608 284.514 417.072 284.667L417.482 286.11ZM448.218 319.642L435.089 367.882L437.983 368.669L451.113 320.43L448.218 319.642ZM360.569 347.599L373.699 299.359L370.804 298.571L357.674 346.811L360.569 347.599ZM436.93 366.828L377.317 350.603L376.529 353.498L436.142 369.723L436.93 366.828ZM372.661 300.408L417.892 287.552L417.072 284.667L371.841 297.523L372.661 300.408ZM416.393 287.142L448.578 321.068L450.754 319.003L418.57 285.077L416.393 287.142Z" fill="black"/>*/}
          {/*</g>*/}
          <defs>
            <clipPath id="clip0_1036_10343">
              <rect width="129.81" height="129.81" fill="white" transform="translate(424.172 61.0132) rotate(-15.2631)"/>
            </clipPath>
            <clipPath id="clip1_1036_10343">
              <rect width="88" height="88" fill="white" transform="translate(738.012 204.631) rotate(-6.94031)"/>
            </clipPath>
            <clipPath id="clip2_1036_10343">
              <rect width="120" height="120" fill="white" transform="translate(1089.64 80.9209) rotate(8.17053)"/>
            </clipPath>
            <clipPath id="clip3_1036_10343">
              <rect width="99" height="100" fill="white" transform="translate(372.238 263.245) rotate(15.2257)"/>
            </clipPath>
          </defs>
        </svg>
          <div className={cn('flyingillustration__motion-icons-wrapper')}>
            <div ref={cupInView.ref} className={cn('flyingillustration__marker')}></div>
            <motion.div ref={homeArea} className={cn('flyingillustration__motion-icon','flyingillustration__motion-icon--home',isMove?'move':'',isHideIcons?'hide':'',useScrollInView(homeArea).spawnAnimation)}
                        style={{
                          transform:motionParams.icon0.transform,
                          color:motionParams.icon0.color,}}>
              <div className={cn('flyingillustration__motion-icon-inner')}><HomeIcon  className={cn('flyanimation__icon')} style={{animationDelay:delays[5]}}/></div>
            </motion.div>
            <motion.div ref={diamondArea}  className={cn('flyingillustration__motion-icon','flyingillustration__motion-icon--diamond',isMove?'move':'',isHideIcons?'hide':'',useScrollInView(diamondArea).spawnAnimation)}
              style={{
                transform:motionParams.icon1.transform,
                color:motionParams.icon1.color,
              }}>
              <div className={cn('flyingillustration__motion-icon-inner')}><DiamondIcon className={cn('flyanimation__icon')} style={{animationDelay:delays[6]}}/></div>
            </motion.div>
            <motion.div ref={documentArea} className={cn('flyingillustration__motion-icon',
              'flyingillustration__motion-icon--document',isMove?'move':'',isHideIcons?'hide':'',useScrollInView(documentArea).spawnAnimation)}
                        style={{
                          transform:motionParams.icon2.transform,
                          color:motionParams.icon2.color,}}>
              <div className={cn('flyingillustration__motion-icon-inner')}><DocumentIcon className={cn('flyanimation__icon','flyanimation__icon--reverse')} style={{animationDelay:delays[7]}} /></div>
            </motion.div>
            <motion.div ref={autoArea} className={cn('flyingillustration__motion-icon',
              'flyingillustration__motion-icon--auto',isMove?'move':'',isHideIcons?'hide':'',useScrollInView(autoArea).spawnAnimation)}
                        style={{
                          transform:motionParams.icon3.transform,
                          color:motionParams.icon3.color,}}>
              <div className={cn('flyingillustration__motion-icon-inner')}><AutoIcon className={cn('flyanimation__icon')} style={{animationDelay:delays[8]}} /></div>
            </motion.div>
            <div ref={circleDiagram} className={cn('flyingillustration__motion-icon',
              'flyingillustration__motion-icon--circle',useScrollInView(circleDiagram).spawnAnimation)}>
              <CircleDiagram className={cn('flyanimation__icon','flyanimation__icon--reverse')} style={{animationDelay:delays[1]}} />
            </div>
            <div ref={columnDiagram} className={cn('flyingillustration__motion-icon',
              'flyingillustration__motion-icon--column',useScrollInView(columnDiagram).spawnAnimation)}>
              <ColumnDiagram className={cn('flyanimation__icon','flyanimation__icon--reverse-long')} style={{animationDelay:delays[3]}} />
            </div>
            <div ref={sinusDiagram} className={cn('flyingillustration__motion-icon',
              'flyingillustration__motion-icon--sinus',useScrollInView(sinusDiagram).spawnAnimation)}>
              <SinusDiagram className={cn('flyanimation__icon','flyanimation__icon--long')} style={{animationDelay:delays[2]}} />
            </div>
            <div ref={box} className={cn('flyingillustration__motion-icon',
              'flyingillustration__motion-icon--box',useScrollInView(box).spawnAnimation)}>
              <BoxIcon className={cn('flyanimation__icon','flyanimation__icon--reverse')} style={{animationDelay:delays[6]}} />
            </div>
            <div ref={coin} className={cn('flyingillustration__motion-icon',
              'flyingillustration__motion-icon--coin',useScrollInView(coin).spawnAnimation)}>
              <CoinIcon className={cn('flyanimation__icon')} style={{animationDelay:delays[4]}} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export  default FlyingIllustartions;
