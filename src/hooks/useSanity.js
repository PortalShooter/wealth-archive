import {useEffect, useState} from "react";
import client from "~/client";

function useSanity(type, query= null) {
  const [data, setData] = useState(null);
  const fetchQuery = query ?? `*[_type == "${type}"]`;

  useEffect(() => {
    const aboutData = client.fetch(
      fetchQuery
    )

    aboutData.then(res => {
      setData(res[0]);
    })
  }, [])

  return data;
}
export default useSanity;
