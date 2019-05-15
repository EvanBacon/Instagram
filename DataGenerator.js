import Popular from './data/Popular';
import { getApiUrl } from './itunes';

// https://rss.itunes.apple.com/en-us
const popularAPI =
  'https://rss.itunes.apple.com/api/v1/us/apple-music/top-songs/all/75/explicit.json';

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

  // const api = popularAPI;

  const resp = await fetch(api);
  const json = await resp.json();
  return json;
}

async function createCategoryData(input, name) {
  let data = {};
  for (const genre of input) {
    data[genre] = await getGenreAsync(encodeURI(genre));
  }
  console.log(name + ' :DATA: ', JSON.stringify(data));
  download(JSON.stringify(getGenreAsync('')), name + '.json', 'txt');
}

async function getPPP() {
  let data = [];

  for (const song of Popular) {
    const api = getApiUrl({
      media: 'music',
      query: song.name,
    });
    try {
      const { results } = await getGenreAsync(api);
      data.push(results[0]);
    } catch (error) {
      data.push({ api });
    }
  }
  console.log('JJJ', data);
  download(JSON.stringify(data), 'Popular-itunes' + '.json', 'txt');
}

// getPPP();

// getGenreAsync([], 'Popular');
// createCategoryData(moods, 'Moods');
// const api = getApiUrl({
//   media: 'music',
//   query: 'popular',
// });
