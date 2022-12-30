import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import styles from "./Modal.stories.module.css";
import ReadmeModal from "!raw-loader!./README.md";

import { Modal, ModalControl } from ".";

const Block = ({ id, children }: any) => {
  return (
    <div id={id} className={styles.Block}>
      {children}
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/Modal",
  component: Block,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    readme: {
      sidebar: ReadmeModal,
    },
  },
} as ComponentMeta<typeof Block>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Block> = (args) => {
  return (
    <div>
      <h2>Modal</h2>
      <p>Example in progress. <a href="https://bitbucket.org/clay-global/boilerplate-frontend/src/master/src/shared/modal/" target="_blank">See sources</a></p>
      {/* <ModalControl
        ariaLabel="Modal close."
        className={styles.Close}
        id={"MODAL_1"}
        action="open"
      ></ModalControl>
      <Modal
        className={styles.Modal}
        activeClassName={styles.Active}
        id={"MODAL_1"}
      > 
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, reiciendis.</p>
        <ModalControl
          ariaLabel="Modal close."
          className={styles.Close}
          id={"MODAL_1"}
          action="close-all"
        ></ModalControl>
      </Modal> */}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
