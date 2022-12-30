import {
  CHANGE_TAB,
  ChangeTab,
  HIDE_ICONS,
  HideIcons,
  SET_CARDS_END_COORDS,
  SET_CARDS_SECTION_OFFSET,
  SET_CARDS_START_COORDS,
  SET_CHARTS_SECTION_OFFSET,
  SET_END_COORDS,
  SET_FLY_SECTION_OFFSET,
  SET_START_COORDS,
  SetCardsEndCoords,
  SetCardsSectionOffset,
  SetCardsStartCoords,
  SetChartsSectionOffset,
  SetEndCoords,
  SetFlySectionOffset,
  SetStartCoords
} from './types';

/**
 * Set end coords
 * @param x Coords pageX
 * @param y Coords pageY
 * @returns Action
 */
export const setEndCoords = (x: string, y: string, width:string, height:string,name:string): SetEndCoords => ({
  type: SET_END_COORDS,
  payload: {
    x,
    y,
    width,
    height,
    name
  },
});

export const setStartCoords = (x: string, y: string, width:string, height:string,name:string): SetStartCoords => ({
  type: SET_START_COORDS,
  payload: {
    x,
    y,
    width,
    height,
    name
  },
});
export const setCardsEndCoords = (x: string, y: string, width:string, height:string,name:string): SetCardsEndCoords => ({
  type: SET_CARDS_END_COORDS,
  payload: {
    x,
    y,
    width,
    height,
    name
  },
});

export const setCardsStartCoords = (x: string, y: string, width:string, height:string,name:string): SetCardsStartCoords => ({
  type: SET_CARDS_START_COORDS,
  payload: {
    x,
    y,
    width,
    height,
    name
  },
});

export const hideIcons = (isHideIcons: boolean): HideIcons => ({
  type: HIDE_ICONS,
  payload: {
    isHideIcons
  },
});

export const setFlySectionOffset = (offsetY:string): SetFlySectionOffset => ({
  type: SET_FLY_SECTION_OFFSET,
  payload: {
    offsetY
  },
});
export const setCardsSectionOffset = (offsetY:string): SetCardsSectionOffset => ({
  type: SET_CARDS_SECTION_OFFSET,
  payload: {
    offsetY
  },
});

export const setChartsSectionOffset = (offsetY:string): SetChartsSectionOffset => ({
  type: SET_CHARTS_SECTION_OFFSET,
  payload: {
    offsetY
  },
});

export const changeTab = (change:boolean): ChangeTab => ({
  type: CHANGE_TAB,
  payload: {
    change
  },
});
