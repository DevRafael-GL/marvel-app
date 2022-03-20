const ts = "1647634571";
const hash = process.env.REACT_APP_API_HASH;
const apikey = process.env.REACT_APP_API_KEY;

const url = `http://gateway.marvel.com/v1/public/`;

const key = `&ts=${ts}&apikey=${apikey}&hash=${hash}`;

export function HEROES_GET(params) {
  return {
    url: `${url}characters?${params}&ts=${ts}&apikey=${apikey}&hash=${hash}`,
    options: {
      method: "GET",
    },
  };
}
