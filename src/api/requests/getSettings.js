import { requestError } from '../error';

const route = `${process.env.API_URL}Settings/settings`;
const responseMock = {
  meta_title_prefix: null,
  meta_description_default: null,
  google_analytics_id: null,
  meta_social_image: null,
};


export const getSettings = async () => {
  try {
    const res = await fetch(route);
    const json = await res.json();

    return json.data;
  } catch (err) {
    console.error(requestError(route, err));

    return responseMock;
  }
};
