import { MODAL_OPEN, PayloadID } from '@/redux/reducers/modalReducer/types';

export const SET_END_COORDS = "SET_END_COORDS";
export const SET_START_COORDS = "SET_START_COORDS";
export const SET_CARDS_END_COORDS = "SET_CARDS_END_COORDS";
export const SET_CARDS_START_COORDS = "SET_CARDS_START_COORDS";
export const HIDE_ICONS = "HIDE_ICONS"
export const SET_FLY_SECTION_OFFSET = "SET_FLY_SECTION_OFFSET";
export const SET_CARDS_SECTION_OFFSET = "SET_CARDS_SECTION_OFFSET";
export const SET_CHARTS_SECTION_OFFSET = "SET_CHARTS_SECTION_OFFSET";
export const CHANGE_TAB = "CHANGE_TAB";

export interface PayloadCoords {
    x: string;
    y: string;
    width:string,
    height:string,
    name:string;
}
export interface PayloadHideIcons {
  hide:boolean
}
export interface PayloadChangeTab {
  change:boolean
}
export interface SectionOffset {
  offsetY:string
}


export interface SetEndCoords {
  type: typeof SET_END_COORDS,
  payload: PayloadCoords
}
export interface SetStartCoords {
  type: typeof SET_START_COORDS,
  payload: PayloadCoords
}
export interface SetCardsEndCoords {
  type: typeof SET_CARDS_END_COORDS,
  payload: PayloadCoords
}
export interface SetCardsStartCoords {
  type: typeof SET_CARDS_START_COORDS,
  payload: PayloadCoords
}
export  interface HideIcons {
  type: typeof  HIDE_ICONS,
  payload:PayloadHideIcons,
}

export  interface SetFlySectionOffset {
  type: typeof  SET_FLY_SECTION_OFFSET,
  payload:SectionOffset,
}

export  interface SetCardsSectionOffset {
  type: typeof  SET_CARDS_SECTION_OFFSET,
  payload:SectionOffset,
}

export  interface SetChartsSectionOffset {
  type: typeof  SET_CHARTS_SECTION_OFFSET,
  payload:SectionOffset,
}
export  interface ChangeTab {
  type: typeof  CHANGE_TAB,
  payload:PayloadChangeTab,
}

