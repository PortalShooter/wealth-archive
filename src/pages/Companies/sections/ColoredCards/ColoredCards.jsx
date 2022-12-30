import React from 'react';
import classnames from "classnames/bind";

import styles from './ColoredCards.module.scss'
import { Container } from '@/feature/Container';
import Cards from '../../../Home/sections/Cards';
import TrustInfo from '../../../Solutions/sections/Trust/TrustInfo';
const cn = classnames.bind(styles);

const ColoredCards = ({data}) => {
  return (
    <div className={cn('black-cards')}>
      <Container>
        <div className={cn('black-cards__content')}>
          <h2 className={cn('black-cards__title','h2')}>{ data.coloredCards.title }</h2>
          <div className={cn('black-cards__text')}>
            <p>{data.coloredCards.text}</p>
          </div>
        </div>
      </Container>
      <Cards black data={data.coloredCards}/>
      <Container>
        <TrustInfo trustObj={{
          reviews: {
              title: {
                title:data.quote.quote
              },
              subtitle:data.quote.quoteSubtext ? {
                title: data.quote.quoteSubtext
              }:null,
              person: {
                name:data.quote.quoteAuthor,
                work:data.quote.quoteAuthorInfo
              }
            }
        }}/>
      </Container>
    </div>
  )
}

export default ColoredCards;
