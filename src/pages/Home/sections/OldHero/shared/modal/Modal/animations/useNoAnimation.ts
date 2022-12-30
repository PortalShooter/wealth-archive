import { useState } from "react";
import { UseAnimation } from "./interface";

export const useNoAnimation: UseAnimation = ({}) => {
  const [ visible ] = useState(true);

  return {
    visible,
  };
};