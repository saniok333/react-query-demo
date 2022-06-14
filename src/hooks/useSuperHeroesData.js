import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from '../utils/axios-utils';

const fetchSuperHeroes = () => request({ url: '/superheroes' });

const addSuperHero = (hero) =>
  request({ url: '/superheroes', method: 'post', data: hero });

export const useSuperHeroesData = ({ onSuccess, onError }) =>
  useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
  });

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes');
      const previousHeroData = queryClient.getQueryData('super-heroes');
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
