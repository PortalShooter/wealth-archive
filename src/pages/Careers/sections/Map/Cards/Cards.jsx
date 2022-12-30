import React, {useEffect, useState} from 'react';

//Components
import Modal from "@/pages/Careers/components/Modal";
import Card from './Card'
import {Button} from "@/feature/Button";

//Styles
import classnames from 'classnames/bind';
import styles from './Cards.module.scss';
const cn = classnames.bind(styles);

function shuffle(array) {
  const copyArray = array.slice()

  for (let i = copyArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }

  return copyArray
}

function Cards({ data, btnText }) {
  const [showModal, setShowModal] = useState(0)
  const [showSubarray, setShowSubarray] = useState(0)
  const [subarray, setSubArray] = useState([])

  useEffect(() => {
    const jumbledArray = shuffle(data)
    const subArray = []

    const size = 6;
    for (let i = 0; i < Math.ceil(jumbledArray.length/size); i++){
      subArray[i] = jumbledArray.slice((i*size), (i*size) + size);
    }

    setSubArray(subArray)
  }, [])

  return (
    <div className={cn('cards__wrapper')}>
      <div className={cn('cards')}>
        { subarray &&
          subarray.map((array, i) => {
            if (showSubarray >= i) {
              return array.map((item, index) => {
                return <Card item={item} index={index} key={index} setShowModal={setShowModal} />
              })
            }
          })
        }
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className={cn('cards__modal')}>

          <div className={cn('cards__modal-wrapper')}>
            <p className={cn('cards__modal-text')}>
              {data[showModal - 1] && data[showModal - 1].description}
            </p>
            <div>
              <div className={cn('cards__modal-name')}>
                {data[showModal - 1] && data[showModal - 1].title}
              </div>
              <div className={cn('cards__modal-job')}>
                {data[showModal - 1] && data[showModal - 1].subtitle}
              </div>
            </div>
          </div>

          <div className={cn('cards__modal-btn')} onClick={() => setShowModal(0)} />
        </div>
      </Modal>

      {subarray && subarray.length > showSubarray + 1 && (

        <Button
          className={cn('cards__btn')}
          variant={'button-stroke-with-background'}
          onClick={() => setShowSubarray(showSubarray + 1)}
        >
          {btnText}
        </Button>

      )}
    </div>
  );
}

export default Cards;
