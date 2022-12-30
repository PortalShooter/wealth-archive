import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import cat from "../../stories/assets/cat.jpg";
import styles from "./Ticker.stories.module.css";
import ReadmeTicker from "!raw-loader!./README.md";

import { Ticker } from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "shared/Ticker",
  component: Ticker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    readme: {
      sidebar: ReadmeTicker
    }
  }
} as ComponentMeta<typeof Ticker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Ticker> = (args) => {

  return (
    <div>
      <Ticker {...args} className={styles.Ticker}>
        <span>
          <ul style={{display: "flex"}}>
            <li>
              <div className={styles.TickerCard}>1</div>
            </li>
            <li>
              <div className={styles.TickerCard}>2</div>
            </li>
            <li>
              <div className={styles.TickerCard}>3</div>
            </li>
            <li>
              <div className={styles.TickerCard}>4</div>
            </li>
          </ul>
        </span>
      </Ticker>
    </div>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Speed = Template.bind({});
Speed.storyName = "speed: 2";
Speed.args = {
  speed: 2,
};

export const Shift = Template.bind({});
Shift.storyName = "shift: 1500";
Shift.args = {
  shift: 1500,
};
