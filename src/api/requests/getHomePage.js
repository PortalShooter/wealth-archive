import {requestError} from '../error';

const route = `${process.env.API_URL}collections/pages/entries/home`;
const responseMock = {
  blueprint: {
    handle: '',
    title: '',
  },
  date: '',
  id: '',
  last_modified: '',
  locale: '',
  parent: {
    id: '',
    title: '',
    api_url: '',
  },
  private: false,
  published: false,
  slug: '',
  status: '',
  title: '',
  updated_at: '',
  uri: '',
  url: '',
};

export const getHomePage = async () => {
  try {
    const res = await fetch(route);
    const json = await res.json();

    return json.data;
  } catch (err) {
    console.error(requestError(route, err));

    return responseMock;
  }
};
