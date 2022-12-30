import React, { useRef, useState } from "react";
import classNames from "classnames";

import Readme from "!raw-loader!./README.md";
import ReadmeUseFocusLock from "!raw-loader!./useFocusLock/README.md";
import ReadmeUseAlwaysFocusable from "!raw-loader!./useAlwaysFocusable/README.md";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import styles from "./Focus.stories.module.css";
import { useAlwaysFocusable, useFocusLock } from "./";


const Block = ({ id, children }: any) => {
  return <div id={id} className={styles.Block}>{children}</div>;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/Focus",
  component: Block,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    readme: {
      sidebar: Readme
    },
    storySort: {
      order: ['useFocusLockExample', 'useAlwaysFocusable'],
    },
  }
} as ComponentMeta<typeof Block>;

const TemplateUseFocusLock: ComponentStory<typeof Block> = (args) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ModalRef = useRef(null);
  const ModalLockHook = useFocusLock(ModalRef);

  const lockFocus = ModalLockHook.lock;
  const unlockFocus = ModalLockHook.unlock;

  const openModal = () => {
    // When we open modal we want to disable focusing outside of the modal
    lockFocus();
    // Change state of the modal window
    setModalIsOpen(true);
  }

  const closeModal = () => {
    // When we close modal we want to enable focusing outside of the modal
    unlockFocus();
    // Change state of the modal window
    setModalIsOpen(false);
  }

  return (
    <Block>
      <h2>useFocusLock</h2>
      <p>Limits focus to children of the passed element.</p>
      <hr />
      <p>In this example passed element is Modal window. <code>useFocusLock(ModalRef)</code>.</p>
      <p>When you open the Modal window, all buttons (interactive elements) outside will not available for focusing.</p>
      <p>Try click on `tab` on your keyboard.</p>
      <div>
        <button onClick={openModal} className={styles.Button__OpenModal}> <hr /><hr /><hr /></button>
        <br /> <br />
        <button>{ModalLockHook.locked ? 'Not focused' : 'Focused'}</button>
      </div>

      {/* Modal Window */}
      <div ref={ModalRef} className={classNames(styles.Modal, modalIsOpen && styles.Modal_Active)}>
        <p>Only buttons in this modal will be focusing (try click on your `tab` button).</p>
        <p>No one buttuns outside of the modal will not focusing.</p>
        <button onClick={() => console.log('Link 1')} tabIndex={!ModalLockHook.locked ? -1 : 0}>Link/Button 1</button> <br />
        <button tabIndex={!ModalLockHook.locked ? -1 : 0}>Link/Button 2</button> <br />
        <button tabIndex={!ModalLockHook.locked ? -1 : 0}>Link/Button 3</button> <br />
        <button tabIndex={!ModalLockHook.locked ? -1 : 0} onClick={closeModal} className={styles.Button__CloseModal}>x</button>
      </div>
    </Block>
  )
}

const TemplateUseAlwaysFocusable: ComponentStory<typeof Block> = (args) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ModalRef = useRef(null);
  const ModalLockHook = useFocusLock(ModalRef);

  // This button  is exception. We want to make it always available  for focusing.
  const SuperButtonRef = useRef(null);
  useAlwaysFocusable(SuperButtonRef);

  const lockFocus = ModalLockHook.lock;
  const unlockFocus = ModalLockHook.unlock;

  const openModal = () => {
    // When we open modal we want to disable focusing outside of the modal
    lockFocus();
    // Change state of the modal window
    setModalIsOpen(true);
  }

  const closeModal = () => {
    // When we close modal we want to enable focusing outside of the modal
    unlockFocus();
    // Change state of the modal window
    setModalIsOpen(false);
  }

  return (
    <Block>
      <h2>useAlwaysFocusable</h2>
      <p>Sets element to be focusable even if focus lock was engaged.</p>
      <hr />
      <p>In this example passed element is Modal window. <code>useFocusLock(ModalRef)</code> </p>
      <button onClick={openModal} className={styles.Button__OpenModal}> <hr /><hr /><hr /></button>
      <p>When you open the Modal window, all buttons outside will not available for focusing</p>
      <p>Except <b>SuperButtonRef</b>, because we pass the button into the hook <code><b>useAlwaysFocusable(SuperButtonRef)</b></code> </p>
      <p>Try click on `tab` on your keyboard.</p>
      <div>
        <button>{ModalLockHook.locked ? 'Not focused' : 'Focused'}</button>
        <br /><br />
        <p>This button is exception. We want to make it always available for focusing.</p>
        <button ref={SuperButtonRef} style={{border: "2px dashed pink"}}>Super Button - always focusable</button>
      </div>

      {/* Modal Window */}
      <div ref={ModalRef} className={classNames(styles.Modal, modalIsOpen && styles.Modal_Active)}>
        <p>Only buttons in this modal will be focusing (try click on your `tab` button).</p>
        <p>No one buttuns outside of the modal will not focusing.</p>
        <button onClick={() => console.log('Link 1')} tabIndex={!ModalLockHook.locked ? -1 : 0}>Link 1</button> <br />
        <button tabIndex={!ModalLockHook.locked ? -1 : 0}>Link 2</button> <br />
        <button tabIndex={!ModalLockHook.locked ? -1 : 0}>Link 3</button> <br />
        <button tabIndex={!ModalLockHook.locked ? -1 : 0} onClick={closeModal} className={styles.Button__CloseModal}>x</button>
      </div>
    </Block>
  )
}


export const useFocusLockExample = TemplateUseFocusLock.bind({});
useFocusLockExample.storyName = `useFocusLock`;
useFocusLockExample.parameters = {
  readme: {
    sidebar: ReadmeUseFocusLock,
  },
}

export const useAlwaysFocusableExample = TemplateUseAlwaysFocusable.bind({});
useAlwaysFocusableExample.storyName = `useAlwaysFocusable`;
useAlwaysFocusableExample.parameters = {
  readme: {
    sidebar: ReadmeUseAlwaysFocusable,
  },
}

