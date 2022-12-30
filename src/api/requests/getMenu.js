import { requestError } from '../error';

const route = `${process.env.API_URL}navs/menu_top/tree`;

export const isMenuFullPageData = (item) => typeof item.uri === 'string';

export const getMenu = async () => {
  try {
    const res = await fetch(route);
    const json = await res.json();

    return json.data;
  } catch (err) {
    console.error(requestError(route, err));

    return [];
  }
};
