import { Response } from "express";

export const cookieManager = (response: Response) => {
  const res = response;
  function set(key: string, value, term: number) {
    res.cookie(key, value, {
      maxAge: term,
      httpOnly: true,
      /*  domain: ".localhost",
      path: "/api/auth/",*/
    });
  }
  function destroy(key: string) {
    res.clearCookie(key);
  }
  return {
    set,
    destroy,
  };
};
