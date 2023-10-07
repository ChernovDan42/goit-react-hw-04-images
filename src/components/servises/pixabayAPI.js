import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36720950-505b6a56a98a4bf11cd979a2a';

export default function fetchImages(searchQuery, page) {
  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
