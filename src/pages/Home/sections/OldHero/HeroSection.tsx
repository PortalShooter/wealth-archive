import { ReactElement, useRef, useCallback, useState, useEffect } from "react";

import { useResize, useElementResize } from "./shared/resize";
import { useCarousel } from "./shared/carousel";
import { useScrollTo } from "./shared/scroll/useScrollTo/useScrollTo";
import { getImgUrl, getImgSize } from 'src/shared/utils/sanity.utils';
import cn from "classnames";

import { Section } from "./feature/Section";
import { Container } from "./feature/Container";
import { Text, textStyles } from "./feature/Text";
import { Carousel } from "./shared/carousel";
import { Controls } from "./feature/Controls";
import { buttonStyles, buttonStylesGreen } from "./feature/button";
import { ModalFormControl } from "./modalForm/modalFormControl";
import { MODAL_ID } from "./modalForm/ModalForm";
import { carouselChildrenAnimation } from "./carouselChildrenAnimation";

import styles from "./HeroSection.module.scss";
import { HeroSectionData } from "./data/interface";

export interface HeroSection {
  (props: { page: HeroSectionData }): ReactElement;
}

export interface HeroCarouselElementProps {
  (props: {
    title?: string | null;
    id: string;
    ownId: string;
    image: {
      alt?: string | null;
      heroSrc: string | null;
    };
    index: number;
    elementRef?: React.RefObject<HTMLElement>;
    onMouseOver?: (evt: any) => void;
  }): ReactElement;
}

export interface SubHeroCarouselElementProps {
  (props: {
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    image: {
      alt?: string | null;
      subheroSrc?: string | null;
    };
    link?:string|null;
    buttonText?:string|null;
  }): ReactElement;
}

const CAROUSEL_ID_FIRST = "HeroSection__Carousel";
const CAROUSEL_ID_SECOND = "HeroSection__Carousel_Info";
const CAROUSEL_ALIGN = "center";

const isMouseEvent = (e: any): e is React.MouseEvent => {
  return typeof e.clientX !== "undefined";
};

const isTouchEvent = (e: any): e is React.TouchEvent => {
  return typeof e.touches !== "undefined" && e.touches.length === 1;
};

export const HeroCarouselElement: HeroCarouselElementProps = ({
                                                                title,
                                                                id,
                                                                image,
                                                                index,
                                                                elementRef,
                                                                ownId,
                                                                onMouseOver,
                                                              }) => {
  const scrollTo = useScrollTo();
  const carouselController = useCarousel();
  const mousePositionRef = useRef<[number, number]>([0, 0]);
  const mouseTimeoutRef = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent) => {
      if (isMouseEvent(e)) {
        mousePositionRef.current[0] = e.clientX;
        mousePositionRef.current[1] = e.clientY;
        mouseTimeoutRef.current = Date.now();
      } else {
        mousePositionRef.current[0] = e.touches[0].clientX;
        mousePositionRef.current[1] = e.touches[0].clientY;
        mouseTimeoutRef.current = Date.now();
      }
    },
    []
  );

  const handleMosueUp = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent) => {
      let dx = 0;
      let dt = 0;

      if (isMouseEvent(e)) {
        dx = Math.pow(
          Math.pow(e.clientX - mousePositionRef.current[0], 2) +
          Math.pow(e.clientY - mousePositionRef.current[1], 2),
          0.5
        );
        dt = Date.now() - mouseTimeoutRef.current;
      } else {
        dx = Math.pow(
          Math.pow(
            e.changedTouches[0].clientX - mousePositionRef.current[0],
            2
          ) +
          Math.pow(
            e.changedTouches[0].clientY - mousePositionRef.current[1],
            2
          ),
          0.5
        );
        dt = Date.now() - mouseTimeoutRef.current;
      }

      if (dx < 20 && dt < 200) {
        carouselController.carouselToIndex(id, index);
        carouselController.carouselToIndex(ownId, index);
        elementRef ? scrollTo.scrollToElement(elementRef) : null;
      }
    },
    []
  );

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMosueUp}
      onTouchStart={handleMouseDown}
      onMouseOver={onMouseOver}
      onTouchEnd={handleMosueUp}
      className={cn(styles.HeroCard)}
    >
      <Text className={cn(textStyles.white, styles.HeroCard__Text)}>
        {title && (
          <h2
            className={cn(
              textStyles.h3,
              textStyles.darkGreenColor,
              textStyles.reckless,
              styles.HeroCard__Text_Title
            )}
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        )}
      </Text>
      {image && (
        <div className={cn(styles.HeroCard__ImageWrap)}>
          <img
            className={cn(styles.HeroCard__Image)}
            src={getImgUrl(image.image) || ""}
            alt={image.alt || ""}
          />
        </div>
      )}
    </button>
  );
};

export const SubHeroCarouselElement: SubHeroCarouselElementProps = ({
                                                                      title,
                                                                      image,
                                                                      subtitle,
                                                                      description,
                                                                      buttonText = 'Start My Plan',
                                                                      link = '#',
                                                                    }) => {
  const windowSize = useResize();

  return (
    <div className={cn(styles.SubHeroCard)}>
      {windowSize.width < 1200 && title && (
        <h3
          className={cn(
            textStyles.h2,
            textStyles.reckless,
            textStyles.darkGreenColor,
            styles.SubHeroCard__Title
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
      )}
      <div className={cn(styles.SubHeroCard__Info)}>
        <Text className={cn(textStyles.white, styles.SubHeroCard__Text)}>
          {windowSize.width > 1199 && title && (
            <h3
              className={cn(
                textStyles.h2,
                textStyles.reckless,
                textStyles.darkGreenColor,
                styles.SubHeroCard__Title
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            ></h3>
          )}
          {subtitle && (
            <h4
              className={cn(
                textStyles.h3,
                textStyles.darkGreenColor,
                textStyles.neue,
                styles.SubHeroCard__SubTitle
              )}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></h4>
          )}
          {description && (
            <p
              className={cn(
                textStyles.bodyText,
                textStyles.neue,
                textStyles.blackColor,
                styles.SubHeroCard__Description
              )}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          )}
        </Text>
        {windowSize.width < 1200 && image && (
          <div className={cn(styles.SubHeroCard__ImageWrap)}>
            <img
              src={getImgUrl(image.image) || ""}
              alt={image.alt || ""}
              className={cn(styles.SubHeroCard__Image)}
            />
          </div>
        )}
        {windowSize.width >= 1200 && (
          <a
            href={link}
            className={cn(
              buttonStyles.Button,
              buttonStylesGreen.Button_Green,
              styles.SubHeroCard__Button
            )}
            target="_blank"
          >
            {buttonText}
          </a>
        )}
      </div>

      {windowSize.width > 1199 && image && (
        <div className={cn(styles.SubHeroCard__ImageWrap)}>
          <img
            src={getImgUrl(image.image) || ""}
            alt={image.alt || ""}
            width={336}
            height={376}
            className={cn(styles.SubHeroCard__Image)}
          />
        </div>
      )}
      {windowSize.width < 1200 && (
        <a
          href={link}
          className={cn(
            buttonStyles.Button,
            buttonStylesGreen.Button_Green,
            styles.SubHeroCard__Button
          )}
        >
          {buttonText}
        </a>
      )}
    </div>
  );
};

export const HeroSection: HeroSection = ({ page }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const carouselSecondRef = useRef(null);
  const windowSize = useResize();
  const [middle, setMiddle] = useState(0);
  const heroCards = [] as any[];
  const subHeroCards = [] as any[];
  const containerSize = useElementResize(containerRef.current);
  const header = useRef(null);

  const onMouseOver = (evt: any) => {
    setMiddle(-1);
  };

  for (let i = 0; i < page.carousel.length; i++) {
    const heroItems = [page.carousel[i]].map((item) => {
      return (
        <HeroCarouselElement
          id={CAROUSEL_ID_SECOND}
          ownId={CAROUSEL_ID_FIRST}
          title={item.title}
          image={item.cardimage}
          index={i}
          elementRef={carouselSecondRef}
          key={`${page.carousel[i].cardimage.alt}-${i}`}
          onMouseOver={onMouseOver}
        />
      );
    });

    heroCards.push(
      <div
        key={`${page.carousel[i].image.alt}=${i}`}
        className={cn(styles.HeroCarousel__Item, {
          [styles.HeroCarousel__Item_hovered]: middle === i,
        })}
      >
        {heroItems}
      </div>
    );

    const subHeroItems = [page.carousel[i]].map((item) => {
      return (
        <SubHeroCarouselElement
          title={item.title}
          image={item.image}
          subtitle={item.subtitle}
          description={item.description}
          buttonText={item.buttonText}
          link={item.link}
          key={`${i}-${page.carousel[i].image.title}`}
        />
      );
    });

    subHeroCards.push(
      <div
        key={`${i}=${page.carousel[i].image.title}`}
        className={cn(styles.SubHeroCarousel__Item)}
        ref={(elementRef) => {
          if (itemRefs) {
            itemRefs.current[i] = elementRef;
          }
        }}
      >
        {subHeroItems}
      </div>
    );
  }

  useEffect(() => {
    const centerElementIndex =
      ((page.carousel.length - 1) / 2) % 0
        ? (page.carousel.length - 1) / 2
        : Math.floor((page.carousel.length - 1) / 2) + 1;

    setMiddle(CAROUSEL_ALIGN === "center" ? 0 : centerElementIndex);
  }, []);

  return (
    <>
      <Section className={cn(styles.HeroSection)}>
        <Container className={cn(styles.HeroContainer)}>
          <Text className={cn(textStyles.Text_alignCenter, styles.Text)}>
            <h1
              className={cn(
                textStyles.h1,
                textStyles.reckless,
                textStyles.whiteColor,
                styles.Title
              )}
            >

               <span
                 key={page.title.title}
                 className={cn(textStyles.h1_Part, styles.h1_Part)}
               >
                    {page.title.title}
                  </span>
              <span
                key={page.title.accentPhrase}
                className={cn(textStyles.h1_Part, styles.h1_Part)}
              >
                    {page.title.accentPhrase}
                  </span>
            </h1>
            <p
              className={cn(
                textStyles.bodyText,
                textStyles.neue,
                textStyles.white,
                styles.Subtitle
              )}
              dangerouslySetInnerHTML={{ __html: page.subtitle }}
            ></p>
          </Text>
          <div className={styles.CarouselWrapper}>
            <Carousel
              className={cn(styles.HeroCarousel)}
              id={CAROUSEL_ID_FIRST}
              mode="continuous"
              ariaLabel={'Hero Carousel'}
              padding={
                windowSize.width < 1199
                  ? 4
                  : (windowSize.width - containerSize.width) / 2
              }
              paddingUnits={windowSize.width < 1199 ? "%" : "px"}
              inertionCorrection={windowSize.width > 1199 ? false : true}
              itemWidth={windowSize.width > 1199 ? 180 : 176}
              resizeElements={false}
              gap={15}
              align={CAROUSEL_ALIGN}
            >
              {heroCards}
            </Carousel>
          </div>
          <Controls
            color="green"
            id={CAROUSEL_ID_FIRST}
            mode={windowSize.width > 1199 ? "%" : "index"}
            controlValue={windowSize.width > 1199 ? 50 : 1}
            className={cn(styles.HeroSection__Controls)}
            arialabel={'Hero Carousel Controls'}
            onPress={() => {
              setMiddle(-1);
            }}
          />
        </Container>
      </Section>

      <Section className={cn(styles.SubHeroSection)}>
        <Container className={cn(styles.SubHeroContainer)}>
          <div className={styles.CarouselWrapper} ref={carouselSecondRef}>
            <Carousel
              className={cn(styles.SubHeroCarousel)}
              id={CAROUSEL_ID_SECOND}
              mode="continuous"
              ariaLabel={'subHero Carousel'}
              padding={
                windowSize.width < 1199
                  ? 4
                  : (windowSize.width - containerSize.width) / 2
              }
              paddingUnits={windowSize.width < 1199 ? "%" : "px"}
              inertionCorrection={true}
              itemWidth={
                windowSize.width > 1199
                  ? 1072
                  : windowSize.width > 767
                    ? 590
                    : 590
              }
              resizeElements={windowSize.width > 767 ? false : true}
              gap={
                windowSize.width > 1920
                  ? 328
                  : windowSize.width > 1199
                    ? 80
                    : windowSize.width > 767
                      ? 63
                      : 30
              }
              align="center"
              childrenAnimationFunction={(options) => {
                carouselChildrenAnimation({ ...options, header });
              }}
            >
              {subHeroCards}
            </Carousel>
          </div>
          <Controls
            color="lightGreen"
            id={CAROUSEL_ID_SECOND}
            mode="index"
            controlValue={1}
            className={cn(styles.SubHeroSection__Controls)}
            arialabel={'subHero Carousel Controls'}
          />
        </Container>
      </Section>
    </>
  );
};
