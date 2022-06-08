import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

export const useSuperHeroesData = ({ onSuccess, onError }) =>
  useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
  });
