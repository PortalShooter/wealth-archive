import React, {useEffect, useRef} from 'react';

import classnames from 'classnames/bind';
import {useScrollLock} from '../../../../shared/scroll';
import styles from './Modal.module.scss';
const cn = classnames.bind(styles);


function Modal({children, showModal, setShowModal}) {
  const scrollLock = useScrollLock()

  useEffect(() => {
    if (!showModal) {
      //document.body.classList.remove('modal-opened')
      scrollLock.unlockScroll()
    } else {
      scrollLock.lockScroll()
      //document.body.classList.add('modal-opened')
    }
  }, [showModal]);

  const modalRef = useRef(null)

  if (!showModal) {
    return null
  }

  return (
    <div ref={modalRef} className={cn('modal__overlay')} onClick={(e) => {
      if (modalRef.current === e.target) {
        setShowModal(0)
      }
    }}>
      {children}
    </div>
  );
}

export default Modal;
