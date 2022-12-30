import { getMenu } from "./requests/getMenu";
import { getSettings } from "./requests/getSettings";
// import { getBrands } from "./requests/getBrands";

export const additionalDataDefault = {
  menu: getMenu,
  settings: getSettings
}

export const additionalDataByType = {
  // home: {
  //   brands: getBrands,
  // },
}
