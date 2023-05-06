import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32717144-c9c12528c9efd519e8f1db4c2';

const getImages = async (value, page = 1, perPage) => {
  const options = {
    params: {
      q: value,
      page: page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: KEY,
    },
  };

  const { data, status } = await axios.get(`${BASE_URL}`, options);

  if (status !== 200 || data.totalHits === 0) {
    throw new Error(
      Notiflix.Notify.failure(
        `Sorry, there are no images "${value}". Please try again.`
      )
    );
  } else return data;
};

export const API = {
  getImages,
};
