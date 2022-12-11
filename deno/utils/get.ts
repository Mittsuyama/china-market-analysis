import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

interface Get {
  url: string;
  body?: Record<string, number | string | string[]>;
}

export const requestUrlFromGet = (params: Get) => {
  const { url, body } = params;

  const stringfyBody = body
    ? Object
      .entries(body)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          const encodedArray = window.encodeURIComponent(value.join(','));
          return `${key}=${encodedArray}`;
        } else {
          return `${key}=${encodeURIComponent(value)}`;
        }
      })
      .join('&')
    : '';

  return `${url}?${stringfyBody}`;
};

export const get = async (params: Get) => {
  return await axiod.get(requestUrlFromGet(params));
};
