// https://github.com/LeoAJ/react-iTunes-search/blob/master/src/utils.js
export const capitalize = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

export function getMedia(str: string): string {
  if (str.indexOf(' ') === -1) {
    return str.toLowerCase();
  }
  const sg = str.split(' ');
  return `${sg[0].toLowerCase()}${capitalize(sg[1])}`;
}

export const getApiUrl = ({ media, query, limit = 1 }: HeaderState) =>
  `https://itunes.apple.com/search?limit=${limit}&media=${getMedia(
    media || 'all'
  )}&term=${query.split(' ').join('+')}`;

export function getKind(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (str === 'tv') {
    return 'TV';
  } else if (str === 'feature') {
    return '';
  }

  if (str.indexOf('-') === -1) {
    return capitalize(str);
  }
  const sg = str.split('-');
  return `${getKind(sg[0])} ${capitalize(sg[1])}`.trim();
}

/////////

// https://rss.itunes.apple.com/en-us
const popularAPI =
  'https://rss.itunes.apple.com/api/v1/us/apple-music/top-songs/all/10/explicit.json';

const moods = [
  'Fun',
  'Upbeat',
  'Dreamy',
  'Romantic',
  'Bold',
  'Mellow',
  'Inspirational',
  'Suspenseful',
];

const genres = [
  'Christmas',
  'Hip Hop',
  'R&B and Soul',
  'Rock',
  'Pop',
  'Country',
  'Latin',
  'Electronic',
  'Jazz',
  'Classical',
  'Reggae',
  'Ambient',
  'Folk',
  'Indian',
  'Cinematic',
];

// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

async function getGenreAsync(genre) {
  const api = getApiUrl({
    media: 'music',
    query: genre,
  });

  const resp = await fetch(api);
  const json = await resp.json();
  return json;
}

async function createCategoryData(input, name) {
  let data = {};
  for (const genre of input) {
    data[genre] = await getGenreAsync(encodeURIComponent(genre));
  }
  console.log(name + ' :DATA: ', JSON.stringify(data));
  download(JSON.stringify(data), name + '.json', 'txt');
}

// createCategoryData(moods, 'Moods');
const api = getApiUrl({
  media: 'music',
  query: 'popular',
});
console.log(api);
