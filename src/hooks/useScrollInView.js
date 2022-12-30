import {useEffect, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

export function useScrollInView(ref, options = {staticVisible : false, title: false}) {
  const element = useInView({
    rootMargin: '0% 0% -12% 0%',
    triggerOnce: true,
  });

  const [isSplited,setIsSplited] = useState(false)
  const [splitText,setSplitText] = useState({chars:[],lines:[]})
  const [isCompleted, setIsCompleted] = useState(false)

  function cbOnComplete() {
    setIsCompleted(true)
  }

  useEffect(async () => {
    if (ref && ref.current) {
      if (options.title) {
        if (!isSplited) {
          const SplitText = await import('src/app/scripts/SplitText')
          const titleSplitText = new window.SplitText(ref.current, { type: "words,chars",charsClass:'chars' });
          setSplitText(titleSplitText)
          setIsSplited(true)
        }

        const timelineChars = gsap.timeline();
        if (options.delay) {
          timelineChars.delay(options.delay/1000)
        }

        // const timelineRows = gsap.timeline();

        const {chars,lines} = splitText; // an array of all the divs that wrap each character

        // gsap.set(ref.current, { perspective: 400 });
        // timelineRows.from(lines, {
        //   duration: 0.5,
        //   opacity: 0,
        //   ease: "linear",
        //   stagger: 0.05,
        //   onUpdate: function() {
        //     console.log(this)
        //   }
        // });
        if (element.inView) {
          timelineChars.to(chars, {
            duration: 0.66,
            x:0,
            opacity: 1,
            ease: "easeOutExpo",
            stagger: 0.02,
            onComplete: cbOnComplete
          });
        }

      }
      element.ref(ref.current);
    }
  }, [ref,element.inView]);

  return {
    inView: element.inView,
    spawnAnimation: `${!options.staticVisible ? 'spawnAnimation' : ''} ${!options.staticVisible && element.inView ? 'animate' : ''}`,
    childrenAnimation: `${!options.staticVisible ? 'spawnChildrenAnimation' : ''} ${
      !options.staticVisible && element.inView ? 'animate' : ''
    }`,
    titleSpawn: `${!options.staticVisible ? 'titleSpawnAnimation' : ''} ${!options.staticVisible && element.inView ? 'animate' : ''}`,
    isCompleted,
  };
}
