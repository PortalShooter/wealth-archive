import React, { useRef, useCallback, useEffect, useState } from "react";

import Readme from "!raw-loader!./README.md";
import ReadmeUseScroll from "!raw-loader!./useScroll/README.md";
import ReadmeSyncScroll from "!raw-loader!./syncScroll/README.md";
import ReadmeUseScrollTrigger from "!raw-loader!./useScrollTrigger/README.md";
import ReadmeUseScrollTo from "!raw-loader!./useScrollTo/README.md";
import ReadmeUseScrollLock from "!raw-loader!./useScrollLock/README.md";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import styles from "./Scroll.stories.module.css";
import { useScrollTrigger, useScroll, syncScroll, useScrollLock } from "./";
import { useScrollTo } from "./useScrollTo";
import cat from "../../stories/assets/cat.jpg";
import classNames from "classnames";

const Block = ({ id, children }: any) => {
  return (
    <div id={id} className={styles.Block}>
      {children}
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/Scroll",
  component: Block,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    readme: {
      sidebar: Readme,
    },
  },
} as ComponentMeta<typeof Block>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TemplateUseScrollTrigger: ComponentStory<typeof Block> = (args) => {
  // Create reference to an element
  const ImageRef = useRef(null);

  // Pass Ref of element to useScrollTrigger with optional offset parameters
  // useScrollTrigger returns type boolean
  const ImageTriggered = useScrollTrigger(ImageRef);

  return (
    <Block>
      <h2 className={styles.ToolTitle}>useScrollTrigger</h2>
      <p style={{ textAlign: "center" }}> Прокрутите вниз ↓</p>
      <div className={styles.EmptyHeightBlock} />
      <div>
        Это изображение было анимировано, добавлением класса, когда скролл по
        вертикали достиг элемента, переданного в{" "}
        <code>useScrollTrigger(ImageRef)</code>
      </div>{" "}
      <br />
      <img
        // Set ref to the target Element
        ref={ImageRef}
        className={classNames(
          styles.Image,
          ImageTriggered && styles.Image_Triggered
        )}
        width={350}
        src={cat.toString()}
      />
    </Block>
  );
};

const TemplateUseScroll: ComponentStory<typeof Block> = (args) => {
  // Save the result of the hook to variable
  const scroll = useScroll();

  return (
    <Block>
      <h2 className={styles.ToolTitle}>useScroll</h2>

      <div className={styles.DisplayResult}>
        <div>scroll.top: {scroll.top}</div>
        <div>scroll.left: {scroll.left}</div>
      </div>
      <p style={{ textAlign: "center" }}> Прокрутите вниз ↓ или влево → </p>
      <div className={styles.EmptyHeightWidthBlock} />
    </Block>
  );
};

const TemplateSyncScroll: ComponentStory<typeof Block> = (args) => {
  const [scrolledLocked, setScrolledLocked] = useState<boolean>(false);
  const [scrolledSynthetic, setScrolledSynthetic] = useState<boolean>(false);
  const [scrolledMode, setScrolledMode] = useState<"normal" | "smooth">(
    "normal"
  );
  const [scrolledLeft, setScrolledLeft] = useState<number>(0);
  const [scrolledTop, setScrolledTop] = useState<number>(0);
  const [scrolledRawLeft, setScrolledRawLeft] = useState<number>(0);
  const [scrolledRawTop, setScrolledRawTop] = useState<number>(0);
  const [syncScrollSubscribeStatus, setSyncScrollSubscribeStatus] =
    useState<boolean>(true);

  const handleScroll = useCallback(() => {
    setScrolledLocked(syncScroll.get().locked);
    setScrolledSynthetic(syncScroll.get().synthetic);
    setScrolledMode(syncScroll.get().mode);
    setScrolledLeft(syncScroll.get().left);
    setScrolledTop(syncScroll.get().top);
    setScrolledRawLeft(syncScroll.get().rawLeft);
    setScrolledRawTop(syncScroll.get().rawTop);
  }, []);

  const syncScrollUnsubscribe = () => {
    syncScroll.unsubscribe(handleScroll);
    setSyncScrollSubscribeStatus(false);
  };

  useEffect(() => {
    handleScroll();
    syncScroll.subscribe(handleScroll);
    setSyncScrollSubscribeStatus(true);

    return () => {
      syncScroll.unsubscribe(handleScroll);
      setSyncScrollSubscribeStatus(false);
    };
  }, [handleScroll]);

  return (
    <Block>
      <h2 className={styles.ToolTitle}>syncScroll</h2>
      <div className={styles.DisplayResult}>
        <h3>Window scroll:</h3>
        <div>locked: {scrolledLocked.toString()}</div>
        <div>synthetic: {scrolledSynthetic.toString()}</div>
        <div>mode: {scrolledMode}</div>
        <div>left: {scrolledLeft}</div>
        <div>top: {scrolledTop}</div>
        <div>rawLeft: {scrolledRawLeft}</div>
        <div>rawTop: {scrolledRawTop}</div> <br />
        <div>subscribeStatus: {syncScrollSubscribeStatus.toString()}</div>
      </div>
      <p style={{ textAlign: "center" }}>Прокрутите вниз ↓ или влево →</p>
      {syncScrollSubscribeStatus && (
        <button
          style={{ margin: "0 auto", display: "block" }}
          onClick={() => syncScrollUnsubscribe()}
        >
          window syncScroll unsubscribe
        </button>
      )}
      <br />
      <br />
      <br />
      <div className={styles.EmptyHeightWidthBlock} />
    </Block>
  );
};

const TemplateUseScrollTo: ComponentStory<typeof Block> = (args) => {
  const scrollTo = useScrollTo();
  const elementToScroll = useRef(null);

  return (
    <Block>
      <h2>useScrollTo</h2>
      <button onClick={() => scrollTo.scrollToElement(elementToScroll)}>
        Scroll to bottom element
      </button>
      <div className={styles.EmptyHeightBlock} />
      <div ref={elementToScroll}>Bottom element</div> <br />
      <button onClick={() => scrollTo.scrollToPosition(50)}>
        Scroll to position: 50px from top
      </button>
    </Block>
  );
};

const TemplateUseScrollLock: ComponentStory<typeof Block> = (args) => {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);

  const scrollLocker = useScrollLock();

  useEffect(() => {
    if (modalIsActive) {
      scrollLocker.lockScroll("unique_key_example");
      console.log(scrollLocker.locked);
    } else {
      scrollLocker.unlockScroll("unique_key_example");
      console.log(scrollLocker.locked);
    }
  }, [scrollLocker]);

  return (
    <Block id="Block">
      <h2>useScrollLock</h2>
      {modalIsActive && (
        <div className={styles.ModalExample}>
          <h4>Modal</h4>
          <p>Посмотрите на скроллбар. Он должен быть заблокирован. → </p>
          <button
            onClick={() => {
              setModalIsActive(false);
            }}
          >
            Close modal
          </button>
        </div>
      )}
      <button
        onClick={() => {
          setModalIsActive(true);
        }}
      >
        Open modal
      </button>
      <div className={styles.EmptyHeightBlock} />
    </Block>
  );
};

export const useScrollTriggerExample = TemplateUseScrollTrigger.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
useScrollTriggerExample.storyName = `useScrollTrigger`;
useScrollTriggerExample.parameters = {
  readme: {
    sidebar: ReadmeUseScrollTrigger,
  },
};

export const useScrollExample = TemplateUseScroll.bind({});
useScrollExample.storyName = `useScroll`;
useScrollExample.parameters = {
  readme: {
    sidebar: ReadmeUseScroll,
  },
};

export const syncScrollExample = TemplateSyncScroll.bind({});
syncScrollExample.storyName = `syncScroll`;
syncScrollExample.parameters = {
  readme: {
    sidebar: ReadmeSyncScroll,
  },
};

export const useScrollToExample = TemplateUseScrollTo.bind({});
useScrollToExample.storyName = `useScrollTo`;
useScrollToExample.parameters = {
  readme: {
    sidebar: ReadmeUseScrollTo,
  },
};

export const useScrollLockExample = TemplateUseScrollLock.bind({});
useScrollLockExample.storyName = `useScrollLock`;
useScrollLockExample.parameters = {
  readme: {
    sidebar: ReadmeUseScrollLock,
  },
};
