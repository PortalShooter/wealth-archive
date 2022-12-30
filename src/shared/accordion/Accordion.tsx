import { ReactElement } from "react"
import { DropDown } from "../dropDown"

export interface Accordion {
  (props: {
    children: DropDown[]
  }): ReactElement 
}

export const Accordion:Accordion = ({
  children
}) => {
  return (
    <div>
      {children}
    </div>
  )
}