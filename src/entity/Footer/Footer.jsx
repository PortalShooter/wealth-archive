import React from 'react';
import {Container} from "@/feature/Container";
import {Logo} from '@/feature/Logo';
import {Link} from "@/feature/Link";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { modalController } from '@/pages/Home/sections/OldHero/shared/modal/useModal';
import { MODAL_ID } from '@/pages/Home/sections/OldHero/modalForm/ModalForm';
import { defaultModalGroupOptions } from '@/pages/Home/sections/OldHero/shared/modal/defaults';

const cn = classNames.bind(styles);

const handleClick = () => {
  modalController.open(MODAL_ID, defaultModalGroupOptions["groupId"]);
  document.body.setAttribute('scrollY', window.pageYOffset)
  document.body.style.top = `-${document.body.getAttribute('scrollY')}px`
  document.body.classList.add('modal-opened')
};

function AboutSection({data}) {
  return (
    <div className={cn('about')}>
      <p className={cn('about__address')}>
        {data?.address?.firstString} <br/> {data?.address?.secondString}
      </p>
      <Link variant="text-secondary" className={cn('about__mail')} href={`mailto:${data.email}`}>{data.email}</Link>
    </div>
  )
}

function SocialsSection({socialsData, data}) {
  const {socialsItems} = socialsData
  const socialsComponents = (
    <>
      {
        socialsItems?.map((social) => {
          return (
            <Link key={social._key}
                  href={social.url}
                  target="_blank"
                  className={cn('socials__icon')}
                  aria-label={social.url}
            >
              <div dangerouslySetInnerHTML={{__html: social.icon.source}} role="presentation"/>
            </Link>
          )
        })
      }
    </>
  )

  return (
    <div>
      <div className={cn('socials')}>
        <p className={cn('footer__title')}>{socialsData.title}</p>
        <div className={cn('socials__icons')}>
          {socialsComponents}
        </div>
      </div>
    </div>
  )
}

function LinksSection({links}) {
  return (
    <div className={cn('footer__links')}>
      {links?.map((section,index) => {
        return <div key={section._key} className={cn('footer__links-section', 'links-section')}>
          <div className={cn('footer__title', 'links-section__title')}>
            {section.title}
          </div>

          <ul>
          {section.list.map((link) => (
              <li key={link._key}>
                <Link variant="text-secondary" href={link.url} className={cn('links-section__link')}>
                  {link.text}
                </Link>
              </li>
            )
          )}
            <li>
              {index === 1 && <button onClick={handleClick} className={cn('link','link_text-secondary','links-section__link')} type="button">
                Contact Us
              </button>}
            </li>
          </ul>
        </div>
      })}
    </div>
  )
}

function PrivacySection({data}) {
  return (
    <div className={cn('privacy')}>
      <p className={cn('privacy__inscription')}>{data?.copyright}</p>
      <div className={cn('privacy__links')}>
        {data?.links.map((link) => {
          if (link.isDownload) {
            return <Link variant="text-secondary"
                         href={link.url}
                         target="_blank"
                         key={link._key}
                         className={cn('privacy__link')}
                         download={link.downloadFileName ?? true}
            >
              {link.title}
            </Link>
          }

          return <Link variant="text-secondary"
                       href={link.url}
                       key={link._key}
                       className={cn('privacy__link')}
                       target="_blank"
          >
            {link.title}
          </Link>
        })}
      </div>
    </div>
  )
}

function MainSection({data}) {
  return (
    <div className={cn("footer__main")}>
      <div className={cn('footer__logo')}>
        <Logo isFooter/>
      </div>
      <div className={cn('footer__body')}>
        <AboutSection data={data}/>
        <LinksSection links={data?.links}/>
        <SocialsSection socialsData={data?.socials} data={data}/>
      </div>
      <div className={cn('footer__separator')}/>
      <PrivacySection data={data?.privacy}/>
    </div>
  )
}

export const Footer = ({page, data, className}) => {
  return <footer className={cn("footer", className)}>
    <Container className={cn("footer__container")}>
      <MainSection data={data}/>
    </Container>
  </footer>;
};
