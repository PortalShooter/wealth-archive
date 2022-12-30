import React, { useRef, useEffect, useCallback, useState } from "react";

import Readme from "!raw-loader!./README.md";
import ReadmeUseResize from "!raw-loader!./useResize/README.md";
import ReadmeUseElementResize from "!raw-loader!./useElementResize/README.md";
import ReadmeSyncResize from "!raw-loader!./syncResize/README.md";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import styles from "./Resize.stories.module.css";
import { useResize } from "./useResize";
import { useElementResize } from "./useElementResize";
import { syncResize } from "./syncResize";

const Block = ({ id, children }: any) => {
  return <div id={id} className={styles.Block}>{children}</div>;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/Resize",
  component: Block,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    readme: {
      sidebar: Readme
    }
  }
} as ComponentMeta<typeof Block>;



const TemplateUseResize: ComponentStory<typeof Block> = (args) => {
  const size = useResize(); 

  return (
    <Block>
      <h2>useResize</h2>
      <p>Size of the document (iframe). Try to resize the window or change viewport.</p>
      <div>size.width: {size.width}</div>
      <div>size.height: {size.height}</div>
    </Block>
  )
}

const TemplateUseElementResize: ComponentStory<typeof Block> = (args) => {
  const containerRef = useRef(null)
  const containerSize = useElementResize(containerRef.current);

  return (
    <Block>
      <h2>useElementResize</h2>
      <p>Size of the Container ↓</p>
      <div ref={containerRef} className={styles.Container}>
        <div>containerSize.width: {containerSize.width}</div>
        <div>containerSize.height: {containerSize.height}</div>
        <br /><br /><br /><br /><br />
      </div>
    </Block>
  )
}

const TemplateSyncResize: ComponentStory<typeof Block> = (args) => {
  const [randomNumber, setRandomNumber] = useState(0);

  const handleResize = useCallback(() => {
    setRandomNumber(Math.random());
  }, []);

  const resizeUnsubscribe = () => {
    syncResize.unsubscribe(handleResize);
  }

  const resizeSubscribe = () => {
    syncResize.subscribe(handleResize);
  }

  useEffect(() => {
    handleResize();
    syncResize.subscribe(handleResize);

    return () => {
      syncResize.unsubscribe(handleResize);
    };
  }, [handleResize]);

  return (
    <Block>
      <h2>syncResize</h2>
      <div>Math.random(): {randomNumber}</div>
      <p>Random number will update by resize, because we update it in handleResize function and subscribe on handleResize <br /><code>syncResize.subscribe(handleResize))</code></p>
      <p>Also, we can unsubscribe from the resize event with <br /><code>syncResize.unsubscribe(handleResize)</code></p>
      <button onClick={() => {resizeUnsubscribe()}}>Unsubscribe from <b>handleResize</b></button> <br />
      <p>Then, try to resize the window</p>
      <br />
      <button onClick={() => {resizeSubscribe()}}>Subscribe to <b>handleResize</b></button>
      <br />
      <p><code>syncScroll.get()</code> also return width and height of the viewport</p>
      <div>width: {syncResize.get().width}</div>
      <div>height: {syncResize.get().height}</div>
    </Block>
  )
}

export const useResizeExample = TemplateUseResize.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
useResizeExample.storyName = `useResize`;
useResizeExample.parameters = {
  readme: {
    sidebar: ReadmeUseResize,
  }
};

export const useElementResizeExample = TemplateUseElementResize.bind({});
useElementResizeExample.storyName = `useElementResize`;
useElementResizeExample.parameters = {
  readme: {
    sidebar: ReadmeUseElementResize,
  }
};

export const syncResizeExample = TemplateSyncResize.bind({});
syncResizeExample.storyName = `syncResize`;
syncResizeExample.parameters = {
  readme: {
    sidebar: ReadmeSyncResize,
  }
};
