import { requestError } from "../error";

const params = new URLSearchParams({
  fields: "id,type,title,slug,uri,url,parent,blueprint,last_modified",
});
params.append("filter[published]", "true");

const route = `${process.env.API_URL}collections/pages/entries?${params}`;


export const getPages = async() => {
  // todo: remove api request
  return [];

  try {
    const res = await fetch(route);
    const json = await res.json();

    const result = json.data.map((p) => {
      const entry = p;

      return entry;
    });

    return result;
  } catch (err) {
    throw new Error(requestError(route, err));
  }
}
