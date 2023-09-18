import UrlConstants from "@/utils/constants/UrlConstants";

export const apiRoot = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default async function baseFetch(
  method: string,
  url: string,
  authToken: string = "",
  body: any = null,
  headers = {},
  customHeaders = false,
  fullUrl = false
) {
  const res = await fetch(fullUrl ? url : `${apiRoot}${url}`, {
    method,
    headers: customHeaders
      ? headers
      : {
          "Content-Type": "application/json",
          ...(authToken !== "" ? { Authorization: authToken } : {}),
          ...headers,
        },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    res.json().then((errorResponse) => {
      throw new Error(errorResponse);
    });
  }
  console.log(res);
  return await res.json();
}

export function userLogin(body: any) {
  return baseFetch(
    "POST",
    UrlConstants.base_url + UrlConstants.login,
    "",
    body
  );
}

export function userLogout(token: string) {
  return baseFetch("POST", UrlConstants.base_url + UrlConstants.logout, token);
}
