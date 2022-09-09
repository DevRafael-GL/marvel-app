const API_KEY = {
  ts: "1647634571",
  hash: process.env.REACT_APP_API_HASH,
  apikey: process.env.REACT_APP_API_KEY,
};
export const key = `?ts=${API_KEY.ts}&apikey=${API_KEY.apikey}&hash=${API_KEY.hash}`;
