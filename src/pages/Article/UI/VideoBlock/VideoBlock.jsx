import React, { useRef, useState } from 'react';

// Styles
import classNames from 'classnames/bind';
import styles from './VideoBlock.module.scss';
import { ArticleVideoNext } from '@/svgComponents';
import { getImgUrl } from '@/shared/utils/sanity.utils';
import Image from 'next/image';
import { Section } from '@/feature/Section';
import { Container } from '@/feature/Container';
import { useScrollInView } from '@/hooks';

const cn = classNames.bind(styles);

function VideoBlock({ data, style }) {
  if (!data) {
    return null;
  }
  data.url = data?.url ? data.url : '';
  // const imageUrl = data.poster.image ? getImgUrl(data.poster.image) : null;

  const [isClick, setIsClick] = useState(false);
  const videoRef = useRef();

  const startVideo = () => {
    if (videoRef.current.paused === true) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsClick(!isClick);
  };

  console.log(data.url);

  return (
    <Section className={cn('video-block')}>
      <Container className={cn('video-block__wrapper')}>
        <div className={cn('video-block__video')}>
          <iframe
            src={data.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={cn('video-block__video')}
            ref={videoRef}
          />
        </div>
      </Container>
    </Section>
  );
}

export default VideoBlock;
