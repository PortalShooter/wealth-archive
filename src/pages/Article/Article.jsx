import React, { useState } from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './Article.module.scss';

const cn = classnames.bind(styles);

// Components
import ArticleSearch from '@/pages/Blog/sections/ArticleSearch';
import HeroSection from '@/pages/Article/sections/HeroSection';
import OrdinaryText from '@/pages/Article/UI/OrdinaryText';
import WantToLearnMore from '@/pages/Blog/sections/WantToLearnMore';
import RelatedArticles from '@/pages/Article/sections/RelatedArticles';
import ListSection from '@/pages/Article/UI/ListSection';
import QuoteSection from '@/pages/Article/sections/QuoteSection';
import ImageBlock from '@/pages/Article/UI/ImageBlock';
import ArticleCtaBlock from '@/pages/Article/UI/ArticleCtaBlock';
import VideoBlock from '@/pages/Article/UI/VideoBlock';
import TextContent from './UI/TextContent/TextContent';
import { useBodyClass } from '@/hooks';

function Article({ data, ctaData }) {
  useBodyClass('article');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let count = 0;
  const style = 'margin';
  const getContent = data?.body?.map((elem, i) => {
    switch (elem._type) {
      case 'textBlock':
        count = 0;
        return <OrdinaryText title={elem.heading} text={elem.text} key={elem._key} isPrimary={elem.isHeadingPrimary} />;
      case 'listBlock':
        count = 0;
        return <ListSection title={elem.heading} data={elem} key={elem._key} />;
      case 'quoteBlock':
        count = 0;
        return <QuoteSection data={elem} key={elem._key} />;
      case 'imageBlock':
        count += 1;
        return <ImageBlock data={elem} key={elem._key} style={count >= 2 ? style : null} />;
      case 'videoBlock':
        count += 1;
        return <VideoBlock data={elem} key={elem._key} style={count >= 2 ? style : null} />;
      case 'ctaBlock':
        count += 1;
        return <ArticleCtaBlock data={elem} key={elem._key} />;
      case 'blockContent':
        return (
          <TextContent
            title={elem.heading}
            text={elem.text}
            content={elem}
            isPrimary={elem.isHeadingPrimary}
            key={elem._key}
          />
        );
      default:
        return null;
    }
  });

  const publishedDate = data.publishedAt ? new Date(data.publishedAt) : null;

  const publishedAt = data.publishedAt
    ? `${months[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}`
    : null;

  const [isSearchActive, setIsSearchActive] = useState(false);

  const heroSectionProps = {
    title: data.title,
    category: data.category.title,
    date: publishedAt,
    timeRead: data.readTime ? data.readTime + ' min read' : '',
    mainImage: data.mainImage,
    layout: data.mainImage && data.mainImage.image ? 'normal' : 'imageless',
  };

  const searchNotFoundDataProps = {
    title: ctaData?.searchInscriptions?.title ?? '',
    description: ctaData?.searchInscriptions?.description ?? '',
  };

  const articleSearchProps = {
    backLink: '/the-plan',
    isSearchActive,
    setIsSearchActive,
    searchNotFoundData: searchNotFoundDataProps,
    white: true,
  };

  const { wantToLearnMore } = ctaData;

  const relatedArticlesProps = {
    title: 'Related articles',
    articles: data.related,
  };

  return (
    <div>
      <div className={cn('article', { article__show: isSearchActive })}>
        <ArticleSearch {...articleSearchProps} />
      </div>
      <HeroSection data={heroSectionProps} />

      <div>{getContent}</div>
      <RelatedArticles {...relatedArticlesProps} />
      <WantToLearnMore data={wantToLearnMore} />
    </div>
  );
}
export default Article;
