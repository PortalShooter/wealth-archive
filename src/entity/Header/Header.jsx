import React, {useEffect, useRef, useState} from 'react';

import {Logo} from '@/feature/Logo';
import {Nav} from '@/feature/Nav';
import {Link} from '@/feature/Link';
import {useBodyClass} from '@/hooks';
import {HeaderClose, HeaderHamburger} from '@/svgComponents';


// Styles
import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import {Container} from '@/feature/Container';
import {syncScroll} from '@/shared/scroll';
import {throttle} from '@/helpers';
import { useScrollInView } from '../../hooks';
import {useScrollLock} from '../../shared/scroll';

const cn = classnames.bind(styles);

function Hamburger({isMenuOpen = false, onClick}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="menu opener"
      aria-haspopup="menu"
      className={cn('header__menu-btn', {'header__menu-btn_menu-open': isMenuOpen})}
    >
      {isMenuOpen && <HeaderClose className={cn('header__close')}/>}
      {!isMenuOpen && <HeaderHamburger className={cn('header__hamburger')}/>}
    </button>
  );
}

function Header({page, data, className, menuClassName}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useBodyClass(cn({'menu-opened': isMenuOpen}));
  const scrollTop = useRef(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMenuSticky, setIsMenuSticky] = useState(false);
  const [isMounted,setIsMounted] = useState(false);
  const logoRef = useRef(null);
  const signInRef= useRef(null);
  const startMyPlanRef= useRef(null);
  useBodyClass(isHeaderHidden ? 'header-hidden' : '');
  if (!data) {
    return null;
  }
  const scrollLock = useScrollLock();

  const scrollHandler = throttle((ev) => {
    const eventScrollTop = ev?.target?.scrollTop ?? 0;
    const syncScrollTop = syncScroll.get().top;
    const newScrollTop = Math.max(syncScrollTop, eventScrollTop);
    const scrollDirection = scrollTop.current > newScrollTop ? 'top' : 'bottom';
    const isHidden = newScrollTop > 88 && scrollDirection === 'bottom';

    // control is header sticky
    setIsMenuSticky(newScrollTop > 0)

    setIsHeaderHidden(isHidden)

    scrollTop.current = newScrollTop;
  }, 300);

  useEffect(() => {
    setIsMounted(true);
    document.getElementById('__next').addEventListener('scroll', scrollHandler);
    syncScroll.subscribe(scrollHandler);

    return () => {
      document.getElementById('__next').removeEventListener('scroll', scrollHandler);
      syncScroll.unsubscribe(scrollHandler);
    };
  }, []);

  const {menu, bottomLinks: bottomLinksData, socials} = data;

  useEffect(() => {
    menu.push({
      page: {
        title: data.signIn?.linkText ?? '',
        uri: data.signIn?.url ?? '/',
        id: 'signup-mobile'
      },
    })
  }, [])


  const hamburgerProps = {
    isMenuOpen,
    setIsMenuOpen,
  };

  const bottomLinks = bottomLinksData.map((link) => (
    <li key={link._key} className={cn('header__privacy-elem')}>
      {
        link.isDownload && (
          <a href={link.url}
             className={cn('header__privacy-link')}
             target="_blank"
             download={link.downloadFileName ?? true}
          >
            {link.title}
          </a>
        )
      }
      {
        !link.isDownload && (
          <a href={link.url} className={cn('header__privacy-link')}>
            {link.title}
          </a>
        )
      }
    </li>
  ));

  const handleHamburgerClick = () => {
    if (!isMenuOpen) {
      scrollLock.lockScroll();
    } else {
      scrollLock.unlockScroll();
    }
    setIsMenuOpen((oldIsOpen) => !oldIsOpen);
  };

  return (
    <>
      <header style={{opacity:isMounted?1:0}} className={cn('header', {'header_sticky': isMenuSticky}, className)}>
        <Container className={cn('header__wrap', 'header__wrap_forced')}>
          <Logo logoRef={logoRef} isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} className={cn('header__logo',useScrollInView(logoRef).spawnAnimation)} />

          <div className={cn('header__menu', {header__menu_visible: isMenuOpen})}>
            {menu && <Nav menu={menu} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}
                          underlined={page.menuItemUnderline}/>}
            <div className={cn('header__menu-footer')}>
              {socials && (
                <ul className={cn('header__socials')}>
                  {socials.map(social => (
                      <li key={social.url} className={cn('header__socials-elem')}>
                        <a href={social.url}
                           target="_blank"
                           aria-label={social.url}
                           className={cn('header__socials-link')}
                        >
                          <div
                            dangerouslySetInnerHTML={{__html: social.icon.source}}
                            role="presentation"/>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              )}
              <ul className={cn('header__privacy')}>{bottomLinks}</ul>
            </div>
          </div>

          <div className={cn('header__right')}>
            <Link href={data.signIn?.url}
                  className={cn('header__sign-in', {'header__sign-in_ en': isMenuOpen}, menuClassName,useScrollInView(signInRef).spawnAnimation)}
            ref={signInRef}>
              {data.signIn?.linkText}
            </Link>
            <Link variant="button-stroke" href={'https://app.wealth.com/register'}
                  className={cn('header__start-plan',useScrollInView(startMyPlanRef).spawnAnimation)}
            ref={startMyPlanRef}>
              {/*{data.plan?.linkText}*/}
              Start My Plan
            </Link>
            <Hamburger className={cn('header__hamburger')} {...hamburgerProps} onClick={handleHamburgerClick}/>
          </div>
        </Container>
      </header>

      <div className={cn("header-shadow")}/>
    </>
  );
}

export default Header;
