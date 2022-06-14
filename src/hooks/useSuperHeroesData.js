import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

const addSuperHero = (hero) =>
  axios.post('http://localhost:4000/superheroes', hero);

export const useSuperHeroesData = ({ onSuccess, onError }) =>
  useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
  });

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
