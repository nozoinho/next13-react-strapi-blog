import qs from "qs";
import { getStrapiURL } from "./api-helper";
export const fetchApi = async (
  path: string,
  urlParamsObject = {},
  options = {} // se usa para pasar cabeceras, api keys, entre otros
) => {
  try {
    const mergedOptions = {
      next: { revalidate: 60 },
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true,
    });
    //console.log({ queryString });
    // query string permite tener la url lo mas formateada a como se necesita
    // queryString: 'populate=%2A&sort[createdAt]=asc&pagination[page]=1&pagination[pageSize]=2'

    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    //console.log(requestUrl);
    const res = await fetch(requestUrl, mergedOptions);
    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching API");
  }
};

/* const url = getStrapiURL("/api/posts");

const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const data = res.json();
  return data;  */
