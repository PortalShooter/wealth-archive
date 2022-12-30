import {useEffect, useState} from 'react';

// Styles
import classnames from "classnames/bind";
import styles from './Slide.module.scss';
const cn = classnames.bind(styles);

export function useAnivation(ref, activeSlide, isPrev, isNext, accentPhrase, text) {
  const [splitText, setSplitText] = useState(null)

  const classTextLine = cn('text__line')
  const classTextLineActiveSlide = cn('visible')
  const classTextLinePrevSlide = cn('prev-slide')
  const classTextLineNextSlide = cn('next-slide')

  useEffect(async () => {
    if (ref.current) {
      const SplitText = await import('src/app/scripts/SplitText')
      const lineChild = new window.SplitText(ref.current, { type: `lines ${accentPhrase && ', words'}`, linesClass: classTextLine});
      setSplitText(lineChild)
    }
  }, [ref]);

  useEffect(() => {
    if (splitText && splitText.lines.length) {
      if (activeSlide) {
        addClass(classTextLineActiveSlide)
      } else {
        removeClass(classTextLineActiveSlide)
      }

      if (isPrev) {
        addClass(classTextLinePrevSlide)
      } else {
        removeClass(classTextLinePrevSlide)
      }

      if (isNext) {
        addClass(classTextLineNextSlide)
      } else {
        removeClass(classTextLineNextSlide)
      }
    }

  }, [activeSlide, isPrev, isNext, splitText])

  useEffect(() => {
    if (splitText && accentPhrase && text) {
      const accentFirst = text.indexOf(accentPhrase)
      const accentLast = accentPhrase.length + accentFirst
      const textArr = text.split(' ')

      let firstWord, lastWord
      let symbols = 0

      textArr.map((el, index) => {
        symbols += el.length + 1

        if (symbols > accentFirst && !firstWord) {
          firstWord = index
        }
        if (symbols > accentLast && !lastWord) {
          lastWord = index
        }
      })

      splitText.words.forEach((el, index) => {
        if (index >= firstWord && index <= lastWord) {
          el.style.color = '#00857C';
        }
      })
    }

    if (splitText) {
      splitText.lines.forEach((el,index)=> {
        el.style.transitionDelay = `${index * 17}ms`
      })
    }
  }, [splitText])

  function addClass(className) {
    splitText.lines.forEach((el, index) => {
      el.classList.add(className)
    })
  }

  function removeClass(className) {
    splitText.lines.forEach((el, index) => {
      el.classList.remove(className)
    })
  }
}
