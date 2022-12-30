import React, {useLayoutEffect, useEffect, useState, useRef, useCallback} from 'react';
import Cookies from 'js-cookie';
import {getImgUrl, getImgSize} from 'src/shared/utils/sanity.utils';
import {useWindowSize} from '@/hooks';

import {Button} from '../feature/button';
import {Modal, ModalControl} from '../shared/modal';
import {useResize} from '../shared/resize';
import {textStyles} from '../feature/Text';
import {modalController, useModal} from '../shared/modal/useModal';
import {ModalFormState} from './useModalForm';
import BtnBack from './BtnBack';

import {hsFormStyles} from './HSFormStyles';
import cn from 'classnames';
import styles from './ModalForm.module.scss';

export const MODAL_ID = 'FORM_Modal';
const HUBSPOT_SRC = 'https://js.hsforms.net/forms/v2.js';

const TEAM_REGION = 'na1';
const TEAM_PORTAL_ID = '9450632';
const TEAM_ID = '8a91b92f-7d2c-4bae-8c4a-4524fdb48304';

const FINANCIAL_REGION = 'na1';
const FINANCIAL_PORTAL_ID = '9450632';
const FINANCIAL_ID = '9b6b731f-c4e7-4f36-9bbd-cd946d19869a';

const PERSONAL_REGION = 'na1';
const PERSONAL_PORTAL_ID = '9450632';
const PERSONAL_ID = '85f0e111-bd90-4203-84f5-1e4dc5430789';

const REPORT_REGION = 'na1';
const REPORT_PORTAL_ID = '9450632';
const REPORT_ID = 'e98eb845-4f44-406e-ba9d-3b11e6547a1f';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export const ModalForm = ({page}) => {
  const windowSize = useResize();
  const {windowWidth} = useWindowSize();
  const modalState = useModal().active.indexOf(MODAL_ID) !== -1;
  const initModal = useModal().groups.DEFAULT.initialModal;

  const [isLoaded, setIsLoaded] = useState(false);
  const parameterSetRef = useRef(false);
  const parameterIntervalRef = useRef(0);

  const containerRef = useRef(null);
  const tabRepeater = useRef(null);
  const closeRef = useRef(null);
  const btnBackRef = useRef(null);

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showFinancialForm, setShowFinancialForm] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  const getURLParameter = (name) => {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  const getUtmParameters = useCallback(() => {
    if (parameterSetRef.current || typeof window === 'undefined') {
      return;
    }

    const frames = document.querySelectorAll('iframe');
    if (!frames || !frames.length) {
      return;
    }

    setIsLoaded(true);
    setFormSuccess(false);
    parameterSetRef.current = true;
    window.clearInterval(parameterIntervalRef.current);

    frames.forEach((frame) => {
      if (!frame.contentDocument) {
        return
      }

      const {head, body: content} = frame.contentDocument;
      head.innerHTML += hsFormStyles();

      UTM_PARAMS.forEach((param) => {
        const URLParameter = getURLParameter(param);

        if (URLParameter) {
          Cookies.set(param, URLParameter, {
            expires: 90,
          });
        }

        if (content) {
          assignCookieValueToFormInput(param, content);
        }
      });
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    tabRepeater.current?.addEventListener('focus', () => {
      closeRef.current?.focus();
    });
  }, []);

  const assignCookieValueToFormInput = (fieldParam, content) => {
    const input = content.querySelector(`.hs-input[name="${fieldParam}"]`);
    const cookie = Cookies.get(fieldParam);
    if (input && cookie) {
      input.value = cookie;
    }
  };

  const loadJQuery = () => {
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    const scriptsOnPage = document.getElementsByTagName('script');
    const scriptsWithSameSrc = Array.from(scriptsOnPage).filter((item) => item.src === script.src);
    if (scriptsWithSameSrc.length === 0) {
      document.body.appendChild(script);
    }
  }

  const onFormReady = useCallback(() => {
    parameterIntervalRef.current = window.setInterval(() => {
      getUtmParameters();
    }, 1000);

    return () => {
      window.clearInterval(parameterIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!modalState) {
      setShowTeamForm(false);
      setShowFinancialForm(false);
      setShowPersonalForm(false);
      setShowReportForm(false);
      setFormSuccess(false);
    }
  }, [modalState]);

  useEffect(() => {
    if (initModal === 1) {
      setShowTeamForm(true);
      setShowFinancialForm(false);
      setShowPersonalForm(false);
      setShowReportForm(false);
    }
    if (initModal === 2) {
      setShowTeamForm(false);
      setShowFinancialForm(true);
      setShowPersonalForm(false);
      setShowReportForm(false);
    }
    if (!initModal) {
      setShowTeamForm(false);
      setShowFinancialForm(false);
      setShowPersonalForm(false);
      setShowReportForm(false);
    }
  }, [modalState]);

  useEffect(() => {
    document.addEventListener('keydown', (ev) => {
      if (ev.code === 'Escape') {
        modalController.close(MODAL_ID);
        document.body.classList.remove('modal-opened');
        window.scrollTo({top: document.body.getAttribute('scrollY'), behavior: 'instant'});
      }
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    loadJQuery();

    const script = document.createElement('script');

    const onSubmit = () => {
      setFormSuccess(true);
      setShowFinancialForm(false);
      setShowPersonalForm(false);
      setShowReportForm(false);
      setShowTeamForm(false);
    };
    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: TEAM_REGION,
          portalId: TEAM_PORTAL_ID,
          formId: TEAM_ID,
          target: '#teamForm',
          onFormReady: () => onFormReady(),
          onFormSubmitted: onSubmit,
        });

        window.hbspt.forms.create({
          region: FINANCIAL_REGION,
          portalId: FINANCIAL_PORTAL_ID,
          formId: FINANCIAL_ID,
          target: '#financialForm',
          onFormReady: ()=>onFormReady(),
          onFormSubmitted: onSubmit,
        });

        // (window as any).hbspt.forms.create({
        //   region: PERSONAL_REGION,
        //   portalId: PERSONAL_PORTAL_ID,
        //   formId: PERSONAL_ID,
        //   target: "#personalForm",
        //   onFormReady: onFormReady('),
        //   onFormSubmitted: onSubmit,
        // });

        window.hbspt.forms.create({
          region: REPORT_REGION,
          portalId: REPORT_PORTAL_ID,
          formId: REPORT_ID,
          target: '#reportForm',
          onFormReady: ()=>onFormReady(),
          onFormSubmitted: onSubmit,
        });
      }
    });

    script.src = HUBSPOT_SRC;
    document.body.appendChild(script);
  }, []);

  const handleClick = useCallback((e) => {
    if (!containerRef.current) return;
    if (!containerRef.current.contains(e.target) && !btnBackRef.current.contains(e.target)) {
      if (windowWidth > 980) {
        modalController.close(MODAL_ID);
        document.body.classList.remove('modal-opened');
        window.scrollTo({top: document.body.getAttribute('scrollY'), behavior: 'instant'});
      }
    }
  }, []);

  let title = '';
  if (showTeamForm) {
    title = 'I want our company to offer an estate planning benefit.';
  } else if (showFinancialForm) {
    title = 'I want to add unique value to my clients’ financial planning.';
  } else if (showPersonalForm || ModalFormState.personal) {
    title = 'I want an estate plan.';
  } else {
    title = page.title;
  }

  return (
    <Modal className={styles.Modal} activeClassName={styles.Active} id={MODAL_ID}>
      <div role="dialog" onClick={handleClick} className={styles.Overflow}>
        <div className={styles.Inner}>
          <div ref={containerRef} className={styles.Container}>
            <div
              className={cn(
                styles.Block,
                formSuccess && styles.Success,
                !(showTeamForm || showFinancialForm || showPersonalForm || showReportForm || formSuccess) &&
                styles.Block_center
              )}
            >
              <div className={cn(styles.Item)}>

                <ModalControl ariaLabel="Modal close." className={styles.Close} id={MODAL_ID} action="close-all"/>
                <div
                  style={{
                    left: '50%',
                    zIndex: 10,
                    display: `${showTeamForm || showFinancialForm || showPersonalForm ? 'block' : 'none'}`,
                  }}
                  ref={btnBackRef}
                  role="button"
                  onClick={() => {
                    setShowFinancialForm(false);
                    setShowPersonalForm(false);
                    setShowTeamForm(false);
                  }}
                >
                  <BtnBack/>
                </div>

                {!formSuccess && page.title && (
                  <h2
                    className={cn(textStyles.h2, textStyles.darkGreenColor, textStyles.reckless, styles.Title)}
                    dangerouslySetInnerHTML={{__html: title}}
                  />
                )}

                {page.image && (
                  <div className={cn(styles.ImageWrapper)}>
                    <img
                      className={cn(styles.Image)}
                      src={formSuccess ? getImgUrl(page.successImage.image) : getImgUrl(page.image.image) || ''}
                      alt={page.image.alt || ''}
                    />
                  </div>
                )}
              </div>

              <div className={styles.Item}>
                {!ModalFormState.personal && !ModalFormState.report && (
                  <div
                    className={cn(
                      styles.ButtonsWrapper,
                      isLoaded &&
                      (showTeamForm || showFinancialForm || showPersonalForm || showReportForm || formSuccess) &&
                      styles.ButtonsWrapper_Hide
                    )}
                  >
                    <div className={styles.ButtonWrapper}>
                      <Button
                        className={styles.Button}
                        type='green'
                        aria-label="Open Form For Companies"
                        onClick={() => {
                          setShowTeamForm(true);
                          setShowFinancialForm(false);
                          setShowPersonalForm(false);
                          setShowReportForm(false);
                        }}
                      >
                        For companies
                      </Button>
                    </div>
                    <div className={styles.ButtonWrapper}>
                      <Button
                        className={styles.Button}
                        type='green'
                        aria-label="Open Form For Financial Advisors"
                        onClick={() => {
                          setShowTeamForm(false);
                          setShowFinancialForm(true);
                          setShowPersonalForm(false);
                          setShowReportForm(false);
                        }}
                      >
                        For financial advisors
                      </Button>
                    </div>
                    <div className={styles.ButtonWrapper}>
                      <Button
                        className={styles.Button}
                        type='green'
                        aria-label="Open Form For Personal Use"
                        onClick={() => {
                          setShowTeamForm(false);
                          setShowFinancialForm(false);
                          setShowPersonalForm(true);
                          setShowReportForm(false);
                        }}
                      >
                        Support
                      </Button>
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    styles.Form,
                    isLoaded && showTeamForm && !ModalFormState.personal && !ModalFormState.report && styles.Form_Active
                  )}
                  id="teamForm"
                >
                  <p
                    className={cn(textStyles.bodyText, textStyles.neue, styles.FormText)}
                    dangerouslySetInnerHTML={{
                      __html: 'Get in touch to&nbsp;learn more about Wealth as&nbsp;an&nbsp;employee benefit.',
                    }}
                  />
                </div>

                <div
                  className={cn(
                    styles.Form,
                    isLoaded && showFinancialForm && !ModalFormState.personal && !ModalFormState.report && styles.Form_Active
                  )}
                  id="financialForm"
                >
                  <p
                    className={cn(textStyles.bodyText, textStyles.neue, styles.FormText)}
                    dangerouslySetInnerHTML={{
                      __html: 'Get in touch to learn more about Wealth for financial advisors.',
                    }}
                  />
                </div>

                <div
                  className={cn(
                    styles.Form,
                    (isLoaded && showPersonalForm && styles.Form_Active) ||
                    (isLoaded &&
                      ModalFormState.personal &&
                      !ModalFormState.report &&
                      !formSuccess &&
                      styles.Form_Active)
                  )}
                  id="personalForm"
                >
                  <div className={cn(styles.Contacts)}>
                    <p className={cn(styles.Contacts__title)}>{page.support.title}</p>

                    {page.support.contacts.map((contact) => {
                      return (
                        <div key={contact.contactTitle} className={cn(styles.Contacts__contact)}>
                          <div
                            dangerouslySetInnerHTML={{__html: contact.contactTitle}}
                            className={cn(styles.Contacts__contact_title)}
                          />

                          {contact.contactTitle && contact.contactTitle.toLowerCase() === 'email' && (
                            <a
                              dangerouslySetInnerHTML={{__html: contact.contactInfo}}
                              href={`mailto:${contact.contactInfo}`}
                              className={cn(styles.Contacts__contact_link)}
                            />
                          )}

                          {contact.contactTitle && contact.contactTitle.toLowerCase() === 'phone' && (
                            <a
                              dangerouslySetInnerHTML={{__html: contact.contactInfo}}
                              href={`tel:${contact.contactInfo.replace(/\D/g, '')}`}
                              className={cn(styles.Contacts__contact_link)}
                            />
                          )}

                          {!contact.contactTitle ||
                            (contact.contactTitle.toLowerCase() !== 'email' &&
                              contact.contactTitle.toLowerCase() !== 'phone' && (
                                <div
                                  dangerouslySetInnerHTML={{__html: contact.contactInfo}}
                                  className={cn(styles.Contacts__contact_info)}
                                />
                              ))}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={cn(
                    styles.Form,
                    (isLoaded && showReportForm && styles.Form_Active) ||
                    (isLoaded && ModalFormState.report && !formSuccess && styles.Form_Active)
                  )}
                  id="reportForm"
                >
                  <p
                    className={cn(textStyles.bodyText, textStyles.neue, styles.FormText)}
                    dangerouslySetInnerHTML={{
                      __html: 'Join the waitlist to&nbsp;get early access to&nbsp;Wealth.',
                    }}
                  />
                </div>
                {isLoaded && formSuccess && (
                  <div className={cn(styles.SuccessText)}>
                    <p
                      className={cn(textStyles.h2, textStyles.reckless, textStyles.darkGreenColor, styles.SuccessTitle)}
                      dangerouslySetInnerHTML={{
                        __html: page.successTitle,
                      }}
                    />
                    <div className={cn(textStyles.neue, textStyles.darkGreyColor, styles.SuccessLink)}>
                      <span>Please reach out to </span>
                      <a href="mailto:support@wealth.com">support@wealth.com</a>
                      <span> for guidance.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={cn(styles.TabRepeater)} tabIndex={0} ref={tabRepeater}/>
          </div>
        </div>
      </div>
    </Modal>
  );
};
