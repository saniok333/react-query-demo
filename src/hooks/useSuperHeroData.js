import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (id) =>
  axios.get(`http://localhost:4000/superheroes/${id}`);

export const useSuperHeroData = (id) =>
  useQuery(['super-hero', id], () => fetchSuperHero(id));
