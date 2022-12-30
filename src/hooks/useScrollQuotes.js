import {useEffect} from 'react';
import { useInView } from 'react-intersection-observer';

export function useScrollQuotes(ref) {
  const element = useInView({
    rootMargin: '-100px',
    triggerOnce: true,
  });

  useEffect(async () => {
    if (ref.current) {
      element.ref(ref.current);
    }
  }, [ref,element.inView]);



  return {
    textBlock: (['quotes', element.inView ? 'quotesVisible' : '']),
    wrapperQuotes: 'quotes__wrapper'
  };
}
