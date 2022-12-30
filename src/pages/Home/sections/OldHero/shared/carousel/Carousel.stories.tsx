import Readme from "!raw-loader!./README.md";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import React, { useRef } from "react";
import { Carousel, CarouselControl } from ".";
import cat from "@/stories/assets/cat.jpg";
import { useScrollTrigger } from "../scroll";
import styles from "./Carousel.stories.module.css";
import {
  bounceTriggerAnimation
} from "./CarouselMain/animations/trigger";
import { childrenAnimationFlipBySpeed } from "./CarouselMain/animations/children/childrenAnimationFlipBySpeed";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/Carousel",
  component: Carousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    readme: {
      sidebar: Readme,
    },
  },
} as ComponentMeta<typeof Carousel>;

const Cards = () => {
  var elements = [];
  for (var i = 0; i < 8; i++) {
    const key = Math.random();

    elements.push(
      <div key={key} className={styles.Card}>
        <img className={styles.Card__Image} width={350} src={cat.toString()} />
        <p className={styles.Card__Text} >Some kind of card description that describes something in human language</p>
      </div>
    );
  }
  return elements;
};

const CardsWithButtons = () => {
  var elements = [];
  for (var i = 0; i < 8; i++) {
    const key = Math.random();
    elements.push(
      <div key={key} className={styles.Card}>
        <img className={styles.Card__Image} width={350} src={cat.toString()} />
        <button className={styles.Card__Button}>Button</button>
      </div>
    );
  }
  return elements;
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Carousel> = (args) => {
  const randomId = "carousel_" + Math.random();
  return (
    <div className={styles.Container}>
      <Carousel {...args} id={randomId}>
        {Cards()}
      </Carousel>
    </div>
  );
};

const TemplateWithButtons: ComponentStory<typeof Carousel> = (args) => {
  const randomId = "carousel_" + Math.random();
  return (
    <div className={styles.Container}>
      <Carousel
        className={styles.Carousel}
        {...args}
        id={randomId}
      >
        {CardsWithButtons()}
      </Carousel>
    </div>
  );
};

const TemplateWithControls: ComponentStory<typeof Carousel> = (args) => {
  const carouselId = "carousel_with_controls";
  return (
    <div className={styles.Container}>
      <Carousel
        className={styles.Carousel}
        {...args}
        id={carouselId}
      >
        {Cards()}
      </Carousel>
      <div className={styles.Controls}>
        <CarouselControl
          className={classNames(
            styles.Controls__Button,
            styles.Controls__Button_Left
          )}
          id={carouselId}
          scrollValue={-100}
          scrollUnits="%"
          aria-label="Scroll left"
        >
          Scroll Left
        </CarouselControl>
        <CarouselControl
          className={classNames(
            styles.Controls__Button,
            styles.Controls__Button_Right
          )}
          id={carouselId}
          scrollValue={100}
          scrollUnits="%"
          aria-label="Scroll right"
        >
          Scroll Right
        </CarouselControl>
      </div>
    </div>
  );
};

const TemplateForAnimations: ComponentStory<typeof Carousel> = (args) => {
  const CarouselWrapperRef = useRef(null);
  const CarouselWrapperTriggered = useScrollTrigger(CarouselWrapperRef);
  const randomId = "carousel_" + Math.random();

  return (
    <div
      className={styles.Container}
      style={{
        paddingBottom: "300px",
      }}
    >
      <div ref={CarouselWrapperRef}>
        <Carousel
          {...args}
          id={randomId}
          triggered={CarouselWrapperTriggered}
        >
          {Cards()}
        </Carousel>
      </div>
    </div>
  );
};

const TemplateForChildrenAnimations: ComponentStory<typeof Carousel> = (args) => {
  const randomId = "carousel_" + Math.random();

  return (
    <>
      <div className={styles.Container}>
          <Carousel
            {...args}
            id={randomId}
          >
            {Cards()}
          </Carousel>
      </div>
    </>
  );
};

const TemplateDifferentSizesOfChildren: ComponentStory<typeof Carousel> = (args) => {
  const randomId = "carousel_" + Math.random();
  return (
    <div className={styles.Container}>
      <Carousel {...args} id={randomId}>
        <div className={styles.Card}>
          <img className={styles.Card__Image} width={150} height={150} src={cat.toString()} />
          <p className={styles.Card__Text} >Some kind of cat...</p>
        </div>
        <div className={styles.Card}>
          <img className={styles.Card__Image} width={200} height={350} src={cat.toString()} />
          <p className={styles.Card__Text} >Some kind of card description that describes something in human language</p>
        </div>
        <div className={styles.Card}>
          <img className={styles.Card__Image} width={150} height={450} src={cat.toString()} />
          <p className={styles.Card__Text} >Some kind of card description that describes something in human language</p>
        </div>
        <div className={styles.Card}>
          <img className={styles.Card__Image} width={150} height={250} src={cat.toString()} />
          <p className={styles.Card__Text} >Some kind of card description that describes something in human language</p>
        </div>
        <div className={styles.Card}>
          <img className={styles.Card__Image} width={100} height={250} src={cat.toString()} />
          <p className={styles.Card__Text} >Some kind of card description that describes something in human language</p>
        </div>
        <div className={styles.Card}>
          <img className={styles.Card__Image} width={150} height={250} src={cat.toString()} />
          <p className={styles.Card__Text} >Some kind of card description that describes something in human language</p>
        </div>
        <div className={styles.Card}>
          <img className={styles.Card__Image} width={200} height={200} src={cat.toString()} />
          <p className={styles.Card__Text} >Some kind of card description that describes something in human language</p>
        </div>
      </Carousel>
    </div>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Continuous = Template.bind({});
Continuous.storyName = `mode: "continuous"`;
Continuous.args = {
  mode: "continuous",
};

export const Controlls_And_Interactive_Never = TemplateWithControls.bind({});
Controlls_And_Interactive_Never.storyName = `Controlls & interactive: "never"`;
Controlls_And_Interactive_Never.args = {
  interactive: "never",
};

export const Gap_100_And_Align_Center = Template.bind({});
Gap_100_And_Align_Center.storyName = `gap: 100 & align: "center"`;
Gap_100_And_Align_Center.args = {
  gap: 100,
  align: "center"
};

export const ResizeElements_False = TemplateDifferentSizesOfChildren.bind({});
ResizeElements_False.storyName = "resizeElements: false";
ResizeElements_False.args = {
  resizeElements: false,
  gap: 0,
  itemWidth: 200
};

export const ElementsPerScreenByBreakpoints = Template.bind({});
ElementsPerScreenByBreakpoints.storyName = `Elements per screen by breakpoints`;
ElementsPerScreenByBreakpoints.args = {
  elementsPerScreen: [
    {
      breakpoint: 320,
      number: 2,
    },
    {
      breakpoint: 640,
      number: 3,
    },
    {
      breakpoint: 1024,
      number: 5,
    },
    {
      breakpoint: 1500,
      number: 6,
    },
    {
      breakpoint: 1800,
      number: 8,
    },
  ],
};

export const inertionDecay = TemplateWithButtons.bind({});
inertionDecay.storyName = `inertionDecay: number  `;
inertionDecay.args = {
  inertionDecay: 32,
  mode: "continuous",
};

export const inertionInterpolationFunction_Custom = Template.bind({});
inertionInterpolationFunction_Custom.storyName = "inertionInterpolationFunction";
inertionInterpolationFunction_Custom.args = {
  inertionInterpolationFunction: function (value, targetValue, inertionDecay) {
    // Do something with these args and return a number
    console.log(
      "inertionInterpolationFunction:",
      value,
      targetValue,
      inertionDecay
    );

    return 0.5;
  },
};

export const InertionCorrection = Template.bind({});
InertionCorrection.storyName = "inertionCorrection: true";
InertionCorrection.args = {
  inertionCorrection: true,
};


export const AnimationBounce = TemplateForAnimations.bind({});
AnimationBounce.storyName = "triggerFunction: bounceTriggerAnimation";
AnimationBounce.args = {
  triggerFunction: bounceTriggerAnimation,
  elementsPerScreen: [
    {
      breakpoint: 320,
      number: 4,
    },
    {
      breakpoint: 640,
      number: 4,
    },
    {
      breakpoint: 1024,
      number: 6,
    },
    {
      breakpoint: 1500,
      number: 6,
    },
    {
      breakpoint: 1800,
      number: 8,
    },
  ],
};

export const ChildrenAnimation3d = TemplateForChildrenAnimations.bind({});
ChildrenAnimation3d.storyName = "childrenAnimationFunction: depend on speed";
ChildrenAnimation3d.args = {
  childrenAnimationFunction: (options) => {
    childrenAnimationFlipBySpeed({...options});
  },
  mode: "continuous",
  elementsPerScreen: [
    {
      breakpoint: 320,
      number: 2,
    },
    {
      breakpoint: 640,
      number: 3,
    },
    {
      breakpoint: 1024,
      number: 4,
    },
  ],
};
