import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');

export const RQSuperHeroesPage = () => {
  const onSuccessHandler = (data) => {
    console.log('Perform side effect after data fetching', data);
    data.data.length > 3 && setRefetchIntervalValue(false);
  };

  const onErrorHandler = (error) => {
    console.log('Perform side effect after encountering error', error);
    setRefetchIntervalValue(false);
  };

  const [refetchIntervalValue, setRefetchIntervalValue] = useState(3000);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess: onSuccessHandler,
      onError: onErrorHandler,
      refetchInterval: refetchIntervalValue,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
