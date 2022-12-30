import {getSanityData} from "@/shared/utils/sanity.utils";

export const getLayoutData = async () => {
  const {header: headerData, footer: footerData} = await getSanityData('layout');
  const modal = await getSanityData( '',
    `*[_type == "home"]{
      homeModalForm
    }`);
  return {
    headerData,
    footerData,
    modalData:modal.homeModalForm
  }
}
