import React from "react";

import ReadmeTransitioon from "!raw-loader!./animation.utils/transition/README.md";
import ReadmeSimpleTween from "!raw-loader!./animation.utils/simpleTween/README.md";
import ReadmeСompositeAnimation from "!raw-loader!./animation.utils/compositeAnimation/README.md";
import ReadmeCreateLoop from "!raw-loader!./animation.utils/createLoop/README.md";
import ReadmeTweenComposer from "!raw-loader!./animation.utils/tweenComposer/README.md";
import ReadmeFps from "!raw-loader!./animation.utils/fps/README.md";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const Block = ({ id, children }: any) => {
  return <div style={{fontFamily: "sans-serif"}} id={id}>{children}</div>;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/utils/animation",
  component: Block,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof Block>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TemplateUtils: ComponentStory<typeof Block> = (args) => {
  return (
    <Block>
      <p>See README tab. </p>
      <p>If you don't find, ask a contributor or look at the source code of an utility.</p>
    </Block>
  );
};



export const Transition = TemplateUtils.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Transition.storyName = `transition`;
Transition.parameters = {
  readme: {
    sidebar: ReadmeTransitioon,
  }
};

export const SimpleTween = TemplateUtils.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SimpleTween.storyName = `simpleTween`;
SimpleTween.parameters = {
  readme: {
    sidebar: ReadmeSimpleTween,
  }
};

export const compositeAnimation = TemplateUtils.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
compositeAnimation.storyName = `compositeAnimation`;
compositeAnimation.parameters = {
  readme: {
    sidebar: ReadmeСompositeAnimation,
  }
};

export const createLoop = TemplateUtils.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
createLoop.storyName = `createLoop`;
createLoop.parameters = {
  readme: {
    sidebar: ReadmeCreateLoop,
  }
};

export const tweenComposer = TemplateUtils.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
tweenComposer.storyName = `TweenComposer`;
tweenComposer.parameters = {
  readme: {
    sidebar: ReadmeTweenComposer,
  }
};


export const fps = TemplateUtils.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
fps.storyName = `fps`;
fps.parameters = {
  readme: {
    sidebar: ReadmeFps,
  }
};


