const ts = "1647634571";
const hash = process.env.REACT_APP_API_HASH;
const apikey = process.env.REACT_APP_API_KEY;

const url = `https://gateway.marvel.com:443/v1/public/`;

const key = `&ts=${ts}&apikey=${apikey}&hash=${hash}`;

export function CHARACTERS_GET(params) {
  return {
    url: `${url}characters?${params}&ts=${ts}&apikey=${apikey}&hash=${hash}`,
    options: {
      method: "GET",
    },
  };
}

export function CHARACTER_PROFILE_GET(id) {
  return {
    url: `${url}characters?id=${id}&ts=${ts}&apikey=${apikey}&hash=${hash}`,
  };
}

export function CHARACTER_COMICS_GET(params) {
  return {
    url: `${url}comics?orderBy=-modified&${params}ts=${ts}&apikey=${apikey}&hash=${hash}`,
  };
}

export function CHARACTER_COMICS_PROFILE_GET(params) {
  return {
    url: `${url}characters/${params}&ts=${ts}&apikey=${apikey}&hash=${hash}`,
  };
}

export function EVENTS_GET(params) {
  return {
    url: `${url}events?orderBy=-modified&${params}ts=${ts}&apikey=${apikey}&hash=${hash}`,
  };
}
