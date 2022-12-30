import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReadmeDropDown from "!raw-loader!./README.md";
import styles from "./DropDown.stories.module.css";

import { DropDown } from ".";

const Block = ({ id, children }: any) => {
  return (
    <div id={id} className={styles.Block}>
      {children}
    </div>
  );
};

const items = () => {
  var elements = [];
  for (var i = 0; i < 8; i++) {
    elements.push(
      <div style={{ width: "250px" }}>
        Item {i} <hr />
      </div>
    );
  }
  return elements;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/DropDown",
  component: DropDown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    readme: {
      sidebar: ReadmeDropDown,
    },
  },
} as ComponentMeta<typeof DropDown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropDown> = (args) => {
  return (
    <Block>
      <h2>DropDown / default options</h2>
      <p>See API or interface of the component to know default arguments.</p>
      <DropDown
        {...args}
        style={{
          maxWidth: "max-content",
        }}
        button={
          <button style={{ marginBottom: "20px", padding: "10px 30px" }}>
            Dropdown
          </button>
        }
      >
        {items()}
      </DropDown>
    </Block>
  );
};

const TemplateDurationAndHeight: ComponentStory<typeof DropDown> = (args) => {
  return (
    <Block>
      <h2>DropDown: duration & height</h2>
      <p>
        The duration of the animation when the DropDown is opened and closed.
      </p>
      <p>Also, you can limit the height of the drop-down list.</p>
      <code>
        <div>openDuration: 3 (sec)</div>
        <div>closeDuration: 3 (sec)</div>
        <div>maxHeight: 200 (px)</div>
      </code>
      <br />
      <DropDown
        {...args}
        style={{
          maxWidth: "max-content",
        }}
        button={
          <button style={{ marginBottom: "20px", padding: "10px 30px" }}>
            Dropdown
          </button>
        }
      >
        {items()}
      </DropDown>
    </Block>
  );
};

const TemplateHoverOpened: ComponentStory<typeof DropDown> = (args) => {
  return (
    <Block>
      <h2>
        DropDown / <code>hover: true, opened: true</code>
      </h2>
      <p>DropDown will be opening by hover.</p>
      <p>DropDown will be opened by default.</p>
      <DropDown
        {...args}
        style={{
          maxWidth: "max-content",
        }}
        button={
          <button style={{ marginBottom: "20px", padding: "10px 30px" }}>
            Dropdown
          </button>
        }
      >
        {items()}
      </DropDown>
    </Block>
  );
};

const TemplateCloseOnDocumentClick: ComponentStory<typeof DropDown> = (
  args
) => {
  return (
    <Block>
      <h2>
        DropDown / <code>closeOnDocumentClick: false</code>
      </h2>
      <p>
        DropDown will not close by click outside of DropDown. It will close only
        by click on the DropDown handle button.
      </p>
      <DropDown
        {...args}
        style={{
          maxWidth: "max-content",
        }}
        button={
          <button style={{ marginBottom: "20px", padding: "10px 30px" }}>
            Dropdown
          </button>
        }
      >
        {items()}
      </DropDown>
    </Block>
  );
};

const TemplateDisabled: ComponentStory<typeof DropDown> = (args) => {
  return (
    <Block>
      <h2>DropDown / disabled: true</h2>
      <p>DropDown will disable for opening.</p>
      <DropDown
        {...args}
        style={{
          maxWidth: "max-content",
        }}
        button={
          <button style={{ marginBottom: "20px", padding: "10px 30px" }}>
            Dropdown
          </button>
        }
      >
        {items()}
      </DropDown>
    </Block>
  );
};

const TemplateDispatchResize: ComponentStory<typeof DropDown> = (args) => {
  return (
    <Block>
      <h2>DropDown / dispatchResize: true</h2>
      <p>
        Resize event will be dispatched to the sync Resize object, so all the
        scroll animations could recalculate their positions.
      </p>
      <DropDown
        {...args}
        style={{
          maxWidth: "max-content",
        }}
        button={
          <button style={{ marginBottom: "20px", padding: "10px 30px" }}>
            Dropdown
          </button>
        }
      >
        {items()}
      </DropDown>
    </Block>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const HoverOpened = TemplateHoverOpened.bind({});
HoverOpened.storyName = "Open by hover, opened by default";
HoverOpened.args = {
  hover: true,
  opened: true,
};

export const CloseOnDocumentClick = TemplateCloseOnDocumentClick.bind({});
CloseOnDocumentClick.storyName = "closeOnDocumentClick: false";
CloseOnDocumentClick.args = {
  closeOnDocumentClick: false,
};

export const Disabled = TemplateDisabled.bind({});
Disabled.storyName = "disabled: true";
Disabled.args = {
  disabled: true,
};

export const DurationAndHeight = TemplateDurationAndHeight.bind({});
DurationAndHeight.storyName = "close/open duration & maxHeight";
DurationAndHeight.args = {
  openDuration: 3,
  closeDuration: 3,
  maxHeight: 200,
};

export const DispatchResize = TemplateDispatchResize.bind({});
DispatchResize.storyName = "dispatchResize: true";
DispatchResize.args = {
  dispatchResize: true,
  maxHeight: 200,
};
