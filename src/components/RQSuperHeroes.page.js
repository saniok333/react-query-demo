import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery('super-heroes', fetchSuperHeroes);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
};
