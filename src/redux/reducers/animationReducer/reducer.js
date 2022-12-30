import {
  SET_END_COORDS,
  SET_START_COORDS,
  SET_CARDS_END_COORDS,
  SET_CARDS_START_COORDS,
  HIDE_ICONS,
  SET_FLY_SECTION_OFFSET,
  SET_CARDS_SECTION_OFFSET,
  SET_CHARTS_SECTION_OFFSET, CHANGE_TAB,
} from "./types";

const initialState = {
  icons:{},
  coloredCards:{},
  isHideIcons:false,
  changePercentTab:false,
};

export const animationReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_END_COORDS: {
      return {
        ...state,
        icons: {
          ...state.icons,
          [action.payload.name]: {
            ...state.icons[action.payload.name],
            endX:action.payload.x,
            endY:action.payload.y,
            endWidth:action.payload.width,
            endHeight:action.payload.height
          }

        }
      };
    }
    case SET_START_COORDS: {
      return {
        ...state,
        icons: {
          ...state.icons,
          [action.payload.name]: {
            ...state.icons[action.payload.name],
            startX:action.payload.x,
            startY:action.payload.y,
            startWidth:action.payload.width,
            startHeight:action.payload.height
          }

        }
      };
    }
    case SET_CARDS_END_COORDS: {
      return {
        ...state,
        coloredCards: {
          ...state.coloredCards,
          [action.payload.name]: {
            ...state.coloredCards[action.payload.name],
            endX:action.payload.x,
            endY:action.payload.y,
            endWidth:action.payload.width,
            endHeight:action.payload.height
          }

        }
      };
    }
    case SET_CARDS_START_COORDS: {
      return {
        ...state,
        coloredCards: {
          ...state.coloredCards,
          [action.payload.name]: {
            ...state.coloredCards[action.payload.name],
            startX:action.payload.x,
            startY:action.payload.y,
            startWidth:action.payload.width,
            startHeight:action.payload.height
          }

        }
      };
    }
    case HIDE_ICONS: {
      return  {
        ...state,
        isHideIcons:action.payload.isHideIcons,
      }
    }
    case SET_FLY_SECTION_OFFSET: {
      return  {
        ...state,
        sectionsOffset:{
          ...state.sectionsOffset,
          flyOffset:action.payload
        },
      }
    }
    case SET_CARDS_SECTION_OFFSET: {
      return  {
        ...state,
        sectionsOffset:{
          ...state.sectionsOffset,
          cardsOffset:action.payload
        },
      }
    }
    case SET_CHARTS_SECTION_OFFSET: {
      return  {
        ...state,
        sectionsOffset:{
          ...state.sectionsOffset,
          chartsOffset:action.payload
        },
      }
    }
    case CHANGE_TAB: {
      return  {
        ...state,
        changePercentTab:action.payload
        ,
      }
    }
    default:
      return state;
  }
};
